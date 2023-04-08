"use client";

import { Button, CustomDatePicker } from "ui";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import pl from "date-fns/locale/pl";
import en from "date-fns/locale/en-US";
import { device } from "lib/media-queries";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 311px;
  ${device.tablet} {
    max-width: 416px;
  }
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
  align-items: center;
  & .part {
    padding-left: 15px;
    width: 50%;
  }
`;

export default function TestPage() {
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [anotherDate, setAnotherDate] = useState<number | null>(null);
  const [lang, setLang] = useState<string | null | undefined>();
  const [locale, setLocale] = useState<Locale>(en);

  const onSelectStartDate = (date: Date) => {
    date ? setStartDate(date.getTime()) : setStartDate(null);
  };

  const onSelectEndDate = (date: Date) => {
    date ? setEndDate(date.getTime()) : setEndDate(null);
  };

  const onSelectAnotherDate = (date: Date) => {
    date ? setAnotherDate(date.getTime()) : setAnotherDate(null);
  };

  const handleLangClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const lang = (e.target as HTMLElement).innerHTML.toLowerCase();
    setLang(lang);
  };

  useEffect(() => {
    switch (lang) {
      case "pl":
        setLocale(pl);
        break;

      case "en":
        setLocale(en);
        break;

      default:
        setLocale(en);
        break;
    }
  }, [lang]);

  return (
    <FormWrapper>
      <h2 style={{ marginBottom: "25px", textAlign: "center" }}>
        DatePicker Demo
      </h2>
      <form>
        <Line>
          {/* usage */}
          <CustomDatePicker
            locale={locale}
            placeholder="Start date"
            onSelect={(date) => onSelectStartDate(date)}
          />
          <p> to </p>
          {/* usage */}
          <CustomDatePicker
            locale={locale}
            placeholder="End date"
            onSelect={(date) => onSelectEndDate(date)}
          />
        </Line>
        <Line style={{ marginTop: "15px" }}>
          <div className="part">
            Start Date: {startDate ? startDate : "unset"}
          </div>
          <div className="part" style={{ marginLeft: "15px" }}>
            End Date: {endDate ? endDate : "unset"}
          </div>
        </Line>
        <Line style={{ height: "100px" }}></Line>

        <Line style={{ justifyContent: "center" }}>
          <p>Select language:</p>
          <Button variant="simple" onClick={(e) => handleLangClick(e)}>
            EN
          </Button>
          |
          <Button variant="simple" onClick={(e) => handleLangClick(e)}>
            PL
          </Button>
        </Line>
        <Line>Selected language: {lang ? lang : "en"}</Line>
        <Line style={{ height: "100px" }}></Line>
        <CustomDatePicker
          locale={locale}
          placeholder="Third date"
          onSelect={(date) => onSelectAnotherDate(date)}
        />
        <Line style={{ marginTop: "15px" }}>
          Another Date: {anotherDate ? anotherDate : "unset"}
        </Line>
      </form>
    </FormWrapper>
  );
}
