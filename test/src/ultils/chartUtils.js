import { Chart as ChartJS, registerables } from "chart.js";
if (process.env.NODE_ENV !== "test") {
  ChartJS.register(...registerables);
}

// Function to create data for a chart
export const createChartData = (history, label, color) => {
  return {
    labels: history.map((_, index) => `${index + 1}`),
    datasets: [
      {
        label,
        data: history,
        fill: false,
        backgroundColor: color,
        tension: 0.1,
      },
    ],
  };
};

// Common chart options
export const chartOptions = {
  responsive: true,
  plugins: {
    datalabels: {
      color: "#000000",
      anchor: "end",
      align: "top",
      formatter: Math.round,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
