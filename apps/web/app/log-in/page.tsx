"use client";

import { Field, Form } from "houseform";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage, Button, Input } from "./../../../../packages/ui";
import styled from "styled-components";
// import { z } from "zod";

export default function LogInPage() {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");

  return (
    <Form
      onSubmit={(values) => {
        console.log(values);
        values.email === "smutnarzaba@png.pl" && values.password === "frytki123"
          ? router.push("/")
          : setErrMsg("Invalid credentials. Please try again.");
      }}
    >
      {({ submit }) => (
        <FormWrapper>
          {errMsg && (
            <ErrorWrapper>
              <ErrorMessage message={errMsg} onClose={() => setErrMsg("")} />
            </ErrorWrapper>
          )}
          {/* <FieldsWrapper>
            <Field name="email" onSubmitValidate={z.string().min(3)}>
              {({ value, setValue, errors }) => (
                <div>
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={"onsubmit"}
                  />
                  {errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </Field>
            <Field name="password" onSubmitValidate={z.string().min(3)}>
              {({ value, setValue, errors }) => (
                <div>
                  <input
                    type="password"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={"onsubmitpassword"}
                  />
                  {errors.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </Field>
          </FieldsWrapper> */}
          <FieldsWrapper>
            <Field name="email">
              {({ value, setValue }) => (
                <Input
                  label="Email"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onFocus={() => setErrMsg("")}
                />
              )}
            </Field>
            <Field name="password">
              {({ value, setValue }) => (
                <Input
                  type="password"
                  label="Password"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onFocus={() => setErrMsg("")}
                />
              )}
            </Field>
          </FieldsWrapper>
          <Button onClick={submit}>Log In</Button>
        </FormWrapper>
      )}
    </Form>
  );
}

const FormWrapper = styled.div`
  position: 0 auto;
  width: 50vw;
  height: 40vh;
  position: relative;
  border: 1px solid red;
  padding: 50px;
  padding-top: 300px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
`;

const FieldsWrapper = styled.div`
  border: 1px solid red;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ErrorWrapper = styled.div`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 5;
`;
