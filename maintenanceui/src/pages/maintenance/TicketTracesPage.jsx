

////// src/pages/TicketTracesPage.js
////import React, { useEffect, useState } from 'react';
////import { useNavigate, useLocation } from 'react-router-dom';
////import { getTicketTracesForTicket } from '../../api/ticketTraces';

////const statusInfo = {
////    1: { text: 'Pending', color: 'bg-rose-100 text-rose-700', icon: '⏱️' },
////    2: { text: 'Complete', color: 'bg-emerald-100 text-emerald-700', icon: '✅' },
////    3: { text: 'Refund', color: 'bg-amber-100 text-amber-700', icon: '🔄' }
////};

////export default function TicketTracesPage() {
////    const navigate = useNavigate();
////    const location = useLocation();
////    const ticket = location.state?.ticket;

////    const [traces, setTraces] = useState([]);
////    const [loading, setLoading] = useState(true);
////    const [error, setError] = useState('');

////    useEffect(() => {
////        const loadTraces = async () => {
////            if (!ticket?.Id) return;
////            try {
////                setLoading(true);
////                const res = await getTicketTracesForTicket(ticket.Id);
////                if (res.success) {
////                    setTraces(Array.isArray(res.data) ? res.data : []);
////                } else {
////                    setError('Failed to load traces');
////                }
////            } catch (err) {
////                setError(err.message || 'An error occurred');
////            } finally {
////                setLoading(false);
////            }
////        };

////        loadTraces();
////    }, [ticket?.Id]);

////    if (!ticket) {
////        return (
////            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
////                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
////                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-600 mb-4 mx-auto">
////                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
////                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
////                        </svg>
////                    </div>
////                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Ticket Not Found</h2>
////                    <p className="text-slate-600 mb-6">The ticket information is missing. Please go back and try again.</p>
////                    <button
////                        onClick={() => navigate('/tickets')}
////                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium shadow-md"
////                    >
////                        Back to Dashboard
////                    </button>
////                </div>
////            </div>
////        );
////    }

////    return (
////        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
////            <div className="max-w-4xl mx-auto">
////                <div className="text-center mb-10">
////                    <button
////                        onClick={() => navigate('/tickets')}
////                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium"
////                    >
////                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
////                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
////                        </svg>
////                        Back to Dashboard
////                    </button>

////                    <h1 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">
////                        Trace History
////                    </h1>
////                    <p className="mt-3 text-xl text-slate-600">
////                        For Ticket #{ticket.TicketNumber}
////                    </p>
////                </div>

////                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
////                    <div className="px-6 py-8 sm:p-10">
////                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
////                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-100">
////                                <p className="text-sm text-slate-500 mb-1">Ticket Number</p>
////                                <p className="font-bold text-lg text-indigo-700">#{ticket.TicketNumber}</p>
////                            </div>
////                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-100">
////                                <p className="text-sm text-slate-500 mb-1">Current Status</p>
////                                <p>
////                                    <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusInfo[ticket.TicketStatusId]?.color || 'bg-slate-100 text-slate-700'}`}>
////                                        {statusInfo[ticket.TicketStatusId]?.text || 'Unknown'}
////                                    </span>
////                                </p>
////                            </div>
////                            <div className="md:col-span-3 bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-100">
////                                <p className="text-sm text-slate-500 mb-1">Description</p>
////                                <p className="font-medium text-slate-800">{ticket.Description}</p>
////                            </div>
////                        </div>

////                        <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
////                            <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
////                            <h3 className="text-xl font-semibold text-slate-800">
////                                Trace Records
////                            </h3>
////                        </div>

////                        {error ? (
////                            <div className="bg-rose-50 text-rose-700 p-4 rounded-lg mb-6 border border-rose-100">
////                                <p className="font-medium">Error loading traces:</p>
////                                <p>{error}</p>
////                            </div>
////                        ) : null}

////                        {loading ? (
////                            <div className="text-center py-12">
////                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
////                                <p className="text-slate-500 font-medium">Loading trace history...</p>
////                            </div>
////                        ) : traces.length === 0 ? (
////                            <div className="text-center py-12 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
////                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
////                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
////                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
////                                    </svg>
////                                </div>
////                                <p className="text-lg font-medium text-slate-500">No trace records found for this ticket</p>
////                            </div>
////                        ) : (
////                            <div className="space-y-6">
////                                {traces.map((trace, index) => (
////                                    <div
////                                        key={trace.Id}
////                                        className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition bg-white relative"
////                                    >
////                                        <div className="absolute top-6 -left-1.5 w-3 h-3 rounded-full bg-indigo-500"></div>

////                                        {index !== traces.length - 1 && (
////                                            <div className="absolute top-9 -left-1.5 w-0.5 h-full bg-indigo-300"></div>
////                                        )}

////                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
////                                            <div className="flex-1">
////                                                <div className="flex flex-wrap items-center gap-3 mb-3">
////                                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusInfo[trace.StatusID]?.color || 'bg-slate-100 text-slate-700'}`}>
////                                                        {statusInfo[trace.StatusID]?.icon} {statusInfo[trace.StatusID]?.text || 'Unknown'}
////                                                    </span>
////                                                    <span className="text-sm text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
////                                                        User ID: {trace.UserID}
////                                                    </span>
////                                                </div>

////                                                {trace.Note && (
////                                                    <div className="mt-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
////                                                        <p className="text-slate-700 whitespace-pre-line">{trace.Note}</p>
////                                                    </div>
////                                                )}
////                                            </div>

////                                            <div className="text-right">
////                                                <div className="text-sm font-medium text-slate-900">
////                                                    {new Date(trace.CreateTime).toLocaleDateString()}
////                                                </div>
////                                                <div className="text-xs text-slate-500 mt-1">
////                                                    {new Date(trace.CreateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
////                                                </div>
////                                            </div>
////                                        </div>
////                                    </div>
////                                ))}
////                            </div>
////                        )}
////                    </div>
////                </div>
////            </div>
////        </div>
////    );
////}




//// src/pages/TicketTracesPage.js
//import React, { useEffect, useState } from 'react';
//import { useNavigate, useLocation } from 'react-router-dom';
//import { getTicketTracesForTicket } from '../../api/ticketTraces';

//// Enhanced status definitions with professional styling
//const statusInfo = {
//    1: {
//        text: 'Pending',
//        color: 'bg-amber-50 text-amber-700 border border-amber-100',
//        icon: '⏳',
//        dotColor: 'bg-amber-500'
//    },
//    2: {
//        text: 'Completed',
//        color: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
//        icon: '✓',
//        dotColor: 'bg-emerald-500'
//    },
//    3: {
//        text: 'Refunded',
//        color: 'bg-sky-50 text-sky-700 border border-sky-100',
//        icon: '↩️',
//        dotColor: 'bg-sky-500'
//    }
//};

//export default function TicketTracesPage() {
//    const navigate = useNavigate();
//    const location = useLocation();
//    const ticket = location.state?.ticket;
//    const [traces, setTraces] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState('');

//    useEffect(() => {
//        const loadTraces = async () => {
//            if (!ticket?.Id) return;
//            try {
//                setLoading(true);
//                const res = await getTicketTracesForTicket(ticket.Id);
//                if (res.success) {
//                    // Sort traces by creation time (newest first)
//                    const sortedTraces = [...(Array.isArray(res.data) ? res.data : [])]
//                        .sort((a, b) => new Date(b.CreateTime) - new Date(a.CreateTime));
//                    setTraces(sortedTraces);
//                } else {
//                    setError('Failed to load trace history');
//                }
//            } catch (err) {
//                setError(err.message || 'An error occurred while fetching trace history');
//            } finally {
//                setLoading(false);
//            }
//        };
//        loadTraces();
//    }, [ticket?.Id]);

//    if (!ticket) {
//        return (
//            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
//                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-200">
//                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4 mx-auto">
//                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                        </svg>
//                    </div>
//                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Ticket Information Missing</h2>
//                    <p className="text-slate-600 mb-6">The required ticket details could not be found. This may happen if you accessed this page directly without selecting a ticket first.</p>
//                    <button
//                        onClick={() => navigate('/tickets')}
//                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 font-medium shadow-md transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
//                    >
//                        Return to Ticket Dashboard
//                    </button>
//                </div>
//            </div>
//        );
//    }

//    return (
//        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-4 sm:px-6 lg:px-8">
//            <div className="max-w-4xl mx-auto">
//                <div className="text-center mb-10">
//                    <button
//                        onClick={() => navigate('/tickets')}
//                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition-colors duration-200 group"
//                    >
//                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 transition-transform duration-200 group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
//                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
//                        </svg>
//                        <span className="transition-colors duration-200 group-hover:text-indigo-900">Back to Dashboard</span>
//                    </button>
//                    <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl tracking-tight">
//                        Ticket Trace History
//                    </h1>
//                    <p className="mt-3 text-xl text-slate-600 max-w-2xl mx-auto">
//                        Comprehensive audit trail for ticket #{ticket.TicketNumber} showing all status changes and notes
//                    </p>
//                </div>

//                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
//                    <div className="px-6 py-8 sm:p-10">
//                        {/* Ticket Summary Section */}
//                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
//                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/70 transition-all duration-200 hover:border-slate-300">
//                                <p className="text-sm text-slate-500 mb-1.5 font-medium">Ticket Reference</p>
//                                <p className="font-bold text-lg text-indigo-700 tracking-wide">#{ticket.TicketNumber}</p>
//                            </div>
//                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/70 transition-all duration-200 hover:border-slate-300">
//                                <p className="text-sm text-slate-500 mb-1.5 font-medium">Current Status</p>
//                                <div className="mt-1">
//                                    <span className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold ${statusInfo[ticket.TicketStatusId]?.color || 'bg-slate-100 text-slate-700'}`}>
//                                        {statusInfo[ticket.TicketStatusId]?.icon} {statusInfo[ticket.TicketStatusId]?.text || 'Unknown'}
//                                    </span>
//                                </div>
//                            </div>
//                            <div className="md:col-span-3 bg-slate-50 p-5 rounded-xl border border-slate-200/70 transition-all duration-200 hover:border-slate-300">
//                                <p className="text-sm text-slate-500 mb-1.5 font-medium">Issue Description</p>
//                                <p className="font-medium text-slate-700 leading-relaxed">{ticket.Description}</p>
//                            </div>
//                        </div>

//                        {/* Trace Records Section */}
//                        <div className="mb-8">
//                            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-200">
//                                <div className="w-2 h-7 bg-indigo-600 rounded-full"></div>
//                                <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
//                                    Audit Trail
//                                </h3>
//                            </div>

//                            {error && (
//                                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-5 rounded-xl mb-6">
//                                    <div className="flex items-start">
//                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
//                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                        </svg>
//                                        <div>
//                                            <p className="font-medium">Error loading trace history</p>
//                                            <p className="mt-1 text-rose-600">{error}</p>
//                                        </div>
//                                    </div>
//                                </div>
//                            )}

//                            {loading ? (
//                                <div className="text-center py-16">
//                                    <div className="flex justify-center mb-5">
//                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//                                    </div>
//                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Retrieving Trace History</h3>
//                                    <p className="text-slate-500 max-w-md mx-auto">Please wait while we fetch the complete audit trail for this ticket. This may take a few seconds.</p>
//                                </div>
//                            ) : traces.length === 0 ? (
//                                <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200/70">
//                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-5 mx-auto">
//                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                        </svg>
//                                    </div>
//                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">No Trace Records Found</h3>
//                                    <p className="text-slate-500 max-w-md mx-auto mb-5">This ticket doesn't have any recorded activity yet. Trace records will appear here as the ticket status changes or notes are added.</p>
//                                    <button
//                                        onClick={() => window.location.reload()}
//                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors duration-200"
//                                    >
//                                        Refresh Page
//                                    </button>
//                                </div>
//                            ) : (
//                                <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200 before:rounded-full">
//                                    {traces.map((trace, index) => (
//                                        <div
//                                            key={trace.Id}
//                                            className={`relative pl-8 mb-8 last:mb-0 transition-all duration-200 ${index === 0 ? 'opacity-100' : 'opacity-90 hover:opacity-100'
//                                                }`}
//                                        >
//                                            {/* Timeline connector */}
//                                            {index !== 0 && (
//                                                <div className="absolute left-0 top-0 h-full w-0.5 bg-slate-200"></div>
//                                            )}

//                                            {/* Timeline dot */}
//                                            <div className={`absolute left-[-0.625rem] w-4 h-4 rounded-full border-4 ${statusInfo[trace.StatusID]?.dotColor || 'bg-slate-300'
//                                                } border-white shadow-md`}></div>

//                                            {/* Trace content */}
//                                            <div className="bg-white p-6 rounded-xl border border-slate-200/70 transition-all duration-200 hover:shadow-md hover:border-slate-300">
//                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
//                                                    <div className="flex-1">
//                                                        <div className="flex flex-wrap items-center gap-3 mb-3">
//                                                            <span className={`px-3.5 py-1.5 rounded-lg text-sm font-medium ${statusInfo[trace.StatusID]?.color || 'bg-slate-100 text-slate-700'}`}>
//                                                                {statusInfo[trace.StatusID]?.icon} {statusInfo[trace.StatusID]?.text || 'Unknown Status'}
//                                                            </span>
//                                                            <span className="text-sm text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/70">
//                                                                Agent ID: {trace.UserID}
//                                                            </span>
//                                                        </div>
//                                                        {trace.Note && (
//                                                            <div className="mt-3 bg-slate-50 p-4 rounded-lg border border-slate-200/70">
//                                                                <p className="text-slate-700 leading-relaxed whitespace-pre-line">{trace.Note}</p>
//                                                            </div>
//                                                        )}
//                                                    </div>
//                                                    <div className="text-right whitespace-nowrap">
//                                                        <div className="font-semibold text-slate-800">
//                                                            {new Date(trace.CreateTime).toLocaleDateString('en-US', {
//                                                                year: 'numeric',
//                                                                month: 'short',
//                                                                day: 'numeric'
//                                                            })}
//                                                        </div>
//                                                        <div className="text-sm text-slate-500 mt-1">
//                                                            {new Date(trace.CreateTime).toLocaleTimeString([], {
//                                                                hour: '2-digit',
//                                                                minute: '2-digit',
//                                                                hour12: true
//                                                            })}
//                                                        </div>
//                                                    </div>
//                                                </div>
//                                            </div>
//                                        </div>
//                                    ))}
//                                </div>
//                            )}
//                        </div>
//                    </div>
//                </div>

//                {/* Footer with additional information */}
//                <div className="mt-8 text-center text-slate-500 text-sm">
//                    <p>This audit trail is automatically generated and cannot be modified. Last updated: {new Date().toLocaleString()}</p>
//                </div>
//            </div>
//        </div>
//    );
//}


// src/pages/TicketTracesPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTicketTracesForTicket } from '../../api/ticketTraces';
import './TicketTracesPage.css';

const statusInfo = {
    1: { text: 'Pending', color: 'badge--pending', icon: '⏱️' },
    2: { text: 'Complete', color: 'badge--complete', icon: '✅' },
    3: { text: 'Refund', color: 'badge--refund', icon: '🔄' }
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
                if (res.success) setTraces(Array.isArray(res.data) ? res.data : []);
                else setError('Failed to load traces');
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
            <div className="center-card">
                <div className="empty-state">
                    <div className="icon icon--warn">⚠️</div>
                    <h2>Ticket Not Found</h2>
                    <p>The ticket information is missing. Please go back and try again.</p>
                    <button className="btn btn--primary" onClick={() => navigate('/tickets')}>
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="page">
            <div className="container">
                <button className="btn btn--back" onClick={() => navigate('/tickets')}>
                    <span className="arrow">←</span> Back to Dashboard
                </button>

                <header className="header">
                    <h1>Trace History</h1>
                    <p>For Ticket #{ticket.TicketNumber}</p>
                </header>

                <section className="ticket-card">
                    <div className="ticket-meta">
                        <div className="ticket-meta__item">
                            <label>Ticket Number</label>
                            <span>#{ticket.TicketNumber}</span>
                        </div>
                        <div className="ticket-meta__item">
                            <label>Current Status</label>
                            <span className={`badge ${statusInfo[ticket.TicketStatusId]?.color}`}>
                                {statusInfo[ticket.TicketStatusId]?.icon}{' '}
                                {statusInfo[ticket.TicketStatusId]?.text || 'Unknown'}
                            </span>
                        </div>
                        <div className="ticket-meta__item ticket-meta__item--full">
                            <label>Description</label>
                            <p>{ticket.Description}</p>
                        </div>
                    </div>
                </section>

                <section className="trace-section">
                    <h2 className="trace-section__title">Trace Records</h2>

                    {error && (
                        <div className="alert alert--error">
                            <p><strong>Error loading traces:</strong> {error}</p>
                        </div>
                    )}

                    {loading && (
                        <div className="loader">
                            <span className="spinner"></span>
                            <p>Loading trace history…</p>
                        </div>
                    )}

                    {!loading && traces.length === 0 && (
                        <div className="empty-state empty-state--small">
                            <div className="icon icon--info">📄</div>
                            <p>No trace records found for this ticket</p>
                        </div>
                    )}

                    {!loading && traces.length > 0 && (
                        <ol className="timeline">
                            {traces.map((trace, idx) => (
                                <li key={trace.Id} className="timeline__item">
                                    <div className="timeline__dot"></div>
                                    {idx !== traces.length - 1 && <div className="timeline__line"></div>}
                                    <div className="timeline__body">
                                        <div className="timeline__header">
                                            <span className={`badge ${statusInfo[trace.StatusID]?.color}`}>
                                                {statusInfo[trace.StatusID]?.icon}{' '}
                                                {statusInfo[trace.StatusID]?.text || 'Unknown'}
                                            </span>
                                            <small className="user-id">User ID: {trace.UserID}</small>
                                        </div>

                                        {trace.Note && (
                                            <blockquote className="timeline__note">
                                                {trace.Note}
                                            </blockquote>
                                        )}

                                        <time className="timeline__time">
                                            {new Date(trace.CreateTime).toLocaleString()}
                                        </time>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    )}
                </section>
            </div>
        </main>
    );
}