import React, { useState, useContext } from 'react';
import { PairContext } from '../context/PairContext';

function Settings() {
  const [baseToken, setBaseToken] = useState('');
  const [pairToken, setPairToken] = useState('');
  const [exchange, setExchange] = useState('sushiswap'); // Default to sushiswap
  const [fee, setFee] = useState(3000); // Default fee tier
  const { pairs, setPairs } = useContext(PairContext);

  const sanitizeAddress = (address) => address.trim();

  const addPair = () => {
    const sanitizedBaseToken = sanitizeAddress(baseToken);
    const sanitizedPairToken = sanitizeAddress(pairToken);
    setPairs([...pairs, { baseToken: sanitizedBaseToken, pairToken: sanitizedPairToken, exchange, fee }]);
    setBaseToken('');
    setPairToken('');
    setExchange('sushiswap'); // Reset to default exchange
    setFee(3000); // Reset to default fee tier
  };

  return (
    <div className="content">
      <h2>Settings</h2>
      <div>
        <input
          type="text"
          value={baseToken}
          placeholder="Base Token Address"
          onChange={(e) => setBaseToken(e.target.value)}
        />
        <input
          type="text"
          value={pairToken}
          placeholder="Pair Token Address"
          onChange={(e) => setPairToken(e.target.value)}
        />
        <select value={exchange} onChange={(e) => setExchange(e.target.value)}>
          <option value="sushiswap">SushiSwap</option>
          <option value="quickswap">QuickSwap</option>
          {/* Add other exchanges as needed */}
        </select>
        <select value={fee} onChange={(e) => setFee(e.target.value)}>
          <option value={500}>0.05%</option>
          <option value={3000}>0.3%</option>
          <option value={10000}>1%</option>
        </select>
        <button onClick={addPair}>Add Pair</button>
      </div>
      <h3>Saved Pairs</h3>
      <ul>
        {pairs.map((pair, index) => (
          <li key={index}>
            {`Base: ${pair.baseToken} - Pair: ${pair.pairToken} - Exchange: ${pair.exchange} - Fee: ${pair.fee}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Settings;
