import React, { useEffect, useContext, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { CryptoContext } from "../context/CryptoContext";
import selectIcon from "../assets/select-icon.svg";
import "tailwindcss/tailwind.css";

Chart.register(...registerables);

export const CryptoChart = () => {
  const { currency, cryptoId } = useContext(CryptoContext);
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(2);
  const [id, setId] = useState("bitcoin");
  const [interval, setInterval] = useState([]);
  const [chartType, setChartType] = useState("LineChart");

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`
    ).then((response) => {
      response.json().then((data) => {
        setChartData(data.prices);
      });
    });
  }, [days, id, currency]);

  const ChartData = chartData.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const timeFrames = [
    { label: "1D", onClick: () => { setDays(1); setInterval("hourly"); } },
    { label: "1W", onClick: () => { setDays(7); setInterval("daily"); } },
    { label: "1M", onClick: () => { setDays(30); setInterval("daily"); } },
    { label: "6M", onClick: () => { setDays(180); setInterval("monthly"); } },
    { label: "1Y", onClick: () => { setDays(365); setInterval("yearly"); } },
  ];

  return (
    <div className="container mx-auto p-4 bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-white">
          {currency.toUpperCase()}
        </div>
        <div className="flex space-x-2">
          {timeFrames.map((frame) => (
            <button
              key={frame.label}
              onClick={frame.onClick}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                days === parseInt(frame.label) ? "bg-orange-500 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              {frame.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/4">
          <select
            onChange={(e) => setId(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
          >
            {cryptoId &&
              Object.values(cryptoId).map((d, k) => (
                <option key={k} value={d.id}>
                  {d.name}
                </option>
              ))}
          </select>
          <img
            src={selectIcon}
            alt="Select Icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none"
          />
        </div>

        <div className="relative w-1/4">
          <select
            onChange={(e) => setChartType(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded-md"
          >
            <option value="LineChart">Line Chart</option>
            <option value="BarChart">Bar Chart</option>
            <option value="BarChartH">Horizontal Bar Chart</option>
          </select>
          <img
            src={selectIcon}
            alt="Select Icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

      <div className="relative h">
        {chartType === "LineChart" ? (
          <Line
            data={{
              labels: ChartData.map((val) => {
                let date = new Date(val.x);
                return days === 1
                  ? date.toLocaleTimeString()
                  : date.toLocaleDateString();
              }),
              datasets: [
                {
                  label: `${id} in ${currency}`,
                  data: ChartData.map((val) => val.y),
                  borderColor: "#FFA500",
                  backgroundColor: "rgba(255, 165, 0, 0.2)",
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  ticks: { color: "white" },
                  grid: { color: "rgba(255, 255, 255, 0.1)" },
                },
                y: {
                  ticks: { color: "white" },
                  grid: { color: "rgba(255, 255, 255, 0.1)" },
                },
              },
              plugins: {
                legend: { labels: { color: "white" } },
              },
            }}
          />
        ) : (
          <Bar
            data={{
              labels: ChartData.map((val) => {
                let date = new Date(val.x);
                return days === 1
                  ? date.toLocaleTimeString()
                  : date.toLocaleDateString();
              }),
              datasets: [
                {
                  label: `${id} in ${currency}`,
                  data: ChartData.map((val) => val.y),
                  borderColor: "#FFA500",
                  backgroundColor: "rgba(255, 165, 0, 0.2)",
                },
              ],
            }}
            options={{
              indexAxis: chartType === "BarChartH" ? "y" : "x",
              responsive: true,
              scales: {
                x: {
                  ticks: { color: "white" },
                  grid: { color: "rgba(255, 255, 255, 0.1)" },
                },
                y: {
                  ticks: { color: "white" },
                  grid: { color: "rgba(255, 255, 255, 0.1)" },
                },
              },
              plugins: {
                legend: { labels: { color: "white" } },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};
