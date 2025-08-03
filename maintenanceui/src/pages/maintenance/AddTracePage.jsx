

// src/pages/AddTracePage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addTicketTrace } from '../../api/ticketTraces';

export default function AddTracePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const ticket = location.state?.ticket;

    const [statusId, setStatusId] = useState('');
    const [note, setNote] = useState('');
    const [userId, setUserId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const statusInfo = (statusId) => {
        switch (statusId) {
            case 1: return { text: 'Pending', color: 'bg-rose-100 text-rose-700' };
            case 2: return { text: 'Complete', color: 'bg-emerald-100 text-emerald-700' };
            case 3: return { text: 'Refund', color: 'bg-amber-100 text-amber-700' };
            default: return { text: 'Unknown', color: 'bg-slate-100 text-slate-700' };
        }
    };

    const handleSubmit = async () => {
        const id = Number(userId.trim());
        if (!statusId) return alert('Please select a status');
        if (!id || id < 1) return alert('User ID must be ≥ 1');

        setIsSubmitting(true);
        try {
            await addTicketTrace({
                ticketId: ticket.Id,
                statusId: Number(statusId),
                note,
                userId: id
            });
            navigate('/maintenance');
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">
                        Add New Trace
                    </h1>
                    <p className="mt-3 text-xl text-slate-600">
                        For Ticket #{ticket.TicketNumber}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-6 py-8 sm:p-10">
                        <div className="grid grid-cols-1 gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
                                    <h3 className="text-lg font-semibold text-slate-800">
                                        Ticket Information
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50 p-5 rounded-xl">
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-sm text-slate-500">Ticket Number</p>
                                        <p className="font-medium text-lg">#{ticket.TicketNumber}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-sm text-slate-500">Current Status</p>
                                        <p className="font-medium">
                                            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusInfo(ticket.TicketStatusId).color}`}>
                                                {statusInfo(ticket.TicketStatusId).text}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                                        <p className="text-sm text-slate-500">Description</p>
                                        <p className="font-medium text-slate-800">{ticket.Description}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-8 bg-indigo-500 rounded-full"></div>
                                    <h3 className="text-lg font-semibold text-slate-800">
                                        Trace Details
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-indigo-50 p-5 rounded-xl">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={statusId}
                                            onChange={(e) => setStatusId(e.target.value)}
                                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                        >
                                            <option value="">Select new status</option>
                                            <option value={1}>Pending</option>
                                            <option value={2}>Complete</option>
                                            <option value={3}>Refund</option>
                                        </select>
                                    </div>

                                    <div className="bg-indigo-50 p-5 rounded-xl">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            User ID
                                        </label>
                                        <input
                                            type="number"
                                            min={1}
                                            placeholder="Enter your User ID"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                        />
                                        <p className="mt-2 text-xs text-slate-500">Must be a number greater than 0</p>
                                    </div>

                                    <div className="bg-indigo-50 p-5 rounded-xl">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Note
                                        </label>
                                        <textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            rows={4}
                                            placeholder="Add details about this trace..."
                                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 px-6 py-5 sm:px-10 flex justify-between border-t border-slate-200">
                        <button
                            onClick={() => navigate('/maintenance')}
                            className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium shadow-sm transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 font-medium flex items-center gap-2 disabled:opacity-75 shadow-md transition"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Save Trace
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}