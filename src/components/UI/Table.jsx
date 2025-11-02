import React, { useState, useMemo } from 'react';

export default function Table({ columns, data }) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const totalPages = Math.ceil(data.length / pageSize);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [page, pageSize, data]);

    const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
    const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

    return (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.accessor} className="px-4 py-2 text-left">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                                No records found
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map((row, idx) => (
                            <tr
                                key={idx}
                                className="border-t hover:bg-gray-50 transition-colors text-sm"
                            >
                                {columns.map((col) => (
                                    <td key={col.accessor} className="px-4 py-2">
                                        {typeof col.cell === 'function'
                                            ? col.cell(row)
                                            : row[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between p-3 border-t text-sm text-gray-700 bg-gray-50">
                <div>
                    Page {page} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={`px-3 py-1 rounded ${page === 1
                            ? 'bg-gray-200 text-gray-400'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className={`px-3 py-1 rounded ${page === totalPages
                            ? 'bg-gray-200 text-gray-400'
                            : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        Next
                    </button>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(1);
                        }}
                        className="border rounded px-2 py-1 bg-white text-sm"
                    >
                        {[5, 10, 20].map((size) => (
                            <option key={size} value={size}>
                                {size} / page
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
