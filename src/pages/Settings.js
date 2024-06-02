import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

const Settings = () => {
    const [pairs, setPairs] = useState([]);
    const [exchanges, setExchanges] = useState([]);
    const [feeTiers, setFeeTiers] = useState({
        '0.01%': true,
        '0.3%': true,
        '1%': true
    });

    useEffect(() => {
        // Fetch pairs from the JSON file in the public directory
        axios.get('/pairs.json')
            .then(response => {
                console.log('Fetched pairs:', response.data);
                setPairs(response.data);
            })
            .catch(error => {
                console.error('Error fetching pairs:', error);
                setPairs([]); // Set pairs to an empty array in case of error
            });

        // Set up available exchanges
        setExchanges(['Uniswap', 'Sushiswap', 'Balancer']); // Add more exchanges as needed
    }, []);

    const handleFeeTierChange = (tier) => {
        setFeeTiers(prevState => ({
            ...prevState,
            [tier]: !prevState[tier]
        }));
    };

    return (
        <div className="settings">
            <h2>Settings</h2>
            <div>
                <h3>Exchanges</h3>
                <ul>
                    {exchanges.map(exchange => (
                        <li key={exchange}>{exchange}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Pairs</h3>
                <ul>
                    {Array.isArray(pairs) ? pairs.map(pair => (
                        <li key={pair}>{pair}</li>
                    )) : <li>No pairs available</li>}
                </ul>
            </div>
            <div>
                <h3>Fee Tiers</h3>
                {Object.keys(feeTiers).map(tier => (
                    <div key={tier}>
                        <input
                            type="checkbox"
                            checked={feeTiers[tier]}
                            onChange={() => handleFeeTierChange(tier)}
                        />
                        <label>{tier}</label>
                    </div>
                ))}
            </div>
            <Dashboard pairs={pairs} exchanges={exchanges} />
        </div>
    );
};

export default Settings;
