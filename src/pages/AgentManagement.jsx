import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAgents,
    addAgent,
    updateAgent,
    deleteAgent,
} from '../store/slices/agentSlice';
import { addLog } from '../store/slices/logSlice';
import Modal from '../components/UI/Modal';
import Table from '../components/UI/Table';

export default function AgentManagement() {
    const dispatch = useDispatch();
    const { list: agents, loading } = useSelector((state) => state.agents);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [editingAgent, setEditingAgent] = useState(null);
    const [form, setForm] = useState({ name: '', cases: 0, recoveryRate: 0 });
    const [notification, setNotification] = useState('');

    useEffect(() => {
        dispatch(fetchAgents());
    }, [dispatch]);

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(''), 2500);
    };

    const handleOpenModal = (agent = null) => {
        setEditingAgent(agent);
        setForm(agent || { name: '', cases: 0, recoveryRate: 0 });
        setIsModalOpen(true);
    };

    const handleSaveAgent = () => {
        if (editingAgent) {
            dispatch(updateAgent({ ...editingAgent, ...form }));
            dispatch(
                addLog({
                    message: `Updated agent "${form.name}" details`,
                    timestamp: new Date().toISOString(),
                })
            );
            showNotification('Agent updated successfully');
        } else {
            dispatch(addAgent(form));
            dispatch(
                addLog({
                    message: `Added new agent "${form.name}"`,
                    timestamp: new Date().toISOString(),
                })
            );
            showNotification('Agent created successfully');
        }
        setIsModalOpen(false);
    };

    const confirmDeleteAgent = (agent) => {
        setConfirmDelete(agent);
    };

    const handleDeleteConfirmed = () => {
        dispatch(deleteAgent(confirmDelete.id));
        dispatch(
            addLog({
                message: `Deleted agent "${confirmDelete.name}"`,
                timestamp: new Date().toISOString(),
            })
        );
        showNotification('Agent deleted successfully');
        setConfirmDelete(null);
    };

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Cases Assigned', accessor: 'cases' },
        {
            header: 'Recovery Rate (%)',
            accessor: 'recoveryRate',
            cell: (row) => (
                <span
                    className={`px-2 py-1 rounded text-xs ${row.recoveryRate > 80
                            ? 'bg-green-100 text-green-600'
                            : row.recoveryRate > 50
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-600'
                        }`}
                >
                    {row.recoveryRate}
                </span>
            ),
        },
        {
            header: 'Action',
            accessor: 'action',
            cell: (row) => (
                <div className="flex space-x-3">
                    <button
                        onClick={() => handleOpenModal(row)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => confirmDeleteAgent(row)}
                        className="text-red-500 hover:text-red-700 text-sm"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const totalCases = agents.reduce((acc, a) => acc + a.cases, 0);
    const avgEfficiency =
        agents.length > 0
            ? (agents.reduce((acc, a) => acc + a.recoveryRate, 0) / agents.length).toFixed(1)
            : 0;

    return (
        <div className="space-y-6 relative">
            {/* Success notification */}
            {notification && (
                <div className="absolute top-2 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md animate-fadeIn">
                    {notification}
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2 md:mb-0">
                    Agent Management
                </h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Agent
                </button>
            </div>

            {/* KPI summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-gray-500 text-sm">Total Agents</p>
                    <h2 className="text-2xl font-semibold text-indigo-600">{agents.length}</h2>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-gray-500 text-sm">Total Cases Assigned</p>
                    <h2 className="text-2xl font-semibold text-green-600">{totalCases}</h2>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-gray-500 text-sm">Avg. Efficiency</p>
                    <h2 className="text-2xl font-semibold text-blue-600">{avgEfficiency}%</h2>
                </div>
            </div>

            {loading ? (
                <div className="text-center text-gray-500">Loading agents...</div>
            ) : (
                <Table columns={columns} data={agents} />
            )}

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingAgent ? 'Edit Agent' : 'Add Agent'}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="border border-gray-300 rounded w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Cases Assigned
                        </label>
                        <input
                            type="number"
                            value={form.cases}
                            onChange={(e) =>
                                setForm({ ...form, cases: parseInt(e.target.value) || 0 })
                            }
                            className="border border-gray-300 rounded w-full px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Recovery Rate (%)
                        </label>
                        <input
                            type="number"
                            value={form.recoveryRate}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    recoveryRate: parseInt(e.target.value) || 0,
                                })
                            }
                            className="border border-gray-300 rounded w-full px-3 py-2"
                        />
                    </div>

                    <div className="pt-3 border-t mt-3 flex justify-end">
                        <button
                            onClick={handleSaveAgent}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            {editingAgent ? 'Update' : 'Add'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!confirmDelete}
                onClose={() => setConfirmDelete(null)}
                title="Confirm Delete"
            >
                {confirmDelete && (
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Are you sure you want to delete agent{' '}
                            <strong>{confirmDelete.name}</strong>?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirmed}
                                className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}