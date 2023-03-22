"use client";

import { Button } from "ui";

export default function Buttons() {
  return (
    <>
      <Button onClick={() => alert("Hello")}>Hello</Button>
      <Button disabled onClick={() => alert("Sadge")}>
        Don&apos;t click me
      </Button>
      <Button secondary onClick={() => alert("Secondary")}>
        Secondary
      </Button>
    </>
  );
}