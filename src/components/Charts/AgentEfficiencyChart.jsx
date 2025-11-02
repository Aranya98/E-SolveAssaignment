import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function AgentEfficiencyChart({ efficiency }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (efficiency > 0) {
            setData((prev) => [
                ...prev.slice(-9), // keep last 10 points
                {
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                    eff: efficiency,
                },
            ]);
        }
    }, [efficiency]);

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Line
                    type="monotone"
                    dataKey="eff"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    isAnimationActive={true}
                    animationDuration={600}
                    animationEasing="ease-in-out"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
