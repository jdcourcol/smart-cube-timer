<template>
	<v-app>
		<v-toolbar
			dense
			app
			dark
			color="purple"
		>
			<v-toolbar-title>
				<nuxt-link
					to="/"
					class="white--text"
				>
					Smart Cube Timer
				</nuxt-link>
			</v-toolbar-title>
			<v-spacer/>
			<v-btn
				icon
				@click="onClickFullscreen"
			>
				<v-icon v-if="isFullscreen">fullscreen_exit</v-icon>
				<v-icon v-else>fullscreen</v-icon>
			</v-btn>
		</v-toolbar>
		<v-content>
			<nuxt/>
		</v-content>
		<v-bottom-nav
			:height="50"
			:value="'solves'"
			app
			active="recent"
			absolute
			color="purple darken-2"
		>
			<v-btn
				color="white"
				flat
				value="timer"
				class="pa-0"
				to="/"
				nuxt
			>
				<v-icon>timer</v-icon>
			</v-btn>
			<v-btn
				color="white"
				flat
				value="solves"
				class="pa-0"
				to="/solves"
				nuxt
			>
				<v-icon>history</v-icon>
			</v-btn>
			<v-btn
				color="white"
				flat
				value="stats"
				class="pa-0"
				to="/stats"
				nuxt
			>
				<v-icon>bar_chart</v-icon>
			</v-btn>
		</v-bottom-nav>
	</v-app>
</template>
<script>
export default {
	data() {
		return {
			drawer: null,
			isFullscreen: false,
		};
	},
	methods: {
		onClickFullscreen() {
			if (this.isFullscreen) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.mozExitFullscreen) {
					document.mozExitFullscreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
				this.isFullscreen = false;
			} else {
				if (document.documentElement.requestFullscreen) {
					document.documentElement.requestFullscreen();
				} else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullscreen) {
					document.documentElement.webkitRequestFullscreen();
				} else if (document.documentElement.msRequestFullscreen) {
					document.documentElement.msRequestFullscreen();
				}
				this.isFullscreen = true;
			}
		},
	},
};
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons";
.v-chip.v-chip--small .v-avatar {
	height: 24px !important;
	margin-left: -13px;
	margin-right: 4px;
	min-width: 24px;
	width: 24px !important;
}
a {
	text-decoration: none;
}
.v-bottom-nav {
	position: fixed;
}
.container {
max-width: None;
}
</style>
