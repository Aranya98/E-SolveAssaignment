import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ActivityLog() {
    const logs = useSelector((state) => state.logs.list);
    const [search, setSearch] = useState('');
    const [collapsed, setCollapsed] = useState({});
    const [filterDate, setFilterDate] = useState('');

    // Group logs by date
    const groupedLogs = useMemo(() => {
        const filtered = logs
            .filter((log) =>
                log.message.toLowerCase().includes(search.toLowerCase())
            )
            .filter((log) =>
                filterDate ? log.timestamp.startsWith(filterDate) : true
            );

        return filtered.reduce((groups, log) => {
            const date = new Date(log.timestamp).toLocaleDateString();
            if (!groups[date]) groups[date] = [];
            groups[date].push(log);
            return groups;
        }, {});
    }, [logs, search, filterDate]);

    const toggleCollapse = (date) =>
        setCollapsed((prev) => ({ ...prev, [date]: !prev[date] }));

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Activity Log
                </h1>
                <div className="flex flex-wrap gap-2">
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm w-48"
                    />
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <button
                        onClick={() => {
                            setSearch('');
                            setFilterDate('');
                        }}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {Object.keys(groupedLogs).length === 0 ? (
                <div className="text-center text-gray-500 mt-6">
                    No logs found for current filter.
                </div>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedLogs).map(([date, logsForDate]) => (
                        <div
                            key={date}
                            className="bg-white shadow rounded border border-gray-100"
                        >
                            <div
                                className="flex justify-between items-center bg-gray-50 px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
                                onClick={() => toggleCollapse(date)}
                            >
                                <h2 className="text-gray-700 font-semibold">{date}</h2>
                                <span className="text-sm text-gray-500">
                                    {collapsed[date] ? '▶' : '▼'}
                                </span>
                            </div>

                            <div
                                className={`transition-all overflow-hidden ${collapsed[date] ? 'max-h-0' : 'max-h-[500px]'
                                    }`}
                            >
                                <ul className="divide-y divide-gray-100 p-4">
                                    {logsForDate.map((log, idx) => (
                                        <li
                                            key={idx}
                                            className="py-2 flex items-start space-x-3 animate-slideIn"
                                        >
                                            <span className="text-xs text-gray-400 w-24 shrink-0">
                                                {new Date(log.timestamp).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>
                                            <div className="flex-1 text-gray-700">
                                                <span className="block">{log.message}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}