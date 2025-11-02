import React, { useEffect, useState } from 'react';
import KPIChart from '../components/Charts/KPIChart';
import AgentEfficiencyChart from '../components/Charts/AgentEfficiencyChart';

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        totalCases: 0,
        resolvedCases: 0,
        pendingAmount: 0,
        efficiency: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const totalCases = Math.floor(100 + Math.random() * 50);
            const resolvedCases = Math.floor(totalCases * (0.4 + Math.random() * 0.3));
            const pendingAmount = Math.floor(20000 + Math.random() * 5000);
            const efficiency = Math.floor((resolvedCases / totalCases) * 100);

            setMetrics({ totalCases, resolvedCases, pendingAmount, efficiency });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard Overview</h1>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-gray-500">Total Cases</p>
                    <h2 className="text-3xl font-semibold text-indigo-600">{metrics.totalCases}</h2>
                </div>
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-gray-500">Resolved Cases</p>
                    <h2 className="text-3xl font-semibold text-green-500">{metrics.resolvedCases}</h2>
                </div>
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-gray-500">Pending Amount</p>
                    <h2 className="text-3xl font-semibold text-red-500">${metrics.pendingAmount}</h2>
                </div>
                <div className="bg-white shadow rounded p-4 text-center">
                    <p className="text-gray-500">Agent Efficiency</p>
                    <h2 className="text-3xl font-semibold text-blue-500">{metrics.efficiency}%</h2>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-2">Cases Overview</h3>
                    <KPIChart metrics={metrics} />
                </div>

                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-lg font-semibold mb-2">Agent Efficiency Trend</h3>
                    <AgentEfficiencyChart efficiency={metrics.efficiency} />
                </div>
            </div>
        </div>
    );
}
