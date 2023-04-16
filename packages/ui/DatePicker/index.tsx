"use client";

import { useContext } from "react";

import DatePicker from "react-datepicker";
import { DatePickerStyled } from "./DatePicker.styled";
import "react-datepicker/dist/react-datepicker.css";
import { LanguageContext } from "../../../apps/web/lib/contexts/LanguageContext";

import en from "date-fns/locale/en-US";
import pl from "date-fns/locale/pl";

type CustomDatePickerProps = {
  placeholder: string;
  onSelect: (date: Date) => void;
  selected?: Date | null;
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
  onSelect,
  selected,
}: CustomDatePickerProps) => {
  const { currentLang } = useContext(LanguageContext);

  return (
    <DatePickerStyled>
      <DatePicker
        locale={datePickerLanguageConfig[currentLang]}
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
        selected={selected}
        name={placeholder}
        onChange={(date: Date) => {
          onSelect(date);
        }}
        autoComplete="off"
        placeholderText={placeholder}
        showYearDropdown
        isClearable
        onFocus={(e) => (e.target.readOnly = true)}
        dropdownMode="select"
      />
    </DatePickerStyled>
  );
};
//test
