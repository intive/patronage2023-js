"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import { DatePickerStyled } from "./DatePicker.styled";

type CustomDatePickerProps = {
  placeholder: string;
} & React.HTMLProps<HTMLDivElement>;

export const CustomDatePicker = ({
  placeholder = "",
}: CustomDatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePickerStyled>
      <DatePicker
        withPortal
        name="date"
        selected={date}
        onChange={(date: Date) => {
          setDate(date);
        }}
        autoComplete="off"
        placeholderText={placeholder}
        maxDate={new Date()}
        yearDropdownItemNumber={3}
        showYearDropdown
        isClearable
      />
    </DatePickerStyled>
  );
};
