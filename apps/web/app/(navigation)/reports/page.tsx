"use client";
import { setBudget } from "actions/app";
import AppContext from "context/app";
import { useContext, useRef } from "react";

export default function ReportsPage() {
  const { budget } = useContext(AppContext);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    console.log(budget);
    setBudget(valueRef.current?.value);
  };

  return (
    <>
      <h1>{budget || 0}</h1>
      <form>
        <input type="text" ref={valueRef} />
        <button type="button" onClick={handleButtonClick}>
          Set Budget
        </button>
      </form>
    </>
  );
}
