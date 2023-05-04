import { defineQuery, enterQuery, exitQuery } from "bitecs"
import { Graphics, Physics } from "../components/index.js"

/** @typedef {import("../utils.js").World} World */

const query = defineQuery([Graphics, Physics])
const enter = enterQuery(query)
const exit = exitQuery(query)

/**
 * @param {World} world
 */
export function GraphicsSystem(world) {
	const { graphics, physics } = world
	for (const eid of query(world)) {
	}
}
