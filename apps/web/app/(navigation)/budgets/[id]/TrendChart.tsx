import { useTranslate } from "lib/hooks";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

import {
  StyledWrapper,
  StyledCurrencyAmount,
  StyledTitle,
  StyledBalanceChartWrapper,
  StyledChartPlaceholder,
  StyledTrendChip
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

export const TrendChart = ({ statistics, currency }: TrendChartProps) => {
  const theme = useContext(ThemeContext);
  const { t, dict } = useTranslate("BudgetsPage");
  const { charts } = dict;

  const sortedData = statistics?.items.sort((a, b) => {
    const aTimestamp = new Date(a.datePoint).getTime();
    const bTimestamp = new Date(b.datePoint).getTime();
    return aTimestamp - bTimestamp;
  });

  if (!sortedData) {
    return null;
  }

  const dates = sortedData.map((data) => data.datePoint);
  const values = sortedData.map((data) => data.value);

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // code to generete color for line
  let width = 0,
    height = 0,
    gradient: CanvasGradient;

  function getGradient(
    ctx: CanvasRenderingContext2D,
    chartArea: ChartArea,
    minValue: number,
    maxValue: number
  ) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    const positiveValueColor = theme.trendChart.positiveLine;
    const negativeValueColor = theme.trendChart.negativeLine;

    if (minValue > 0) {
      return positiveValueColor;
    }
    if (maxValue < 0) {
      return negativeValueColor;
    }
    if (minValue === 0 && maxValue === 0) {
      return positiveValueColor;
    }

    if (!gradient || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;

      const maxDifference = maxValue + Math.abs(minValue);
      const zeroPoint = Math.abs(minValue) / maxDifference;

      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );

      gradient.addColorStop(0, negativeValueColor);
      gradient.addColorStop(zeroPoint, negativeValueColor);
      gradient.addColorStop(zeroPoint, positiveValueColor);
      gradient.addColorStop(1, positiveValueColor);
    }
    return gradient;
  }

  const renderChart = () => {
    if (statistics.items.length < 2) {
      return (
        <StyledChartPlaceholder
          height="auto"
          viewBox="0 0 240 80"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 38.898C6.8 33.19 20.4 6.413 34 10.352c13.6 3.939 20.4 45.36 34 48.24 13.6 2.88 20.4-31.062 34-33.841 13.6-2.779 20.4 20.109 34 19.948 13.6-.16 20.4-22.34 34-20.752 13.6 1.588 20.4 21.087 34 28.691 13.6 7.605 27.2 7.465 34 9.33"
            fill={theme.trendChart.placeholderChartFill}
          />
          <path
            d="M0 38.898C6.8 33.19 20.4 6.413 34 10.352c13.6 3.939 20.4 45.36 34 48.24 13.6 2.88 20.4-31.062 34-33.841 13.6-2.779 20.4 20.109 34 19.948 13.6-.16 20.4-22.34 34-20.752 13.6 1.588 20.4 21.087 34 28.691 13.6 7.605 27.2 7.465 34 9.33"
            fill="none"
            stroke={theme.trendChart.placeholderChartLine}
          />
        </StyledChartPlaceholder>
      );
    }
    return (
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
                return getGradient(ctx, chartArea, minValue, maxValue);
              },
              borderWidth: 2,
              fill: {
                target: "origin",
                above: theme.trendChart.positiveFill,
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
    );
  };

  return (
    <StyledWrapper>
      <StyledTitle>{t(charts.titleLeft)}</StyledTitle>
      <StyledBalanceChartWrapper>
        <StyledCurrencyAmount
          amount={statistics.totalBudgetValue}
          currencyOptions={currency}
          hidePlus
        />
        {renderChart()}
      </StyledBalanceChartWrapper>
      <StyledTrendChip value={statistics.trendValue} />
    </StyledWrapper>
  );
};
