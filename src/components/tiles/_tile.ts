import React from "react";
import { gridSize, gridTiles } from "../Grid";

interface TileBox {
	location: {
		x: number;
		y: number;
	};
	size: {
		width: number;
		height: number;
	};
}
interface BreakPoint {
	/**
	 * The width of the grid container.
	 */
	width?: {
		min?: number;
		max?: number;
	};
	/**
	 * The height of the grid container.
	 */
	height?: {
		min?: number;
		max?: number;
	};
	relativeTo?: "container" | "window" | (string & {});
	/**
	 * If set, when the breakpoint is applied, the attribute 'data-breakpoint' of
	 * this element's container will have its value to the given string.
	 */
	name?: string;
	box: TileBox;
}

export class TileBuilder<
	ElementType extends HTMLElement = HTMLElement
> extends React.Component {
	protected element = React.createRef<ElementType>();
	protected gridInfo:
		| (gridSize & {
				tiles: gridTiles;
		  })
		| null = null;
	readonly breakpoints: BreakPoint[];
	constructor(...breakpoints: BreakPoint[]) {
		super({});
		this.breakpoints = breakpoints;
	}

	bindGrid(size: gridSize, tiles: gridTiles) {
		this.gridInfo = {
			...size,
			tiles,
		};
	}
}

export class Tile extends TileBuilder {
	//@ts-expect-error This class should only be extended. It has been written only for typing purpose.
	constructor() {}
}

export function getTileBreakpoint(
	tile: Tile,
	gridDimention: { width: number; height: number }
) {
	const validBreakpoints = tile.breakpoints.filter((breakpoint) => {
		const relativeBox =
			!breakpoint.relativeTo || breakpoint.relativeTo === "container"
				? gridDimention
				: breakpoint.relativeTo === "window"
				? {
						width: window.innerWidth,
						height: window.innerHeight,
				  }
				: document
						.querySelector(breakpoint.relativeTo)
						?.getBoundingClientRect();
		if (!relativeBox)
			throw new Error(
				`${breakpoint.relativeTo} is not a valid relative selector.`
			);
		const { width, height } = relativeBox;

		return (
			width >= (breakpoint.width?.min || -Infinity) &&
			width <= (breakpoint.width?.max || Infinity) &&
			height >= (breakpoint.height?.min || -Infinity) &&
			height <= (breakpoint.height?.max || Infinity)
		);
	});
	const strongestBreakpoint = validBreakpoints.reduce((pre, cur) => {
		const preStrenght =
			(pre.height ? Object.keys(pre.height).length : 0) +
			(pre.width ? Object.keys(pre.width).length : 0);
		const curStrenght =
			(cur.height ? Object.keys(cur.height).length : 0) +
			(cur.width ? Object.keys(cur.width).length : 0);
		return preStrenght > curStrenght ? pre : cur;
	});
	return strongestBreakpoint;
}
