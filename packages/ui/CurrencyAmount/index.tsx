"use client";
import styled from "styled-components";

type CurrencyAmountSpanProps = {
  amount: number;
} & React.HTMLProps<HTMLSpanElement>;

export type CurrencyAmountProps = {
  currency: string;
  className?: string;
  hidePlus?: boolean;
} & CurrencyAmountSpanProps;

const SpanStyled = styled.span<CurrencyAmountSpanProps>`
  font-family: "Signika";
  line-height: 1.5em;
  color: ${({ theme, amount }) =>
    amount > 0 ? theme.currencyAmount.positive : theme.currencyAmount.text};
`;

export const CurrencyAmount = ({
  amount,
  currency,
  className,
  hidePlus,
}: CurrencyAmountProps) => {
  const options = {
    style: "currency",
    currency,
  } as Intl.NumberFormatOptions;

  const currencyAmountNumber = new Intl.NumberFormat(undefined, options)
    .format(amount)
    .replace(/^(\D+)/, "$1 ")
    .replace(/\s+/, " ")
    .replace("-", "- ");
  const positiveChar = amount > 0 ? "+ " : "";

  return (
    <SpanStyled className={className} amount={amount}>
      {`${!hidePlus ? positiveChar : ""}${currencyAmountNumber}`}
    </SpanStyled>
  );
};
