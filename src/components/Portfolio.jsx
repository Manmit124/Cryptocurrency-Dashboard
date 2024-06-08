import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "right",
      labels: {
        color: "white",
        pointStyleWidth: 15,
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
      },
    },
  },
};

export const Portfolio = () => {
  const [totalVolume, setTotalVolume] = useState("");
  const [data, setData] = useState({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether%2Cethereum%2Cbitcoin&order=market_cap_desc`;
      const labelSet = [];
      const dataSet1 = [];
      await fetch(url)
        .then((data) => data.json())
        .then((res) => {
          for (const val of res) {
            dataSet1.push(val.market_cap);
            labelSet.push(val.name);
          }
          setData({
            labels: labelSet,
            datasets: [
              {
                label: dataSet1,
                data: dataSet1,
                backgroundColor: ["#4ade80", "#60a5fa", "#f97316"],
                borderColor: ["#18181b"],
                borderWidth: 2,
                hoverOffset: 10,
                hoverBorderWidth: 4,
              },
            ],
          });
          setTotalVolume(
            dataSet1.reduce((partialSum, a) => partialSum + a, 0).toFixed(0)
          );
        })
        .catch((e) => console.error("Error fetching data", e));
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-gray-900 bg-opacity-30 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-white font-bold">Portfolio</h2>
          <p className="text-gray-400">Total Value</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-semibold text-white">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "usd",
            }).format(totalVolume)}
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-72 h-72">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
