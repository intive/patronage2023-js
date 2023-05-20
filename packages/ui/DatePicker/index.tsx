"use client";

import { useAtomValue } from "jotai";
import { languageAtom } from "../../../apps/web/app/store";

import DatePicker from "react-datepicker";
import { DatePickerStyled } from "./DatePicker.styled";
import "react-datepicker/dist/react-datepicker.css";

import { Input } from "../Input";

import en from "date-fns/locale/en-US";
import pl from "date-fns/locale/pl";
import fr from "date-fns/locale/fr";

type CustomDatePickerProps = {
  onSelect: (date: Date | null) => void;
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
  fr: fr,
  default: en,
};

export const CustomDatePicker = ({
  onSelect,
  selected,
  hasError,
  label,
}: CustomDatePickerProps) => {
  const currentLang = useAtomValue(languageAtom);

  return (
    <DatePickerStyled hasError={hasError} label={label}>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        id={label}
        locale={datePickerLanguageConfig[currentLang]}
        popperPlacement="top"
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
        onFocus={(e) => (e.target.readOnly = true)}
        dropdownMode="select"
        customInput={
          <Input
            label={label}
            hasError={hasError}
            onInputCleared={() => onSelect(null)}
          />
        }
      />
    </DatePickerStyled>
  );
};
