import { useTranslate } from "lib/hooks";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { TrendChip } from "ui";

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
  currency: string;
};

export const TrendChart = ({ statistics, currency }: TrendChartProps) => {
  const theme = useContext(ThemeContext);
  const { t, dict } = useTranslate("BudgetsPage");
  const { charts } = dict;

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
      <StyledTitle>{t(charts.titleLeft)}</StyledTitle>
      <StyledBalanceChartWrapper>
        <StyledCurrencyAmount
          amount={statistics.totalBudgetValue}
          currency={currency}
          hidePlus
        />
        <Line
          data={{
            labels: dates,
            datasets: [
              {
                data: values,
                borderColor: theme.trendChart.positiveLine, // TODO: line color for negative ???
                borderWidth: 2,
                fill: {
                  target: "origin",
                  above: theme.trendChart.positiveFill, // TODO: gradient ???
                  below: theme.trendChart.negativeFill,
                },
                cubicInterpolationMode: "monotone",
                pointStyle: false,
              },
            ],
          }}
          options={{
            aspectRatio: 3,
            layout: {
              padding: 0,
            },
            scales: {
              y: {
                display: false,
                bounds: "data",
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                },
              },
              x: {
                display: false,
                bounds: "data",
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
      <TrendChip value={statistics.trendValue}/>
    </StyledWrapper>
  );
};
