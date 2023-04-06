"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import { Icon } from "ui";
import { DatePickerStyled, StyledIcon } from "./DatePicker.styled";

export const CustomDatePicker = () => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <DatePickerStyled>
      <DatePicker
        autoComplete="off"
        withPortal
        name="date"
        selected={date}
        onChange={(date: Date) => {
          setDate(date);
        }}
        placeholderText="Start Date"
        maxDate={new Date()}
        yearDropdownItemNumber={3}
        showYearDropdown
      />
      <StyledIcon>
        <Icon icon="event" color="#52A785" />
      </StyledIcon>
    </DatePickerStyled>
  );
};
