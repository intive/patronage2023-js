import styled from "styled-components";
import { device } from "lib/media-queries";

export const UsersListStyled = styled.div`
  // table styles
  .ka-table {
    tr > :last-child {
      padding-right: 0;
    }
  }

  // header styles
  .ka-thead-background {
    background-color: ${({ theme }) => theme.transactionsTable.background};
  }

  .ka-thead-cell-height {
    height: auto;
  }

  .ka-thead-cell {
    border: none;
    padding: 16px 5px 16px 0;
  }

  .ka-thead-cell-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
    color: ${({ theme }) => theme.transactionsTable.columnName};
    font-size: 12px;
    line-height: normal;

    @media (min-width: 510px) {
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
    }
  }

  // header row underline that overflows the table
  .ka-thead {
    position: relative;
  }

  .ka-thead::after {
    content: " ";
    position: absolute;
    background: ${({ theme }) => theme.transactionsTable.headRowBottomBorder};
    height: 1px;
    bottom: 0;
    left: -48px;
    right: -48px;
  }

  .ka,
  .ka-table-wrapper {
    overflow: visible;
  }

  // sorting button
  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  // hide side columns on mobile
  tr.ka-thead-row th:first-child,
  tr.ka-row td:first-child,
  tr.ka-thead-row th:last-child,
  tr.ka-row td:last-child {
    display: none;

    ${device.tablet} {
      display: table-cell;
    }
  }

  // normal row styles
  .ka-row {
    border: none;

    td {
      border-top: 1px solid
        ${({ theme }) => theme.transactionsTable.rowSeparator};
    }
  }

  // cell styles
  .ka-cell-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: ${({ theme }) => theme.transactionsTable.cellText};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    @media (min-width: 510px) {
      font-size: 16px;
      white-space: initial;
    }
  }

  .ka-cell {
    padding: 17px 5px 17px 0;
  }
`;

export const EmailStyled = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.transactionsTable.cellText};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (min-width: 510px) {
    font-size: 14px;
    white-space: initial;
  }
`;

export const InputWrapper = styled.div`
  width: 220px;
  align-self: center;

  @media (min-width: 510px) {
    width: 240px;
    align-self: flex-end;
    margin-bottom: 10px;
  }
`;
