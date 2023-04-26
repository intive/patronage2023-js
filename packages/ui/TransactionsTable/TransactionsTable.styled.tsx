import styled, { css, ThemeContext } from "styled-components";

export const TableWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 48px 48px 48px; //remove later

  // table styles
  .ka-table {
    width: 100%;
  }

  .ka-empty-cell {
    width: 1px;
  }

  // header styles
  .ka-thead-background {
    background-color: white;
  }

  .ka-thead-row {
    border-bottom: 1px solid #e1e1e1;
  }

  .ka-thead-cell-height {
    height: auto;
  }

  .ka-thead-cell {
    border: none;
    padding: 16px 8px 16px 0;
  }

  .ka-thead-cell-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    color: #515151;

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

  .ka-icon-group-arrow {
    display: none;
  }


  .ka-group-cell-content {
    font-size: 12px;
    color: #888888;
  }


  .ka-cell-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #222222;
  }

  .ka-cell {
    text-align: left;
    padding-left: 0;
  }

  .avatar-icon-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .avatar {
    font-size: 1.5em;
  }
`;
