"use client";
import type { Metadata } from "next";
import Buttons from "./Buttons";
import { Button, ErrorMessage } from "ui";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to my page",
};

export default function Web() {
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setMessage("");
  };

  const handleClick = () => {
    setMessage(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque perspiciatis totam velit in veritatis pariatur accusamus earum quod labore odit eos, excepturi facere obcaecati quae libero commodi sit fugiat undNam earum nemo unde magni consequuntur nihil nesciunt atque suscipit maxime distinctio, reprehenderit maiores vitae est doloribus fugit nobis itaque iure exercitationem, impedit excepturi ducimus culpa, omnis sunt. Nemo, sequi. "
    );
  };
  return (
    <div>
      <h1>InBudget app</h1>
      <Buttons />
      <Button onClick={handleClick}>Show error</Button>
      {message && <ErrorMessage message={message} onClose={handleClose} />}
    </div>
  );
}
