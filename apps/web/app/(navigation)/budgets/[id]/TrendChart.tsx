import { mockDataChart } from "./mock-data-chart";
import {
  StyledWrapper,
  StyledCurrencyAmount,
  StyledTitle,
  StyledBalanceChartWrapper,
} from "./TrendChart.styled";

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

// TODO: budgetID in prop!!!!
export const TrendChart = () => {
  const sortedData = mockDataChart.sort((a, b) => {
    const aTimestap = new Date(a.datePoint).getTime();
    const bTimestap = new Date(b.datePoint).getTime();
    return aTimestap - bTimestap;
  });
  const dates = [];
  const values = [];
  for (let item of sortedData) {
    dates.push(item.datePoint);
    values.push(item.value);
  }

  return (
    <StyledWrapper>
      <StyledTitle>Total balance</StyledTitle>
      <StyledBalanceChartWrapper>
        <StyledCurrencyAmount
          amount={124054.96}
          currencyOptions={{ tag: "USD", locale: "en-US" }}
          hidePlus
        />
        <Line
          className="trend-chart" // NEEDED ???
          data={{
            labels: dates,
            datasets: [
              {
                data: values,
                borderColor: "#92CE78", // TODO: line color for negative !!!
                borderWidth: 2,
                fill: {
                  target: "origin",
                  above: "#92CE7855", // TODO: HOW gradient ???
                  below: "#E5707055",
                },
                cubicInterpolationMode: "monotone",
                pointStyle: false,
              },
            ],
          }}
          options={{
            aspectRatio: 3,
            scales: {
              y: {
                display: false,
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                },
              },
              x: {
                display: false,
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      </StyledBalanceChartWrapper>
    </StyledWrapper>
  );
};
