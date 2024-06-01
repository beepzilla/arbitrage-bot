import React, { useEffect, useState, useContext } from 'react';
import { PairContext } from '../context/PairContext';
import { findArbitrageOpportunities } from '../services/arbitrageService';

function Logs() {
  const [logs, setLogs] = useState([]);
  const { pairs } = useContext(PairContext);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLogs((prevLogs) => [...prevLogs, 'Starting scan...']);
      const opportunities = await findArbitrageOpportunities(pairs);
      setLogs((prevLogs) => [
        ...prevLogs,
        `Scanned pairs: ${opportunities.length}`,
        ...opportunities.map(opportunity => `
          Opportunity detected:
          Base Token: ${opportunity.baseToken}
          Pair Token: ${opportunity.pairToken}
          Exchange: ${opportunity.exchange}
          Fee: ${opportunity.fee}
          Price Token0: ${opportunity.priceToken0}
          Price Token1: ${opportunity.priceToken1}
          Liquidity: ${opportunity.liquidity}
        `)
      ]);
    };

    fetchOpportunities();
    const interval = setInterval(fetchOpportunities, 60000); // Scan every 60 seconds

    return () => clearInterval(interval);
  }, [pairs]);

  return (
    <div className="content">
      <h2>Logs</h2>
      {logs.length === 0 ? (
        <p>No logs yet.</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Logs;
