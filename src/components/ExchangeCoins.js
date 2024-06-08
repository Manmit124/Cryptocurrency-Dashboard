import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinList } from '../redux/action/action';
import selectIcon from "../assets/select-icon.svg";

export const ExchangeCoins = () => {
  const dispatch = useDispatch();
  const exchangeData = useSelector((state) => state.exchange);
  const [text1, settext1] = useState("");
  const [text2, settext2] = useState(1);
  const [units, setUnits] = useState("");
  const [value1, setvalue1] = useState(1);
  const [value2, setvalue2] = useState(1);
  const coin = exchangeData.coinList.rates;

  useEffect(() => {
    if (exchangeData.coinList.length === 0) {
      dispatch(fetchCoinList());
    }
  }, [dispatch, exchangeData.coinList.length]);

  const convert = () => {
    const unit = Object.values(coin).find((unit) => unit.value == value2);
    setUnits(unit.unit);
    let result = (value2 / value1) * text1;
    settext2(result);
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-xl border border-gray-700 shadow-2xl text-white">
      <h4 className="text-2xl font-semibold mb-6">Exchange Coins</h4>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="mb-4 md:mb-0 md:mr-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-red-400">Sell</label>
            <div className="relative">
              <select
                onChange={(e) => setvalue1(e.target.value)}
                className="w-full p-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {coin && Object.values(coin).map((d, k) => (
                  <option key={k} value={d.value} className='text-gray-900'>
                    {d.name}
                  </option>
                ))}
              </select>
              <img src={selectIcon} alt="selecticon" className="absolute right-2 top-2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-green-400">Buy</label>
            <div className="relative">
              <select
                onChange={(e) => setvalue2(e.target.value)}
                className="w-full p-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {coin && Object.values(coin).map((d, k) => (
                  <option key={k} value={d.value} className='text-gray-900'>
                    {d.name}
                  </option>
                ))}
              </select>
              <img src={selectIcon} alt="selecticon" className="absolute right-2 top-2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Enter value</label>
          <input
            type="number"
            className="w-full p-2 bg-gray-700 bg-opacity-50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
            placeholder=""
            value={text1 || ""}
            onChange={(e) => settext1(e.target.value)}
          />
          <p className="mt-4 text-lg text-green-400">{parseFloat(text2).toFixed(2)} {units}</p>
        </div>
      </div>
      <div className="text-center">
        <button onClick={convert} className="w-full py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Exchange
        </button>
      </div>
    </div>
  )
}
