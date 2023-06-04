import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  BarController,
  BarElement,
  ChartOptions,
  Tooltip
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
);

type Transaction = {
  incomes: number;
  expenses: number;
};

interface Props {
  chart: string,
  transactions: Transaction[],
};

interface DashContext {
  tick: {
    value: number;
  };
};

function ReportsChart({chart, transactions}: Props) {

  const gradient = {
    startColor: 'rgba(0, 200, 0, 0.2)',
    endColor: 'rgba(0, 0, 0, 0)',
  };

  const gradient2 = {
    startColor: 'rgba(0, 0, 0, 0.2)',
    endColor: 'rgba(0, 0, 0, 0)',
  };

  const createGradient = (gradient: Record<string, string>) => {
    const ctx = document.createElement('canvas').getContext('2d');
    const gradientFill = ctx!.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, gradient.startColor);
    gradientFill.addColorStop(1, gradient.endColor);
    return gradientFill;
  };
  const backgroundIncomes = chart === "line" ? createGradient(gradient) : "#49AD1F";
  const backgroundExpences = chart === "line" ? createGradient(gradient2) : "#E1E1E1";
  
  const labels = Object.keys(transactions);
  const incomes = Object.values(transactions).map(transaction => transaction.incomes);
  const expenses = Object.values(transactions).map(transaction => transaction.expenses);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Incomes',
        data: incomes,
        borderColor: 'rgba(0, 110, 0, 0.5)',
        backgroundColor: backgroundIncomes,
        borderRadius: 5,
        fill: true,
      },
      {
        label: 'Expenses',
        data: expenses,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: backgroundExpences,
        borderRadius: 5,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        border: {
            dash: (context: DashContext) => {
              if(context.tick.value === 0) {
                return 0
              }
              return [5, 5]
            },
            display: false,
        },
        beginAtZero: true,
        ticks: {
          stepSize: (): number => {
            const sum = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
            const average = sum / data.datasets[0].data.length
            return average > 10000 ? 10000 : 1000
          },
          callback: (value: number) => {
            if (value >= 1000) {
              return (value / 1000) + ' K';
            }
            return value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    }
  };

  const barOptions = {
    ...lineOptions,
    barPercentage: 0.7,
    categoryPercentage: 0.7,
  }

  return (
    <>
      {(Object.keys(transactions).length === 0) ? (
        <h3>Brak transakcji dla wybranego okresu</h3>
      ) : (
        <>
          {chart === "line" && <Line data={data} options={lineOptions as ChartOptions<"line">} />}
          {chart === "bar" && <Bar data={data} options={barOptions as ChartOptions<"bar">} />}
        </>
      )}
    </>
  );
}

export default ReportsChart;
