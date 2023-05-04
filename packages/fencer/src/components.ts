import { Types, defineComponent } from "bitecs"

const baseComponents = {
	Position: defineComponent({ value: [Types.f32, 2] }),
	Graphics: defineComponent({ ref: Types.i32 }),
	Physics: defineComponent({ ref: Types.i32 }),
}
