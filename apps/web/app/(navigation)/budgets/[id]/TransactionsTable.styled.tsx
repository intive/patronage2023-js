import styled from "styled-components";
import { CurrencyAmount } from "ui/CurrencyAmount";

export const TableWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  // table styles
  .ka-table {
    width: 100%;
  }

  .ka-empty-cell {
    width: 1px;
  }

  // header styles
  .ka-thead-background {
    background-color: ${({ theme }) => theme.transactionsTable.background};
  }

  .ka-thead-row {
    border-bottom: 1px solid
      ${({ theme }) => theme.transactionsTable.headRowBottomBorder};
  }

  .ka-thead-cell-height {
    height: auto;
  }

  .ka-thead-cell {
    border: none;
    padding: 16px 16px 16px 0;
  }

  .ka-thead-cell-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    color: ${({ theme }) => theme.transactionsTable.columnName};
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }

  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  // table body
  tbody > tr:first-child > td {
    padding-top: 16px;
  }

  // group row styles
  .ka-icon-group-arrow {
    display: none;
  }

  .ka-group-row {
    background-color: ${({ theme }) => theme.transactionsTable.background};
  }

  .ka-group-cell {
    padding: 8px 8px 8px 0;
  }

  .ka-group-cell-content {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: ${({ theme }) => theme.transactionsTable.date};
  }

  // normal row styles
  .ka-row {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.transactionsTable.rowSeparator};
  }

  .ka-group-row + .ka-row {
    border-top: none;
  }

  // cell styles
  .ka-cell-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${({ theme }) => theme.transactionsTable.cellText};
  }

  .ka-cell {
    text-align: left;
    padding-left: 0;
  }

  // avatar styles
  .avatar {
    width: 24px;
    height: 24px;
  }
`;

export const StyledCurrencyAmount = styled(CurrencyAmount)`
  display: block;
  text-align: right;
  font-family: unset; // component adds Signika font so I need to reset it
`;
