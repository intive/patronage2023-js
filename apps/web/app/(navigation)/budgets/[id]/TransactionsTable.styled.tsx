import styled from "styled-components";
import { device } from "lib/media-queries";
import { CurrencyAmount } from "ui/CurrencyAmount";

export const TableWrapperStyled = styled.div`
  margin-left: -48px;
  margin-right: -48px;

  // table styles
  .ka-table {
    tr > :first-child {
      padding-left: 48px;
    }

    tr > :last-child {
      padding-right: 0;
    }
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

  // center "Creator" header
  .ka-thead-cell#creator .ka-thead-cell-content {
    justify-content: center;
  }

  // hide creator column on mobile
  tr.ka-thead-row th:nth-child(5),
  tr.ka-row td:nth-child(5) {
    display: none;

    ${device.tablet} {
      display: table-cell;
    }
  }

  // group row styles
  .ka-icon-group-arrow {
    display: none;
  }

  .ka-group-row {
    background-color: ${({ theme }) => theme.transactionsTable.background};

    > td {
      padding-top: 24px;
    }
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

    td {
      border-top: 1px solid
        ${({ theme }) => theme.transactionsTable.rowSeparator};
    }

    // no border on first and last empty columns
    td:first-child,
    td:last-child {
      border-top: none;
    }
  }

  .ka-group-row + .ka-row td {
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
    padding: 17px 8px 17px 0;
  }

  // avatar styles
  .avatar {
    width: 24px;
    height: 24px;
  }
`;

export const StyledCurrencyAmount = styled(CurrencyAmount)`
  display: block;
  text-align: left;
  font-family: unset; // component adds Signika font
`;
