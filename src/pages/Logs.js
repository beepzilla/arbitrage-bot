import React, { useState, useEffect } from 'react';
import { scanForOpportunities } from '../utils/arbitrage';

const Logs = ({ pairs, exchanges }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Fetch and scan for opportunities
        const fetchLogs = async () => {
            console.log('Scanning for arbitrage opportunities...');
            const opportunities = await scanForOpportunities(pairs, exchanges);
            setLogs(opportunities);
        };

        fetchLogs();
    }, [pairs, exchanges]);

    return (
        <div className="logs">
            <h2>Logs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Pair</th>
                        <th>Exchange 1</th>
                        <th>Exchange 2</th>
                        <th>Price 1</th>
                        <th>Price 2</th>
                        <th>Volume 1</th>
                        <th>Volume 2</th>
                        <th>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.pair}</td>
                            <td>{log.exchange1}</td>
                            <td>{log.exchange2}</td>
                            <td>{log.price1}</td>
                            <td>{log.price2}</td>
                            <td>{log.volume1}</td>
                            <td>{log.volume2}</td>
                            <td>{log.profit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Logs;
