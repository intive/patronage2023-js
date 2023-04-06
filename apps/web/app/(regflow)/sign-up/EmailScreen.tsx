"use client";

import { Field, Form } from "houseform";
import { Button, Input } from "ui";
import styled from "styled-components";
import { z } from "zod";
import { useTranslate } from "lib/hooks";
import { error } from "console";

export function EmailScreen() {
  const { t, dict } = useTranslate("SignInPage");
  const { form } = dict;

  return (
    <Form onSubmit={() => {}}>
      {({ submit, errors }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <Field
            name="email"
            initialValue={""}
            onSubmitValidate={z
              .string()
              .email(t(form.emailInput.wrongFormatError))}
          >
            {({ value, setValue, errors }) => (
              <Input
                name="email"
                type="email"
                label="Email"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                onInputCleared={() => setValue("")}
                hasError={errors.length > 0}
                supportingLabel={errors.length ? errors : undefined}
              />
            )}
          </Field>
          <Button onClick={submit} type="submit" fullWidth>
            Continue
          </Button>
        </form>
      )}
    </Form>
  );
}
