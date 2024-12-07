import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BalanceChart = ({ transactions }) => {
  const positiveTransactions = transactions.filter(
    (transaction) => transaction.price > 0
  );
  const negativeTransactions = transactions.filter(
    (transaction) => transaction.price < 0
  );

  const data = {
    labels: ["Entradas", "Saídas"],
    datasets: [
      {
        label: "Balanço",
        data: [
          positiveTransactions.reduce(
            (acc, transaction) => acc + transaction.price,
            0
          ),
          negativeTransactions.reduce(
            (acc, transaction) => acc + transaction.price,
            0
          ),
        ],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Balanço de Entradas e Saídas",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BalanceChart;
