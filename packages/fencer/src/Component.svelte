<script>
	import { addComponent } from "bitecs"
	import { noop } from "svelte/internal"
	import { getEntity, getWorld } from "./utils"

	/** @typedef {import("bitecs").IComponent} IComponent */

	/** @type {IComponent} */
	export let component
	/** @type {(eid: number) => void} */
	export let init = noop

	const world = getWorld()
	const eid = getEntity()

	addComponent(world, component, eid)
	init(eid)
</script>

<slot />
