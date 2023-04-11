"use client";

import { useState } from "react";

import DatePicker from "react-datepicker";
import { DatePickerStyled } from "./DatePicker.styled";
import "react-datepicker/dist/react-datepicker.css";

import en from "date-fns/locale/en-US";
import pl from "date-fns/locale/pl";

type CustomDatePickerProps = {
  placeholder: string;
  lang: string | undefined,
  onSelect: (date: Date) => void;
};

type DatePickerLanguageConfigType = {
  [key: string]: Locale;
};

const datePickerLanguageConfig: DatePickerLanguageConfigType = {
  en: en,
  pl: pl,
  default: en,
};

export const CustomDatePicker = ({
  placeholder = "",
  lang = "en",
  onSelect,
}: CustomDatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePickerStyled>
      <DatePicker
        locale={datePickerLanguageConfig[lang]}
        popperPlacement="top-start"
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
        onFocus={(e) => (e.target.readOnly = true)}
        autoComplete="off"
        placeholderText={placeholder}
        yearDropdownItemNumber={3}
        showYearDropdown
        isClearable
      />
    </DatePickerStyled>
  );
};
