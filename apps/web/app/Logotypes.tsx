"use client";

import { Logo } from "ui";

export default function Logotypes () {
	return (
	<>
		<Logo/>
		<Logo white/>
		<Logo logoWidth={250}/>
		<Logo logoWidth={250} white/>
	</>
	);
}