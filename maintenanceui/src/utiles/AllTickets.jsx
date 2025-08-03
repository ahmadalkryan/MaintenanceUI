
import React, { useState, useEffect } from 'react';
import { getAllTickets } from '../api/tickets';
import TicketTable from '../components/tickets/TicketTable';
import TicketFilter from '../components/tickets/TicketFilter';
import { FaTicketAlt, FaFilter, FaSync, FaChartPie } from 'react-icons/fa';
import { Skeleton, Card, Statistic, Row, Col } from 'antd';
import dayjs from 'dayjs';

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        pending: 0,
        complete: 0,
        refund: 0
    });
    const [activeFilter, setActiveFilter] = useState('all');
    const mapTicketStatus = (statusId) => {
        switch (statusId) {
            case 1: return 'New';
            case 2: return 'Pending';
            case 3: return 'Complete';
            case 4: return 'Refund';
            default: return 'Unknown';
        }
    };
    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setIsLoading(true);
            setError('');
            const result = await getAllTickets();

            if (result.success) {
                const ticketsWithStatus = result.data.map(ticket => ({
                    ...ticket,
                    statusText: mapTicketStatus(ticket.ticketStatusId),
                    createdDate: dayjs(ticket.createdDate),
                    updatedDate: dayjs(ticket.updatedDate)
                }));

                setTickets(ticketsWithStatus);
                setFilteredTickets(ticketsWithStatus);
                calculateStats(ticketsWithStatus);
            } else {
                throw new Error(result.message);
            }
        } catch (err) {
            setError(err.message || 'فشل تحميل التذاكر');
            console.error('Error loading tickets:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateStats = (tickets) => {
        const statusCount = tickets.reduce((acc, ticket) => {
            acc[ticket.statusText] = (acc[ticket.statusText] || 0) + 1;
            return acc;
        }, {});

        setStats({
            total: tickets.length,
            new: statusCount['New'] || 0,
            pending: statusCount['Pending'] || 0,
            complete: statusCount['Complete'] || 0,
            refund: statusCount['Refund'] || 0
        });
    };

    const handleFilter = (filters) => {
        let result = [...tickets];

        if (filters.ticketNumber) {
            result = result.filter(t =>
                t.ticketNumber.toLowerCase().includes(filters.ticketNumber.toLowerCase())
            );
        }

        if (filters.status) {
            result = result.filter(t => t.statusText === filters.status);
            setActiveFilter(filters.status.toLowerCase());
        } else {
            setActiveFilter('all');
        }

        if (filters.startDate) {
            const start = dayjs(filters.startDate);
            result = result.filter(t => t.createdDate.isAfter(start));
        }

        if (filters.endDate) {
            const end = dayjs(filters.endDate).endOf('day');
            result = result.filter(t => t.createdDate.isBefore(end));
        }

        setFilteredTickets(result);
        calculateStats(result);
    };

    const handleRefresh = () => {
        fetchTickets();
        setActiveFilter('all');
    };

    const handleQuickFilter = (status) => {
        setActiveFilter(status);

        if (status === 'all') {
            setFilteredTickets(tickets);
            calculateStats(tickets);
            return;
        }

        const result = tickets.filter(t =>
            t.statusText.toLowerCase() === status
        );

        setFilteredTickets(result);
        calculateStats(result);
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'new': return 'bg-blue-500';
            case 'pending': return 'bg-yellow-500';
            case 'complete': return 'bg-green-500';
            case 'refund': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                            <FaTicketAlt className="mr-3 text-blue-500" />
                          Maintenance Tickets
                        </h1>
                        <p className="text-gray-600 mt-2">Display And Mangement</p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 w-full md:w-auto"
                        disabled={isLoading}
                    >
                        <FaSync className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                      Update Data
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button
                        onClick={() => handleQuickFilter('all')}
                        className={`px-3 py-1 rounded-full ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        All ({stats.total})
                    </button>
                    <button
                        onClick={() => handleQuickFilter('new')}
                        className={`px-3 py-1 rounded-full ${activeFilter === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        New ({stats.new})
                    </button>
                    <button
                        onClick={() => handleQuickFilter('pending')}
                        className={`px-3 py-1 rounded-full ${activeFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Pending  ({stats.pending})
                    </button>
                    <button
                        onClick={() => handleQuickFilter('complete')}
                        className={`px-3 py-1 rounded-full ${activeFilter === 'complete' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Complete ({stats.complete})
                    </button>
                    <button
                        onClick={() => handleQuickFilter('refund')}
                        className={`px-3 py-1 rounded-full ${activeFilter === 'refund' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Refund ({stats.refund})
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <Card className="shadow-md">
                        <Statistic
                            title="إجمالي التذاكر"
                            value={stats.total}
                            valueStyle={{ color: '#3b82f6' }}
                        />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic
                            title="جديد"
                            value={stats.new}
                            valueStyle={{ color: '#3b82f6' }}
                            prefix={<span className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusClass('new')}`}></span>}
                        />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic
                            title="قيد المعالجة"
                            value={stats.pending}
                            valueStyle={{ color: '#eab308' }}
                            prefix={<span className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusClass('pending')}`}></span>}
                        />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic
                            title="مكتمل"
                            value={stats.complete}
                            valueStyle={{ color: '#22c55e' }}
                            prefix={<span className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusClass('complete')}`}></span>}
                        />
                    </Card>
                    <Card className="shadow-md">
                        <Statistic
                            title="مرتجع"
                            value={stats.refund}
                            valueStyle={{ color: '#ef4444' }}
                            prefix={<span className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusClass('refund')}`}></span>}
                        />
                    </Card>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                            <FaFilter className="mr-2 text-blue-500" />
                            Filter Tickets
                        </h2>
                    </div>
                    <TicketFilter onFilter={handleFilter} />
                </div>
            </div>

            {/* Tickets Table */}
            {isLoading ? (
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                    <Skeleton active paragraph={{ rows: 8 }} />
                </div>
            ) : filteredTickets.length === 0 ? (
                <div className="flex flex-col items-center py-16 text-center bg-white rounded-xl shadow-md">
                    <div className="text-6xl text-gray-300 mb-4">📭</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tickets   </h3>
                    <p className="text-gray-500 max-w-md">
                        Try To Filter Search ...
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <TicketTable tickets={filteredTickets} />
                </div>
            )}
        </div>
    );
};

export default AllTickets;





import React, { useState, useEffect } from 'react';
import { addTicketTrace, getTicketTraces, getTicketTracesForUser } from '../../api/ticketTraces';
import { getAllDeviceCategories } from '../../api/deviceCategory';
import { getAllTickets } from '../../api/tickets';



const TicketTrace = () => {
    // حالات التطبيق
    const [tickets, setTickets] = useState([]);
    const [deviceCategories, setDeviceCategories] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [traces, setTraces] = useState([]);
    const [showAddTraceModal, setShowAddTraceModal] = useState(false);
    const [newTrace, setNewTrace] = useState({
        note: '',
        statusId: 1,
        userId: 'admin_user_123'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('tickets');

    // جلب البيانات عند تحميل المكون
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // جلب التذاكر
                const ticketsRes = await getAllTickets();
                if (ticketsRes.success) {
                    setTickets(ticketsRes.data);
                }

                // جلب فئات الأجهزة
                const categoriesRes = await getAllDeviceCategories();
                if (categoriesRes.success) {
                    setDeviceCategories(categoriesRes.data);
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // جلب تتبع التذكرة عند اختيارها
    useEffect(() => {
        if (selectedTicket) {
            const fetchTraces = async () => {
                try {
                    setLoading(true);
                    const tracesRes = await getTicketTraces(selectedTicket.id);
                    if (tracesRes.success) {
                        setTraces(tracesRes.data);
                    }
                    setLoading(false);
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            };

            fetchTraces();
        }
    }, [selectedTicket]);

    // معالجة تغيير الحقول في نموذج إضافة التتبع
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTrace({
            ...newTrace,
            [name]: value
        });
    };

    // إضافة تتبع جديد
    const handleAddTrace = async (e) => {
        e.preventDefault();
        try {
            if (!selectedTicket) {
                throw new Error('الرجاء اختيار تذكرة أولاً');
            }

            const traceData = {
                ...newTrace,
                ticketId: selectedTicket.id
            };

            const result = await addTicketTrace(traceData);

            if (result.success) {
                // تحديث قائمة التتبع
                const tracesRes = await getTicketTraces(selectedTicket.id);
                if (tracesRes.success) {
                    setTraces(tracesRes.data);
                }

                // إغلاق النموذج وإعادة تعيين الحقول
                setShowAddTraceModal(false);
                setNewTrace({
                    note: '',
                    statusId: 1,
                    userId: 'admin_user_123'
                });
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // الحصول على اسم فئة الجهاز
    const getDeviceCategoryName = (categoryId) => {
        const category = deviceCategories.find(cat => cat.id === categoryId);
        return category ? category.name : 'غير معروف';
    };

    // الحصول على حالة التذكرة
    const getStatusText = (statusId) => {
        const statuses = {
            1: 'مفتوحة',
            2: 'قيد المعالجة',
            3: 'مغلقة',
            4: 'معلقة'
        };
        return statuses[statusId] || 'غير معروف';
    };

    // الحصول على لون حالة التذكرة
    const getStatusColor = (statusId) => {
        const colors = {
            1: 'bg-blue-100 text-blue-800',
            2: 'bg-yellow-100 text-yellow-800',
            3: 'bg-green-100 text-green-800',
            4: 'bg-gray-100 text-gray-800'
        };
        return colors[statusId] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">
                            خطأ: {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* شريط التنقل العلوي */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                            <div className="ml-4">
                                <h1 className="text-2xl font-bold">لوحة تحكم مسؤول الصيانة</h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                                تسجيل الخروج
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* المحتوى الرئيسي */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* الشريط الجانبي */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">إحصائيات</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">إجمالي التذاكر</span>
                                    <span className="font-bold text-blue-600">{tickets.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">المفتوحة</span>
                                    <span className="font-bold text-blue-600">
                                        {tickets.filter(t => t.statusId === 1).length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">قيد المعالجة</span>
                                    <span className="font-bold text-yellow-600">
                                        {tickets.filter(t => t.statusId === 2).length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">المغلقة</span>
                                    <span className="font-bold text-green-600">
                                        {tickets.filter(t => t.statusId === 3).length}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">فئات الأجهزة</h2>
                            <div className="space-y-2">
                                {deviceCategories.map(category => (
                                    <div key={category.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                                        <span className="ml-3 text-gray-700">{category.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* المحتوى الرئيسي */}
                    <div className="lg:col-span-3">
                        {/* أزرار التبويب */}
                        <div className="bg-white rounded-xl shadow-md mb-6">
                            <div className="flex border-b">
                                <button
                                    className={`py-4 px-6 font-medium ${activeTab === 'tickets' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('tickets')}
                                >
                                    قائمة التذاكر
                                </button>
                                <button
                                    className={`py-4 px-6 font-medium ${activeTab === 'traces' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                                    onClick={() => setActiveTab('traces')}
                                    disabled={!selectedTicket}
                                >
                                    تتبع التذاكر
                                </button>
                            </div>
                        </div>

                        {/* محتوى التبويب */}
                        {activeTab === 'tickets' ? (
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-800">قائمة التذاكر</h2>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="بحث في التذاكر..."
                                            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم التذكرة</th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الجهاز</th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوصف</th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tickets.map(ticket => (
                                                <tr
                                                    key={ticket.id}
                                                    className={`hover:bg-gray-50 cursor-pointer ${selectedTicket?.id === ticket.id ? 'bg-blue-50' : ''}`}
                                                    onClick={() => setSelectedTicket(ticket)}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">#{ticket.id}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{getDeviceCategoryName(ticket.deviceCategoryId)}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900">{ticket.description.substring(0, 40)}...</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.statusId)}`}>
                                                            {getStatusText(ticket.statusId)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(ticket.createTime).toLocaleDateString('ar-EG')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            className="text-blue-600 hover:text-blue-900"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedTicket(ticket);
                                                                setActiveTab('traces');
                                                            }}
                                                        >
                                                            عرض التتبع
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* تذييل الجدول */}
                                <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                                    <div className="text-sm text-gray-700">
                                        عرض <span className="font-medium">1</span> إلى <span className="font-medium">10</span> من <span className="font-medium">{tickets.length}</span> نتائج
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                            السابق
                                        </button>
                                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                            التالي
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md">
                                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-800">
                                        تتبع التذكرة #{selectedTicket?.id}
                                    </h2>
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                                        onClick={() => setShowAddTraceModal(true)}
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                        </svg>
                                        إضافة تتبع جديد
                                    </button>
                                </div>

                                <div className="p-6">
                                    {traces.length === 0 ? (
                                        <div className="text-center py-12">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                            <h3 className="mt-2 text-lg font-medium text-gray-900">لا يوجد تتبع لهذه التذكرة</h3>
                                            <p className="mt-1 text-sm text-gray-500">ابدأ بإضافة أول تتبع لهذه التذكرة.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {traces.map(trace => (
                                                <div key={trace.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <span className="text-sm font-medium text-gray-900">
                                                                {getStatusText(trace.statusID)}
                                                            </span>
                                                            <p className="text-sm text-gray-600 mt-1">{trace.note}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-xs text-gray-500">
                                                                {new Date(trace.createTime).toLocaleString('ar-EG')}
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                بواسطة: {trace.userId}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* نافذة إضافة تتبع جديدة */}
            {showAddTraceModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex justify-between items-center pb-4 border-b">
                                <h3 className="text-xl font-bold text-gray-900">إضافة تتبع جديد</h3>
                                <button
                                    className="text-gray-400 hover:text-gray-500"
                                    onClick={() => setShowAddTraceModal(false)}
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleAddTrace} className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        الحالة
                                    </label>
                                    <select
                                        name="statusId"
                                        value={newTrace.statusId}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="1">مفتوحة</option>
                                        <option value="2">قيد المعالجة</option>
                                        <option value="3">مغلقة</option>
                                        <option value="4">معلقة</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        الملاحظة
                                    </label>
                                    <textarea
                                        name="note"
                                        value={newTrace.note}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="أدخل ملاحظاتك حول التذكرة..."
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        onClick={() => setShowAddTraceModal(false)}
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        إضافة التتبع
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketTrace;



































//import React, { useState, useEffect } from 'react';
//import { useAuth } from '../../contexts/AuthContext';
//import { filterTickets } from '../../api/tickets';
//import TicketTable from '../../components/tickets/TicketTable';
//import TicketFilter from '../../components/tickets/TicketFilter';
//import { mapTicketStatus } from '../../api/tickets';

//const AssignedTickets = () => {
//    const { user } = useAuth();
//    const [tickets, setTickets] = useState([]);
//    const [filteredTickets, setFilteredTickets] = useState([]);
//    const [isLoading, setIsLoading] = useState(true);
//    const [error, setError] = useState('');

//    useEffect(() => {
//        const fetchTickets = async () => {
//            try {
//                setIsLoading(true);
//                const result = await filterTickets({});

//                if (!result.success) {
//                    throw new Error(result.message || ' Error to get Tickets');
//                }

//                // 1. تصفية التذاكر حسب المستخدم الحالي
//                const userTickets = result.data.filter(
//                    ticket => ticket.AssignedTo === user.id
//                );

//                // 2. تحويل حالة التذكرة إلى نص مع الحقل الصحيح
//                const ticketsWithStatus = userTickets.map(ticket => ({
//                    ...ticket,
//                    statusText: mapTicketStatus(ticket.TicketStatusId) // استخدم TicketStatusId بدلاً من ticketStatusId
//                }));

//                setTickets(ticketsWithStatus);
//                setFilteredTickets(ticketsWithStatus);
//            } catch (err) {
//                setError(err.message || ' Error to get Tickets');
//            } finally {
//                setIsLoading(false);
//            }
//        };

//        if (user) fetchTickets();
//    }, [user]);

//    const handleFilter = (filters) => {
//        let result = [...tickets];

//        // 3. تصفية رقم التذكرة (باستخدام الحقل الصحيح)
//        if (filters.ticketNumber) {
//            result = result.filter(t =>
//                t.TicketNumber.includes(filters.ticketNumber) // TicketNumber بدلاً من ticketNumber
//            );
//        }

//        // 4. تصفية الحالة
//        if (filters.status) {
//            result = result.filter(t =>
//                t.statusText === filters.status
//            );
//        }

//        // 5. تصفية التواريخ (بداية ونهاية معاً)
//        if (filters.startDate || filters.endDate) {
//            const start = filters.startDate ? new Date(filters.startDate) : null;
//            const end = filters.endDate ? new Date(filters.endDate) : null;

//            result = result.filter(t => {
//                const createdDate = new Date(t.CreatedDate); // CreatedDate بدلاً من createdDate

//                if (start && createdDate < start) return false;
//                if (end && createdDate > end) return false;
//                return true;
//            });
//        }

//        setFilteredTickets(result);
//    };

//    return (
//        <div className="assigned-tickets-page">
//            <h2> Specification Ticket</h2>

//            {error && <div className="error-message">{error}</div>}

//            <div className="ticket-controls">
//                <TicketFilter onFilter={handleFilter} showDateFilter={true} />
//            </div>

//            {isLoading ? (
//                <div className="loading"> Loading ..... ...</div>
//            ) : filteredTickets.length > 0 ? (
//                <TicketTable
//                    tickets={filteredTickets}
//                    showActions={true}
//                />
//            ) : (
//                <div className="no-tickets">No Ticket For You     </div>
//            )}
//        </div>
//    );
//};

//export default AssignedTickets;
























////import React, { useState, useEffect } from 'react';
////import { useAuth } from '../../contexts/AuthContext';
////import { filterTickets } from '../../api/tickets';
////import TicketTable from '../../components/tickets/TicketTable';
////import TicketFilter from '../../components/tickets/TicketFilter';
////import { mapTicketStatus } from '../../api/tickets';

////const AssignedTickets = () => {
////    const { user } = useAuth();
////    const [tickets, setTickets] = useState([]);
////    const [filteredTickets, setFilteredTickets] = useState([]);
////    const [isLoading, setIsLoading] = useState(true);
////    const [error, setError] = useState('');

////    useEffect(() => {
////        const fetchTickets = async () => {
////            try {
////                setIsLoading(true);
////                // جلب جميع التذاكر (أو التذاكر المخصصة للمستخدم الحالي)
////                const data = await filterTickets({});

////                // تحويل حالة التذكرة إلى نص
////                const ticketsWithStatus = data.map(ticket => ({
////                    ...ticket,
////                    statusText: mapTicketStatus(ticket.ticketStatusId)
////                }));

////                setTickets(ticketsWithStatus);
////                setFilteredTickets(ticketsWithStatus);
////            } catch (err) {
////                setError('فشل في تحميل التذاكر');
////            } finally {
////                setIsLoading(false);
////            }
////        };

////        fetchTickets();
////    }, [user]);

////    const handleFilter = (filters) => {
////        let result = [...tickets];

////        if (filters.ticketNumber) {
////            result = result.filter(t =>
////                t.ticketNumber.includes(filters.ticketNumber)
////            );
////        }

////        if (filters.status) {
////            result = result.filter(t =>
////                t.statusText === filters.status
////            );
////        }

////        if (filters.startDate) {
////            result = result.filter(t =>
////                new Date(t.createdDate) >= new Date(filters.startDate)
////            );
////        }

////        if (filters.endDate) {
////            result = result.filter(t =>
////                new Date(t.createdDate) <= new Date(filters.endDate)
////            );
////        }

////        setFilteredTickets(result);
////    };

////    return (
////        <div className="assigned-tickets-page">
////            <h2>التذاكر المخصصة</h2>

////            {error && <div className="error-message">{error}</div>}

////            <div className="ticket-controls">
////                <TicketFilter onFilter={handleFilter} showDateFilter={true} />
////            </div>

////            {isLoading ? (
////                <div className="loading">جاري تحميل التذاكر...</div>
////            ) : (
////                <TicketTable tickets={filteredTickets} showActions={true} />
////            )}
////        </div>
////    );
////};

////export default AssignedTickets;


////import React, { useState, useEffect } from 'react';
////import { filterTickets, filterTicketsByDate, getAllTickets, mapTicketStatus } from '../../api/tickets';
////import TicketTable from '../../components/tickets/TicketTable';
////import TicketFilter from '../../components/tickets/TicketFilter';
////import { FaTicketAlt, FaFilter, FaSync, FaExclamationTriangle } from 'react-icons/fa';

////const AllTickets = () => {
////    const [tickets, setTickets] = useState([]);
////    const [filteredTickets, setFilteredTickets] = useState([]);
////    const [isLoading, setIsLoading] = useState(true);
////    const [filterLoading, setFilterLoading] = useState(false);
////    const [error, setError] = useState('');
////    const [stats, setStats] = useState({
////        total: 0,
////        new: 0,
////        pending: 0,
////        complete: 0,
////        refund: 0
////    });

////    // Initial data loading
////    useEffect(() => {
////        fetchAllTickets();
////    }, []);

////    const fetchAllTickets = async () => {
////        try {
////            setIsLoading(true);
////            setError('');
////            const result = await getAllTickets();
            
////            if (result.success) {
////                const processedTickets = processTicketData(result.data);
////                setTickets(processedTickets);
////                setFilteredTickets(processedTickets);
////                calculateStats(processedTickets);
////            } else {
////                throw new Error(result.message || 'Failed to load tickets');
////            }
////        } catch (err) {
////            setError(err.message);
////        } finally {
////            setIsLoading(false);
////        }
////    };

////    const processTicketData = (tickets) => {
////        return tickets.map(ticket => ({
////            ...ticket,
////            statusText: mapTicketStatus(ticket.ticketStatusId),
////            createdDate: new Date(ticket.createdDate)
////        }));
////    };

////    const calculateStats = (tickets) => {
////        const stats = {
////            total: tickets.length,
////            new: tickets.filter(t => t.statusText === 'New').length,
////            pending: tickets.filter(t => t.statusText === 'Pending').length,
////            complete: tickets.filter(t => t.statusText === 'Complete').length,
////            refund: tickets.filter(t => t.statusText === 'Refund').length
////        };
////        setStats(stats);
////    };

////    // Main filter handler - now properly separates date filters
////    const handleFilter = async (filters) => {
////        try {
////            setFilterLoading(true);
////            setError('');
            
////            // Handle date range filtering separately as per backend structure
////            if (filters.startDate && filters.endDate) {
////                try {
////                    const dateResult = await filterTicketsByDate({
////                        startDate: filters.startDate,
////                        endDate: filters.endDate
////                    });
                    
////                    if (dateResult.success) {
////                        const processedTickets = processTicketData(dateResult.data);
////                        applyNonDateFilters(processedTickets, filters);
////                        return;
////                    }
////                } catch (dateError) {
////                    // If date filtering fails, fall back to local filtering
////                    console.warn('Date filtering failed, using local filtering:', dateError);
////                }
////            }
            
////            // For other filters, use the main filterTickets API
////            const filterPayload = {
////                ticketNumber: filters.ticketNumber,
////                status: filters.status,
////                deviceCategoryId: filters.deviceCategoryId
////            };
            
////            const result = await filterTickets(filterPayload);
            
////            if (result.success) {
////                const processedTickets = processTicketData(result.data);
////                setTickets(processedTickets);
////                setFilteredTickets(processedTickets);
////                calculateStats(processedTickets);
////            } else {
////                // If API filtering fails, fall back to local filtering with current tickets
////                applyNonDateFilters(tickets, filters);
////            }
////        } catch (err) {
////            // Fallback to local filtering if API fails
////            console.error('API filtering failed:', err);
////            applyNonDateFilters(tickets, filters);
////        } finally {
////            setFilterLoading(false);
////        }
////    };

////    // Local filtering as fallback when API filtering fails
////    const applyNonDateFilters = (sourceTickets, filters) => {
////        let result = [...sourceTickets];
        
////        if (filters.ticketNumber) {
////            result = result.filter(t =>
////                t.ticketNumber.toLowerCase().includes(filters.ticketNumber.toLowerCase())
////            );
////        }
        
////        if (filters.status) {
////            result = result.filter(t => t.statusText === filters.status);
////        }
        
////        if (filters.startDate && !filters.endDate) {
////            const start = new Date(filters.startDate);
////            result = result.filter(t => t.createdDate >= start);
////        }
        
////        if (filters.endDate && !filters.startDate) {
////            const end = new Date(filters.endDate);
////            end.setHours(23, 59, 59, 999);
////            result = result.filter(t => t.createdDate <= end);
////        }
        
////        setFilteredTickets(result);
////        calculateStats(result);
////    };

////    const handleRefresh = async () => {
////        await fetchAllTickets();
////    };

////    return (
////        <div className="container mx-auto px-4 py-8">
////            <div className="mb-8">
////                <div className="flex items-center justify-between mb-6">
////                    <div>
////                        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
////                            <FaTicketAlt className="mr-3 text-blue-500" />
////                            Maintenance Tickets
////                        </h1>
////                        <p className="text-gray-600 mt-2">View and manage all maintenance requests</p>
////                    </div>
////                    <button
////                        onClick={handleRefresh}
////                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
////                        disabled={isLoading || filterLoading}
////                    >
////                        <FaSync className={`mr-2 ${isLoading || filterLoading ? 'animate-spin' : ''}`} />
////                        Refresh
////                    </button>
////                </div>
                
////                {error && (
////                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
////                        <div className="flex">
////                            <div className="flex-shrink-0">
////                                <FaExclamationTriangle className="h-5 w-5 text-red-500" />
////                            </div>
////                            <div className="ml-3">
////                                <p className="text-sm text-red-700">{error}</p>
////                            </div>
////                        </div>
////                    </div>
////                )}
                
////                {/* Stats Cards */}
////                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
////                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
////                        <div className="text-gray-500 text-sm">Total Tickets</div>
////                        <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
////                    </div>
////                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400 hover:shadow-md transition-shadow">
////                        <div className="text-gray-500 text-sm">New</div>
////                        <div className="text-2xl font-bold text-blue-500">{stats.new}</div>
////                    </div>
////                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
////                        <div className="text-gray-500 text-sm">Pending</div>
////                        <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
////                    </div>
////                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500 hover:shadow-md transition-shadow">
////                        <div className="text-gray-500 text-sm">Complete</div>
////                        <div className="text-2xl font-bold text-green-500">{stats.complete}</div>
////                    </div>
////                    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500 hover:shadow-md transition-shadow">
////                        <div className="text-gray-500 text-sm">Refund</div>
////                        <div className="text-2xl font-bold text-red-500">{stats.refund}</div>
////                    </div>
////                </div>
                
////                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
////                    <div className="flex items-center justify-between mb-4">
////                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
////                            <FaFilter className="mr-2 text-blue-500" />
////                            Filter Tickets
////                        </h2>
////                    </div>
////                    <TicketFilter
////                        onFilter={handleFilter}
////                        showDateFilter={true}
////                        isLoading={filterLoading}
////                    />
////                </div>
////            </div>
            
////            {/* Loading State */}
////            {(isLoading || filterLoading) && (
////                <div className="flex flex-col items-center justify-center py-12">
////                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
////                    <p className="mt-4 text-gray-600">
////                        {filterLoading ? 'Applying filters...' : 'Loading tickets data...'}
////                    </p>
////                </div>
////            )}
            
////            {/* Empty State */}
////            {!isLoading && !filterLoading && filteredTickets.length === 0 && (
////                <div className="flex flex-col items-center py-16 text-center">
////                    <div className="text-6xl text-gray-300 mb-4">📭</div>
////                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tickets Found</h3>
////                    <p className="text-gray-500 max-w-md">
////                        Try adjusting your search criteria or create a new ticket
////                    </p>
////                </div>
////            )}
            
////            {/* Data Table */}
////            {!isLoading && !filterLoading && filteredTickets.length > 0 && (
////                <div className="bg-white rounded-xl shadow-md overflow-hidden">
////                    <TicketTable
////                        tickets={filteredTickets}
////                        showActions={true}
////                    />
////                </div>
////            )}
////        </div>
////    );
////};

////export default AllTickets;








//import React, { useState, useEffect } from 'react';
//import { getAllTickets, mapTicketStatus } from '../../api/tickets';
//import TicketTable from '../../components/tickets/TicketTable';
//import TicketFilter from '../../components/tickets/TicketFilter';
//import { FaTicketAlt, FaFilter, FaSync } from 'react-icons/fa';
//import StatsCard from '../../components/common/StatsCard';

//const AllTickets = () => {
//    const [tickets, setTickets] = useState([]);
//    const [filteredTickets, setFilteredTickets] = useState([]);
//    const [isLoading, setIsLoading] = useState(true);
//    const [filterLoading, setFilterLoading] = useState(false);
//    const [error, setError] = useState('');
//    const [stats, setStats] = useState({
//        total: 0,
//        new: 0,
//        pending: 0,
//        complete: 0,
//        refund: 0
//    });

//    useEffect(() => {
//        fetchTickets();
//    }, []);

//    const fetchTickets = async () => {
//        try {
//            setIsLoading(true);
//            setError('');
//            const result = await getAllTickets();

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
//            setError(err.message || 'Failed to load tickets');
//        } finally {
//            setIsLoading(false);
//        }
//    };

//    const calculateStats = (tickets) => {
//        const newStats = {
//            total: tickets.length,
//            new: tickets.filter(t => t.statusText === 'New').length,
//            pending: tickets.filter(t => t.statusText === 'Pending').length,
//            complete: tickets.filter(t => t.statusText === 'Complete').length,
//            refund: tickets.filter(t => t.statusText === 'Refund').length
//        };
//        setStats(newStats);
//    };

//    const handleFilter = async (filters) => {
//        try {
//            setFilterLoading(true);
//            setError('');

//            // Local filtering only
//            let result = [...tickets];

//            if (filters.ticketNumber) {
//                result = result.filter(t =>
//                    t.ticketNumber.toLowerCase().includes(filters.ticketNumber.toLowerCase())
//                );
//            }

//            if (filters.status) {
//                result = result.filter(t => t.statusText === filters.status);
//            }

//            if (filters.startDate) {
//                const start = new Date(filters.startDate);
//                result = result.filter(t => t.createdDate >= start);
//            }

//            if (filters.endDate) {
//                const end = new Date(filters.endDate);
//                end.setHours(23, 59, 59, 999);
//                result = result.filter(t => t.createdDate <= end);
//            }

//            setFilteredTickets(result);
//            calculateStats(result);
//        } catch (err) {
//            setError('An error occurred during filtering');
//        } finally {
//            setFilterLoading(false);
//        }
//    };

//    const handleRefresh = async () => {
//        await fetchTickets();
//    };

//    const statusColors = {
//        total: 'blue',
//        new: 'blue',
//        pending: 'yellow',
//        complete: 'green',
//        refund: 'red'
//    };

//    return (
//        <div className="container mx-auto px-4 py-8">
//            <div className="mb-8">
//                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
//                    <div>
//                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
//                            <FaTicketAlt className="mr-3 text-blue-500" />
//                            Maintenance Tickets
//                        </h1>
//                        <p className="text-gray-600 mt-2">View and manage all maintenance requests</p>
//                    </div>
//                    <button
//                        onClick={handleRefresh}
//                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 min-w-[120px] justify-center"
//                        disabled={isLoading}
//                    >
//                        <FaSync className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
//                        Refresh
//                    </button>
//                </div>

//                {error && (
//                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
//                        <div className="flex">
//                            <div className="flex-shrink-0">
//                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                                </svg>
//                            </div>
//                            <div className="ml-3">
//                                <p className="text-sm text-red-700">{error}</p>
//                            </div>
//                        </div>
//                    </div>
//                )}

//                {/* Stats Cards */}
//                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//                    {Object.entries(stats).map(([key, value]) => (
//                        <StatsCard
//                            key={key}
//                            title={key.charAt(0).toUpperCase() + key.slice(1)}
//                            value={value}
//                            color={statusColors[key]}
//                            loading={isLoading}
//                        />
//                    ))}
//                </div>

//                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//                    <div className="flex items-center justify-between mb-4">
//                        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
//                            <FaFilter className="mr-2 text-blue-500" />
//                            Filter Tickets
//                        </h2>
//                    </div>
//                    <TicketFilter
//                        onFilter={handleFilter}
//                        showDateFilter={true}
//                        isLoading={filterLoading || isLoading}
//                    />
//                </div>
//            </div>

//            {isLoading || filterLoading ? (
//                <div className="flex flex-col items-center justify-center py-12">
//                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                    <p className="mt-4 text-gray-600">Loading tickets data...</p>
//                </div>
//            ) : (
//                <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                    {filteredTickets.length === 0 ? (
//                        <div className="flex flex-col items-center py-16 text-center">
//                            <div className="text-6xl text-gray-300 mb-4">📭</div>
//                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tickets Found</h3>
//                            <p className="text-gray-500 max-w-md">
//                                Try adjusting your search criteria or create a new ticket
//                            </p>
//                        </div>
//                    ) : (
//                        <TicketTable
//                            tickets={filteredTickets}
//                            showActions={true}
//                        />
//                    )}
//                </div>
//            )}
//        </div>
//    );
//};

//export default AllTickets;