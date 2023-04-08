"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { DatePickerStyled } from "./DatePicker.styled";
// import pl from "date-fns/locale/pl";
// import enUS from "date-fns/locale/en-US";

type CustomDatePickerProps = {
  placeholder: string;
  onSelect: (date: Date) => void;
  locale?: Locale;
};

// const globalLocale = enUS;

export const CustomDatePicker = ({
  placeholder = "",
  onSelect,
  locale,
}: CustomDatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);

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
