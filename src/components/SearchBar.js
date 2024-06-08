import debounce from "lodash.debounce";
import React, { useContext, useRef, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import selectIcon from "../assets/select-icon.svg";
import "../App.css";

const SearchInput = ({ handleSearch }) => {
  const [query, setQuery] = useState("");
  const { results, setCoin, setResults } = useContext(CryptoContext);

  const handleInputChange = (e) => {
    e.preventDefault();
    let searchQuery = e.target.value;
    setQuery(searchQuery);
    handleSearch(searchQuery);
  };

  const chooseCoin = (coin) => {
    setCoin(coin);
    setQuery("");
    setResults();
  };

  return (
    <>
      <form className="flex pl-2 w-full font-body">
        <div className="flex flex-grow rounded-lg shadow-lg bg-white">
          <div className="flex flex-grow items-center text-white relative">
            <span className="absolute text-[13px] lg:text-[13px] sm:text-[12px] md:text-[14px] ml-4 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7c-3.868 0-7 3.132-7 7c0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
                />
              </svg>
            </span>
            <input
              type="search"
              name="query"
              id="searchTextDesktop"
              required
              value={query}
              onChange={handleInputChange}
              className="flex border-none shadow-lg focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-white placeholder-gray-400
               md:text-md sm:text-md w-full pl-12 py-3 pr-2 rounded-lg overflow-hidden outline-none"
              placeholder="Search for a cryptocurrency"
            />
          </div>
        </div>
      </form>
      {query.length > 0 && (
        <ul
          id="searchbar"
          className="absolute top-16 right-0 w-full max-h-96 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg overflow-auto z-10"
        >
          {results ? (
            results.map((coin) => (
              <li
                className="flex items-center p-2 cursor-pointer hover:bg-gray-700 transition duration-200"
                key={coin.id}
                onClick={() => chooseCoin(coin.id)}
              >
                <img
                  className="w-6 h-6 mr-2 rounded-full"
                  src={coin.thumb}
                  alt={`${coin.id} thumbnail`}
                />
                <span className="text-white">{coin.id}</span>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center py-4">
              <div
                className="w-8 h-8 border-4 border-gray-600 rounded-full border-b-gray-200 animate-spin"
                role="status"
              />
              <span className="ml-2 font-semibold text-white">Searching...</span>
            </div>
          )}
          <div className="flex justify-center items-center py-4 font-semibold text-white">
            Not found
          </div>
        </ul>
      )}
    </>
  );
};

export const SearchBar = () => {
  const { getSearchResult, setCurrency, currency } = useContext(CryptoContext);
  const currencyRef = useRef();

  const handleCurrencyChange = (e) => {
    e.preventDefault();
    let selectedCurrency = currencyRef.current.value;
    setCurrency(selectedCurrency);
    currencyRef.current.value = "";
  };

  const debounceSearch = debounce((val) => {
    getSearchResult(val);
  }, 2000);

  return (
    <>
      <div className="flex items-center gap-4">
        <span className="flex shadow-lg rounded-lg">
          <select
            value={currency}
            onChange={handleCurrencyChange}
            ref={currencyRef}
            className="border-none text-gray-900 p-2 bg-gray-300 outline-none font-body pr-8 pl-2 rounded-lg cursor-pointer bg-opacity-90 hover:bg-opacity-100 transition duration-200"
          >
            <option value={"usd"}>USD</option>
            <option value={"inr"}>INR</option>
            <option value={"eur"}>EUR</option>
            <option value={"jpy"}>JPY</option>
            <option value={"aud"}>AUD</option>
            <option value={"nzd"}>NZD</option>
            <option value={"cad"}>CAD</option>
            <option value={"gbp"}>GBP</option>
          </select>
          <img
            src={selectIcon}
            alt="select"
            className="w-4 h-4 absolute top-3 right-3 pointer-events-none"
          />
        </span>
        <div className="relative w-full">
          <SearchInput handleSearch={debounceSearch} />
        </div>
      </div>
    </>
  );
};
