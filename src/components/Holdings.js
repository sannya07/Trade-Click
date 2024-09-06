import React, { useState, useEffect } from "react";
import axios from 'axios';

const Holdings = () => {

  const [allHoldings, setAllHoldings] = useState([]);

  const getHoldings = () => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      if (res?.data) {
        console.log('allHoldings :- ', res.data);
        setAllHoldings(res.data);
      }
    }).catch((err) => {
      console.error('Error while fetching holdings: ', err);
    });
  };

  useEffect(() => {
    getHoldings();
  }, []);

  const sellOrder = (event) => {
    console.log('stock ', event._id);
    if (event._id) {
      let url = `http://localhost:3002/allHoldings?id=${event._id}`;
      axios.delete(url).then((res) => {
        if (res?.data) {
          console.log('Data deleted successfully: ', res.data);
          getHoldings();  // Fetch updated holdings after deletion
        }
      }).catch((err) => {
        console.error('Error while deleting data: ', err);
      });
    }
  };

  const calculatePnL = (stock) => {
    const curValue = stock?.price * stock?.qty;
    const totalCost = stock?.avg * stock?.qty;
    const pnl = curValue - totalCost;
    return pnl.toFixed(2);
  };

  const calculateTotalInvestment = () => {
    return allHoldings.reduce((acc, stock) => acc + (stock?.avg * stock?.qty), 0).toFixed(2);
  };

  const calculateCurrentValue = () => {
    return allHoldings.reduce((acc, stock) => acc + (stock?.price * stock?.qty), 0).toFixed(2);
  };

  const calculateTotalPnL = () => {
    return (calculateCurrentValue() - calculateTotalInvestment()).toFixed(2);
  };

  const calculateTotalQuantity = () => {
    return allHoldings.reduce((acc, stock) => acc + stock?.qty, 0);
  };

  const calculateAverageCost = () => {
    const totalInvestment = parseFloat(calculateTotalInvestment());
    const totalQuantity = calculateTotalQuantity();
    return (totalInvestment / totalQuantity).toFixed(2);
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock?.price * stock?.qty;
              const isProfit = curValue - stock?.avg * stock?.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock?.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock?.name}</td>
                  <td>{stock?.qty}</td>
                  <td>{stock?.avg?.toFixed(2)}</td>
                  <td>{stock?.price}</td>
                  <td>{curValue?.toFixed(2)}</td>
                  <td className={profClass}>
                    {calculatePnL(stock)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                  <td>
                    <button className="sell" style={{ cursor: 'pointer' }} onClick={() => sellOrder(stock)}> Sell </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{calculateTotalInvestment()}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{calculateCurrentValue()}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>{calculateAverageCost()}</h5>
          <p>Average cost</p>
        </div>
        <div className="col">
          <h5>{calculateTotalPnL()} ({((calculateTotalPnL() / calculateTotalInvestment()) * 100).toFixed(2)}%)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
