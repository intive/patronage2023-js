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
    font-size: 12px;
  }
`;

export default function TestPage() {
  const [startDate, setStartDate] = useState<number | null>(null);
  const [endDate, setEndDate] = useState<number | null>(null);
  const [anotherDate, setAnotherDate] = useState<number | null>(null);
  const [andAnother, setAndAnother] = useState<number | null>(null);
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

  const onSelectAndAnother = (date: Date) => {
    date ? setAndAnother(date.getTime()) : setAndAnother(null);
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
        <Line style={{ color: "red", fontSize: "12px" }}>
          <p>scroll, keyboard on input: OFF</p>
          <p>scroll, keyboard on input: ON</p>
        </Line>
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
        <Line style={{ height: "50px" }}></Line>
        <hr />
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
        <Line style={{ marginBottom: "15px" }}>
          Selected language: {lang ? lang : "en"}
        </Line>{" "}
        <hr />
        <Line style={{ height: "50px" }}></Line>
        <Line style={{ color: "red", fontSize: "12px" }}>
          <p>select, keyboard on input: OFF</p>
          <p>select, keyboard on input: ON</p>
        </Line>
        <Line>
          <CustomDatePicker
            lang={lang}
            placeholder="Another date"
            onSelect={(date) => onSelectAnotherDate(date)}
          />
          <p>to</p>
          <CustomDatePicker
            lang={lang}
            placeholder="And another date"
            onSelect={(date) => onSelectAndAnother(date)}
          />
        </Line>
        <Line style={{ marginTop: "15px" }}>
          <div className="part">
            Another Date: {anotherDate ? anotherDate : "unset"}
          </div>
          <div className="part" style={{ marginLeft: "15px" }}>
            End Date: {andAnother ? andAnother : "unset"}
          </div>
        </Line>
      </form>
    </FormWrapper>
  );
}
