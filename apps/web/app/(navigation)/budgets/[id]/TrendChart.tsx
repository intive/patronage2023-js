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
  ChartArea,
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
  currency: {
    tag: string;
    locale: string;
  };
};
// code to generete color for line - red or green based on value
let width = 0,
  height = 0,
  gradient: any;

function getGradient(
  ctx: CanvasRenderingContext2D,
  chartArea: ChartArea,
  min: number,
  max: number
) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;

  const green = "#92CE78";
  const red = "#E57070";
  // all values are > 0
  if (min > 0) {
    return green;
  }

  // all values < 0
  if (max < 0) {
    return red;
  }

  if (min === 0 && max === 0) {
    return green;
  }

  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;

    // 0.5 is in the middle of the chart
    const minWithMax = max + Math.abs(min);
    const zeroPoint = Math.abs(min) / minWithMax;

    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

    gradient.addColorStop(0, red);
    gradient.addColorStop(zeroPoint - 0.00001, red);
    gradient.addColorStop(zeroPoint, green);
    gradient.addColorStop(1, green);
  }
  return gradient;
}
export const TrendChart = ({ statistics, currency }: TrendChartProps) => {
  const theme = useContext(ThemeContext);
  const { t, dict } = useTranslate("BudgetsPage");
  const { charts } = dict;

  const sortedData = statistics?.items.sort((a, b) => {
    const aTimestap = new Date(a.datePoint).getTime();
    const bTimestap = new Date(b.datePoint).getTime();
    return aTimestap - bTimestap;
  });

  if (!sortedData) {
    return null;
  }

  const dates = [];
  const values = [];
  for (let item of sortedData) {
    dates.push(item.datePoint);
    values.push(item.value);
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  return (
    <StyledWrapper>
      <StyledTitle>{t(charts.titleLeft)}</StyledTitle>
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
                borderColor: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;

                  if (!chartArea) {
                    return;
                  }
                  return getGradient(ctx, chartArea, min, max);
                }, // TODO: line color for negative ???
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
      <TrendChip value={statistics.trendValue} />
    </StyledWrapper>
  );
};
