import { useTranslate } from "lib/hooks";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  BarController,
  BarElement,
  ChartOptions,
  ChartTypeRegistry,
  Tooltip,
  TooltipItem,
  TooltipModel,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  BarController,
  BarElement,
  Tooltip
);

interface Transaction {
  incomes: number;
  expenses: number;
}

interface ReportsChartProps {
  chart: string;
  transactions: Transaction[];
  currency: string;
}

interface DashContext {
  tick: {
    value: number;
  };
}

interface CombinedContext {
  ctx: CanvasRenderingContext2D;
  tooltip?: TooltipModel<keyof ChartTypeRegistry>;
  chart?: ChartJS<keyof ChartTypeRegistry>;
  chartArea: {
    top: number;
    bottom: number;
  };
}

function ReportsChart({ chart, transactions, currency }: ReportsChartProps) {
  const { t, dict } = useTranslate("ReportsPage");
  const { info, labelsTooltip } = dict;
  const chartRef = useRef(null);
  const theme = useContext(ThemeContext);

  //using colors with high transparency to create gentle gradients
  const gradientGreen = {
    startColor: "rgba(0, 200, 0, 0.2)",
    endColor: "transparent",
  };

  const gradientGrey = {
    startColor: "rgba(0, 0, 0, 0.2)",
    endColor: "transparent",
  };

  const createGradient = (gradient: Record<string, string>) => {
    const ctx = document.createElement("canvas").getContext("2d");
    const gradientFill = ctx!.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, gradient.startColor);
    gradientFill.addColorStop(1, gradient.endColor);
    return gradientFill;
  };

  //define background colors depending on chart
  const backgroundIncomes =
    chart === "line" ? createGradient(gradientGreen) : theme.reports.incomesBar;
  const backgroundExpences =
    chart === "line" ? createGradient(gradientGrey) : theme.reports.expensesBar;

  //DATA for the chart
  const labels = Object.keys(transactions);
  const incomes = Object.values(transactions).map(
    (transaction) => transaction.incomes
  );
  const expenses = Object.values(transactions).map(
    (transaction) => transaction.expenses
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: t(labelsTooltip.incomes),
        data: incomes,
        borderColor: theme.reports.incomesLine,
        backgroundColor: backgroundIncomes,
        borderRadius: 5,
        fill: true,
      },
      {
        label: t(labelsTooltip.expenses),
        data: expenses,
        borderColor: theme.reports.expencesLine,
        backgroundColor: backgroundExpences,
        borderRadius: 5,
        fill: true,
      },
    ],
  };

  //CUSOTM LINE for tooltips in the line chart
  const customLine = {
    id: "lines",
    beforeDatasetsDraw(chart: any) {
      const {
        ctx,
        tooltip,
        chartArea: { top, bottom },
      } = chart;

      //can't find a way to type here properly, tried for very long time, but works as expected and has to be "_active" not "active" as suggested by ts
      //had a solution but the line didn't disapear after leaving chart:(
      if (tooltip && tooltip._active[0]) {
        const activeTooltip = tooltip.dataPoints[0];

        ctx.beginPath();
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 1;
        ctx.moveTo(activeTooltip.element.x, top);
        ctx.lineTo(activeTooltip.element.x, bottom);
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  //plugin for line chart
  const linePlugins = [customLine];

  //options for both charts
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        usePointStyle: true,
        bodySpacing: 12,
        callbacks: {
          label: (context: TooltipItem<keyof ChartTypeRegistry>) => {
            let label = context.dataset.label || "";

            let value;
            if (context.parsed.y !== null && label) {
              // Add currency info to the value
              switch (currency) {
                case "USD":
                  value = "$ " + context.parsed.y.toLocaleString();
                  break;
                case "PLN":
                  value = context.parsed.y.toLocaleString() + " PLN";
                  break;
                case "EUR":
                  value = "€ " + context.parsed.y.toLocaleString();
                  break;
              }

              // Modify the label to include the value
              label += ": " + value;
            }

            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        border: {
          dash: (context: DashContext) => {
            if (context.tick.value === 0) {
              return 0;
            }
            return [5, 5];
          },
          display: false,
        },
        beginAtZero: true,
        ticks: {
          //change chart step depending on average value
          stepSize: (): number => {
            const sum = data.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );
            const average = sum / data.datasets[0].data.length;
            return average > 10000 ? 10000 : 1000;
          },
          //set custom format 1000 => 1K, 10000 => 10K etc
          callback: (value: number) => {
            if (value >= 1000) {
              return value / 1000 + " K";
            }
            return value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  //options for line chart
  const lineOptions = {
    ...commonOptions,
    tension: 0.1,
    pointRadius: 0,
    pointHoverRadius: 7,
    pointHitRadius: 10,
    hoverBackgroundColor: theme.reports.lineChartPointsFill,
    pointHoverBorderWidth: 3,
  };

  //options for bar chart
  const barOptions = {
    ...commonOptions,
    barPercentage: 0.7,
    categoryPercentage: 0.7,
  };

  return (
    <>
      {Object.keys(transactions).length === 0 ? (
        <h3>{t(info.noTransaction)}</h3>
      ) : (
        <>
          {chart === "line" && (
            <Line
              ref={chartRef}
              style={{ maxHeight: "50vh" }}
              data={data}
              options={lineOptions as ChartOptions<"line">}
              plugins={linePlugins}
            />
          )}
          {chart === "bar" && (
            <Bar
              style={{ maxHeight: "50vh" }}
              data={data}
              options={barOptions as ChartOptions<"bar">}
            />
          )}
        </>
      )}
    </>
  );
}

export default ReportsChart;
