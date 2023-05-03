import type { SvelteComponentTyped } from "svelte"

export const test: "value"

export class Test extends SvelteComponentTyped<{ other?: string }> {}
