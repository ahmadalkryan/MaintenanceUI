



// src/pages/MaintenanceDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTickets } from '../../api/tickets';

const PAGE_SIZE = 10;

export default function MaintenanceDashboard() {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const loadTickets = async (pageNum = 1) => {
        try {
            setLoading(true);
            const res = await getAllTickets();
            if (res.success) {
                const all = Array.isArray(res.data) ? res.data : [];
                const start = (pageNum - 1) * PAGE_SIZE;
                const slice = all.slice(start, start + PAGE_SIZE);
                setTickets(slice);
                setTotalPages(Math.ceil(all.length / PAGE_SIZE));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTickets(page);
    }, [page]);

    const statusInfo = (statusId) => {
        switch (statusId) {
            case 1: return { text: 'Pending', color: 'bg-rose-100 text-rose-700', icon: '⏱️' };
            case 2: return { text: 'Complete', color: 'bg-emerald-100 text-emerald-700', icon: '✅' };
            case 3: return { text: 'Refund', color: 'bg-amber-100 text-amber-700', icon: '🔄' };
            default: return { text: 'Unknown', color: 'bg-slate-100 text-slate-700', icon: '❓' };
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-indigo-800">Maintenance Dashboard</h1>
                        <p className="text-slate-600 mt-2">Manage all maintenance tickets and their traces</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium shadow-md transition-all transform hover:scale-105"
                            onClick={() => navigate('/maintenance/new-ticket')}
                        >
                            + New Ticket
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                        <p className="mt-4 text-slate-500 font-medium">Loading tickets...</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">Ticket #</th>
                                            <th className="px-6 py-4 font-medium">Description</th>
                                            <th className="px-6 py-4 font-medium">Status</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {tickets.map((t) => (
                                            <tr key={t.Id} className="hover:bg-indigo-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-indigo-700">#{t.TicketNumber}</td>
                                                <td className="px-6 py-4 max-w-xs truncate">{t.Description}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${statusInfo(t.TicketStatusId).color}`}>
                                                        {statusInfo(t.TicketStatusId).icon} {statusInfo(t.TicketStatusId).text}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => navigate('/maintenance/add-trace', { state: { ticket: t } })}
                                                            className="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 font-medium transition shadow-sm"
                                                        >
                                                            Add Trace
                                                        </button>
                                                        <button
                                                            onClick={() => navigate('/maintenance/traces', { state: { ticket: t } })}
                                                            className="text-xs bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 py-2 rounded-lg hover:from-slate-700 hover:to-slate-800 font-medium transition shadow-sm"
                                                        >
                                                            Trace History
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {tickets.length === 0 && (
                                <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-medium text-slate-500">No maintenance tickets found</p>
                                    <p className="text-slate-400 mt-1">Create a new ticket to get started</p>
                                </div>
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className={`px-4 py-2 rounded-lg font-medium ${page === 1
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                        }`}
                                >
                                    &larr; Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`px-4 py-2 rounded-lg font-medium ${page === p
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className={`px-4 py-2 rounded-lg font-medium ${page === totalPages
                                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                        }`}
                                >
                                    Next &rarr;
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}








