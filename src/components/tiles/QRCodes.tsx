import { ReactNode } from "react";
import { TileBuilder } from "./_tile";
import "./styles/QRCodes.scss";

export default class QRCodes extends TileBuilder {
	constructor() {
		super(
			{
				box: {
					location: {
						x: 18,
						y: 0,
					},
					size: {
						width: 4,
						height: 12,
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
						x: 13,
						y: 0,
					},
					size: {
						width: 9,
						height: 14,
					},
				},
			},
			{
				width: {
					max: 930,
				},
				relativeTo: "window",
				name: "horizontal",
				box: {
					location: {
						x: 0,
						y: 11,
					},
					size: {
						width: 12,
						height: 5,
					},
				},
			},
			{
				width: {
					max: 690,
				},
				relativeTo: "window",
				name: "horizontal",
				box: {
					location: {
						x: 0,
						y: 11,
					},
					size: {
						width: 12,
						height: 8,
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
						y: 12,
					},
					size: {
						width: 10,
						height: 18,
					},
				},
			}
		);
	}

	render(): ReactNode {
		return (
			<ul id="qrcodes">
				<li>
					<h2>Other projects</h2>
					<p>
						You can view a bunch of other dev projects that I made
						on my portfolio.
					</p>

					<div>
						<strong>Just scan the QR Code bellow :</strong>
						<img
							src="/portfolio.png"
							alt="QR Code to my portfolio's website"
						/>
					</div>
				</li>
				<li>
					<h2>Contact</h2>
					<p>
						You can find my CV, a contact form and other ways to
						contact me directly on my website.
					</p>
					<p>I'm available to work on September !</p>

					<div>
						<strong>Just scan the QR Code bellow :</strong>
						<img
							src="/contact.png"
							alt="QR Code to my website's contact page"
						/>
					</div>
				</li>
			</ul>
		);
	}
}
