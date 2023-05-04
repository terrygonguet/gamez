<script lang="ts">
	import { type IWorld, addEntity } from "bitecs"
	import { getContext, setContext } from "svelte"
	import type { Readable } from "svelte/store"

	const world = getContext<Readable<IWorld>>("world")

	export const eid = addEntity($world)

	setContext("entity", eid)
</script>

<slot />
