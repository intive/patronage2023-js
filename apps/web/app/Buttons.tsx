"use client";

import { Button, Icon } from "ui";
import "material-symbols";

export default function Buttons() {
  return (
    <>
      <Button onClick={() => alert("Hello")}>Hello</Button>
      <Button disabled onClick={() => alert("Sadge")}>
        Don&apos;t click me
      </Button>
      <Button variant="secondary" onClick={() => alert("Secondary")}>
        Secondary
      </Button>

      <Button height={48}>
        Create
        <Icon icon="arrow_drop_down" color="white" />
      </Button>
    </>
  );
}
