"use client";

import { Button, Input } from "ui";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 24px;
  width: 312px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 767px) {
    width: 416px;
  }
`;

export default function SignInPage() {
  return (
    <FormWrapper>
      <p>Welcome from sign-up page</p>
      <Input name="email" label="Email" />
      <Button onClick={() => {}} type="submit" fullWidth>
        Log In
      </Button>
    </FormWrapper>
  );
}
