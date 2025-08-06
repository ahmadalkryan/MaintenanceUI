import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTicketTracesForUser } from '../../api/ticketTraces';
import { format } from 'date-fns';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const [ticketTraces, setTicketTraces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTicketTraces = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Get user ID from localStorage
                const userId = localStorage.getItem('userId');

                if (!userId) {
                    throw new Error('User ID not found in storage');
                }

                const result = await getTicketTracesForUser(userId);

                if (result.success) {
                    setTicketTraces(result.data);
                } else {
                    throw new Error(result.message || 'Failed to fetch ticket traces');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching ticket traces:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTicketTraces();
    }, []);

    const handleCreateTicket = () => {
        navigate('/create-ticket');
    };

    const formatDate = (dateString) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    const getStatusText = (statusId) => {
        // You might want to map status IDs to meaningful text
        const statusMap = {
            1: 'New',
            2: 'Pending',
            3: 'Complete',
            4: 'Refund'
        };

        return statusMap[statusId] || `Status ${statusId}`;
    };

    if (isLoading) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Employee Dashboard</h1>
                    <button
                        className="create-ticket-btn primary"
                        onClick={handleCreateTicket}
                    >
                        + Create New Ticket
                    </button>
                </div>
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading your ticket history...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Employee Dashboard</h1>
                    <button
                        className="create-ticket-btn primary"
                        onClick={handleCreateTicket}
                    >
                        + Create New Ticket
                    </button>
                </div>
                <div className="error-container">
                    <div className="error-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                    </div>
                    <h2>Error Loading Data</h2>
                    <p>{error}</p>
                    <button
                        className="retry-btn"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Employee Dashboard</h1>
                <button
                    className="create-ticket-btn primary"
                    onClick={handleCreateTicket}
                >
                    + Create New Ticket
                </button>
            </div>

            <div className="dashboard-content">
                {ticketTraces.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                            </svg>
                        </div>
                        <h2>No Ticket History</h2>
                        <p>You haven't created any tickets yet</p>
                        <button
                            className="create-ticket-btn secondary"
                            onClick={handleCreateTicket}
                        >
                            Create Your First Ticket
                        </button>
                    </div>
                ) : (
                    <div className="traces-list">
                        <div className="traces-header">
                            <h2>Your Ticket History</h2>
                            <p className="traces-count">
                                {ticketTraces.length} {ticketTraces.length === 1 ? 'ticket' : 'tickets'} found
                            </p>
                        </div>

                        <div className="traces-table">
                            <div className="table-header">
                                <div className="table-cell">Ticket #</div>
                                <div className="table-cell">Note</div>
                                <div className="table-cell">Status</div>
                                <div className="table-cell">Created</div>
                            </div>

                            <div className="table-body">
                                {ticketTraces.map(trace => (
                                    <div
                                        key={trace.Id}
                                        className="table-row"
                                        onClick={() => navigate(`/ticket/${trace.TicketId}`)}
                                    >
                                        <div className="table-cell ticket-number">#{trace.TicketId}</div>
                                        <div className="table-cell note">{trace.Note}</div>
                                        <div className="table-cell status">
                                            <span className={`status-badge status-${trace.StatusID}`}>
                                                {getStatusText(trace.StatusID)}
                                            </span>
                                        </div>
                                        <div className="table-cell date">
                                            {formatDate(trace.createTime)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDashboard;





















//export default MyTickets;


//import React, { useState, useEffect } from 'react';
//import { useAuth } from '../../contexts/AuthContext';
//import { filterTickets, mapTicketStatus } from '../../api/tickets';
//import TicketTable from '../../components/tickets/TicketTable';
//import TicketFilter from '../../components/tickets/TicketFilter';
////import { mapTicketStatus } from '../../utils/ticketUtils';

//const MyTickets = () => {
//    const { user } = useAuth();
//    const [tickets, setTickets] = useState([]);
//    const [filteredTickets, setFilteredTickets] = useState([]);
//    const [isLoading, setIsLoading] = useState(true);
//    const [error, setError] = useState('');

//    useEffect(() => {
//        const fetchTickets = async () => {
//            try {
//                setIsLoading(true);
//                setError('');

//                // Fetch tickets without userId filter
//                const response = await filterTickets({});

//                if (response.success) {
//                    // Filter tickets by current user client-side
//                    const userTickets = response.data.filter(
//                        ticket => ticket.userId === user.userId
//                    );

//                    const ticketsWithStatus = userTickets.map(ticket => ({
//                        ...ticket,
//                        statusText: mapTicketStatus(ticket.ticketStatusId)
//                    }));

//                    setTickets(ticketsWithStatus);
//                    setFilteredTickets(ticketsWithStatus);
//                } else {
//                    setError(response.message || 'فشل في تحميل التذاكر');
//                }
//            } catch (err) {
//                console.error('Error fetching tickets:', err);
//                setError(err.message || 'حدث خطأ أثناء جلب التذاكر');
//            } finally {
//                setIsLoading(false);
//            }
//        };

//        if (user?.userId) {
//            fetchTickets();
//        }
//    }, [user]);

//    const handleFilter = (filters) => {
//        let result = [...tickets];

//        if (filters.ticketNumber) {
//            result = result.filter(t =>
//                t.ticketNumber.toLowerCase().includes(filters.ticketNumber.toLowerCase())
//            );
//        }

//        if (filters.status) {
//            result = result.filter(t => t.statusText === filters.status);
//        }

//        if (filters.deviceCategory) {
//            result = result.filter(t => t.deviceCategoryId == filters.deviceCategory);
//        }

//        setFilteredTickets(result);
//    };

//    return (
//        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>تذاكري</h2>

//            {error && (
//                <div style={{
//                    color: 'red',
//                    textAlign: 'center',
//                    margin: '10px 0',
//                    padding: '10px',
//                    backgroundColor: '#ffeeee',
//                    borderRadius: '4px'
//                }}>
//                    {error}
//                </div>
//            )}

//            <div style={{ marginBottom: '20px' }}>
//                <TicketFilter
//                    onFilter={handleFilter}
//                    showDeviceCategoryFilter={true}
//                />
//            </div>

//            {isLoading ? (
//                <div style={{
//                    textAlign: 'center',
//                    padding: '40px',
//                    fontSize: '18px'
//                }}>
//                    جاري تحميل التذاكر...
//                </div>
//            ) : (
//                <div style={{
//                    backgroundColor: '#fff',
//                    borderRadius: '8px',
//                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                    overflow: 'hidden'
//                }}>
//                    <TicketTable
//                        tickets={filteredTickets}
//                        showActions={true}
//                        onTicketClick={(ticket) => {
//                            // navigate to ticket details
//                        }}
//                    />
//                </div>
//            )}
//        </div>
//    );
//};

//export default MyTickets;