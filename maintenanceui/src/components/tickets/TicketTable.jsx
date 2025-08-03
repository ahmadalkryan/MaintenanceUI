import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
        case 'new': return <FaExclamationCircle className="text-blue-500" />;
        case 'pending': return <FaClock className="text-yellow-500" />;
        case 'complete': return <FaCheckCircle className="text-green-500" />;
        case 'refund': return <FaExclamationCircle className="text-red-500" />;
        default: return <FaClock className="text-gray-500" />;
    }
};

const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
        case 'new': return 'bg-blue-100 text-blue-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'complete': return 'bg-green-100 text-green-800';
        case 'refund': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const TicketTable = ({ tickets = [] }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">التذكرة</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الإنشاء</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">آخر تحديث</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.map(ticket => (
                        <tr key={ticket.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">#{ticket.ticketNumber}</div>
                                        <div className="text-sm text-gray-500 line-clamp-1">
                                            {ticket.description}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {ticket.deviceCategory?.categoryName || 'غير محدد'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {getStatusIcon(ticket.statusText)}
                                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(ticket.statusText)}`}>
                                        {ticket.statusText}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div>{ticket.createdDate.format('YYYY-MM-DD')}</div>
                                <div className="text-xs text-gray-400">
                                    {ticket.createdDate.fromNow()}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div>{ticket.updatedDate.format('YYYY-MM-DD')}</div>
                                <div className="text-xs text-gray-400">
                                    {ticket.updatedDate.fromNow()}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link
                                    to={`/ticket/${ticket.id}`}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-900"
                                >
                                    <FaEye className="mr-1" />
                                  details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketTable;