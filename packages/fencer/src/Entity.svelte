<script>
	import { addEntity } from "bitecs"
	import { setContext } from "svelte"
	import { getWorld } from "./utils.js"

	const world = getWorld()

	export const eid = addEntity($world)

	setContext("entity", eid)
</script>

<slot />
