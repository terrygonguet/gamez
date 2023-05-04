<script lang="ts">
	import { type IComponent, type IWorld, addComponent } from "bitecs"
	import { getContext } from "svelte"
	import { noop } from "svelte/internal"
	import type { Readable } from "svelte/store"

	export let component: IComponent
	export let init: (eid: number) => void = noop

	const world = getContext<Readable<IWorld>>("world")
	const eid = getContext<number>("entity")

	addComponent(world, component, eid)
	init(eid)
</script>

<slot />
