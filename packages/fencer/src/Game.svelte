<script lang="ts">
	import { writable, readonly } from "svelte/store"
	import { Application, type IApplicationOptions } from "pixi.js"
	import { onMount, setContext } from "svelte"
	import { World as RapierWorld } from "@dimforge/rapier2d"
	import { createWorld, type IWorld as ECSWorld } from "bitecs"

	export let graphicsOptions: Partial<IApplicationOptions> = {}
	export let physicsOptions: ConstructorParameters<typeof RapierWorld> = [{ x: 0, y: 0 }]
	export let dev = false

	const graphics = writable<Application>()
	const physics = writable<RapierWorld>()
	const world = writable<ECSWorld>()
	$: globalsReady = Boolean($graphics && $physics && $world)

	setContext("world", readonly(world))
	setContext("graphics", readonly(graphics))
	setContext("physics", readonly(physics))
	// setContext("components", createComponentMap(componentSchemas))
	setContext("dev", dev)

	let container: HTMLElement
	let canvas: HTMLCanvasElement

	onMount(() => {
		world.set(createWorld())
		graphics.set(
			new Application(
				Object.assign(
					{
						resolution: window.devicePixelRatio,
						autoDensity: true,
						hello: true,
					},
					graphicsOptions,
					{
						view: canvas,
						resizeTo: container,
					},
				),
			),
		)
		physics.set(new RapierWorld(...physicsOptions))
	})

	if (dev) {
		world.subscribe($w => $w && console.log("BitECS World", $w))
		graphics.subscribe($g => $g && console.log("Pixi.js Application", $g))
		physics.subscribe($p => $p && console.log("Rapier2d World", $p))
	}
</script>

<section {...$$props} bind:this={container}>
	<canvas bind:this={canvas}>
		{#if globalsReady}
			<slot />
		{/if}
	</canvas>
	<div>
		<slot name="ui" />
	</div>
</section>

<style>
	section {
		position: relative;
	}

	canvas {
		position: absolute;
		inset: 0;
	}

	div {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
</style>
