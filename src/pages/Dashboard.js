import React, { useState } from 'react';
import Web3 from 'web3';

function Dashboard() {
  const [account, setAccount] = useState(null);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('User denied account access');
      }
    } else {
      alert('MetaMask is not installed');
    }
  };

  return (
    <div className="content">
      <h2>Dashboard</h2>
      <p>Overview of balances, transactions, and arbitrage opportunities.</p>
      <button onClick={connectMetaMask}>
        {account ? `Connected: ${account}` : 'Connect MetaMask'}
      </button>
    </div>
  );
}

export default Dashboard;
