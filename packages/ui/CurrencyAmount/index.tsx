"use client";
import styled from "styled-components";

type CurrencyType = {
  tag: string;
  locale: string;
};

type CurrencyAmountSpanProps = {
  amount: number;
} & React.HTMLProps<HTMLSpanElement>;

type CurrencyAmountProps = {
  currencyOptions: CurrencyType;
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
  currencyOptions,
  className,
  hidePlus,
}: CurrencyAmountProps) => {
  const { tag, locale } = currencyOptions;
  const options = {
    style: "currency",
    currency: tag,
  } as Intl.NumberFormatOptions;

  const currencyAmountNumber = new Intl.NumberFormat(locale, options)
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
