<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<v-row>

						<v-btn
							v-if="!isGiikerConnected"
							:disabled="isConnecting"
							:loading="isConnecting"
							color="success"
							large
							@click="onClickConnect"
							class="mx-10">
							Connect Cube
						</v-btn>
						<v-btn
							v-if="isGiikerConnected"
							color="error"
							large
							@click="onClickDisconnect"
							class="mx-10">
							Disconnect Cube [{{ battery }}%]
						</v-btn>

					<v-btn
							color="success"
							large
						@click="onClickReset"
						class="mx-10">
							reset
					</v-btn>
				</v-row>
				<v-row
					v-if="isGiikerConnected">
					<v-col
						v-if="phase === 'scramble'"
						cols=12
						class="scramble"
						>
						<span
							v-for="(move, index) in scrambleMoves"
							:key="index"
							:style="{color: move.grey ? '#CCC' : ''}"
							>
							{{move.text}}
						</span>
					</v-col>
				</v-row>
<v-row fill-height grid-list-lg pa-0>
	<v-col fill-height >
		<v-flex class="breakdown">
			<span class="timer">
				<v-btn
					v-if="phase === 'scramble' && previousSolve !== null"
					icon
					flat
					disabled
					class="ma-0"
					/>
				{{displayTime}}
				<v-dialog
					v-if="phase === 'scramble' && previousSolve !== null"
					v-model="isDeleteDialogOpen"
					>
					<v-btn
						slot="activator"
						icon
						flat
						color="red lighten-2"
						class="ma-0"
						>
						<v-icon dark>delete</v-icon>
					</v-btn>
					<v-card>
						<v-card-text>
							Delete solve?
						</v-card-text>
						<v-divider/>
						<v-card-actions>
							<v-spacer/>
							<v-btn
								color="primary"
								flat
								@click="isDeleteDialogOpen = false"
								>
								Cancel
							</v-btn>
							<v-btn
								color="red lighten-1"
								flat
								@click="onClickDelete"
								>
								Delete
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</span>
			<scary-cube></scary-cube>
			<div
				v-if="phase === 'solve'"
				class="timer-controls"
				>
				<v-btn
					flat
					small
					color="error"
					class="ma-0"
					@click="onClickReset"
					>
					Reset
				</v-btn>
			</div>
			<div
				v-if="phase === 'scramble' && !isFirstSolve"
				class="solve-infos"
				>
				<span class="solve-info subheading">
					{{moveCount}} turns
				</span>
				<span class="solve-info subheading">
					{{speed}} tps
				</span>
			</div>
		</v-flex>
	</v-col>
	<v-dialog v-model="isDialogOpen" max-width="400">
		<v-card>
			<v-card-title class="headline">Your browser is not supported</v-card-title>
			<v-card-text>
				It seems your browser doesn't support Web Bluetooth API.
				So this timer cannot communicate with GiiKER and totally not works.
			</v-card-text>
			<v-card-text v-if="platform.startsWith('Win')">
				I guess you are using <strong>Windows</strong>.
				You can try Chrome Dev with new Bluetooth implementation but it's very beta.
				If you are so smart to try out beta, follow <a
																											target="_blank"
																											href="https://github.com/hakatashi/smart-cube-timer/wiki/Windows-Guide"
																											>
					this instruction
				</a> at your own risk.
			</v-card-text>
			<v-card-text v-if="platform.startsWith('iP')">
				I guess you are using <strong>{{platform}}</strong>.
				Some people says that this timer works with <a
																											target="_blank"
																											href="https://itunes.apple.com/us/app/webble/id1193531073"
																											>
					WebBLE browser
				</a> ($1.99) but I don't guarantee.
				Try at your own risk.
			</v-card-text>
			<v-card-text v-if="platform.startsWith('Mac')">
				I guess you are using <strong>Mac</strong>.
				Download <a
									 target="_blank"
									 href="https://www.google.com/chrome/"
									 >
					latest Google Chrome
				</a> and it should help.
			</v-card-text>
			<v-card-text v-if="platform.startsWith('Android') || platform.match(/linux/i)">
				I guess you are using <strong>Android</strong>.
				Download <a
									 target="_blank"
									 href="https://play.google.com/store/apps/details?id=com.android.chrome"
									 >
					latest Google Chrome
				</a> and it should help.
			</v-card-text>
			<v-card-actions>
				<v-spacer/>
				<v-btn
					color="green darken-1"
					flat
					@click="isDialogOpen = false"
					>
					Close
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
	<v-snackbar
		v-model="isSnackbarShown"
		:timeout="5000"
		color="error"
		bottom
		multi-line
		>
		{{snackbar}}
		<v-btn
			flat
			@click="isSnackbarShown = false"
			>
			Close
		</v-btn>
	</v-snackbar>
</v-row>
</v-col>
<v-col >
	<v-flex id="stages" class="breakdown times">
		<stages
			:replay="false"
			:stages="analyzerState.stages"
			:mode="analyzerState.mode || 'cfop'"
			:time="time"
			:cross="analyzerState.cross"
			:is-xcross="isXcross"
			:oll="analyzerState.oll"
			:is-oll2look="analyzerState.isOll2Look"
			:pll="analyzerState.pll"
			:pll-looks="analyzerState.pllLooks"
			:roux-block="analyzerState.rouxBlock"
			:cll="analyzerState.cll"
			:cube-stage="analyzerState.cubeStage"
			/>
	</v-flex>
</v-col>
</v-row>
</v-container>
</template>
<script>
import '~/lib/scary.js'
import {deleteSolve, saveSolve} from '~/lib/db.js';
import {formatTime, getNotation} from '~/lib/utils.js';
import GiiKER from '~/lib/giiker.js';
import MoveSequence from '~/lib/MoveSequence.js';
import NoSleep  from 'nosleep.js';
import SolveAnalyzer from '~/lib/SolveAnalyzer.js';
import Stages from '~/components/Stages.vue';
import assert from 'assert';
import sample from 'lodash/sample';
import scrambles from '~/lib/scrambles.json';
import scrambo from 'scrambo/lib/scramblers/333';
export default {
		components: {
				Stages,
		},
		data() {
				return {
						analyzerState: {
								mode: null,
								cross: null,
								rouxBlock: null,
								cubeStage: null,
								stages: {},
								oll: null,
								isOll2Look: false,
								pll: null,
								pllLooks: [],
								cll: null,
						},
						platform: '',
						isGiikerConnected: null,
						startTime: null,
						time: 0,
						phase: 'connect',
						isConnecting: false,
						isDescriptionShown: true,
						placeholderMoves: [],
						scramble: null,
						previousSolve: null,
						snackbar: '',
						isSnackbarShown: false,
						isFirstSolve: true,
						isDialogOpen: false,
						isDeleteDialogOpen: false,
						battery: '?',
				};
		},
		computed: {
				scrambleMoves() {
						if (this.scramble === null) {
								return [];
						}
						// let c=document.querySelector('scary-cube');
						// // c.setOrientation(150,75);

						assert(this.placeholderMoves.length >= this.scramble.moves.length);

						const greyedMovesCount = this.placeholderMoves.length - this.scramble.moves.length;

						return this.placeholderMoves.map((move, index) => {
								if (index < greyedMovesCount) {
										return {
												text: getNotation(move),
												grey: true,
										};
								}

								const actualMove = this.scramble.moves[index - greyedMovesCount];

								if (index === greyedMovesCount) {
										if (move.face === actualMove.face) {
												return {
														text: getNotation(move),
														grey: false,
												};
										}
								}

								return {
										text: getNotation(actualMove),
										grey: false,
								};
						});
				},
				isXcross() {
						return (
								this.analyzerState.stages.f2l1 &&
										this.analyzerState.stages.f2l1.time !== null &&
										this.analyzerState.stages.f2l1.sequence.length === 0
						);
				},
				displayTime() {
						return formatTime(this.time);
				},
				moveCount() {
						return this.analyzer.getMoveCount();
				},
				speed() {
						if (this.time === 0) {
								return (0).toFixed(2);
						}

						return (this.moveCount / (this.time / 1000)).toFixed(2);
				},
		},
		created() {
				if (process.browser) {
						this.noSleep = new NoSleep();
				}
				this.isGiikerConnected = GiiKER.isConnected;
				if (GiiKER.isConnected) {
						if (GiiKER.cube.isSolved()) {
								this.phase = 'scramble';
						} else {
								this.phase = 'prescramble';
						}
						GiiKER.on('move', this.onGiikerMove);
						GiiKER.on('reset-complete', this.onGiikerResetComplete);
				}
		},
		mounted() {
				const scramble = sample(scrambles.sheets[0].scrambles);
				this.scramble = MoveSequence.fromScramble(scramble, {mode: 'reduction'});
				this.initialScramble = MoveSequence.fromScramble(scramble, {mode: 'reduction'});
				this.placeholderMoves = this.scramble.moves.map((move) => ({...move}));

				this.isDialogOpen = !navigator.bluetooth && typeof BluetoothDevice === 'undefined';
				this.platform = navigator.platform;
				this.analyzer = null;
		},
		destroyed() {
				if (this.interval) {
						clearInterval(this.interval);
				}
				if (GiiKER.isConnected) {
						GiiKER.off('move', this.onGiikerMove);
				}
				if (this.noSleep) {
						this.noSleep.disable();
				}
		},
		methods: {
				onClickConnect() {
						if (this.isConnecting) {
								return;
						}

						if (this.noSleep) {
								this.noSleep.enable();
						}

						this.isConnecting = true;

						GiiKER.connect().then(() => {
								this.isGiikerConnected = true;
								GiiKER.on('move', this.onGiikerMove);
								GiiKER.on('reset-complete', this.onGiikerResetComplete);
								let gii = GiiKER._giiker;
								this.phase = 'scramble';
								GiiKER._giiker.getBatteryLevel().then((a)=>{this.battery=a;
																													 });

						}, (error) => {
								this.isSnackbarShown = true;
								this.snackbar = error.message;
								this.isConnecting = false;
						});
						// eslint-disable-next-line no-console
						console.time('scrambo.initialize took');
						scrambo.initialize(Math);
						// eslint-disable-next-line no-console
						console.timeEnd('scrambo.initialize took');
				},
				onClickDisconnect(){
						let gii = GiiKER._giiker;
						gii.disconnect();
						this.isGiikerConnected = false;
						this.isConnecting = false;
				},
				onGiikerMove(move) {
						const now = new Date();
						if (this.phase === 'prescramble') {
								if (GiiKER.cube.isSolved()) {
										this.phase = 'scramble';
								}
								return;
						}
						let c = document.querySelector('scary-cube');
						c._setFaces(c._facesFromString(GiiKER.cube.asString()));

						if (GiiKER.cube.asString() !== GiiKER._giiker.stateString){
								console.log(GiiKER.cube.asString());
								console.log(GiiKER._giiker.stateString);
						}
						if (this.phase === 'scramble') {
								this.scramble.unshift({
										face: move.face,
										amount: -move.amount,
								});
								if (this.scramble.length > this.placeholderMoves.length) {
										this.placeholderMoves = this.scramble.moves.map((m) => ({...m}));
								}
								if (this.scramble.length === 0) {
										this.phase = 'inspect';
										this.time = 0;
										let c=document.querySelector('scary-cube');
										c.setOrientation(-210,215);
								}
								return;
						}

						if (this.phase === 'inspect') {
								this.startTime = new Date();
								this.analyzer = new SolveAnalyzer({scramble: this.initialScramble.moves});
								this.analyzerState = this.analyzer.state;
								this.analyzer.on('statechange', (key, value) => {
										this.$set(this.analyzerState, key, value);
										if (key === 'cubeStage') {
												this.scrollToStage();
										}
								});
								this.phase = 'solve';

								this.isFirstSolve = false;
								this.isDescriptionShown = false;
								this.interval = setInterval(this.onTick, 1000 / 30);
								this.scrollToStage();
								// fall through
						}

						if (this.phase === 'solve') {
								this.time = now.getTime() - this.startTime.getTime();
								this.analyzer.pushMoves([{time: this.time, ...move}]);

								if (GiiKER.cube.isSolved()) {
										this.finishSolve({isError: false});
										let c=document.querySelector('scary-cube');
										c.setOrientation(150,75);

								}
						}
				},
				onTick() {
						const now = new Date();
						this.time = now.getTime() - this.startTime.getTime();
				},
				scrollToStage() {
						const element = document.getElementById(this.analyzerState.cubeStage);
						if (element) {
								element.scrollIntoView({block: 'end', inline: 'nearest', behavior: 'smooth'});
						}
				},
				onClickReset() {
						let gii = GiiKER._giiker;
						gii.resetState();
				},
				onGiikerResetComplete(){
						let gii = GiiKER._giiker;
						let c=document.querySelector('scary-cube');
						c._setFaces(c._facesFromString(gii.stateString));
						GiiKER.cube.identity();
						},
		async finishSolve({isError}) {
			clearInterval(this.interval);

			const {solve} = await saveSolve(this.analyzer.toSolveEntry({
				date: this.startTime.getTime(),
				time: this.time,
				isError,
			}));

			this.previousSolve = solve;
			this.phase = 'scramble';
			this.isFirstSolve = false;

			const scramble = scrambo.getRandomScramble().replace(/ +/g, ' ').trim();
			this.scramble = MoveSequence.fromScramble(scramble, {mode: 'reduction'});
			this.initialScramble = MoveSequence.fromScramble(scramble, {mode: 'reduction'});

			this.placeholderMoves = this.scramble.moves.map((move) => ({...move}));
			document.getElementById('stages').scrollTop = 0;
		},
		async onClickDelete() {
			if (this.previousSolve === null) {
				return;
			}

			await deleteSolve(this.previousSolve);
			this.previousSolve = null;
			this.isDeleteDialogOpen = false;
		},
	},
	head() {
		return {
			title: 'Smart Cube Timer',
		};
	},
};
</script>

<style>
.controls {
		justify-content: flex-end;
}
		.scramble {
			max-width: 110vmin;
			font-size: 5vmin;
			font-weight: bold;
			line-height: 1.2em;
			margin: 0 auto;
		}

.breakdown {
		flex: 0 0 auto;

		.timer {
				font-size: 15vmin;
				font-weight: bold;
				line-height: 1em;
				display: flex;
				justify-content: center;
				align-items: center;
		}

		.timer .v-dialog__activator {
				display: flex;
		}

		.solve-info {
				margin: 0 0.2rem;
		}
.times {
		flex: 1 1 0;
		padding-top: 0 !important;
		overflow-y: auto;
}
}
scary-cube {
    width: 100%;
    height: 400px;
}
</style>
