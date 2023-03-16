import type { Metadata } from "next";
import Buttons from "./Buttons";
import { Card } from "ui";

export const metadata: Metadata = {
	title: "Home",
	description: "Welcome to my page",
};

export default function Web() {
	return (
		<div>
			<h1>InBudget app</h1>
			<Buttons />
		</div>
	);
}
