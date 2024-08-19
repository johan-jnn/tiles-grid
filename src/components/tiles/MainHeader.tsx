import { ReactNode } from "react";
import { TileBuilder } from "./_tile";
import "./styles/Hero.scss";

export default class HeroHeader extends TileBuilder {
	constructor() {
		super(
			{
				box: {
					location: {
						x: 4,
						y: 1,
					},
					size: {
						width: 12,
						height: 7,
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
						x: 0,
						y: 3,
					},
					size: {
						width: 12,
						height: 7,
					},
				},
			},
			{
				width: {
					max: 550
				},
				relativeTo: "window",
				box: {
					location: {
						x: 1,
						y: 3
					},
					size: {
						width: 8,
						height: 4
					}
				}
			}
		);
	}
	render(): ReactNode {
		return (
			<header id="hero">
				<h1>Hi! my name is Johan</h1>
				<p>I'm a fullstack web developper based in Lyon.</p>
			</header>
		);
	}
}
