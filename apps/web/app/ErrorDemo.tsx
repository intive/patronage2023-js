"use client";

import { useState } from "react";
import { Button, ErrorMessage } from "ui";

export default function ErrorDemo() {
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
    <>
      <Button onClick={handleClick}>Show error</Button>
      {message && <ErrorMessage message={message} onClose={handleClose} />}
    </>
  );
}
