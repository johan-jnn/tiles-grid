import { useEffect, useRef, useState } from "react";
import { Tile } from "./tiles/_tile";
import "../scss/grid.scss";
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap-trial/InertiaPlugin";
import { getTileBreakpoint } from "./tiles/_tile";
gsap.registerPlugin(Draggable, InertiaPlugin);

export interface gridSize {
	width: number | null;
	height: number | null;
	calculated: {
		width: number;
		height: number;
	};
}
export interface gridTiles {
	tiles: Tile[];
	amount: {
		x: number;
		y: number;
	};
	size: number;
}

export default function Grid(props: {
	tiles: (typeof Tile)[];
	/**
	 * Force a vertical or horizontal tiles behavior
	 *
	 * @default
	 * -> width: width of the container
	 * -> height: height of the container
	 *
	 * -> tiles count: in function of the given tiles and the width/height of the container
	 */
	behavior:
		| {
				width?: number;
				horizontal_tiles_count?: number;
		  }
		| {
				height?: number;
				vertical_tiles_count?: number;
		  }
		| {
				auto_size: "width" | "height";
		  };
}) {
	const gridRef = useRef<HTMLDivElement>(null);

	const [gridSize, setGridSize] = useState<gridSize>({
		width: null,
		height: null,
		calculated: {
			width: 0,
			height: 0,
		},
	});
	const [tilesInfo, setTilesInfo] = useState<gridTiles>({
		tiles: [],
		amount: {
			x: 0,
			y: 0,
		},
		size: 0,
	});

	useEffect(() => {
		const behaviorDeclared =
			props.behavior &&
			Object.values(props.behavior).find((v) => v !== undefined);
		if (!props.tiles.length && !behaviorDeclared)
			throw new Error(
				"The grid cannot be created. Please give 1 or more tiles or include force behaviors."
			);
		const force_behavior = props.behavior || {};
		const auto_size =
			"auto_size" in force_behavior && force_behavior.auto_size;

		const tiles = props.tiles.map((constr) => new constr());

		function handleResize() {
			if (!gridRef.current) return;
			// Get the size of the container
			const { clientWidth, clientHeight } = gridRef.current;
			const gridWidthForced =
				"width" in force_behavior && (force_behavior.width || 0) > 0;
			const gridHeightForced =
				"height" in force_behavior && (force_behavior.height || 0) > 0;

			const gridWidth = gridWidthForced
				? force_behavior.width!
				: clientWidth;
			const gridHeight = gridHeightForced
				? force_behavior.height!
				: clientHeight;

			const horizontalTilesCountForced =
				"horizontal_tiles_count" in force_behavior &&
				(force_behavior.horizontal_tiles_count || 0) > 0;
			const verticalTilesCountForced =
				"vertical_tiles_count" in force_behavior &&
				(force_behavior.vertical_tiles_count || 0) > 0;

			const horizontalTilesCount = horizontalTilesCountForced
				? force_behavior.horizontal_tiles_count!
				: Math.max(
						...tiles.map((t) => {
							const bp = getTileBreakpoint(t, {
								width: gridWidth,
								height: gridHeight,
							});
							return bp.box.location.x + bp.box.size.width;
						})
				  );
			const verticalTilesCount = verticalTilesCountForced
				? force_behavior.vertical_tiles_count!
				: Math.max(
						...tiles.map((t) => {
							const bp = getTileBreakpoint(t, {
								width: gridWidth,
								height: gridHeight,
							});
							return bp.box.location.y + bp.box.size.height;
						})
				  );

			const tilesWidth = gridWidth / horizontalTilesCount;
			const tilesHeight = gridHeight / verticalTilesCount;
			const defaultTilesSize = tilesWidth || tilesHeight;

			const tilesSize =
				verticalTilesCountForced &&
				Number.isFinite(tilesHeight) &&
				auto_size !== "height"
					? tilesHeight
					: horizontalTilesCountForced &&
					  Number.isFinite(tilesWidth) &&
					  auto_size !== "width"
					? tilesWidth
					: defaultTilesSize;

			setTilesInfo({
				tiles,
				amount: {
					x: horizontalTilesCount,
					y: verticalTilesCount,
				},
				size: tilesSize,
			});

			// Set the forced size into gridSize
			setGridSize({
				width:
					gridWidthForced && gridWidth
						? gridWidth
						: auto_size === "width"
						? tilesSize * horizontalTilesCount || null
						: null,
				height:
					gridHeightForced && gridHeight
						? gridHeight
						: auto_size === "height"
						? tilesSize * verticalTilesCount || null
						: null,
				calculated: {
					width: gridWidth,
					height: gridHeight,
				},
			});
		}
		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [gridRef, props.tiles, props.behavior]);

	return (
		<div
			id="grid"
			ref={gridRef}
			style={
				{
					width:
						typeof gridSize.width !== "number"
							? null
							: gridSize.width + "px",
					height:
						typeof gridSize.height !== "number"
							? null
							: gridSize.height + "px",
					"--tiles-size": tilesInfo.size + "px",
				} as React.CSSProperties
			}
		>
			{tilesInfo.tiles.map((Tile, index) => {
				Tile.bindGrid(gridSize, tilesInfo);

				return (
					<CreateTile
						tile={Tile}
						tileUnit={[tilesInfo.size, tilesInfo.size]}
						gridSize={gridSize.calculated}
						key={index}
					/>
				);
			})}
		</div>
	);
}

function CreateTile(props: {
	tile: Tile;
	tileUnit: [number, number];
	gridSize: {
		width: number;
		height: number;
	};
}) {
	const { tile, tileUnit, gridSize } = props;
	const tileBp = getTileBreakpoint(tile, gridSize);
	const wrapper = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!wrapper.current) return;
		gsap.to(wrapper.current, {
			x: tileBp.box.location.x * tileUnit[0],
			y: tileBp.box.location.y * tileUnit[1],
			duration: 0,
		});

		Draggable.create(wrapper.current, {
			type: "x,y",
			inertia: true,
			maxDuration: 0.25,
			allowEventDefault: true,
			snap: {
				x: (v) => Math.floor(v / tileUnit[0]) * tileUnit[0],
				y: (v) => Math.floor(v / tileUnit[1]) * tileUnit[1],
			},
			onDragEnd() {
				wrapper.current?.classList.remove("dragging");
			},
			onDragStart() {
				wrapper.current?.classList.add("dragging");
			},
			bounds: "#grid",
		});
	}, [wrapper, tileUnit, tileBp, tile]);

	return (
		<div
			className="grid_content_wrapper"
			id={tile.constructor.name}
			ref={wrapper}
			data-breakpoint={tileBp.name || null}
			style={{
				width: tileUnit[0] * tileBp.box.size.width + "px",
				height: tileUnit[1] * tileBp.box.size.height + "px",
				position: "absolute",
			}}
		>
			{tile.render()}
		</div>
	);
}
