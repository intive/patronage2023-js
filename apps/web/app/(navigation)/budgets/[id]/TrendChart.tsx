import { Currency } from "lib/types";
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

type TrendChartProps = {
  statistics: {
    items: Array<{
      value: number;
      datePoint: string;
    }>;
    trendValue: number;
    totalBudgetValue: number;
  };
  currency: Currency;
};

export const TrendChart = ({ statistics, currency }: TrendChartProps) => {
  const sortedData = statistics.items.sort((a, b) => {
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
          amount={statistics.totalBudgetValue}
          currencyOptions={currency}
          hidePlus
        />
        <Line
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
      <div>trendChip</div> {/* to be changed for trend chip once it is merged*/}
    </StyledWrapper>
  );
};
