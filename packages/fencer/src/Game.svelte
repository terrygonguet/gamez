<script>
	import { writable, readonly } from "svelte/store"
	import { Application } from "pixi.js"
	import { onMount, setContext } from "svelte"
	import { World as RapierWorld } from "@dimforge/rapier2d"
	import { createWorld } from "./utils.js"

	/** @typedef {import("pixi.js").IApplicationOptions} IApplicationOptions */
	/** @typedef {import("svelte/store").Writable} Writable */
	/** @typedef {import("./utils").World} World */

	/** @type {Partial<IApplicationOptions>} */
	export let graphicsOptions = {}
	/** @type {ConstructorParameters<typeof RapierWorld>} */
	export let physicsOptions = [{ x: 0, y: 0 }]
	export let dev = false

	/** @type {Writable<Application>} */
	const graphics = writable()
	/** @type {Writable<RapierWorld>} */
	const physics = writable()
	/** @type {Writable<World>} */
	const world = writable()
	$: globalsReady = Boolean($graphics && $physics && $world)

	setContext("world", readonly(world))
	setContext("graphics", readonly(graphics))
	setContext("physics", readonly(physics))
	setContext("dev", dev)

	/** @type {HTMLElement} */
	let container
	/** @type {HTMLCanvasElement} */
	let canvas

	onMount(() => {
		$graphics = new Application(
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
		)
		$physics = new RapierWorld(...physicsOptions)
		$world = createWorld({ graphics: $graphics, physics: $physics })
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
