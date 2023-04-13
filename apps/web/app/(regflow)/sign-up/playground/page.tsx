"use client";
import { PasswordSubComponent } from "../PasswordSubComponent";

//TODO delete this page before merge
export default function PasswordPlayground() {
  return (
    <PasswordSubComponent
      onNext={(text) => console.log(text)}
      onBack={() => console.log("Back")}
    />
  );
}
