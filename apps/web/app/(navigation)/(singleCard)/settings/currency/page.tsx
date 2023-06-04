"use client";
import styled from "styled-components";
import { useTranslate } from "lib/hooks";
import { useAtomValue, useSetAtom } from "jotai";

import { SettingsTitle } from "./SettingsTitle";
import { Button, CurrencySelect, Separator } from "ui";
import { currencyAtom } from "store/store";
import { device } from "lib/media-queries";

const H1Styled = styled.h1`
  font-family: "Signika";
  font-size: 24px;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 16px;
  ${device.tablet} {
    margin-bottom: 36px;
  }
`;

const InputWrapper = styled.div`
  padding-top: 36px;
  padding-bottom: 36px;
  width: 100%;
  ${device.tablet} {
    width: 514px;
  }
`;

export default function SettingsPage() {
  const { t, dict } = useTranslate("SettingsPage");
  const value = useAtomValue(currencyAtom);
  const setValue = useSetAtom(currencyAtom);

  const translation = {
    label: t(dict.currency.title),
    button: t(dict.currency.button),
  };

  const changeCurrency = (currency: string) => {
    setValue(currency);
    localStorage.setItem("currency", currency);
  };

  return (
    <>
      <H1Styled>
        <SettingsTitle />
      </H1Styled>
      <Separator />
      <InputWrapper>
        <CurrencySelect
          onValueChange={changeCurrency}
          value={value}
          label={translation.label}
          id="currencSelector"
        />
      </InputWrapper>
      <Button variant="primary">{translation.button}</Button>
    </>
  );
}
