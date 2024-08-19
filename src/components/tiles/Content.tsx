import { ReactNode } from "react";
import { TileBuilder } from "./_tile";
import "./styles/Content.scss";

export default class Content extends TileBuilder {
	constructor() {
		super(
			{
				box: {
					location: {
						x: 2,
						y: 9,
					},
					size: {
						width: 7,
						height: 2,
					},
				},
			},
			{
				width: {
					max: 1360,
				},
				relativeTo: "window",
				box: {
					location: {
						x: 3,
						y: 0,
					},
					size: {
						width: 7,
						height: 2,
					},
				},
			},
			{
				width: {
					max: 930,
				},
				relativeTo: "window",
				box: {
					location: {
						x: 5,
						y: 0,
					},
					size: {
						width: 7,
						height: 2,
					},
				},
			},
			{
				width: {
					max: 550,
				},
				relativeTo: "window",
				box: {
					location: {
						x: 0,
						y: 8,
					},
					size: {
						width: 10,
						height: 3,
					},
				},
			}
		);
	}

	render(): ReactNode {
		return (
			<main id="main">
				<p>
					I'm currently searching a web agency where I could have my
					internship for my second year of bachelor.
				</p>
				<p>
					You can view all my work on my website:{" "}
					<a href="https://johan-janin.com" target="_blank">
						johan-janin.com
					</a>
					.
				</p>
			</main>
		);
	}
}
