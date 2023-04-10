"use client";

import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import { DatePickerStyled } from "./DatePicker.styled";
import "react-datepicker/dist/react-datepicker.css";

import en from "date-fns/locale/en-US";
import pl from "date-fns/locale/pl";

type CustomDatePickerProps = {
  placeholder: string;
  onSelect: (date: Date) => void;
  lang?: string;
};

export const CustomDatePicker = ({
  placeholder = "",
  lang = "en",
  onSelect,
}: CustomDatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [locale, setLocale] = useState<Locale>();

  useEffect(() => {
    switch (lang) {
      case "en":
        setLocale(en);
        break;

      case "pl":
        setLocale(pl);
        break;

      default:
        setLocale(en);
        break;
    }
  }, [lang]);

  return (
    <DatePickerStyled>
      <DatePicker
        locale={locale}
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
        autoComplete="off"
        placeholderText={placeholder}
        yearDropdownItemNumber={3}
        showYearDropdown
        isClearable
      />
    </DatePickerStyled>
  );
};
