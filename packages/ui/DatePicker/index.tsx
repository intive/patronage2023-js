"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import { DatePickerStyled } from "./DatePicker.styled";

type CustomDatePickerProps = {
  placeholder: string;
  onSelect: (date: Date) => void;
};

export const CustomDatePicker = ({
  placeholder = "",
  onSelect,
}: CustomDatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePickerStyled>
      <DatePicker
        popperPlacement="top-end"
        popperModifiers={[
          {
            name: "preventOverflow",
            options: {
              rootBoundary: "viewport",
              tether: false,
              altAxis: true,
            },
          },
        ]}
        popperProps={{
          strategy: "fixed",
        }}
        onSelect={onSelect}
        selected={date}
        name={placeholder}
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
