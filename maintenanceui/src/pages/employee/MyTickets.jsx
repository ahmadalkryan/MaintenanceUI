import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Added
import { useAuth } from '../../contexts/AuthContext';
import { filterTickets, mapTicketStatus } from '../../api/tickets';
import TicketTable from '../../components/tickets/TicketTable';
import TicketFilter from '../../components/tickets/TicketFilter';

const MyTickets = () => {
    const { user } = useAuth();
    const navigate = useNavigate(); // Added
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setIsLoading(true);
                setError('');

                // Fetch tickets with user filter
                const response = await getTicketByUserId({ userId: user.userId });

                if (response.success) {
                    const ticketsWithStatus = response.data.map(ticket => ({
                        ...ticket,
                        statusText: mapTicketStatus(ticket.ticketStatusId)
                    }));

                    setTickets(ticketsWithStatus);
                    setFilteredTickets(ticketsWithStatus);
                } else {
                    setError(response.message || 'Failed to load tickets');
                }
            } catch (err) {
                console.error('Error fetching tickets:', err);
                setError(err.message || 'An error occurred while fetching tickets');
            } finally {
                setIsLoading(false);
            }
        };

        if (user?.userId) {
            fetchTickets();
        }
    }, [user]);

    const handleFilter = (filters) => {
        let result = [...tickets];

        if (filters.ticketNumber) {
            result = result.filter(t =>
                t.ticketNumber.toLowerCase().includes(filters.ticketNumber.toLowerCase())
            );
        }

        if (filters.status) {
            result = result.filter(t => t.statusText === filters.status);
        }

        if (filters.deviceCategory) {
            result = result.filter(t => t.deviceCategoryId == filters.deviceCategory);
        }

        setFilteredTickets(result);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>My Tickets</h2>

            {error && (
                <div style={{
                    color: 'red',
                    textAlign: 'center',
                    margin: '10px 0',
                    padding: '10px',
                    backgroundColor: '#ffeeee',
                    borderRadius: '4px'
                }}>
                    {error}
                </div>
            )}

            <div style={{ marginBottom: '20px' }}>
                <TicketFilter
                    onFilter={handleFilter}
                    showDeviceCategoryFilter={true}
                />
            </div>

            {isLoading ? (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    fontSize: '18px'
                }}>
                    Loading tickets...
                </div>
            ) : (
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <TicketTable
                        tickets={filteredTickets}
                        showActions={true}
                        onTicketClick={(ticket) => {
                            // Navigate to ticket details
                            navigate(`/employee/ticket/${ticket.ticketId}`);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default MyTickets;
























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
//                    setError(response.message || '›‘· ›Ì  Õ„Ì· «· –«ﬂ—');
//                }
//            } catch (err) {
//                console.error('Error fetching tickets:', err);
//                setError(err.message || 'ÕœÀ Œÿ√ √À‰«¡ Ã·» «· –«ﬂ—');
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
//            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}> –«ﬂ—Ì</h2>

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
//                    Ã«—Ì  Õ„Ì· «· –«ﬂ—...
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