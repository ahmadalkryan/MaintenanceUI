//import { useState } from 'react';

//export default function AddTraceModal({ ticket, onClose, onSave }) {
//    const [statusId, setStatusId] = useState('');
//    const [note, setNote] = useState('');
//    const [userId, setUserId] = useState('');

//    const handleSubmit = () => {
//        if (!statusId) return alert('Please select a status');
//        if (!userId) return alert('Please enter a User ID');
//        onSave({
//            ticketId: ticket.id,
//            statusId: Number(statusId),
//            note,
//            userId: userId.trim(),
//        });
//    };

//    return (
//        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
//                <h2 className="text-lg font-bold mb-4">Add Trace for Ticket #{ticket.ticketNumber}</h2>

//                <label className="block mb-1 text-sm font-medium">Status</label>
//                <select
//                    value={statusId}
//                    onChange={(e) => setStatusId(e.target.value)}
//                    className="w-full border border-slate-300 rounded px-3 py-2 mb-3"
//                >
//                    <option value="">Select status</option>
//                    <option value={1}>Pending</option>
//                    <option value={2}>Complete</option>
//                    <option value={3}>Refund</option>
//                </select>

//                <label className="block mb-1 text-sm font-medium">User ID</label>
//                <input
//                    type="text"
//                    placeholder="Enter User ID"
//                    value={userId}
//                    onChange={(e) => setUserId(e.target.value)}
//                    className="w-full border border-slate-300 rounded px-3 py-2 mb-3"
//                />

//                <label className="block mb-1 text-sm font-medium">Note</label>
//                <textarea
//                    value={note}
//                    onChange={(e) => setNote(e.target.value)}
//                    rows={3}
//                    placeholder="Optional note"
//                    className="w-full border border-slate-300 rounded px-3 py-2 mb-4"
//                />

//                <div className="flex gap-2 justify-end">
//                    <button
//                        onClick={onClose}
//                        className="px-4 py-2 text-sm bg-slate-200 rounded hover:bg-slate-300"
//                    >
//                        Cancel
//                    </button>
//                    <button
//                        onClick={handleSubmit}
//                        className="px-4 py-2 text-sm bg-sky-600 text-white rounded hover:bg-sky-700"
//                    >
//                        Save
//                    </button>
//                </div>
//            </div>
//        </div>
//    );
//}

//import { useState } from 'react';

//export default function AddTraceModal({ ticket, onClose, onSave }) {
//    const [statusId, setStatusId] = useState('');
//    const [note, setNote] = useState('');
//    const [userId, setUserId] = useState('');

//    const handleSubmit = () => {
//        const id = Number(userId.trim());
//        if (!statusId) return alert('Please select a status');
//        if (!id || id < 1) return alert('User ID must be ≥ 1');
//        // يمكنك إضافة شرط إضافي هنا إذا كان لديك عدد أقصى معروف
//        onSave({ ticketId: ticket.Id, statusId: Number(statusId), note, userId: id });
//    };

//    return (
//        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[999]">
//            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
//                <h2 className="text-lg font-bold mb-4">Add Trace for Ticket #{ticket.ticketNumber}</h2>

//                <label className="block mb-1 text-sm font-medium">Status</label>
//                <select
//                    value={statusId}
//                    onChange={(e) => setStatusId(e.target.value)}
//                    className="w-full border border-slate-300 rounded px-3 py-2 mb-3"
//                >
//                    <option value="">Select status</option>
//                    <option value={1}>Pending</option>
//                    <option value={2}>Complete</option>
//                    <option value={3}>Refund</option>
//                </select>

//                <label className="block mb-1 text-sm font-medium">User ID</label>
//                <input
//                    type="number"
//                    min={1}
//                    placeholder="Enter User ID"
//                    value={userId}
//                    onChange={(e) => setUserId(e.target.value)}
//                    className="w-full border border-slate-300 rounded px-3 py-2 mb-3"
//                />

//                <label className="block mb-1 text-sm font-medium">Note</label>
//                <textarea
//                    value={note}
//                    onChange={(e) => setNote(e.target.value)}
//                    rows={3}
//                    placeholder="Optional note"
//                    className="w-full border border-slate-300 rounded px-3 py-2 mb-4"
//                />

//                <div className="flex gap-2 justify-end">
//                    <button onClick={onClose} className="px-4 py-2 text-sm bg-slate-200 rounded hover:bg-slate-300">
//                        Cancel
//                    </button>
//                    <button onClick={handleSubmit} className="px-4 py-2 text-sm bg-sky-600 text-white rounded hover:bg-sky-700">
//                        Save
//                    </button>
//                </div>
//            </div>
//        </div>
//    );
//}

 
import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function AddTraceModal({ ticket, onClose, onSave }) {
    const [statusId, setStatusId] = useState('');
    const [note, setNote] = useState('');
    const [userId, setUserId] = useState('');

    const handleSubmit = () => {
        const id = Number(userId.trim());
        if (!statusId) return alert('Please select a status');
        if (!id || id < 1) return alert('User ID must be ≥ 1');

        onSave({ ticketId: ticket.Id, statusId: Number(statusId), note, userId: id });
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
                >
                    <FiX size={24} />
                </button>

                <h2 className="text-xl font-bold mb-6">
                    Add Trace – Ticket #{ticket.TicketNumber}
                </h2>

                <label className="block mb-1 text-sm font-medium">Status</label>
                <select
                    value={statusId}
                    onChange={(e) => setStatusId(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-sky-500"
                >
                    <option value="">Select status</option>
                    <option value={1}>Pending</option>
                    <option value={2}>Complete</option>
                    <option value={3}>Refund</option>
                </select>

                <label className="block mb-1 text-sm font-medium">User ID</label>
                <input
                    type="number"
                    min={1}
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-sky-500"
                />

                <label className="block mb-1 text-sm font-medium">Note (optional)</label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    placeholder="Write anything relevant…"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-6 resize-none focus:ring-2 focus:ring-sky-500"
                />

                <div className="flex gap-2 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-slate-200 rounded-lg hover:bg-slate-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}