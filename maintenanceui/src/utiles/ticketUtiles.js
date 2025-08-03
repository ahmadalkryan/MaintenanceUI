// utils/ticketUtils.js
export  const mapTicketStatus = (statusId) => {
    const statusMap = {
        1: 'جديدة',
        2: 'قيد المعالجة',
        3: 'مكتملة',
        4: 'مرفوضة'
    };
    return statusMap[statusId] || 'غير معروفة';
};
import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaTicketAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const TicketTable = ({ tickets = [], showActions = false }) => {
    const getStatusConfig = (status) => {
        const statusLower = status?.toLowerCase() || '';
        switch (statusLower) {
            case 'new':
                return {
                    bg: 'bg-blue-50',
                    text: 'text-blue-800',
                    border: 'border-blue-100',
                    icon: <FaClock className="mr-1" />
                };
            case 'pending':
                return {
                    bg: 'bg-yellow-50',
                    text: 'text-yellow-800',
                    border: 'border-yellow-100',
                    icon: <FaClock className="mr-1" />
                };
            case 'complete':
                return {
                    bg: 'bg-green-50',
                    text: 'text-green-800',
                    border: 'border-green-100',
                    icon: <FaCheckCircle className="mr-1" />
                };
            case 'refund':
                return {
                    bg: 'bg-red-50',
                    text: 'text-red-800',
                    border: 'border-red-100',
                    icon: <FaTimesCircle className="mr-1" />
                };
            default:
                return {
                    bg: 'bg-gray-50',
                    text: 'text-gray-800',
                    border: 'border-gray-100',
                    icon: null
                };
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                            Ticket #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                            Device Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                            Created Date
                        </th>
                        {showActions && (
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.map(ticket => {
                        const statusConfig = getStatusConfig(ticket.statusText);
                        return (
                            <tr
                                key={ticket.id}
                                className={`hover:bg-gray-50 transition-colors ${statusConfig.border}`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <FaTicketAlt className="text-gray-400 mr-2" />
                                        <div className="text-sm font-medium text-gray-900">{ticket.ticketNumber}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 line-clamp-2">
                                        {ticket.description}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {ticket.deviceCategory?.categoryName || 'N/A'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${statusConfig.bg} ${statusConfig.text}`}>
                                        {statusConfig.icon}
                                        {ticket.statusText}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {new Date(ticket.createdDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {new Date(ticket.createdDate).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </td>
                                {showActions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/ticket/${ticket.id}`}
                                            className="inline-flex items-center text-blue-600 hover:text-blue-900 transition-colors"
                                        >
                                            <FaEye className="mr-1" />
                                            View Details
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {tickets.length === 0 && (
                <div className="flex flex-col items-center py-12 text-center">
                    <div className="text-6xl text-gray-300 mb-4">📋</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tickets To Display</h3>
                    <p className="text-gray-500 max-w-md">
                        There are currently no tickets matching your criteria
                    </p>
                </div>
            )}
        </div>
    );
};

export default TicketTable;

//////import React, { useState, useEffect } from 'react';
//////import { filterTickets, mapTicketStatus } from '../../api/tickets';
//////import TicketTable from '../../components/tickets/TicketTable';
//////import TicketFilter from '../../components/tickets/TicketFilter';

//////const AllTickets = () => {
//////    const [tickets, setTickets] = useState([]);
//////    const [filteredTickets, setFilteredTickets] = useState([]);
//////    const [isLoading, setIsLoading] = useState(true);
//////    const [filterLoading, setFilterLoading] = useState(false);
//////    const [error, setError] = useState('');

//////    useEffect(() => {
//////        const fetchTickets = async () => {
//////            try {
//////                setIsLoading(true);
//////                const result = await filterTickets({});

//////                if (result.success) {
//////                    const ticketsWithStatus = result.data.map(ticket => ({
//////                        ...ticket,
//////                        statusText: mapTicketStatus(ticket.ticketStatusId),
//////                        createdDate: new Date(ticket.createdDate)
//////                    }));

//////                    setTickets(ticketsWithStatus);
//////                    setFilteredTickets(ticketsWithStatus);
//////                } else {
//////                    throw new Error(result.message);
//////                }
//////            } catch (err) {
//////                setError(err.message || 'Failed to load tickets');
//////            } finally {
//////                setIsLoading(false);
//////            }
//////        };

//////        fetchTickets();
//////    }, []);

//////    const handleFilter = async (filters) => {
//////        try {
//////            setFilterLoading(true);
//////            setError('');

//////            // Use API filtering for complex filters
//////            if (filters.CreatedDate || filters.DeciveCategoryId) {
//////                const result = await filterTickets(filters);
//////                if (result.success) {
//////                    const filtered = result.data.map(t => ({
//////                        ...t,
//////                        statusText: mapTicketStatus(t.ticketStatusId),
//////                        createdDate: new Date(t.createdDate)
//////                    }));
//////                    setFilteredTickets(filtered);
//////                } else {
//////                    setError(result.message);
//////                }
//////                return;
//////            }

//////            // Local filtering for simple operations
//////            let result = [...tickets];

//////            if (filters.ticketNumber) {
//////                result = result.filter(t =>
//////                    t.ticketNumber.toLowerCase().includes(filters.ticketNumber.toLowerCase())
//////                );
//////            }

//////            if (filters.status) {
//////                result = result.filter(t => t.statusText === filters.status);
//////            }

//////            if (filters.startDate) {
//////                const start = new Date(filters.startDate);
//////                result = result.filter(t => t.createdDate >= start);
//////            }

//////            if (filters.endDate) {
//////                const end = new Date(filters.endDate);
//////                end.setHours(23, 59, 59, 999); // Include entire end day
//////                result = result.filter(t => t.createdDate <= end);
//////            }

//////            setFilteredTickets(result);
//////        } catch (err) {
//////            setError('An error occurred during filtering');
//////        } finally {
//////            setFilterLoading(false);
//////        }
//////    };

//////    return (
//////        <div style={pageStyles.container}>
//////            <div style={pageStyles.header}>
//////                <h2 style={pageStyles.title}>All Maintenance Tickets</h2>
//////                <p style={pageStyles.subtitle}>View and manage all maintenance requests</p>
//////            </div>

//////            {error && (
//////                <div style={messageStyles.error}>
//////                    <span style={messageStyles.icon}>⚠️</span> {error}
//////                </div>
//////            )}

//////            <div style={styles.filterSection}>
//////                <TicketFilter
//////                    onFilter={handleFilter}
//////                    showDateFilter={true}
//////                    isLoading={filterLoading}
//////                />
//////            </div>

//////            {isLoading || filterLoading ? (
//////                <div style={styles.loader}>
//////                    <div style={styles.spinner}></div>
//////                    <p>Loading tickets data...</p>
//////                </div>
//////            ) : (
//////                <div style={styles.tableContainer}>
//////                    {filteredTickets.length === 0 ? (
//////                        <div style={styles.noResults}>
//////                            <div style={styles.noResultsIcon}>📭</div>
//////                            <h3>No Tickets Found</h3>
//////                            <p>Try adjusting your search criteria</p>
//////                        </div>
//////                    ) : (
//////                        <TicketTable
//////                            tickets={filteredTickets}
//////                            showActions={true}
//////                        />
//////                    )}
//////                </div>
//////            )}
//////        </div>
//////    );
//////};

////import React, { useState, useEffect } from 'react';
////import { filterTickets, mapTicketStatus } from '../../api/tickets';
////import TicketTable from '../../components/tickets/TicketTable';
////import TicketFilter from '../../components/tickets/TicketFilter';

////const AllTickets = () => {
////    const [tickets, setTickets] = useState([]);
////    const [filteredTickets, setFilteredTickets] = useState([]);
////    const [isLoading, setIsLoading] = useState(true);
////    const [filterLoading, setFilterLoading] = useState(false);
////    const [error, setError] = useState('');
////    const [deviceCategories, setDeviceCategories] = useState([]);

////    useEffect(() => {
////        const fetchTickets = async () => {
////            try {
////                setIsLoading(true);
////                const result = await filterTickets({});

////                if (result.success) {
////                    const ticketsWithStatus = result.data.map(ticket => ({
////                        ...ticket,
////                        statusText: mapTicketStatus(ticket.ticketStatusId),
////                        createdDate: new Date(ticket.createdDate)
////                    }));

////                    setTickets(ticketsWithStatus);
////                    setFilteredTickets(ticketsWithStatus);
////                } else {
////                    throw new Error(result.message);
////                }
////            } catch (err) {
////                setError(err.message || 'Failed to load tickets');
////            } finally {
////                setIsLoading(false);
////            }
////        };

////        fetchTickets();
////    }, []);

////    const handleFilter = async (filters) => {
////        try {
////            setFilterLoading(true);
////            setError('');

////            // إرسال طلب التصفية إلى الباك إند
////            const result = await filterTickets(filters);

////            if (result.success) {
////                const filtered = result.data.map(t => ({
////                    ...t,
////                    statusText: mapTicketStatus(t.ticketStatusId),
////                    createdDate: new Date(t.createdDate)
////                }));
////                setFilteredTickets(filtered);
////            } else {
////                setError(result.message);
////            }
////        } catch (err) {
////            setError('An error occurred during filtering');
////        } finally {
////            setFilterLoading(false);
////        }
////    };

////    return (
////        <div style={pageStyles.container}>
////            <div style={pageStyles.header}>
////                <h2 style={pageStyles.title}>All Maintenance Tickets</h2>
////                <p style={pageStyles.subtitle}>View and manage all maintenance requests</p>
////            </div>

////            {error && (
////                <div style={messageStyles.error}>
////                    <span style={messageStyles.icon}>⚠️</span> {error}
////                </div>
////            )}

////            <div style={styles.filterSection}>
////                <TicketFilter
////                    onFilter={handleFilter}
////                    showDateFilter={true}
////                    isLoading={filterLoading}
////                    categories={deviceCategories}
////                />
////            </div>

////            {isLoading || filterLoading ? (
////                <div style={styles.loader}>
////                    <div style={styles.spinner}></div>
////                    <p>Loading tickets data...</p>
////                </div>
////            ) : (
////                <div style={styles.tableContainer}>
////                    {filteredTickets.length === 0 ? (
////                        <div style={styles.noResults}>
////                            <div style={styles.noResultsIcon}>📭</div>
////                            <h3>No Tickets Found</h3>
////                            <p>Try adjusting your search criteria</p>
////                        </div>
////                    ) : (
////                        <TicketTable
////                            tickets={filteredTickets}
////                            showActions={true}
////                        />
////                    )}
////                </div>
////            )}
////        </div>
////    );
////};

////// ... (الأنماط تبقى كما هي)


////const pageStyles = {
////    container: {
////        maxWidth: '1200px',
////        margin: '0 auto',
////        padding: '30px 20px',
////        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
////    },
////    header: {
////        marginBottom: '30px'
////    },
////    title: {
////        fontSize: '28px',
////        fontWeight: '600',
////        color: '#2c3e50',
////        marginBottom: '8px'
////    },
////    subtitle: {
////        fontSize: '16px',
////        color: '#7f8c8d',
////        margin: 0
////    }
////};

////const messageStyles = {
////    error: {
////        backgroundColor: '#ffebee',
////        color: '#c62828',
////        padding: '15px',
////        borderRadius: '8px',
////        marginBottom: '25px',
////        display: 'flex',
////        alignItems: 'center',
////        borderLeft: '4px solid #c62828'
////    },
////    icon: {
////        marginRight: '10px',
////        fontSize: '20px'
////    }
////};

////const styles = {
////    filterSection: {
////        backgroundColor: '#ffffff',
////        borderRadius: '10px',
////        padding: '20px',
////        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
////        marginBottom: '30px'
////    },
////    loader: {
////        display: 'flex',
////        flexDirection: 'column',
////        alignItems: 'center',
////        justifyContent: 'center',
////        padding: '40px',
////        backgroundColor: '#f8f9fa',
////        borderRadius: '10px',
////        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
////    },
////    spinner: {
////        width: '50px',
////        height: '50px',
////        border: '5px solid #f3f3f3',
////        borderTop: '5px solid #3498db',
////        borderRadius: '50%',
////        animation: 'spin 1s linear infinite',
////        marginBottom: '15px'
////    },
////    tableContainer: {
////        backgroundColor: '#ffffff',
////        borderRadius: '10px',
////        overflow: 'hidden',
////        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
////    },
////    noResults: {
////        padding: '40px 20px',
////        textAlign: 'center',
////        backgroundColor: '#f8f9fa',
////        borderRadius: '10px'
////    },
////    noResultsIcon: {
////        fontSize: '60px',
////        marginBottom: '20px',
////        color: '#bdc3c7'
////    }
////};

////export default AllTickets;













//import React, { useState, useEffect, useMemo } from 'react';
//import { filterTickets, mapTicketStatus } from '../../api/tickets';
//import TicketTable from '../../components/tickets/TicketTable';
//import TicketFilter from '../../components/tickets/TicketFilter';
//import { FaTicketAlt, FaFilter, FaSync, FaExclamationTriangle, FaCalendarAlt, FaTags, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
//import { motion, AnimatePresence } from 'framer-motion';

//const AllTickets = () => {
//    const [tickets, setTickets] = useState([]);
//    const [filteredTickets, setFilteredTickets] = useState([]);
//    const [isLoading, setIsLoading] = useState(true);
//    const [filterLoading, setFilterLoading] = useState(false);
//    const [error, setError] = useState('');
//    const [activeFilters, setActiveFilters] = useState({});
//    const [stats, setStats] = useState({
//        total: 0,
//        new: 0,
//        pending: 0,
//        complete: 0,
//        refund: 0
//    });
//    const [sortConfig, setSortConfig] = useState({
//        key: 'createdDate',
//        direction: 'descending'
//    });

//    useEffect(() => {
//        fetchTickets();
//    }, []);

//    const fetchTickets = async () => {
//        try {
//            setIsLoading(true);
//            const result = await filterTickets({});
//            if (result.success) {
//                const ticketsWithStatus = result.data.map(ticket => ({
//                    ...ticket,
//                    statusText: mapTicketStatus(ticket.ticketStatusId),
//                    createdDate: new Date(ticket.createdDate)
//                }));
//                setTickets(ticketsWithStatus);
//                setFilteredTickets(ticketsWithStatus);
//                calculateStats(ticketsWithStatus);
//            } else {
//                throw new Error(result.message);
//            }
//        } catch (err) {
//            setError(err.message || 'فشل تحميل التذاكر');
//        } finally {
//            setIsLoading(false);
//        }
//    };

//    const calculateStats = (tickets) => {
//        const stats = {
//            total: tickets.length,
//            new: tickets.filter(t => t.statusText === 'New').length,
//            pending: tickets.filter(t => t.statusText === 'Pending').length,
//            complete: tickets.filter(t => t.statusText === 'Complete').length,
//            refund: tickets.filter(t => t.statusText === 'Refund').length
//        };
//        setStats(stats);
//    };

//    const handleFilter = async (filters) => {
//        try {
//            setFilterLoading(true);
//            setError('');

//            // حفظ الفلاتر النشطة لعرضها
//            setActiveFilters(filters);

//            // استخدام الفلترة عبر API لجميع الفلاتر
//            const result = await filterTickets(filters);
//            if (result.success) {
//                const filtered = result.data.map(t => ({
//                    ...t,
//                    statusText: mapTicketStatus(t.ticketStatusId),
//                    createdDate: new Date(t.createdDate)
//                }));
//                setFilteredTickets(filtered);
//                calculateStats(filtered);
//            } else {
//                setError(result.message);
//            }
//        } catch (err) {
//            setError('حدث خطأ أثناء التصفية');
//        } finally {
//            setFilterLoading(false);
//        }
//    };

//    const handleRefresh = async () => {
//        setActiveFilters({});
//        await fetchTickets();
//    };

//    // دالة لفرز التذاكر
//    const sortedTickets = useMemo(() => {
//        const sortableItems = [...filteredTickets];
//        if (sortConfig !== null) {
//            sortableItems.sort((a, b) => {
//                if (a[sortConfig.key] < b[sortConfig.key]) {
//                    return sortConfig.direction === 'ascending' ? -1 : 1;
//                }
//                if (a[sortConfig.key] > b[sortConfig.key]) {
//                    return sortConfig.direction === 'ascending' ? 1 : -1;
//                }
//                return 0;
//            });
//        }
//        return sortableItems;
//    }, [filteredTickets, sortConfig]);

//    // دالة لتغيير الترتيب
//    const requestSort = (key) => {
//        let direction = 'ascending';
//        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//            direction = 'descending';
//        }
//        setSortConfig({ key, direction });
//    };

//    // دالة لعرض أيقونة الترتيب
//    const sortIcon = (key) => {
//        if (sortConfig.key !== key) {
//            return <FaFilter className="opacity-25 ml-1" />;
//        }
//        return sortConfig.direction === 'ascending' ?
//            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
//            </svg> :
//            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//            </svg>;
//    };

//    // عرض الفلاتر النشطة
//    const renderActiveFilters = () => {
//        const active = [];

//        if (activeFilters.ticketNumber) {
//            active.push({
//                id: 'ticketNumber',
//                label: `رقم التذكرة: ${activeFilters.ticketNumber}`,
//                icon: <FaTicketAlt />
//            });
//        }

//        if (activeFilters.status) {
//            let icon;
//            switch (activeFilters.status) {
//                case 'New': icon = <FaClock />; break;
//                case 'Pending': icon = <FaTags />; break;
//                case 'Complete': icon = <FaCheckCircle />; break;
//                case 'Refund': icon = <FaTimesCircle />; break;
//                default: icon = <FaFilter />;
//            }
//            active.push({
//                id: 'status',
//                label: `الحالة: ${activeFilters.status}`,
//                icon: icon
//            });
//        }

//        if (activeFilters.startDate || activeFilters.endDate) {
//            const dateLabel = activeFilters.startDate && activeFilters.endDate ?
//                `${new Date(activeFilters.startDate).toLocaleDateString()} - ${new Date(activeFilters.endDate).toLocaleDateString()}` :
//                activeFilters.startDate ?
//                    `من: ${new Date(activeFilters.startDate).toLocaleDateString()}` :
//                    `إلى: ${new Date(activeFilters.endDate).toLocaleDateString()}`;

//            active.push({
//                id: 'date',
//                label: dateLabel,
//                icon: <FaCalendarAlt />
//            });
//        }

//        if (active.length === 0) return null;

//        return (
//            <div className="mb-4 bg-blue-50 rounded-lg p-3">
//                <div className="flex flex-wrap items-center gap-2">
//                    <span className="text-sm font-medium text-blue-700">الفلاتر النشطة:</span>
//                    {active.map(filter => (
//                        <motion.span
//                            key={filter.id}
//                            initial={{ opacity: 0, scale: 0.8 }}
//                            animate={{ opacity: 1, scale: 1 }}
//                            className="flex items-center px-3 py-1 bg-white border border-blue-200 rounded-full text-sm text-blue-700"
//                        >
//                            <span className="mr-1 text-blue-500">{filter.icon}</span>
//                            {filter.label}
//                        </motion.span>
//                    ))}
//                    <button
//                        onClick={handleRefresh}
//                        className="ml-2 text-xs text-blue-500 hover:text-blue-700 flex items-center"
//                    >
//                        <FaSync className="mr-1 h-3 w-3" />
//                        إعادة تعيين
//                    </button>
//                </div>
//            </div>
//        );
//    };

//    return (
//        <div className="container mx-auto px-4 py-6">
//            <div className="mb-8">
//                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
//                    <div>
//                        <div className="flex items-center">
//                            <div className="bg-blue-100 p-3 rounded-xl mr-4">
//                                <FaTicketAlt className="text-blue-500 text-2xl" />
//                            </div>
//                            <div>
//                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//                                    تذاكر الصيانة
//                                </h1>
//                                <p className="text-gray-600 mt-1">عرض وإدارة جميع طلبات الصيانة</p>
//                            </div>
//                        </div>
//                    </div>
//                    <div className="flex space-x-3 space-x-reverse">
//                        <button
//                            onClick={handleRefresh}
//                            className={`flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${isLoading || filterLoading ? 'opacity-75' : 'hover:scale-105'}`}
//                            disabled={isLoading || filterLoading}
//                        >
//                            <FaSync className={`mr-2 ${isLoading || filterLoading ? 'animate-spin' : ''}`} />
//                            {isLoading || filterLoading ? 'جاري التحميل...' : 'تحديث'}
//                        </button>
//                    </div>
//                </div>

//                {error && (
//                    <div className="mb-6 rounded-xl overflow-hidden">
//                        <motion.div
//                            initial={{ opacity: 0, y: -20 }}
//                            animate={{ opacity: 1, y: 0 }}
//                            className="bg-red-50 border border-red-200 rounded-xl p-4"
//                        >
//                            <div className="flex">
//                                <div className="flex-shrink-0">
//                                    <FaExclamationTriangle className="h-5 w-5 text-red-400 mt-0.5" />
//                                </div>
//                                <div className="ml-3 flex-1 md:flex md:justify-between">
//                                    <p className="text-sm text-red-700">{error}</p>
//                                    <p className="mt-3 flex md:mt-0 md:ml-6">
//                                        <button
//                                            onClick={handleRefresh}
//                                            className="whitespace-nowrap text-sm font-medium text-red-700 hover:text-red-600"
//                                        >
//                                            إعادة المحاولة
//                                        </button>
//                                    </p>
//                                </div>
//                            </div>
//                        </motion.div>
//                    </div>
//                )}

//                {/* إحصائيات التذاكر */}
//                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//                    <StatCard
//                        title="إجمالي التذاكر"
//                        value={stats.total}
//                        icon={<FaTicketAlt className="text-blue-500" />}
//                        color="from-blue-500 to-blue-600"
//                        highlight={true}
//                    />
//                    <StatCard
//                        title="جديد"
//                        value={stats.new}
//                        icon={<FaClock className="text-blue-500" />}
//                        color="from-blue-400 to-blue-500"
//                        status="New"
//                    />
//                    <StatCard
//                        title="معلق"
//                        value={stats.pending}
//                        icon={<FaTags className="text-yellow-500" />}
//                        color="from-yellow-400 to-yellow-500"
//                        status="Pending"
//                    />
//                    <StatCard
//                        title="منتهي"
//                        value={stats.complete}
//                        icon={<FaCheckCircle className="text-green-500" />}
//                        color="from-green-400 to-green-500"
//                        status="Complete"
//                    />
//                    <StatCard
//                        title="مرتجع"
//                        value={stats.refund}
//                        icon={<FaTimesCircle className="text-red-500" />}
//                        color="from-red-400 to-red-500"
//                        status="Refund"
//                    />
//                </div>

//                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
//                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
//                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
//                            <FaFilter className="mr-2 text-blue-500" />
//                            تصفية التذاكر
//                        </h2>
//                    </div>

//                    {renderActiveFilters()}

//                    <TicketFilter
//                        onFilter={handleFilter}
//                        showDateFilter={true}
//                        isLoading={filterLoading}
//                    />
//                </div>
//            </div>

//            {/* حالة التحميل */}
//            {(isLoading || filterLoading) && (
//                <div className="flex flex-col items-center justify-center py-16">
//                    <motion.div
//                        animate={{ rotate: 360 }}
//                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                        className="bg-blue-100 p-4 rounded-full mb-4"
//                    >
//                        <FaSync className="text-blue-500 w-8 h-8" />
//                    </motion.div>
//                    <p className="text-gray-600 text-lg">جاري تحميل البيانات...</p>
//                </div>
//            )}

//            {/* حالة عدم وجود بيانات */}
//            {!isLoading && !filterLoading && filteredTickets.length === 0 && (
//                <motion.div
//                    initial={{ opacity: 0, y: 20 }}
//                    animate={{ opacity: 1, y: 0 }}
//                    className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
//                >
//                    <div className="text-6xl text-gray-300 mb-4">📭</div>
//                    <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد تذاكر</h3>
//                    <p className="text-gray-500 max-w-md text-center mb-6">
//                        لم يتم العثور على تذاكر تطابق معايير البحث. حاول تعديل معايير البحث أو إنشاء تذكرة جديدة.
//                    </p>
//                    <button
//                        onClick={handleRefresh}
//                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
//                    >
//                        عرض جميع التذاكر
//                    </button>
//                </motion.div>
//            )}

//            {/* جدول التذاكر */}
//            {!isLoading && !filterLoading && filteredTickets.length > 0 && (
//                <motion.div
//                    initial={{ opacity: 0, y: 20 }}
//                    animate={{ opacity: 1, y: 0 }}
//                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
//                >
//                    <div className="overflow-x-auto">
//                        <table className="min-w-full divide-y divide-gray-200">
//                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                                <tr>
//                                    <th
//                                        scope="col"
//                                        className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                                        onClick={() => requestSort('ticketNumber')}
//                                    >
//                                        <div className="flex items-center">
//                                            {sortIcon('ticketNumber')}
//                                            رقم التذكرة
//                                        </div>
//                                    </th>
//                                    <th
//                                        scope="col"
//                                        className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                                        onClick={() => requestSort('description')}
//                                    >
//                                        <div className="flex items-center">
//                                            {sortIcon('description')}
//                                            الوصف
//                                        </div>
//                                    </th>
//                                    <th
//                                        scope="col"
//                                        className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                                        onClick={() => requestSort('deviceCategory.categoryName')}
//                                    >
//                                        <div className="flex items-center">
//                                            {sortIcon('deviceCategory.categoryName')}
//                                            فئة الجهاز
//                                        </div>
//                                    </th>
//                                    <th
//                                        scope="col"
//                                        className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                                        onClick={() => requestSort('statusText')}
//                                    >
//                                        <div className="flex items-center">
//                                            {sortIcon('statusText')}
//                                            الحالة
//                                        </div>
//                                    </th>
//                                    <th
//                                        scope="col"
//                                        className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
//                                        onClick={() => requestSort('createdDate')}
//                                    >
//                                        <div className="flex items-center">
//                                            {sortIcon('createdDate')}
//                                            تاريخ الإنشاء
//                                        </div>
//                                    </th>
//                                    <th scope="col" className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
//                                        الإجراءات
//                                    </th>
//                                </tr>
//                            </thead>
//                            <tbody className="bg-white divide-y divide-gray-200">
//                                {sortedTickets.map(ticket => (
//                                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
//                                        <td className="px-6 py-4 whitespace-nowrap">
//                                            <div className="text-sm font-medium text-gray-900">{ticket.ticketNumber}</div>
//                                        </td>
//                                        <td className="px-6 py-4 max-w-xl">
//                                            <div className="text-sm text-gray-900 line-clamp-2">
//                                                {ticket.description}
//                                            </div>
//                                        </td>
//                                        <td className="px-6 py-4 whitespace-nowrap">
//                                            <div className="text-sm text-gray-900 bg-gray-100 px-3 py-1 rounded-full inline-block">
//                                                {ticket.deviceCategory?.categoryName || 'غير محدد'}
//                                            </div>
//                                        </td>
//                                        <td className="px-6 py-4 whitespace-nowrap">
//                                            <span className={`px-3 py-1 inline-flex text-sm font-medium rounded-full ${getStatusBadgeClass(ticket.statusText)}`}>
//                                                {ticket.statusText}
//                                            </span>
//                                        </td>
//                                        <td className="px-6 py-4 whitespace-nowrap">
//                                            <div className="text-sm text-gray-900">
//                                                {new Date(ticket.createdDate).toLocaleDateString('ar-EG', {
//                                                    day: 'numeric',
//                                                    month: 'short',
//                                                    year: 'numeric'
//                                                })}
//                                            </div>
//                                            <div className="text-xs text-gray-500">
//                                                {new Date(ticket.createdDate).toLocaleTimeString([], {
//                                                    hour: '2-digit',
//                                                    minute: '2-digit'
//                                                })}
//                                            </div>
//                                        </td>
//                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                            <button
//                                                onClick={() => window.location.href = `/ticket/${ticket.id}`}
//                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                                            >
//                                                <FaEye className="mr-1 h-4 w-4" />
//                                                عرض
//                                            </button>
//                                        </td>
//                                    </tr>
//                                ))}
//                            </tbody>
//                        </table>
//                    </div>

//                    {/* تذييل الجدول مع معلومات العدد */}
//                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
//                        <div className="flex items-center justify-between">
//                            <div className="text-sm text-gray-700">
//                                عرض <span className="font-medium">{sortedTickets.length}</span> من أصل{' '}
//                                <span className="font-medium">{stats.total}</span> تذكرة
//                            </div>
//                            <div className="flex space-x-2">
//                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                    إجمالي: {stats.total}
//                                </span>
//                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                    منتهي: {stats.complete}
//                                </span>
//                            </div>
//                        </div>
//                    </div>
//                </motion.div>
//            )}
//        </div>
//    );
//};

//// مكون إحصائيات
//const StatCard = ({ title, value, icon, color, status }) => {
//    return (
//        <motion.div
//            whileHover={{ y: -5 }}
//            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
//        >
//            <div className={`h-2 bg-gradient-to-r ${color}`}></div>
//            <div className="p-5">
//                <div className="flex items-center">
//                    <div className="p-3 rounded-lg bg-blue-50">
//                        {icon}
//                    </div>
//                    <div className="mr-4">
//                        <p className="text-sm font-medium text-gray-600">{title}</p>
//                        <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
//                    </div>
//                </div>
//                {status && (
//                    <div className="mt-3 pt-3 border-t border-gray-100">
//                        <span className={`inline-block w-full text-center text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(status)}`}>
//                            {status}
//                        </span>
//                    </div>
//                )}
//            </div>
//        </motion.div>
//    );
//};

//// دالة لتحديد كلاس الحالة
//const getStatusBadgeClass = (status) => {
//    switch (status) {
//        case 'New':
//            return 'bg-blue-100 text-blue-800';
//        case 'Pending':
//            return 'bg-yellow-100 text-yellow-800';
//        case 'Complete':
//            return 'bg-green-100 text-green-800';
//        case 'Refund':
//            return 'bg-red-100 text-red-800';
//        default:
//            return 'bg-gray-100 text-gray-800';
//    }
//};

//export default AllTickets;



























//import React, { useState } from 'react';
//import { FaTicketAlt } from 'react-icons/fa';

//;
//import { FaFilter, FaTimes, FaCalendarAlt } from 'react-icons/fa';

//const TicketFilter = ({ onFilter, showDateFilter = false, isLoading }) => {
//    const [filters, setFilters] = useState({
//        ticketNumber: '',
//        status: '',
//        startDate: '',
//        endDate: ''
//    });

//    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setFilters(prev => ({ ...prev, [name]: value }));
//    };

//    const handleSubmit = (e) => {
//        e.preventDefault();
//        onFilter(filters);
//    };

//    const handleReset = () => {
//        setFilters({
//            ticketNumber: '',
//            status: '',
//            startDate: '',
//            endDate: ''
//        });
//        onFilter({});
//        setMobileFilterOpen(false);
//    };

//    return (
//        <>
//            <div className="md:hidden mb-4">
//                <button
//                    onClick={() => setMobileFilterOpen(true)}
//                    className="flex items-center w-full justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//                    disabled={isLoading}
//                >
//                    <FaFilter className="mr-2" />
//                    Show Filters
//                </button>
//            </div>

//            <form
//                onSubmit={handleSubmit}
//                className={`${mobileFilterOpen ? 'block' : 'hidden'} md:block bg-white p-4 rounded-lg border border-gray-200`}
//            >
//                {mobileFilterOpen && (
//                    <div className="flex justify-between items-center mb-4 md:hidden">
//                        <h3 className="text-lg font-medium text-gray-800">Filter Tickets</h3>
//                        <button
//                            type="button"
//                            onClick={() => setMobileFilterOpen(false)}
//                            className="text-gray-500 hover:text-gray-700"
//                        >
//                            <FaTimes />
//                        </button>
//                    </div>
//                )}

//                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                    <div>
//                        <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Number</label>
//                        <div className="relative">
//                            <input
//                                type="text"
//                                name="ticketNumber"
//                                value={filters.ticketNumber}
//                                onChange={handleChange}
//                                placeholder="Search by ticket number..."
//                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                disabled={isLoading}
//                            />
//                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                <FaTicketAlt className="text-gray-400" />
//                            </div>
//                        </div>
//                    </div>

//                    <div>
//                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                        <select
//                            name="status"
//                            value={filters.status}
//                            onChange={handleChange}
//                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                            disabled={isLoading}
//                        >
//                            <option value="">All Tickets</option>
//                            <option value="New">New</option>
//                            <option value="Pending">Pending</option>
//                            <option value="Complete">Complete</option>
//                            <option value="Refund">Refund</option>
//                        </select>
//                    </div>

//                    {showDateFilter && (
//                        <>
//                            <div>
//                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//                                <div className="relative">
//                                    <input
//                                        type="date"
//                                        name="startDate"
//                                        value={filters.startDate}
//                                        onChange={handleChange}
//                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                        disabled={isLoading}
//                                    />
//                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                        <FaCalendarAlt className="text-gray-400" />
//                                    </div>
//                                </div>
//                            </div>

//                            <div>
//                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                                <div className="relative">
//                                    <input
//                                        type="date"
//                                        name="endDate"
//                                        value={filters.endDate}
//                                        onChange={handleChange}
//                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                        disabled={isLoading}
//                                    />
//                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                                        <FaCalendarAlt className="text-gray-400" />
//                                    </div>
//                                </div>
//                            </div>
//                        </>
//                    )}
//                </div>

//                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
//                    <button
//                        type="button"
//                        onClick={handleReset}
//                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                        disabled={isLoading}
//                    >
//                        Reset
//                    </button>
//                    <button
//                        type="submit"
//                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center min-w-[150px]"
//                        disabled={isLoading}
//                    >
//                        {isLoading ? (
//                            <>
//                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                </svg>
//                                Applying...
//                            </>
//                        ) : (
//                            'Apply Filters'
//                        )}
//                    </button>
//                </div>
//            </form>
//        </>
//    );
//};

//export default TicketFilter;

















//////import React, { useState } from 'react';
//////import { FaFilter, FaTimes, FaCalendarAlt, FaTag, FaClock } from 'react-icons/fa';
//////import { motion } from 'framer-motion';

//////const TicketFilter = ({ onFilter, showDateFilter = false, isLoading }) => {
//////    const [filters, setFilters] = useState({
//////        ticketNumber: '',
//////        status: '',
//////        startDate: '',
//////        endDate: ''
//////    });
//////    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

//////    const handleChange = (e) => {
//////        const { name, value } = e.target;
//////        setFilters(prev => ({ ...prev, [name]: value }));
//////    };

//////    const handleSubmit = (e) => {
//////        e.preventDefault();
//////        onFilter(filters);
//////    };

//////    const handleReset = () => {
//////        setFilters({
//////            ticketNumber: '',
//////            status: '',
//////            startDate: '',
//////            endDate: ''
//////        });
//////        onFilter({});
//////    };

//////    const getStatusIcon = (status) => {
//////        switch (status) {
//////            case 'New': return <FaClock className="text-blue-500" />;
//////            case 'Pending': return <FaTag className="text-yellow-500" />;
//////            case 'Complete': return <FaCheckCircle className="text-green-500" />;
//////            case 'Refund': return <FaTimesCircle className="text-red-500" />;
//////            default: return <FaFilter className="text-gray-500" />;
//////        }
//////    };

//////    return (
//////        <>
//////            {/* Mobile Filter Button */}
//////            <div className="md:hidden mb-4">
//////                <motion.button
//////                    whileTap={{ scale: 0.95 }}
//////                    onClick={() => setMobileFilterOpen(true)}
//////                    className="flex items-center w-full justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
//////                >
//////                    <FaFilter className="mr-2" />
//////                    عرض الفلاتر
//////                </motion.button>
//////            </div>

//////            {/* Filter Form */}
//////            <motion.form
//////                initial={{ opacity: 0 }}
//////                animate={{ opacity: 1 }}
//////                transition={{ duration: 0.3 }}
//////                onSubmit={handleSubmit}
//////                className={`${mobileFilterOpen ? 'block' : 'hidden'} md:block`}
//////            >
//////                {mobileFilterOpen && (
//////                    <div className="flex justify-between items-center mb-4 md:hidden">
//////                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
//////                            <FaFilter className="mr-2 text-blue-500" />
//////                            فلاتر البحث
//////                        </h3>
//////                        <motion.button
//////                            whileTap={{ scale: 0.9 }}
//////                            type="button"
//////                            onClick={() => setMobileFilterOpen(false)}
//////                            className="text-gray-500 hover:text-gray-700 p-2"
//////                        >
//////                            <FaTimes className="h-5 w-5" />
//////                        </motion.button>
//////                    </div>
//////                )}

//////                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//////                    <div className="space-y-2">
//////                        <label className="block text-sm font-medium text-gray-700 flex items-center">
//////                            <FaTicketAlt className="mr-2 text-blue-500" />
//////                            رقم التذكرة
//////                        </label>
//////                        <div className="relative">
//////                            <input
//////                                type="text"
//////                                name="ticketNumber"
//////                                value={filters.ticketNumber}
//////                                onChange={handleChange}
//////                                placeholder="ابحث برقم التذكرة..."
//////                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//////                                disabled={isLoading}
//////                            />
//////                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//////                                <FaTicketAlt className="text-gray-400" />
//////                            </div>
//////                        </div>
//////                    </div>

//////                    <div className="space-y-2">
//////                        <label className="block text-sm font-medium text-gray-700 flex items-center">
//////                            <FaTag className="mr-2 text-blue-500" />
//////                            الحالة
//////                        </label>
//////                        <div className="relative">
//////                            <select
//////                                name="status"
//////                                value={filters.status}
//////                                onChange={handleChange}
//////                                className="w-full px-4 py-2 pl-10 pr-8 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-200"
//////                                disabled={isLoading}
//////                            >
//////                                <option value="">جميع الحالات</option>
//////                                <option value="New">جديد</option>
//////                                <option value="Pending">معلق</option>
//////                                <option value="Complete">منتهي</option>
//////                                <option value="Refund">مرتجع</option>
//////                            </select>
//////                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//////                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//////                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//////                                </svg>
//////                            </div>
//////                        </div>
//////                    </div>

//////                    {showDateFilter && (
//////                        <>
//////                            <div className="space-y-2">
//////                                <label className="block text-sm font-medium text-gray-700 flex items-center">
//////                                    <FaCalendarAlt className="mr-2 text-blue-500" />
//////                                    تاريخ البدء
//////                                </label>
//////                                <div className="relative">
//////                                    <input
//////                                        type="date"
//////                                        name="startDate"
//////                                        value={filters.startDate}
//////                                        onChange={handleChange}
//////                                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//////                                        disabled={isLoading}
//////                                    />
//////                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//////                                        <FaCalendarAlt className="text-gray-400" />
//////                                    </div>
//////                                </div>
//////                            </div>

//////                            <div className="space-y-2">
//////                                <label className="block text-sm font-medium text-gray-700 flex items-center">
//////                                    <FaCalendarAlt className="mr-2 text-blue-500" />
//////                                    تاريخ الانتهاء
//////                                </label>
//////                                <div className="relative">
//////                                    <input
//////                                        type="date"
//////                                        name="endDate"
//////                                        value={filters.endDate}
//////                                        onChange={handleChange}
//////                                        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//////                                        disabled={isLoading}
//////                                    />
//////                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//////                                        <FaCalendarAlt className="text-gray-400" />
//////                                    </div>
//////                                </div>
//////                            </div>
//////                        </>
//////                    )}
//////                </div>

//////                <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
//////                    <motion.button
//////                        whileHover={{ scale: 1.02 }}
//////                        whileTap={{ scale: 0.98 }}
//////                        type="button"
//////                        onClick={handleReset}
//////                        className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
//////                        disabled={isLoading}
//////                    >
//////                        إعادة تعيين
//////                    </motion.button>

//////                    <motion.button
//////                        whileHover={{ scale: 1.02 }}
//////                        whileTap={{ scale: 0.98 }}
//////                        type="submit"
//////                        className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center transition-all duration-200"
//////                        disabled={isLoading}
//////                    >
//////                        {isLoading ? (
//////                            <div className="flex items-center">
//////                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//////                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//////                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//////                                </svg>
//////                                جاري التطبيق...
//////                            </div>
//////                        ) : (
//////                            <div className="flex items-center">
//////                                <FaFilter className="ml-2" />
//////                                تطبيق الفلاتر
//////                            </div>
//////                        )}
//////                    </motion.button>
//////                </div>
//////            </motion.form>
//////        </>
//////    );
//////};

//////export default TicketFilter;














////////import React, { useState } from 'react';

////////const TicketFilter = ({ onFilter, showDateFilter = false, isLoading }) => {
////////    const [filters, setFilters] = useState({
////////        ticketNumber: '',
////////        status: '',
////////        startDate: '',
////////        endDate: ''
////////    });

////////    const handleChange = (e) => {
////////        const { name, value } = e.target;
////////        setFilters(prev => ({ ...prev, [name]: value }));
////////    };

////////    const handleSubmit = (e) => {
////////        e.preventDefault();
////////        onFilter(filters);
////////    };

////////    const handleReset = () => {
////////        setFilters({
////////            ticketNumber: '',
////////            status: '',
////////            startDate: '',
////////            endDate: ''
////////        });
////////        onFilter({});
////////    };

////////    return (
////////        <form onSubmit={handleSubmit} style={formStyles.container}>
////////            <div style={formStyles.grid}>
////////                <div style={formStyles.inputGroup}>
////////                    <label style={formStyles.label}>Ticket Number</label>
////////                    <input
////////                        type="text"
////////                        name="ticketNumber"
////////                        value={filters.ticketNumber}
////////                        onChange={handleChange}
////////                        placeholder="Search by ticket number..."
////////                        style={formStyles.input}
////////                    />
////////                </div>

////////                <div style={formStyles.inputGroup}>
////////                    <label style={formStyles.label}>Status</label>
////////                    <select
////////                        name="status"
////////                        value={filters.status}
////////                        onChange={handleChange}
////////                        style={formStyles.select}
////////                    >
////////                        <option value="">All Tickets</option>
////////                        <option value="New">New</option>
////////                        <option value="Pending">Pending</option>
////////                        <option value="Complete">Complete</option>
////////                        <option value="Refund">Refund</option>
////////                    </select>
////////                </div>

////////                {showDateFilter && (
////////                    <>
////////                        <div style={formStyles.inputGroup}>
////////                            <label style={formStyles.label}>Start Date</label>
////////                            <input
////////                                type="date"
////////                                name="startDate"
////////                                value={filters.startDate}
////////                                onChange={handleChange}
////////                                style={formStyles.input}
////////                            />
////////                        </div>

////////                        <div style={formStyles.inputGroup}>
////////                            <label style={formStyles.label}>End Date</label>
////////                            <input
////////                                type="date"
////////                                name="endDate"
////////                                value={filters.endDate}
////////                                onChange={handleChange}
////////                                style={formStyles.input}
////////                            />
////////                        </div>
////////                    </>
////////                )}
////////            </div>

////////            <div style={formStyles.actions}>
////////                <button
////////                    type="submit"
////////                    style={formStyles.submitButton}
////////                    disabled={isLoading}
////////                >
////////                    {isLoading ? (
////////                        <>
////////                            <span style={formStyles.spinner}></span> Applying Filters...
////////                        </>
////////                    ) : (
////////                        'Apply Filters'
////////                    )}
////////                </button>
////////                <button
////////                    type="button"
////////                    onClick={handleReset}
////////                    style={formStyles.resetButton}
////////                    disabled={isLoading}
////////                >
////////                    Reset
////////                </button>
////////            </div>
////////        </form>
////////    );
////////};
////////import React, { useState, useEffect } from 'react';

////////const TicketFilter = ({ onFilter, showDateFilter = false, isLoading, categories }) => {
////////    const [filters, setFilters] = useState({
////////        ticketNumber: '',
////////        status: '',
////////        deviceCategoryId: '',
////////        startDate: '',
////////        endDate: ''
////////    });

////////    const handleChange = (e) => {
////////        const { name, value } = e.target;
////////        setFilters(prev => ({ ...prev, [name]: value }));
////////    };

////////    const handleSubmit = (e) => {
////////        e.preventDefault();
////////        onFilter(filters);
////////    };

////////    const handleReset = () => {
////////        setFilters({
////////            ticketNumber: '',
////////            status: '',
////////            deviceCategoryId: '',
////////            startDate: '',
////////            endDate: ''
////////        });
////////        onFilter({});
////////    };

////////    return (
////////        <form onSubmit={handleSubmit} style={formStyles.container}>
////////            <div style={formStyles.grid}>
////////                <div style={formStyles.inputGroup}>
////////                    <label style={formStyles.label}>Ticket Number</label>
////////                    <input
////////                        type="text"
////////                        name="ticketNumber"
////////                        value={filters.ticketNumber}
////////                        onChange={handleChange}
////////                        placeholder="Search by ticket number..."
////////                        style={formStyles.input}
////////                    />
////////                </div>

////////                <div style={formStyles.inputGroup}>
////////                    <label style={formStyles.label}>Status</label>
////////                    <select
////////                        name="status"
////////                        value={filters.status}
////////                        onChange={handleChange}
////////                        style={formStyles.select}
////////                    >
////////                        <option value="">All Tickets</option>
////////                        <option value="New">New</option>
////////                        <option value="Pending">Pending</option>
////////                        <option value="Complete">Complete</option>
////////                        <option value="Refund">Refund</option>
////////                    </select>
////////                </div>

////////                <div style={formStyles.inputGroup}>
////////                    <label style={formStyles.label}>Device Category</label>
////////                    <select
////////                        name="deviceCategoryId"
////////                        value={filters.deviceCategoryId}
////////                        onChange={handleChange}
////////                        style={formStyles.select}
////////                    >
////////                        <option value="">All Categories</option>
////////                        {categories.map(category => (
////////                            <option key={category.id} value={category.id}>
////////                                {category.categoryName}
////////                            </option>
////////                        ))}
////////                    </select>
////////                </div>

////////                {showDateFilter && (
////////                    <>
////////                        <div style={formStyles.inputGroup}>
////////                            <label style={formStyles.label}>Start Date</label>
////////                            <input
////////                                type="date"
////////                                name="startDate"
////////                                value={filters.startDate}
////////                                onChange={handleChange}
////////                                style={formStyles.input}
////////                            />
////////                        </div>

////////                        <div style={formStyles.inputGroup}>
////////                            <label style={formStyles.label}>End Date</label>
////////                            <input
////////                                type="date"
////////                                name="endDate"
////////                                value={filters.endDate}
////////                                onChange={handleChange}
////////                                style={formStyles.input}
////////                            />
////////                        </div>
////////                    </>
////////                )}
////////            </div>

////////            <div style={formStyles.actions}>
////////                <button
////////                    type="submit"
////////                    style={formStyles.submitButton}
////////                    disabled={isLoading}
////////                >
////////                    {isLoading ? (
////////                        <>
////////                            <span style={formStyles.spinner}></span> Applying Filters...
////////                        </>
////////                    ) : (
////////                        'Apply Filters'
////////                    )}
////////                </button>
////////                <button
////////                    type="button"
////////                    onClick={handleReset}
////////                    style={formStyles.resetButton}
////////                    disabled={isLoading}
////////                >
////////                    Reset
////////                </button>
////////            </div>
////////        </form>
////////    );
////////};


//////// ... (الأنماط تبقى كما هي)



////////const formStyles = {
////////    container: {
////////        width: '100%'
////////    },
////////    grid: {
////////        display: 'grid',
////////        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
////////        gap: '20px',
////////        marginBottom: '20px'
////////    },
////////    inputGroup: {
////////        display: 'flex',
////////        flexDirection: 'column'
////////    },
////////    label: {
////////        marginBottom: '8px',
////////        fontWeight: '500',
////////        fontSize: '14px',
////////        color: '#495057'
////////    },
////////    input: {
////////        padding: '12px 15px',
////////        border: '1px solid #ced4da',
////////        borderRadius: '6px',
////////        fontSize: '14px',
////////        transition: 'border-color 0.2s',
////////        ':focus': {
////////            outline: 'none',
////////            borderColor: '#3498db',
////////            boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)'
////////        }
////////    },
////////    select: {
////////        padding: '12px 15px',
////////        border: '1px solid #ced4da',
////////        borderRadius: '6px',
////////        fontSize: '14px',
////////        backgroundColor: 'white',
////////        appearance: 'none',
////////        backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
////////        backgroundRepeat: 'no-repeat',
////////        backgroundPosition: 'right 15px center',
////////        backgroundSize: '16px',
////////        transition: 'border-color 0.2s',
////////        ':focus': {
////////            outline: 'none',
////////            borderColor: '#3498db',
////////            boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)'
////////        }
////////    },
////////    actions: {
////////        display: 'flex',
////////        gap: '12px'
////////    },
////////    submitButton: {
////////        padding: '12px 24px',
////////        backgroundColor: '#3498db',
////////        color: 'white',
////////        border: 'none',
////////        borderRadius: '6px',
////////        fontSize: '14px',
////////        fontWeight: '500',
////////        cursor: 'pointer',
////////        display: 'flex',
////////        alignItems: 'center',
////////        gap: '8px',
////////        transition: 'background-color 0.2s',
////////        ':hover': {
////////            backgroundColor: '#2980b9'
////////        },
////////        ':disabled': {
////////            backgroundColor: '#bdc3c7',
////////            cursor: 'not-allowed'
////////        }
////////    },
////////    resetButton: {
////////        padding: '12px 24px',
////////        backgroundColor: '#f8f9fa',
////////        color: '#495057',
////////        border: '1px solid #ced4da',
////////        borderRadius: '6px',
////////        fontSize: '14px',
////////        fontWeight: '500',
////////        cursor: 'pointer',
////////        transition: 'background-color 0.2s',
////////        ':hover': {
////////            backgroundColor: '#e9ecef'
////////        },
////////        ':disabled': {
////////            backgroundColor: '#f8f9fa',
////////            cursor: 'not-allowed'
////////        }
////////    },
////////    spinner: {
////////        width: '16px',
////////        height: '16px',
////////        border: '2px solid rgba(255,255,255,0.3)',
////////        borderTop: '2px solid white',
////////        borderRadius: '50%',
////////        animation: 'spin 1s linear infinite'
////////    }
////////};

////////export default TicketFilter;

























////////import React, { useState } from 'react';

////////const TicketFilter = ({ onFilter, showDateFilter = false }) => {
////////    const [ticketNumber, setTicketNumber] = useState('');
////////    const [status, setStatus] = useState('');
////////    const [startDate, setStartDate] = useState('');
////////    const [endDate, setEndDate] = useState('');

////////    const handleSubmit = (e) => {
////////        e.preventDefault();

////////        const filters = {};
////////        if (ticketNumber) filters.ticketNumber = ticketNumber;
////////        if (status) filters.status = status;
////////        if (startDate) filters.startDate = startDate;
////////        if (endDate) filters.endDate = endDate;

////////        onFilter(filters);
////////    };

////////    const handleReset = () => {
////////        setTicketNumber('');
////////        setStatus('');
////////        setStartDate('');
////////        setEndDate('');
////////        onFilter({});
////////    };

////////    return (
////////        <form onSubmit={handleSubmit} className="ticket-filter">
////////            <div className="filter-row">
////////                <div className="filter-group">
////////                    <label> Ticket Number</label>
////////                    <input
////////                        type="text"
////////                        value={ticketNumber}
////////                        onChange={(e) => setTicketNumber(e.target.value)}
////////                        placeholder="By Number .."
////////                    />
////////                </div>

////////                <div className="filter-group">
////////                    <label>Status</label>
////////                    <select
////////                        value={status}
////////                        onChange={(e) => setStatus(e.target.value)}
////////                    >
////////                        <option value=""> All Tickets </option>
////////                        <option value="New">New</option>
////////                        <option value="Pending">Pending </option>
////////                        <option value="Complete">Complete</option>
////////                        <option value="Refund">Refund</option>
////////                    </select>
////////                </div>

////////                {showDateFilter && (
////////                    <>
////////                        <div className="filter-group">
////////                            <label> Start Date</label>
////////                            <input
////////                                type="date"
////////                                value={startDate}
////////                                onChange={(e) => setStartDate(e.target.value)}
////////                            />
////////                        </div>

////////                        <div className="filter-group">
////////                            <label> end Date</label>
////////                            <input
////////                                type="date"
////////                                value={endDate}
////////                                onChange={(e) => setEndDate(e.target.value)}
////////                            />
////////                        </div>
////////                    </>
////////                )}
////////            </div>

////////            <div className="filter-actions">
////////                <button type="submit" className="filter-btn">Filter</button>
////////                <button type="button" className="reset-btn" onClick={handleReset}> reset </button>
////////            </div>
////////        </form>
////////    );
////////};

////////export default TicketFilter;




















import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaTicketAlt } from 'react-icons/fa';

const TicketTable = ({ tickets = [], showActions = false }) => {
    if (!tickets || tickets.length === 0) {
        return (
            <div className="flex flex-col items-center py-16 text-center">
                <div className="text-6xl text-gray-300 mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tickets To Display</h3>
                <p className="text-gray-500 max-w-md">
                    There are currently no tickets matching your criteria
                </p>
            </div>
        );
    }

    const getStatusClass = (status) => {
        const statusMap = {
            new: { bg: 'bg-blue-100', text: 'text-blue-800' },
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
            complete: { bg: 'bg-green-100', text: 'text-green-800' },
            refund: { bg: 'bg-red-100', text: 'text-red-800' }
        };

        const key = status.toLowerCase();
        return statusMap[key] || { bg: 'bg-gray-100', text: 'text-gray-800' };
    };

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ticket #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Device Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created Date
                        </th>
                        {showActions && (
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/*{tickets.map(ticket => (*/}
                    {/*    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">*/}
                    {/*        <td className="px-6 py-4 whitespace-nowrap">*/}
                    {/*            <div className="flex items-center">*/}
                    {/*                <FaTicketAlt className="text-blue-500 mr-2" />*/}
                    {/*                <span className="text-sm font-medium text-gray-900">*/}
                    {/*                    {ticket.ticketNumber}*/}

                    {tickets.map(ticket => (
                        <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <FaTicketAlt className="text-blue-500 mr-2" />
                                    <span className="text-sm font-medium text-gray-900">
                                        {ticket.ticketNumber}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 max-w-md truncate" title={ticket.description}>
                                    {ticket.description}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {ticket.deviceCategory?.categoryName || 'N/A'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {ticket.statusText && (
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(ticket.statusText).bg} ${getStatusClass(ticket.statusText).text}`}>
                                        {ticket.statusText}
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {new Date(ticket.createdDate).toLocaleDateString()}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {new Date(ticket.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </td>
                            {showActions && (
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link
                                        to={`/ticket/${ticket.id}`}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-900 transition-colors"
                                    >
                                        <FaEye className="mr-1" />
                                        View
                                    </Link>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketTable;























//import React from 'react';
//import { Link } from 'react-router-dom';
//import { FaEye, FaCheckCircle, FaClock, FaTags, FaTimesCircle } from 'react-icons/fa';
//import { motion } from 'framer-motion';

//const TicketTable = ({ tickets = [], showActions = false }) => {
//    // التحقق من أن tickets غير undefined
//    if (!tickets || tickets.length === 0) {
//        return (
//            <div className="flex flex-col items-center py-16 text-center">
//                <div className="text-6xl text-gray-300 mb-4">📭</div>
//                <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد تذاكر</h3>
//                <p className="text-gray-500 max-w-md">
//                    لا توجد تذاكر تطابق معايير البحث الحالية
//                </p>
//            </div>
//        );
//    }

//    const getStatusIcon = (status) => {
//        switch (status) {
//            case 'New':
//                return <FaClock className="ml-1" />;
//            case 'Pending':
//                return <FaTags className="ml-1" />;
//            case 'Complete':
//                return <FaCheckCircle className="ml-1" />;
//            case 'Refund':
//                return <FaTimesCircle className="ml-1" />;
//            default:
//                return null;
//        }
//    };

//    const getStatusClass = (status) => {
//        switch (status.toLowerCase()) {
//            case 'new':
//                return 'bg-blue-100 text-blue-800 border border-blue-200';
//            case 'pending':
//                return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
//            case 'complete':
//                return 'bg-green-100 text-green-800 border border-green-200';
//            case 'refund':
//                return 'bg-red-100 text-red-800 border border-red-200';
//            default:
//                return 'bg-gray-100 text-gray-800 border border-gray-200';
//        }
//    };

//    return (
//        <motion.div
//            initial={{ opacity: 0 }}
//            animate={{ opacity: 1 }}
//            transition={{ duration: 0.3 }}
//            className="overflow-x-auto"
//        >
//            <table className="min-w-full divide-y divide-gray-200">
//                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                    <tr>
//                        <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
//                            رقم التذكرة
//                        </th>
//                        <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
//                            الوصف
//                        </th>
//                        <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
//                            فئة الجهاز
//                        </th>
//                        <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
//                            الحالة
//                        </th>
//                        <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
//                            تاريخ الإنشاء
//                        </th>
//                        {showActions && (
//                            <th scope="col" className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
//                                الإجراءات
//                            </th>
//                        )}
//                    </tr>
//                </thead>
//                <tbody className="bg-white divide-y divide-gray-200">
//                    {tickets.map((ticket, index) => (
//                        <motion.tr
//                            key={ticket.id}
//                            initial={{ opacity: 0, y: 10 }}
//                            animate={{ opacity: 1, y: 0 }}
//                            transition={{ delay: index * 0.05 }}
//                            className="hover:bg-gray-50 transition-colors"
//                        >
//                            <td className="px-6 py-4 whitespace-nowrap">
//                                <div className="text-sm font-medium text-gray-900 flex items-center">
//                                    <FaTicketAlt className="text-blue-500 mr-2" />
//                                    {ticket.ticketNumber}
//                                </div>
//                            </td>
//                            <td className="px-6 py-4">
//                                <div className="text-sm text-gray-900 line-clamp-2 max-w-md">
//                                    {ticket.description}
//                                </div>
//                            </td>
//                            <td className="px-6 py-4 whitespace-nowrap">
//                                <div className="text-sm text-gray-900 bg-gray-100 px-3 py-1.5 rounded-full inline-block">
//                                    {ticket.deviceCategory?.categoryName || 'غير محدد'}
//                                </div>
//                            </td>
//                            <td className="px-6 py-4 whitespace-nowrap">
//                                <span className={`px-3 py-1.5 inline-flex text-sm font-medium rounded-lg ${getStatusClass(ticket.statusText)}`}>
//                                    {getStatusIcon(ticket.statusText)}
//                                    {ticket.statusText}
//                                </span>
//                            </td>
//                            <td className="px-6 py-4 whitespace-nowrap">
//                                <div className="text-sm text-gray-900">
//                                    {new Date(ticket.createdDate).toLocaleDateString('ar-EG', {
//                                        day: 'numeric',
//                                        month: 'short',
//                                        year: 'numeric'
//                                    })}
//                                </div>
//                                <div className="text-xs text-gray-500">
//                                    {new Date(ticket.createdDate).toLocaleTimeString([], {
//                                        hour: '2-digit',
//                                        minute: '2-digit'
//                                    })}
//                                </div>
//                            </td>
//                            {showActions && (
//                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                    <motion.button
//                                        whileHover={{ scale: 1.05 }}
//                                        whileTap={{ scale: 0.95 }}
//                                        onClick={() => window.location.href = `/ticket/${ticket.id}`}
//                                        className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm leading-4 font-medium rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
//                                    >
//                                        <FaEye className="ml-1 h-4 w-4" />
//                                        عرض
//                                    </motion.button>
//                                </td>
//                            )}
//                        </motion.tr>
//                    ))}
//                </tbody>
//            </table>
//        </motion.div>
//    );
//};

//export default TicketTable;
























































////import React from 'react';
////import { Link } from 'react-router-dom';

////const TicketTable = ({ tickets, showActions = false }) => {
////    if (tickets.length === 0) {
////        return (
////            <div style={noTicketsStyles.container}>
////                <div style={noTicketsStyles.icon}>📋</div>
////                <h3 style={noTicketsStyles.title}>No Tickets To Display</h3>
////                <p style={noTicketsStyles.message}>No matching tickets found</p>
////            </div>
////        );
////    }

////    return (
////        <div style={tableStyles.container}>
////            <div style={tableStyles.responsiveTable}>
////                <table style={tableStyles.table}>
////                    <thead style={tableStyles.header}>
////                        <tr>
////                            <th style={tableStyles.th}>Ticket #</th>
////                            <th style={tableStyles.th}>Description</th>
////                            <th style={tableStyles.th}>Device Category</th>
////                            <th style={tableStyles.th}>Status</th>
////                            <th style={tableStyles.th}>Created Date</th>
////                            {showActions && <th style={tableStyles.th}>Actions</th>}
////                        </tr>
////                    </thead>
////                    <tbody>
////                        {tickets.map(ticket => (
////                            <tr key={ticket.id} style={tableStyles.row}>
////                                <td style={tableStyles.td}>
////                                    <span style={tableStyles.ticketNumber}>
////                                        {ticket.ticketNumber}
////                                    </span>
////                                </td>
////                                <td style={tableStyles.td}>
////                                    <div style={tableStyles.description}>
////                                        {ticket.description.length > 60
////                                            ? `${ticket.description.substring(0, 60)}...`
////                                            : ticket.description}
////                                    </div>
////                                </td>
////                                <td style={tableStyles.td}>
////                                    {ticket.deviceCategory?.categoryName || 'N/A'}
////                                </td>
////                                <td style={tableStyles.td}>
////                                    <span
////                                        style={getStatusStyle(ticket.statusText)}
////                                        className={`status-badge ${ticket.statusText.toLowerCase()}`}
////                                    >
////                                        {ticket.statusText}
////                                    </span>
////                                </td>
////                                <td style={tableStyles.td}>
////                                    <div style={tableStyles.dateCell}>
////                                        {new Date(ticket.createdDate).toLocaleDateString()}
////                                        <div style={tableStyles.time}>
////                                            {new Date(ticket.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
////                                        </div>
////                                    </div>
////                                </td>
////                                {showActions && (
////                                    <td style={tableStyles.td}>
////                                        <Link
////                                            to={`/ticket/${ticket.id}`}
////                                            style={tableStyles.viewButton}
////                                        >
////                                            View Details
////                                        </Link>
////                                    </td>
////                                )}
////                            </tr>
////                        ))}
////                    </tbody>
////                </table>
////            </div>
////        </div>
////    );
////};

////import React from 'react';
////import { Link } from 'react-router-dom';

////const TicketTable = ({ tickets, showActions = false }) => {
////    // تأكد من أن tickets مصفوفة
////    const safeTickets = Array.isArray(tickets) ? tickets : [];

////    if (safeTickets.length === 0) {
////        return (
////            <div style={noTicketsStyles.container}>
////                <div style={noTicketsStyles.icon}>📋</div>
////                <h3 style={noTicketsStyles.title}>No Tickets To Display</h3>
////                <p style={noTicketsStyles.message}>No matching tickets found</p>
////            </div>
////        );
////    }

////    return (
////        <div style={tableStyles.container}>
////            <div style={tableStyles.responsiveTable}>
////                <table style={tableStyles.table}>
////                    <thead style={tableStyles.header}>
////                        <tr>
////                            <th style={tableStyles.th}>Ticket #</th>
////                            <th style={tableStyles.th}>Description</th>
////                            <th style={tableStyles.th}>Device Category</th>
////                            <th style={tableStyles.th}>Status</th>
////                            <th style={tableStyles.th}>Created Date</th>
////                            {showActions && <th style={tableStyles.th}>Actions</th>}
////                        </tr>
////                    </thead>
////                    <tbody>
////                        {safeTickets.map(ticket => (
////                            <tr key={ticket.id} style={tableStyles.row}>
////                                <td style={tableStyles.td}>
////                                    <span style={tableStyles.ticketNumber}>
////                                        {ticket.ticketNumber}
////                                    </span>
////                                </td>
////                                <td style={tableStyles.td}>
////                                    <div style={tableStyles.description}>
////                                        {ticket.description ? (
////                                            ticket.description.length > 60
////                                                ? `${ticket.description.substring(0, 60)}...`
////                                                : ticket.description
////                                        ) : (
////                                            'No description'
////                                        )}
////                                    </div>
////                                </td>
////                                <td style={tableStyles.td}>
////                                    {ticket.deviceCategory?.categoryName || 'N/A'}
////                                </td>
////                                <td style={tableStyles.td}>
////                                    <span
////                                        style={getStatusStyle(ticket.statusText)}
////                                        className={`status-badge ${ticket.statusText?.toLowerCase()}`}
////                                    >
////                                        {ticket.statusText || 'Unknown'}
////                                    </span>
////                                </td>
////                                <td style={tableStyles.td}>
////                                    <div style={tableStyles.dateCell}>
////                                        {ticket.createdDate ? new Date(ticket.createdDate).toLocaleDateString() : 'N/A'}
////                                        <div style={tableStyles.time}>
////                                            {ticket.createdDate ? new Date(ticket.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
////                                        </div>
////                                    </div>
////                                </td>
////                                {showActions && (
////                                    <td style={tableStyles.td}>
////                                        <Link
////                                            to={`/ticket/${ticket.id}`}
////                                            style={tableStyles.viewButton}
////                                        >
////                                            View Details
////                                        </Link>
////                                    </td>
////                                )}
////                            </tr>
////                        ))}
////                    </tbody>
////                </table>
////            </div>
////        </div>
////    );
////};

////// ... بقية الكود كما هو ...
////// Helper function for status styles
////const getStatusStyle = (status) => {
////    const baseStyle = {
////        padding: '6px 12px',
////        borderRadius: '20px',
////        fontSize: '12px',
////        fontWeight: '600',
////        display: 'inline-block',
////        textAlign: 'center',
////        minWidth: '80px'
////    };

////    switch (status.toLowerCase()) {
////        case 'new':
////            return { ...baseStyle, backgroundColor: '#e3f2fd', color: '#1976d2' };
////        case 'pending':
////            return { ...baseStyle, backgroundColor: '#fff8e1', color: '#f57c00' };
////        case 'complete':
////            return { ...baseStyle, backgroundColor: '#e8f5e9', color: '#388e3c' };
////        case 'refund':
////            return { ...baseStyle, backgroundColor: '#ffebee', color: '#d32f2f' };
////        default:
////            return { ...baseStyle, backgroundColor: '#f5f5f5', color: '#757575' };
////    }
////};

////const tableStyles = {
////    container: {
////        width: '100%',
////        overflowX: 'auto'
////    },
////    responsiveTable: {
////        minWidth: '1000px'
////    },
////    table: {
////        width: '100%',
////        borderCollapse: 'collapse',
////        fontSize: '14px'
////    },
////    header: {
////        backgroundColor: '#f8f9fa'
////    },
////    th: {
////        padding: '16px 20px',
////        textAlign: 'left',
////        fontWeight: '600',
////        color: '#495057',
////        borderBottom: '2px solid #e9ecef'
////    },
////    row: {
////        borderBottom: '1px solid #e9ecef',
////        transition: 'background-color 0.2s',
////        ':hover': {
////            backgroundColor: '#f8f9fa'
////        }
////    },
////    td: {
////        padding: '16px 20px',
////        verticalAlign: 'top'
////    },
////    ticketNumber: {
////        fontWeight: '600',
////        color: '#2c3e50'
////    },
////    description: {
////        color: '#495057',
////        lineHeight: '1.5'
////    },
////    dateCell: {
////        display: 'flex',
////        flexDirection: 'column'
////    },
////    time: {
////        fontSize: '12px',
////        color: '#6c757d',
////        marginTop: '4px'
////    },
////    viewButton: {
////        padding: '8px 16px',
////        backgroundColor: '#3498db',
////        color: 'white',
////        borderRadius: '4px',
////        textDecoration: 'none',
////        fontSize: '13px',
////        fontWeight: '500',
////        display: 'inline-block',
////        transition: 'background-color 0.2s',
////        ':hover': {
////            backgroundColor: '#2980b9',
////            textDecoration: 'none'
////        }
////    }
////};
////import React from 'react';
////import { Link } from 'react-router-dom';

////const TicketTable = ({ tickets, showActions = false }) => {
////    if (tickets.length === 0) {
////        return (
////            <div style={noTicketsStyles.container}>
////                <div style={noTicketsStyles.icon}>📋</div>
////                <h3 style={noTicketsStyles.title}>No Tickets To Display</h3>
////                <p style={noTicketsStyles.message}>No matching tickets found</p>
////            </div>
////        );
////    }

////    return (
////        <div style={tableStyles.container}>
////            <div style={tableStyles.responsiveTable}>
////                <table style={tableStyles.table}>
////                    <thead style={tableStyles.header}>
////                        <tr>
////                            <th style={tableStyles.th}>Ticket #</th>
////                            <th style={tableStyles.th}>Description</th>
////                            <th style={tableStyles.th}>Device Category</th>
////                            <th style={tableStyles.th}>Status</th>
////                            <th style={tableStyles.th}>Created Date</th>
////                            {showActions && <th style={tableStyles.th}>Actions</th>}
////                        </tr>
////                    </thead>
////                    <tbody>
////                        {tickets.map(ticket => (
////                            <tr key={ticket.id} style={tableStyles.row}>
////                                <td style={tableStyles.td}>
////                                    <span style={tableStyles.ticketNumber}>
////                                        {ticket.ticketNumber}
////                                    </span>
////                                </td>
////                                <td style={tableStyles.td}>
////                                    <div style={tableStyles.description}>
////                                        {ticket.description.length > 60
////                                            ? `${ticket.description.substring(0, 60)}...`
////                                            : ticket.description}
////                                    </div>
////                                </td>
////                                <td style={tableStyles.td}>
////                                    {ticket.deviceCategory?.categoryName || 'N/A'}
////                                </td>
////                                <td style={tableStyles.td}>
////                                    <span
////                                        style={getStatusStyle(ticket.statusText)}
////                                        className={`status-badge ${ticket.statusText.toLowerCase()}`}
////                                    >
////                                        {ticket.statusText}
////                                    </span>
////                                </td>
////                                <td style={tableStyles.td}>
////                                    <div style={tableStyles.dateCell}>
////                                        {new Date(ticket.createdDate).toLocaleDateString()}
////                                        <div style={tableStyles.time}>
////                                            {new Date(ticket.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
////                                        </div>
////                                    </div>
////                                </td>
////                                {showActions && (
////                                    <td style={tableStyles.td}>
////                                        <Link
////                                            to={`/ticket/${ticket.id}`}
////                                            style={tableStyles.viewButton}
////                                        >
////                                            View Details
////                                        </Link>
////                                    </td>
////                                )}
////                            </tr>
////                        ))}
////                    </tbody>
////                </table>
////            </div>

////            <div style={tableStyles.pagination}>
////                <button style={tableStyles.paginationButton} disabled>
////                    Previous
////                </button>
////                <span style={tableStyles.pageInfo}>Page 1 of 5</span>
////                <button style={tableStyles.paginationButton}>
////                    Next
////                </button>
////            </div>
////        </div>
////    );
////};

////// Helper function for status styles
////const getStatusStyle = (status) => {
////    const baseStyle = {
////        padding: '6px 12px',
////        borderRadius: '20px',
////        fontSize: '12px',
////        fontWeight: '600',
////        display: 'inline-block',
////        textAlign: 'center',
////        minWidth: '80px'
////    };

////    switch (status.toLowerCase()) {
////        case 'new':
////            return { ...baseStyle, backgroundColor: '#e3f2fd', color: '#1976d2' };
////        case 'pending':
////            return { ...baseStyle, backgroundColor: '#fff8e1', color: '#f57c00' };
////        case 'complete':
////            return { ...baseStyle, backgroundColor: '#e8f5e9', color: '#388e3c' };
////        case 'refund':
////            return { ...baseStyle, backgroundColor: '#ffebee', color: '#d32f2f' };
////        default:
////            return { ...baseStyle, backgroundColor: '#f5f5f5', color: '#757575' };
////    }
////};

////const tableStyles = {
////    container: {
////        width: '100%',
////        overflowX: 'auto',
////        backgroundColor: '#ffffff',
////        borderRadius: '10px',
////        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
////    },
////    responsiveTable: {
////        minWidth: '1000px',
////        width: '100%'
////    },
////    table: {
////        width: '100%',
////        borderCollapse: 'collapse',
////        fontSize: '14px'
////    },
////    header: {
////        backgroundColor: '#f8f9fa'
////    },
////    th: {
////        padding: '16px 20px',
////        textAlign: 'left',
////        fontWeight: '600',
////        color: '#495057',
////        borderBottom: '2px solid #e9ecef',
////        backgroundColor: '#2c3e50',
////        color: 'white'
////    },
////    row: {
////        borderBottom: '1px solid #e9ecef',
////        transition: 'background-color 0.2s',
////        ':hover': {
////            backgroundColor: '#f8f9fa'
////        }
////    },
////    td: {
////        padding: '16px 20px',
////        verticalAlign: 'top'
////    },
////    ticketNumber: {
////        fontWeight: '600',
////        color: '#2c3e50'
////    },
////    description: {
////        color: '#495057',
////        lineHeight: '1.5'
////    },
////    dateCell: {
////        display: 'flex',
////        flexDirection: 'column'
////    },
////    time: {
////        fontSize: '12px',
////        color: '#6c757d',
////        marginTop: '4px'
////    },
////    viewButton: {
////        padding: '8px 16px',
////        backgroundColor: '#3498db',
////        color: 'white',
////        borderRadius: '4px',
////        textDecoration: 'none',
////        fontSize: '13px',
////        fontWeight: '500',
////        display: 'inline-block',
////        transition: 'all 0.3s',
////        ':hover': {
////            backgroundColor: '#2980b9',
////            transform: 'translateY(-2px)',
////            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
////        }
////    },
////    pagination: {
////        display: 'flex',
////        justifyContent: 'center',
////        alignItems: 'center',
////        padding: '20px',
////        borderTop: '1px solid #eaeaea'
////    },
////    paginationButton: {
////        padding: '8px 16px',
////        margin: '0 10px',
////        backgroundColor: '#f8f9fa',
////        border: '1px solid #dee2e6',
////        borderRadius: '4px',
////        cursor: 'pointer',
////        transition: 'all 0.2s',
////        ':hover': {
////            backgroundColor: '#e9ecef'
////        },
////        ':disabled': {
////            opacity: 0.5,
////            cursor: 'not-allowed'
////        }
////    },
////    pageInfo: {
////        fontSize: '14px',
////        color: '#6c757d'
////    }
////};

////// ... (بقية الأنماط تبقى كما هي)



////const noTicketsStyles = {
////    container: {
////        padding: '40px 20px',
////        textAlign: 'center',
////        backgroundColor: '#f8f9fa',
////        borderRadius: '10px',
////        marginTop: '20px'
////    },
////    icon: {
////        fontSize: '60px',
////        marginBottom: '20px',
////        color: '#bdc3c7'
////    },
////    title: {
////        fontSize: '24px',
////        fontWeight: '600',
////        color: '#495057',
////        marginBottom: '10px'
////    },
////    message: {
////        color: '#6c757d',
////        fontSize: '16px',
////        margin: 0
////    }
////};

////export default TicketTable;































////import React from 'react';
////import { Link } from 'react-router-dom';

////const TicketTable = ({ tickets, showActions = false }) => {
////    if (tickets.length === 0) {
////        return <div className="no-tickets">No Tickets To Display</div>;
////    }

////    return (
////        <div className="ticket-table-container">
////            <table className="ticket-table">
////                <thead>
////                    <tr>
////                        <th> Ticket Number</th>
////                        <th>Descreption</th>
////                        <th>Device Category </th>
////                        <th>Status</th>
////                        <th>Created Date </th>
////                        {showActions && <th>Action</th>}
////                    </tr>
////                </thead>
////                <tbody>
////                    {tickets.map(ticket => (
////                        <tr key={ticket.id}>
////                            <td className="ticket-number">{ticket.ticketNumber}</td>
////                            <td className="ticket-description">
////                                {ticket.description.length > 50
////                                    ? `${ticket.description.substring(0, 50)}...`
////                                    : ticket.description}
////                            </td>
////                            <td className="device-category">
////                                {ticket.deviceCategory?.categoryName || 'غير محدد'}
////                            </td>
////                            <td className="ticket-status">
////                                <span className={`status-badge ${ticket.statusText.toLowerCase()}`}>
////                                    {ticket.statusText}
////                                </span>
////                            </td>
////                            <td className="created-date">
////                                {new Date(ticket.createdDate).toLocaleDateString()}
////                            </td>
////                            {showActions && (
////                                <td className="actions">
////                                    <Link to={`/ticket/${ticket.id}`} className="view-btn">
////                                        show details
////                                    </Link>
////                                </td>
////                            )}
////                        </tr>
////                    ))}
////                </tbody>
////            </table>
////        </div>
////    );
////};

////export default TicketTable;