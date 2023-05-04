import { createWorld as createECSWorld } from "bitecs"
import { getContext } from "svelte"

/** @typedef {import("bitecs").IWorld} IWorld */
/** @typedef {import("pixi.js").Application} Application */
/** @typedef {import("@dimforge/rapier2d").World} ECSWorld */

/**
 * @typedef {Object} CreateWorldOptions
 * @property {Application} graphics
 * @property {ECSWorld} physics
 */

/**
 * @typedef {IWorld & CreateWorldOptions} World
 */

/**
 * @param {CreateWorldOptions} options
 * @returns {World}
 */
export function createWorld({ graphics, physics }) {
	return Object.assign(createECSWorld(), { graphics, physics })
}

/**
 * @returns {import("svelte/store").Readable<World>}
 */
export function getWorld() {
	return getContext("world")
}

/**
 * @returns {number}
 */
export function getEntity() {
	return getContext("entity")
}
