import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCases, updateCase } from '../store/slices/caseSlice';
import { addLog } from '../store/slices/logSlice';
import Modal from '../components/UI/Modal';
import Table from '../components/UI/Table';

export default function CaseManagement() {
    const dispatch = useDispatch();
    const { list: cases, loading } = useSelector((state) => state.cases);
    const [selectedCase, setSelectedCase] = useState(null);
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('customer');
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
        dispatch(fetchCases());
    }, [dispatch]);

    const filteredCases = cases
        .filter((c) =>
            c.customer.toLowerCase().includes(search.toLowerCase()) ||
            c.loanId.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const valA = a[sortKey];
            const valB = b[sortKey];
            if (typeof valA === 'string')
                return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            return sortAsc ? valA - valB : valB - valA;
        });

    const handleStatusChange = (status) => {
        const updated = { ...selectedCase, status };
        dispatch(updateCase(updated));
        dispatch(
            addLog({
                message: `Case #${selectedCase.loanId} marked as ${status}`,
                timestamp: new Date().toISOString(),
            })
        );
        setSelectedCase(null);
    };

    const columns = [
        { header: 'Customer', accessor: 'customer' },
        { header: 'Loan ID', accessor: 'loanId' },
        { header: 'Amount ($)', accessor: 'amount' },
        { header: 'Assigned Agent', accessor: 'assignedAgent' },
        {
            header: 'Status',
            accessor: 'status',
            cell: (row) => (
                <span
                    className={`px-2 py-1 rounded text-xs ${row.status === 'Resolved'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            header: 'Action',
            accessor: 'action',
            cell: (row) => (
                <button
                    onClick={() => setSelectedCase(row)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                >
                    View
                </button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2 md:mb-0">
                    Case Management
                </h1>
                <input
                    type="text"
                    placeholder="Search by Customer or Loan ID..."
                    className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="flex justify-end space-x-2 text-sm text-gray-600">
                <label>Sort by:</label>
                <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="customer">Customer</option>
                    <option value="loanId">Loan ID</option>
                    <option value="amount">Amount</option>
                </select>
                <button
                    onClick={() => setSortAsc(!sortAsc)}
                    className="px-3 py-1 rounded border hover:bg-gray-100"
                >
                    {sortAsc ? '↑' : '↓'}
                </button>
            </div>

            {loading ? (
                <div className="text-center text-gray-500">Loading cases...</div>
            ) : (
                <Table columns={columns} data={filteredCases} />
            )}

            {/* Modal for case details */}
            <Modal
                isOpen={!!selectedCase}
                onClose={() => setSelectedCase(null)}
                title={selectedCase ? `Case Details - ${selectedCase.customer}` : ''}
            >
                {selectedCase && (
                    <div className="space-y-3">
                        <p>
                            <strong>Loan ID:</strong> {selectedCase.loanId}
                        </p>
                        <p>
                            <strong>Amount:</strong> ${selectedCase.amount}
                        </p>
                        <p>
                            <strong>Assigned Agent:</strong> {selectedCase.assignedAgent}
                        </p>
                        <p>
                            <strong>Status:</strong>{' '}
                            <span
                                className={`px-2 py-1 rounded text-xs ${selectedCase.status === 'Resolved'
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}
                            >
                                {selectedCase.status}
                            </span>
                        </p>
                        <div>
                            <strong>Payment History:</strong>
                            <ul className="mt-1 ml-4 text-sm text-gray-600 list-disc">
                                {selectedCase.paymentHistory?.map((p, idx) => (
                                    <li key={idx}>
                                        {p.date} — ${p.amount}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-3 border-t mt-3">
                            <h3 className="font-semibold mb-2 text-gray-700">
                                Update Status
                            </h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleStatusChange('Resolved')}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Mark Resolved
                                </button>
                                <button
                                    onClick={() => handleStatusChange('Pending')}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Mark Pending
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
