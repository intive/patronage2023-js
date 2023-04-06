"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import { DatePickerStyled } from "./DatePicker.styled";

type CustomDatePickerProps = {
  placeholder: string;
  onSelect: (date: Date) => void;
} & React.HTMLProps<HTMLDivElement>;

export const CustomDatePicker = ({
  placeholder = "",
  onSelect,
}: CustomDatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePickerStyled>
      <DatePicker
        onSelect={onSelect}
        withPortal
        name="date"
        selected={date}
        onChange={(date: Date) => {
          setDate(date);
          onSelect(date);
        }}
        autoComplete="off"
        placeholderText={placeholder}
        yearDropdownItemNumber={3}
        showYearDropdown
        isClearable
      />
    </DatePickerStyled>
  );
};
