import styled, { css, ThemeContext } from "styled-components";

export const TableWrapperStyled = styled.div`
  .ka-icon-group-arrow {
    display: none;
  }

  .ka-thead-cell {
    padding-left: 0;
  }

  .ka-group-cell-content {
    font-size: 12px;
    color: #888888;
  }

  .ka-thead {
    background-color: transparent;
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