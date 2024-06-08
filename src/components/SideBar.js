import React, { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import selectIcon from "../assets/select-icon.svg";
import Pagination from "./Pagination";

export const SideBar = () => {
  const { cryptoData, setSortBy, resetFunction, currency } = useContext(CryptoContext);

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl p-4">
      <div data-testid="Sidebar-1">
        <p className="text-white text-lg text-center font-semibold mb-4">
          Cryptocurrency By Market Cap
        </p>
      </div>

      {/* User can sort between cryptocurrencies */}
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center space-x-2">
          <select
            id="Sorting Options"
            name="sortby"
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 bg-opacity-50 text-white text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="text-gray-300" value="">Sort by</option>
            <option className="text-gray-300" value="market_cap_desc">Market Cap Desc</option>
            <option className="text-gray-300" value="market_cap_asc">Market Cap Asc</option>
            <option className="text-gray-300" value="volume_desc">Volume Desc</option>
            <option className="text-gray-300" value="volume_asc">Volume Asc</option>
            <option className="text-gray-300" value="id_desc">ID Desc</option>
            <option className="text-gray-300" value="id_asc">ID Asc</option>
            <option className="text-gray-300" value="gecko_desc">Gecko Desc</option>
            <option className="text-gray-300" value="gecko_asc">Gecko Asc</option>
          </select>
          <img
            src={selectIcon}
            alt="selecticon"
            className="w-4 h-4 absolute right-3 pointer-events-none"
          />
        </label>
        <button
          className="w-8 h-8 flex items-center justify-center bg-gray-700 bg-opacity-50 text-white rounded-lg hover:bg-gray-600 transition-all"
          onClick={resetFunction}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="w-full h-full fill-current"
          >
            <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z" />
            <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" />
          </svg>
        </button>
      </div>

      <div>
        {cryptoData ? (
          <div className="space-y-4">
            {cryptoData.map((cryptoData) => (
              <div
                key={cryptoData.id}
                className="flex items-center p-2 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-gray-600 transition"
              >
                <img
                  src={cryptoData.image}
                  alt={cryptoData.name}
                  className="w-6 h-6 mr-4"
                />
                <div className="flex flex-col flex-grow">
                  <span className="text-white text-sm font-semibold">
                    {cryptoData.name}
                  </span>
                  <span className={`text-xs font-semibold ${cryptoData.market_cap_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                    <i className={`mr-1 text-xs ${cryptoData.market_cap_change_percentage_24h > 0 ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}`}></i>
                    {parseFloat(cryptoData.market_cap_change_percentage_24h).toFixed(2)}%
                  </span>
                  <span className="text-xs text-gray-300">
                    Mkt. Cap: {new Intl.NumberFormat("en-IN", { style: "currency", currency: currency }).format(cryptoData.market_cap)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <Pagination />
    </div>
  );
};

export default SideBar;
