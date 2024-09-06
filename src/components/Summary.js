import React, { useState, useEffect } from "react";
import axios from 'axios';

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [pnl, setPnL] = useState(0);

  const fetchHoldingsData = () => {
    axios.get("http://localhost:3002/allHoldings")
      .then((res) => {
        if (res?.data) {
          const holdingsData = res.data;
          setHoldings(holdingsData);

          // Calculate total investment, current value, and P&L
          const totalInvest = holdingsData.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
          const curValue = holdingsData.reduce((acc, stock) => acc + (stock.price * stock.qty), 0);
          const totalPnL = curValue - totalInvest;

          setTotalInvestment(totalInvest.toFixed(2));
          setCurrentValue(curValue.toFixed(2));
          setPnL(totalPnL.toFixed(2));
        }
      })
      .catch((err) => {
        console.error('Error fetching holdings data: ', err);
      });
  };

  useEffect(() => {
    fetchHoldingsData();
  }, []);

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {/* {pnl} <small>{((pnl / totalInvestment) * 100).toFixed(2)}%</small>{" "} */}
              {0} <small>{"0"}</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{currentValue}</span>{" "}
            </p>
            <p>
              Investment <span>{currentValue}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
