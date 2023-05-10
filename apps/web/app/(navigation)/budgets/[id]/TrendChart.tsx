import { mockDataChart } from "./mock-data-chart";
import styled from "styled-components";

import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;
  width: 100%;

  canvas {
    max-width: 100%;
  }
`;

export const TrendChart = () => {
  //TODO: SORTING !!!!!!!!!!!!!!!!!!

  const dates = [];
  const values = [];
  for (let item of mockDataChart) {
    const date = item.datePoint;
    dates.push(date);
    const value = item.value;
    values.push(value);
  }

  return (
    <StyledWrapper>
      <div>Total balance</div>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              data: values,
              borderColor: "#92CE78", // TODO: line color for negative
              borderWidth: 2,
              fill: {
                target: "origin",
                above: "#92CE7855", // TODO: gradient???
                below: "#E5707055",
              },
              cubicInterpolationMode: "monotone",
              pointStyle: false,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              display: false,
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              }
            },
            x: {
              display: false,
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              }
            },
          },
        }}
      />
    </StyledWrapper>
  );
};
