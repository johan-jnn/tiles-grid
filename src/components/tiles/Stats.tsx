import { ReactNode } from "react";
import { getTileBreakpoint, TileBuilder } from "./_tile";
import "./styles/Stats.scss";

export default class Stats extends TileBuilder {
	constructor() {
		super({
			box: {
				location: {
					x: Math.floor(Math.random() * 10),
					y: Math.floor(Math.random() * 14),
				},
				size: {
					width: 1,
					height: 1,
				},
			},
		});
	}

	render(): ReactNode {
		return (
			<div id="stats">
				<div className="animatedBox">💖</div>
				<main>
					<h2>Project's statistics</h2>
					<section>
						<h3>Developpement time :</h3>
						<p>~ 2 days</p>
					</section>
					<section>
						<h3>Components :</h3>
						<ul>
							<li>Tiles: 5</li>
							<li>Total: 7</li>
						</ul>
					</section>
					<section>
						<h3>Used tech :</h3>
						<ul>
							<li>React + Vite</li>
							<li>GSAP</li>
							<li>SASS</li>
						</ul>
					</section>
					{this.gridInfo ? (
						<>
							<section>
								<h3>Grid informations :</h3>
								<ul>
									<li>
										Grid size:{" "}
										{this.gridInfo.calculated.width}px/
										{this.gridInfo.calculated.height}px
									</li>
									<li>
										Grid dimention:{" "}
										{this.gridInfo.tiles.amount.x}x
										{this.gridInfo.tiles.amount.y}
									</li>
									<li>
										Tile size:{" "}
										{this.gridInfo.tiles.size.toFixed(2)}px
									</li>
								</ul>
							</section>
							<section>
								<h3>
									Tiles on grid (
									{this.gridInfo.tiles.tiles.length}) :
								</h3>
								<table>
									<thead>
										<tr>
											<th>Tile's name</th>
											<th>Tile's default location</th>
											<th>Tile's size</th>
											<th>Breakpoint name</th>
										</tr>
									</thead>
									<tbody>
										{this.gridInfo.tiles.tiles.map(
											(Tile, index) => {
												const bp = this.gridInfo
													? getTileBreakpoint(Tile, {
															width: this.gridInfo
																.calculated
																.width,
															height: this
																.gridInfo
																.calculated
																.height,
													  })
													: Tile.breakpoints[0];

												return (
													<tr key={index}>
														<td>
															{
																Tile.constructor
																	.name
															}
														</td>
														<td>
															[{bp.box.location.x}
															,{bp.box.location.y}
															]
														</td>
														<td>
															{bp.box.size.width}x
															{bp.box.size.height}
														</td>
														<td>
															{bp.name ||
																"<none>"}
														</td>
													</tr>
												);
											}
										)}
									</tbody>
								</table>
							</section>
						</>
					) : null}
				</main>
			</div>
		);
	}
}
