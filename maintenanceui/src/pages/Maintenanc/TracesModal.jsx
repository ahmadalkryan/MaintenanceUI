//import { useEffect, useState } from 'react';
//const getStatusText = (statusId) => {
//    switch (statusId) {
//        case 1: return 'Pending';
//        case 2: return 'Complete';
//        case 3: return 'Refund';
//        default: return 'Unknown';
//    }
//};
//const getStatusColor = (statusId) => {
//    switch (statusId) {
//        case 1: return 'bg-rose-100 text-rose-700';
//        case 2: return 'bg-emerald-100 text-emerald-700';
//        case 3: return 'bg-amber-100 text-amber-700';
//        default: return 'bg-slate-100 text-slate-700';
//    }
//};

//export default function TracesModal({ ticket, onClose, getTracesApi }) {
//    const [traces, setTraces] = useState([]);
//    const [loading, setLoading] = useState(true);

//    useEffect(() => {
//        const loadTraces = async () => {
//            if (!ticket?.Id) return;
//            try {
//                const res = await getTracesApi(ticket.Id);
//                setTraces(res.success ? res.data : []);
//            } catch (err) {
//                console.error(err);
//            } finally {
//                setLoading(false);
//            }
//        };
//        loadTraces();
//    }, [ticket?.id, getTracesApi]);

//    return (
//        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[80vh] flex flex-col">
//                <div className="flex justify-between items-center px-6 py-4 border-b">
//                    <h2 className="text-lg font-bold">Trace History - Ticket #{ticket.TicketNumber}</h2>
//                    <button onClick={onClose} className="text-2xl leading-none">&times;</button>
//                </div>

//                <div className="flex-1 overflow-y-auto p-4">
//                    {loading ? (
//                        <p className="text-center text-slate-500">Loading...</p>
//                    ) : traces.length === 0 ? (
//                        <p className="text-center text-slate-500">No trace entries</p>
//                    ) : (
//                        <ul className="space-y-3">
//                            {traces.map((t) => (
//                                <li key={t.Id} className="border-b pb-3">
//                                    <div className="flex justify-between text-xs text-slate-500">
//                                        <span>{new Date(t.CreateTime).toLocaleString()}</span>
//                                        <span>Status: {t.StatusID}</span>
//                                    </div>
//                                    {t.Note && <p className="mt-1 text-sm text-slate-700">{t.Note}</p>}
//                                </li>
//                            ))}
//                        </ul>
//                    )}
//                </div>

//                <div className="px-6 py-4 border-t text-right">
//                    <button
//                        onClick={onClose}
//                        className="px-4 py-2 text-sm bg-slate-200 rounded hover:bg-slate-300"
//                    >
//                        Close
//                    </button>
//                </div>
//            </div>
//        </div>
//    );
//}


import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

const statusLabels = { 1: 'Pending', 2: 'Complete', 3: 'Refund' };

export default function TracesModal({ ticket, onClose, getTracesApi }) {
    const [traces, setTraces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTraces = async () => {
            if (!ticket?.Id) return;
            try {
                const res = await getTracesApi(ticket.Id);
                setTraces(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadTraces();
    }, [ticket?.Id, getTracesApi]);

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-bold">
                        Trace History – Ticket #{ticket.TicketNumber}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition"
                    >
                        <FiX size={24} />
                    </button>
                </header>

                <section className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <p className="text-center text-slate-500 animate-pulse">Loading…</p>
                    ) : traces.length === 0 ? (
                        <p className="text-center text-slate-500">No trace entries</p>
                    ) : (
                        <ul className="space-y-4">
                            {traces.map((t) => (
                                <li
                                    key={t.Id}
                                    className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-slate-500">
                                            {new Date(t.CreateTime).toLocaleString()}
                                        </span>
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full font-semibold
                                                ${t.StatusID === 1
                                                    ? 'bg-rose-100 text-rose-700'
                                                    : t.StatusID === 2
                                                        ? 'bg-amber-100 text-amber-700'
                                                        : 'bg-emerald-100 text-emerald-700'}`}
                                        >
                                            {statusLabels[t.StatusID] || 'Unknown'}
                                        </span>
                                    </div>
                                    {t.Note && (
                                        <p className="text-sm text-slate-700 whitespace-pre-wrap">
                                            {t.Note}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <footer className="px-6 py-4 border-t text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-slate-200 rounded-lg hover:bg-slate-300 transition"
                    >
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
}