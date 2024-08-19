import { ReactNode } from "react";
import { TileBuilder } from "./_tile";
import "./styles/Logo.scss";
import gsap from "gsap";

export default class LogoTile extends TileBuilder<HTMLButtonElement> {
	constructor() {
		super(
			{
				box: {
					location: {
						x: 0,
						y: 0,
					},
					size: {
						width: 2,
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
						x: 8,
						y: 0,
					},
					size: {
						width: 2,
						height: 2,
					},
				},
			}
		);
	}

	render(): ReactNode {
		return (
			<button
				id="logo"
				ref={this.element}
				onClick={() => {
					if (this.element.current) {
						gsap.fromTo(
							this.element.current.children[0],
							{
								rotate: 0,
							},
							{
								rotate: "360deg",
								duration: 3,
								ease: "elastic.out(1,0.5)",
							}
						);
					}
				}}
			>
				<img src="/johan_janin.svg" alt="Logo Johan Janin" />
			</button>
		);
	}
}
