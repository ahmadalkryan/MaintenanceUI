

// src/pages/TicketTracesPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTicketTracesForTicket } from '../../api/ticketTraces';

const statusInfo = {
    1: { text: 'Pending', color: 'bg-rose-100 text-rose-700', icon: '⏱️' },
    2: { text: 'Complete', color: 'bg-emerald-100 text-emerald-700', icon: '✅' },
    3: { text: 'Refund', color: 'bg-amber-100 text-amber-700', icon: '🔄' }
};

export default function TicketTracesPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const ticket = location.state?.ticket;

    const [traces, setTraces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadTraces = async () => {
            if (!ticket?.Id) return;
            try {
                setLoading(true);
                const res = await getTicketTracesForTicket(ticket.Id);
                if (res.success) {
                    setTraces(Array.isArray(res.data) ? res.data : []);
                } else {
                    setError('Failed to load traces');
                }
            } catch (err) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        loadTraces();
    }, [ticket?.Id]);

    if (!ticket) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-600 mb-4 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Ticket Not Found</h2>
                    <p className="text-slate-600 mb-6">The ticket information is missing. Please go back and try again.</p>
                    <button
                        onClick={() => navigate('/maintenance')}
                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium shadow-md"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <button
                        onClick={() => navigate('/maintenance')}
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Dashboard
                    </button>

                    <h1 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">
                        Trace History
                    </h1>
                    <p className="mt-3 text-xl text-slate-600">
                        For Ticket #{ticket.TicketNumber}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-6 py-8 sm:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-100">
                                <p className="text-sm text-slate-500 mb-1">Ticket Number</p>
                                <p className="font-bold text-lg text-indigo-700">#{ticket.TicketNumber}</p>
                            </div>
                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-100">
                                <p className="text-sm text-slate-500 mb-1">Current Status</p>
                                <p>
                                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusInfo[ticket.TicketStatusId]?.color || 'bg-slate-100 text-slate-700'}`}>
                                        {statusInfo[ticket.TicketStatusId]?.text || 'Unknown'}
                                    </span>
                                </p>
                            </div>
                            <div className="md:col-span-3 bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-100">
                                <p className="text-sm text-slate-500 mb-1">Description</p>
                                <p className="font-medium text-slate-800">{ticket.Description}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
                            <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
                            <h3 className="text-xl font-semibold text-slate-800">
                                Trace Records
                            </h3>
                        </div>

                        {error ? (
                            <div className="bg-rose-50 text-rose-700 p-4 rounded-lg mb-6 border border-rose-100">
                                <p className="font-medium">Error loading traces:</p>
                                <p>{error}</p>
                            </div>
                        ) : null}

                        {loading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                                <p className="text-slate-500 font-medium">Loading trace history...</p>
                            </div>
                        ) : traces.length === 0 ? (
                            <div className="text-center py-12 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-medium text-slate-500">No trace records found for this ticket</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {traces.map((trace, index) => (
                                    <div
                                        key={trace.Id}
                                        className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition bg-white relative"
                                    >
                                        <div className="absolute top-6 -left-1.5 w-3 h-3 rounded-full bg-indigo-500"></div>

                                        {index !== traces.length - 1 && (
                                            <div className="absolute top-9 -left-1.5 w-0.5 h-full bg-indigo-300"></div>
                                        )}

                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusInfo[trace.StatusID]?.color || 'bg-slate-100 text-slate-700'}`}>
                                                        {statusInfo[trace.StatusID]?.icon} {statusInfo[trace.StatusID]?.text || 'Unknown'}
                                                    </span>
                                                    <span className="text-sm text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                                                        User ID: {trace.UserID}
                                                    </span>
                                                </div>

                                                {trace.Note && (
                                                    <div className="mt-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                                        <p className="text-slate-700 whitespace-pre-line">{trace.Note}</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="text-right">
                                                <div className="text-sm font-medium text-slate-900">
                                                    {new Date(trace.CreateTime).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-slate-500 mt-1">
                                                    {new Date(trace.CreateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}