import React, { useState, useEffect } from 'react';
import { initiateFlashloan, scanForOpportunities } from '../utils/arbitrage';
import Logs from './Logs';

const Dashboard = ({ pairs, exchanges }) => {
    const [opportunities, setOpportunities] = useState([]);
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);

    useEffect(() => {
        const fetchOpportunities = async () => {
            console.log('Fetching opportunities...');
            const opportunities = await scanForOpportunities(pairs, exchanges);
            setOpportunities(opportunities.sort((a, b) => b.profit - a.profit));
        };

        fetchOpportunities();
    }, [pairs, exchanges]);

    const handleExecuteArbitrage = async (opportunity) => {
        setSelectedOpportunity(opportunity);
        const routerInfos = []; // Populate routerInfos with the required data
        await initiateFlashloan(opportunity.token0, opportunity.token1, opportunity.amount0, opportunity.amount1, opportunity.fee, routerInfos);
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <ul>
                {opportunities.map((opportunity, index) => (
                    <li key={index}>
                        {opportunity.pair} - Amount: {opportunity.volume1} - Profit: {opportunity.profit}
                        <button onClick={() => handleExecuteArbitrage(opportunity)}>Execute</button>
                    </li>
                ))}
            </ul>
            {selectedOpportunity && (
                <div>
                    <h3>Selected Opportunity</h3>
                    <p>{selectedOpportunity.pair} - Amount: {selectedOpportunity.volume1} - Profit: {selectedOpportunity.profit}</p>
                </div>
            )}
            <Logs pairs={pairs} exchanges={exchanges} />
        </div>
    );
};

export default Dashboard;
