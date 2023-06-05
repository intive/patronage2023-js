"use client";
import styled from "styled-components";
import { useLocalStorage, useTranslate } from "lib/hooks";
import { useAtomValue, useSetAtom } from "jotai";

import { SettingsTitle } from "./SettingsTitle";
import { Button, Select, Separator } from "ui";
import { currencyAtom } from "store/store";
import { device } from "lib/media-queries";
import { currency } from "lib/currency";
import { CurrencyTagStyled } from "app/(navigation)/budgets/[id]/BudgetContent/CreateNewBudget.styled";
import { SelectLabelHiddenInTrigger } from "ui/Select/Select.styles";

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

const currencyItems = () => {
  const { t, dict } = useTranslate("AddNewBudgetModal");

  return currency.map((currency) => ({
    label: (
      <>
        <CurrencyTagStyled>{currency}</CurrencyTagStyled>
        <SelectLabelHiddenInTrigger>
          {t(dict.currencyNames[currency])}
        </SelectLabelHiddenInTrigger>
      </>
    ),
    value: currency,
  }));
};

export default function SettingsPage() {
  const { t, dict } = useTranslate("SettingsPage");
  const value = useAtomValue(currencyAtom);
  const setValue = useSetAtom(currencyAtom);

  const [, setCurrency] = useLocalStorage("currency", "USD");

  const translation = {
    label: t(dict.currency.title),
    button: t(dict.currency.button),
  };

  const changeCurrency = (selectedCurrency: string) => {
    setValue(selectedCurrency);
    setCurrency(selectedCurrency);
  };

  return (
    <>
      <H1Styled>
        <SettingsTitle />
      </H1Styled>
      <Separator />
      <InputWrapper>
        <Select
          items={currencyItems()}
          onValueChange={changeCurrency}
          value={value}
          label={translation.label}
          id="currencSelector"
          hasIcon
        />
      </InputWrapper>
      <Button variant="primary">{translation.button}</Button>
    </>
  );
}