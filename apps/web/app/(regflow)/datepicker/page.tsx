"use client";

import { useState } from "react";
import styled from "styled-components";
import { device } from "lib/media-queries";
import { Button, CustomDatePicker } from "ui";

import "react-datepicker/dist/react-datepicker.css";

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
  const [lang, setLang] = useState<string | undefined>();

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
    lang && setLang(lang);
  };

  return (
    <FormWrapper>
      <h2 style={{ marginBottom: "25px", textAlign: "center" }}>
        DatePicker Demo
      </h2>
      <form>
        <Line>
          {/* usage */}
          <CustomDatePicker
            lang={lang}
            placeholder="Start date"
            onSelect={(date) => onSelectStartDate(date)}
          />
          <p> to </p>
          {/* usage */}
          <CustomDatePicker
            lang={lang}
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
          lang={lang}
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
