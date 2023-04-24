import styled, { css } from "styled-components";
import { device } from "../../../apps/web/lib/media-queries";

type DatePickerStyledProps = {
  hasError?: boolean;
  label?: string;
};

export const DatePickerStyled = styled.div<DatePickerStyledProps>`
  position: relative;

  .react-datepicker-popper {
    z-index: 20;
  }
  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker {
    font-family: unset;
    font-weight: 400;
    background-color: ${({ theme }) => theme.datePicker.teal1};

    border-radius: 1rem;
    border: 1px solid ${({ theme }) => theme.datePicker.neutral2};
    box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.08),
      0px 2px 4px rgba(32, 37, 50, 0.03);
  }

  .react-datepicker__year-dropdown {
    width: 90px;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 1rem;
    border: 1px solid ${({ theme }) => theme.datePicker.teal3};
    background-color: ${({ theme }) => theme.datePicker.teal2};
    box-shadow: 0px 2px 8px rgba(32, 37, 50, 0.12),
      0px 2px 4px rgba(32, 37, 50, 0.12);
  }

  .react-datepicker__month-container {
    border-radius: 1rem;
  }

  .react-datepicker__header {
    background-color: unset;
    border-bottom: 1px solid ${({ theme }) => theme.datePicker.neutral2};
  }

  .react-datepicker__navigation--next {
    top: 10px;
    right: 10px;
    :hover {
      & span::before {
        border-color: ${({ theme }) => theme.datePicker.teal10};
      }
    }
  }

  .react-datepicker__navigation--previous {
    top: 10px;
    left: 10px;
    :hover {
      & span::before {
        border-color: ${({ theme }) => theme.datePicker.teal10};
      }
    }
  }

  .react-datepicker__navigation-icon::before,
  .react-datepicker__navigation-icon::after,
  .react-datepicker__year-read-view--down-arrow {
    border-color: ${({ theme }) => theme.datePicker.teal6};
  }

  .react-datepicker__year-dropdown-container {
    line-height: 2.5rem;
  }

  .react-datepicker__year-read-view--down-arrow {
    right: -24px;
    top: 12px;
  }

  .react-datepicker__year-read-view:hover {
    & span {
      border-color: ${({ theme }) => theme.datePicker.teal10};
    }
  }

  .react-datepicker__current-month {
    line-height: 2.5rem;
    color: ${({ theme }) => theme.datePicker.neutral10};
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    color: ${({ theme }) => theme.datePicker.neutral10};
    width: 2.35rem;
    line-height: 2.35rem;

    ${device.tablet} {
      font-size: 1rem;
      width: 2.5rem;
      line-height: 2.5rem;
    }
  }

  .react-datepicker__day:hover {
    border-radius: 50%;
    background-color: ${({ theme }) => theme.datePicker.teal3};
  }

  .react-datepicker__day--selected {
    color: white;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.datePicker.teal10};
    :hover {
      background-color: ${({ theme }) => theme.datePicker.teal10};
    }
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.datePicker.teal3};
    border-radius: 50%;
  }

  .react-datepicker__day--outside-month {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.datePicker.neutral5};
  }

  .react-datepicker__year-option {
    position: relative;
    font-size: 1rem;
    line-height: 1.5rem;
    border: 2px solid ${({ theme }) => theme.datePicker.teal2};
    border-radius: 1rem;
  }

  .react-datepicker__year-option:hover {
    background-color: ${({ theme }) => theme.datePicker.teal3};
    border-radius: 1rem;
  }

  .react-datepicker__year-option--selected_year {
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.datePicker.teal10};
    color: white;
    & span {
      left: 7px;
    }
  }

  .react-datepicker__year-option--selected_year:hover {
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.datePicker.teal10};
  }

  .react-datepicker__year-option:first-of-type,
  .react-datepicker__year-option:last-of-type {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    line-height: 1rem;
  }

  .react-datepicker__year-option:first-of-type::before {
    position: absolute;
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-left: 3px solid ${({ theme }) => theme.datePicker.teal10};
    border-bottom: 3px solid ${({ theme }) => theme.datePicker.teal10};
    top: 13px;
    transform: rotate(135deg);
  }

  .react-datepicker__year-option:last-of-type::after {
    position: absolute;
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-left: 3px solid ${({ theme }) => theme.datePicker.teal10};
    border-bottom: 3px solid ${({ theme }) => theme.datePicker.teal10};
    top: 8px;
    transform: rotate(-45deg);
  }

  .react-datepicker__year-select {
    font-family: unset;
    color: ${({ theme }) => theme.datePicker.neutral10};
    border: 2px solid ${({ theme }) => theme.datePicker.teal6};
    padding: 8px 8px 8px 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.datePicker.teal2};
  }

  .react-datepicker__year-select option:hover,
  .react-datepicker__year-select option:checked {
    color: ${({ theme }) => theme.datePicker.basicWhite};
    background-color: ${({ theme }) => theme.datePicker.teal10};
  }
`;
