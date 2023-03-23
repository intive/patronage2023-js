"use client";

// import styled, { css } from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "./../../../../packages/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  

  const handleLogIn = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (email !== "smutnarzaba@png.pl" || password !== "frytki123") {
      setErrMsg("Incorrect credentials. Try again.");
      return;
    }
    alert("Logged in! Have fun!");
    router.push("/");
  };

  const closeError = () => {
    setErrMsg("");
  };

  return (
    <div
      style={{
        margin: "0 auto",
        width: "40vw",
        position: "relative",
        border: "1px solid red",
        padding: "50px"
      }}
    >
      <h3>Log In Form</h3>
      <form
        onSubmit={handleLogIn}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {errMsg && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
          >
            <ErrorMessage message="Invalid credentials. Please try again." onClose={closeError}/>
          </div>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={closeError}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={closeError}
        ></input>
        <button style={{ marginTop: "2rem" }} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}
