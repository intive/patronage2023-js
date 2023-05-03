"use client";
import styled from "styled-components";

export const ContainerStyled = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 32px 56px 40px 56px;
  flex-wrap: wrap;
  gap: 32px;
`;

export const RowsPerPageContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const PaginateContainerStyled = styled.div`
  .pagination {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .break-me {
    display: block;
  }

  .break-me a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      border: 2px solid ${({ theme }) => theme.pagination.hover};
      outline: none;
    }
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    &:hover {
      border: 2px solid ${({ theme }) => theme.pagination.hover};
      outline: none;
    }
  }

  .item {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.pagination.text};
    border: transparent;
    background: transparent;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
  }

  .active-item a {
    &:hover,
    &:focus {
      border: none;
      outline: none;
    }
    color: ${({ theme }) => theme.pagination.active};
    cursor: default;
  }

  .next-previous-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.pagination.text};
    border: 2px solid ${({ theme }) => theme.pagination.border};
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.pagination.hover};
      border-color: ${({ theme }) => theme.pagination.hover};
      outline: none;
    }

    &:focus {
      color: ${({ theme }) => theme.pagination.hover};
      border-color: ${({ theme }) => theme.pagination.hover};
      outline: none;
    }

    &:disabled {
      color: ${({ theme }) => theme.pagination.border};
      border-color: ${({ theme }) => theme.pagination.border};
      cursor: not-allowed;
    }
  }

  .next-previous-links {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .disabled-buttons {
    color: ${({ theme }) => theme.pagination.border};
    border-color: ${({ theme }) => theme.pagination.border};
    cursor: not-allowed;
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.pagination.border};
      border-color: ${({ theme }) => theme.pagination.border};
    }
  }
`;
