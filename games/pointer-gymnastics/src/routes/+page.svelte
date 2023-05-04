<script lang="ts">
	import { dev } from "$app/environment"
	import { Game, Entity, Component } from "@terrygonguet/fencer"

	if (import.meta.hot) {
		import.meta.hot.accept(() => import.meta.hot?.invalidate())
	}
</script>

<svelte:head>
	<title>Fencer demo</title>
</svelte:head>

<main>
	<Game {dev}>
		<Entity>
			<!-- <Component component={Position} {init} /> -->
		</Entity>
	</Game>
</main>

<style>
	main {
		min-height: 100dvh;
		display: grid;
	}
</style>
