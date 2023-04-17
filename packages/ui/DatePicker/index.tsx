"use client";

import { useContext } from "react";

import DatePicker from "react-datepicker";
import { DatePickerStyled } from "./DatePicker.styled";
import "react-datepicker/dist/react-datepicker.css";
import { LanguageContext } from "../../../apps/web/lib/contexts/LanguageContext";

import { Input } from "../Input";

import en from "date-fns/locale/en-US";
import pl from "date-fns/locale/pl";

type CustomDatePickerProps = {
  onSelect: (date: Date) => void;
  selected?: Date | null;
  hasError?: boolean;
  label: string;
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
  onSelect,
  selected,
  hasError,
  label,
}: CustomDatePickerProps) => {
  const { currentLang } = useContext(LanguageContext);

  return (
    <DatePickerStyled hasError={hasError} label={label}>
      <DatePicker
        id={label}
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
        name={label}
        onChange={(date: Date) => {
          onSelect(date);
        }}
        autoComplete="off"
        showYearDropdown
        isClearable
        onFocus={(e) => (e.target.readOnly = true)}
        dropdownMode="select"
        customInput={<Input label={label} hasError={hasError} />}
      />
    </DatePickerStyled>
  );
};
//test
