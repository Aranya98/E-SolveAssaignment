import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function KPIChart({ metrics }) {
    const data = [
        { name: 'Total', value: metrics.totalCases },
        { name: 'Resolved', value: metrics.resolvedCases },
        { name: 'Pending', value: metrics.pendingAmount / 1000 },
    ];

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
