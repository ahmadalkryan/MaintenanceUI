
//import React, { useState, useEffect } from 'react';
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
//import { getAllTickets, filterTicketsByDate, filterTickets } from '../../api/tickets';
//import { getAllDeviceCategories } from '../../api/deviceCategory'
//import { format } from 'date-fns';
//import './TicketDashboard.css';

//const TicketDashboard = () => {
//    const [tickets, setTickets] = useState([]);
//    const [filteredTickets, setFilteredTickets] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState('');

//    // State for date range filter
//    const [startDate, setStartDate] = useState(null);
//    const [endDate, setEndDate] = useState(null);

//    // State for ticket filter
//    const [ticketNumber, setTicketNumber] = useState('');
//    const [deviceCategory, setDeviceCategory] = useState('');

//    // State for device categories
//    const [deviceCategories, setDeviceCategories] = useState([]);

//    // State for pagination
//    const [currentPage, setCurrentPage] = useState(1);
//    const [itemsPerPage] = useState(10);

//    // Calculate pagination values
//    const indexOfLastItem = currentPage * itemsPerPage;
//    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//    const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
//    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

//    useEffect(() => {
//        fetchTickets();
//        fetchDeviceCategories();
//    }, []);

//    const fetchTickets = async () => {
//        try {
//            setLoading(true);
//            const response = await getAllTickets();
//            if (response.success) {
//                setTickets(response.data);
//                setFilteredTickets(response.data);
//            } else {
//                setError(response.message || 'Failed to fetch tickets');
//            }
//        } catch (err) {
//            setError(err.message || 'Failed to fetch tickets');
//        } finally {
//            setLoading(false);
//        }
//    };

//    const fetchDeviceCategories = async () => {
//        try {
//            const response = await getAllDeviceCategories();
//            if (response.success) {
//                setDeviceCategories(response.data);
//            }
//        } catch (err) {
//            console.error('Failed to fetch device categories:', err);
//        }
//    };

//    const handleDateFilter = async () => {
//        if (!startDate || !endDate) {
//            setError('Please select both start and end dates');
//            return;
//        }

//        try {
//            setLoading(true);
//            const response = await filterTicketsByDate({
//                startDate: startDate.toISOString(),
//                endDate: endDate.toISOString()
//            });

//            if (response.success) {
//                setFilteredTickets(response.data);
//                setCurrentPage(1); // Reset to first page
//                setError('');
//            } else {
//                setError(response.message || 'Date filter failed');
//            }
//        } catch (err) {
//            setError(err.message || 'Date filter failed');
//        } finally {
//            setLoading(false);
//        }
//    };

//    const handleTicketFilter = async () => {
//        try {
//            setLoading(true);
//            const response = await filterTickets({
//                ticketNumber,
//                deviceCategoryId: deviceCategory
//            });

//            if (response.success) {
//                setFilteredTickets(response.data);
//                setCurrentPage(1); // Reset to first page
//                setError('');
//            } else {
//                setError(response.message || 'Ticket filter failed');
//            }
//        } catch (err) {
//            setError(err.message || 'Ticket filter failed');
//        } finally {
//            setLoading(false);
//        }
//    };

//    const resetFilters = () => {
//        setStartDate(null);
//        setEndDate(null);
//        setTicketNumber('');
//        setDeviceCategory('');
//        setFilteredTickets(tickets);
//        setCurrentPage(1);
//        setError('');
//    };

//    // Handle page change
//    const paginate = (pageNumber) => setCurrentPage(pageNumber);

//    return (
//        <div className="dashboard-container">
//            <header className="dashboard-header">
//                <h1>Support Ticket Dashboard</h1>
//                <p>Manage and track all support tickets efficiently</p>
//            </header>

//            <div className="filter-section">
//                {/* Date Range Filter */}
//                <div className="filter-card">
//                    <h3>Filter by Date Range</h3>
//                    <div className="date-picker-group">
//                        <div className="date-input">
//                            <label>Start Date</label>
//                            <DatePicker
//                                selected={startDate}
//                                onChange={date => setStartDate(date)}
//                                selectsStart
//                                startDate={startDate}
//                                endDate={endDate}
//                                dateFormat="yyyy-MM-dd"
//                                placeholderText="Select start date"
//                            />
//                        </div>

//                        <div className="date-input">
//                            <label>End Date</label>
//                            <DatePicker
//                                selected={endDate}
//                                onChange={date => setEndDate(date)}
//                                selectsEnd
//                                startDate={startDate}
//                                endDate={endDate}
//                                minDate={startDate}
//                                dateFormat="yyyy-MM-dd"
//                                placeholderText="Select end date"
//                            />
//                        </div>
//                    </div>
//                    <button
//                        className="filter-button"
//                        onClick={handleDateFilter}
//                        disabled={!startDate || !endDate}
//                    >
//                        Apply Date Filter
//                    </button>
//                </div>

//                {/* Ticket Filter */}
//                <div className="filter-card">
//                    <h3>Filter by Ticket</h3>
//                    <div className="ticket-filter-group">
//                        <div className="input-group">
//                            <label>Ticket Number</label>
//                            <input
//                                type="text"
//                                value={ticketNumber}
//                                onChange={e => setTicketNumber(e.target.value)}
//                                placeholder="Enter ticket number"
//                            />
//                        </div>

//                        <div className="input-group">
//                            <label>Device Category</label>
//                            <select
//                                value={deviceCategory}
//                                onChange={e => setDeviceCategory(e.target.value)}
//                            >
//                                <option value="">All Categories</option>
//                                {deviceCategories.map(category => (
//                                    <option key={category.Id} value={category.Id}>
//                                        {category.CategoryName}
//                                    </option>
//                                ))}
//                            </select>
//                        </div>
//                    </div>
//                    <button
//                        className="filter-button"
//                        onClick={handleTicketFilter}
//                    >
//                        Apply Ticket Filter
//                    </button>
//                </div>

//                {/* Reset Button */}
//                <div className="filter-card">
//                    <h3>Reset Filters</h3>
//                    <p>Clear all filters and show all tickets</p>
//                    <button
//                        className="reset-button"
//                        onClick={resetFilters}
//                    >
//                        Reset All Filters
//                    </button>
//                </div>
//            </div>

//            {/* Status Indicators */}
//            {error && <div className="error-message">{error}</div>}
//            {loading && <div className="loading-indicator">Loading tickets...</div>}

//            {/* Tickets Summary */}
//            <div className="summary-section">
//                <div className="summary-card">
//                    <h3>Total Tickets</h3>
//                    <p className="count">{tickets.length}</p>
//                </div>
//                <div className="summary-card">
//                    <h3>Filtered Tickets</h3>
//                    <p className="count">{filteredTickets.length}</p>
//                </div>
//                <div className="summary-card">
//                    <h3>Current Page</h3>
//                    <p className="count">{currentPage} of {totalPages}</p>
//                </div>
//            </div>

//            {/* Tickets Table */}
//            <div className="tickets-table-section">
//                <h2>Ticket List</h2>

//                <div className="table-container">
//                    <table>
//                        <thead>
//                            <tr>
//                                <th>Ticket #</th>
//                                <th>Description</th>
//                                <th>Device Category</th>
//                                <th>Created Date</th>
//                                <th>Status</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {currentTickets.length > 0 ? (
//                                currentTickets.map(ticket => (
//                                    <tr key={ticket.Id}>
//                                        <td>{ticket.TicketNumber}</td>
//                                        <td>{ticket.Description}</td>
//                                        <td>
//                                            {deviceCategories.find(c => c.Id === ticket.DeciveCategoryId)?.Name || ticket.DeciveCategoryId}
//                                        </td>
//                                        <td>{format(new Date(ticket.CreatedDate), 'dd MMM yyyy HH:mm')}</td>
//                                        <td>
//                                            <span className={`status-badge ${ticket.TicketStatusId === 1 ? 'open' : 'closed'}`}>
//                                                {ticket.TicketStatusId === 1 ? 'Open' : 'Closed'}
//                                            </span>
//                                        </td>
//                                    </tr>
//                                ))
//                            ) : (
//                                <tr>
//                                    <td colSpan="5" className="no-results">
//                                        No tickets found with current filters
//                                    </td>
//                                </tr>
//                            )}
//                        </tbody>
//                    </table>
//                </div>

//                {/* Pagination */}
//                {filteredTickets.length > itemsPerPage && (
//                    <div className="pagination">
//                        <button
//                            onClick={() => paginate(currentPage - 1)}
//                            disabled={currentPage === 1}
//                            className="pagination-button"
//                        >
//                            Previous
//                        </button>

//                        {[...Array(totalPages).keys()].map(number => (
//                            <button
//                                key={number + 1}
//                                onClick={() => paginate(number + 1)}
//                                className={`pagination-button ${currentPage === number + 1 ? 'active' : ''}`}
//                            >
//                                {number + 1}
//                            </button>
//                        ))}

//                        <button
//                            onClick={() => paginate(currentPage + 1)}
//                            disabled={currentPage === totalPages}
//                            className="pagination-button"
//                        >
//                            Next
//                        </button>
//                    </div>
//                )}
//            </div>
//        </div>
//    );
//};

//export default TicketDashboard;


// src/pages/admin/TicketDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ≈÷«›… Â–« «·«” Ì—«œ
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllTickets, filterTicketsByDate, filterTickets } from '../../api/tickets';
import { getAllDeviceCategories } from '../../api/deviceCategory'
import { format } from 'date-fns';
import './TicketDashboard.css';

const TicketDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // State for date range filter
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // State for ticket filter
    const [ticketNumber, setTicketNumber] = useState('');
    const [deviceCategory, setDeviceCategory] = useState('');

    // State for device categories
    const [deviceCategories, setDeviceCategories] = useState([]);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Calculate pagination values
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

    useEffect(() => {
        fetchTickets();
        fetchDeviceCategories();
    }, []);
    const handleCreateTicket = () => {
        navigate('/dash');
    };
    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await getAllTickets();
            if (response.success) {
                setTickets(response.data);
                setFilteredTickets(response.data);
            } else {
                setError(response.message || 'Failed to fetch tickets');
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch tickets');
        } finally {
            setLoading(false);
        }
    };

    const fetchDeviceCategories = async () => {
        try {
            const response = await getAllDeviceCategories();
            if (response.success) {
                setDeviceCategories(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch device categories:', err);
        }
    };

    const handleDateFilter = async () => {
        if (!startDate || !endDate) {
            setError('Please select both start and end dates');
            return;
        }
        try {
            setLoading(true);
            const response = await filterTicketsByDate({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            });
            if (response.success) {
                setFilteredTickets(response.data);
                setCurrentPage(1); // Reset to first page
                setError('');
            } else {
                setError(response.message || 'Date filter failed');
            }
        } catch (err) {
            setError(err.message || 'Date filter failed');
        } finally {
            setLoading(false);
        }
    };

    const handleTicketFilter = async () => {
        try {
            setLoading(true);
            const response = await filterTickets({
                ticketNumber,
                deviceCategoryId: deviceCategory
            });
            if (response.success) {
                setFilteredTickets(response.data);
                setCurrentPage(1); // Reset to first page
                setError('');
            } else {
                setError(response.message || 'Ticket filter failed');
            }
        } catch (err) {
            setError(err.message || 'Ticket filter failed');
        } finally {
            setLoading(false);
        }
    };

    const resetFilters = () => {
        setStartDate(null);
        setEndDate(null);
        setTicketNumber('');
        setDeviceCategory('');
        setFilteredTickets(tickets);
        setCurrentPage(1);
        setError('');
    };

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-left">
                    {/* “— «·⁄Êœ… ≈·Ï Dashboard */}
                    {/*<Link to="/dash" className="back-to-dashboard">*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">*/}
                    {/*        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />*/}
                    {/*    </svg>*/}
                    {/*    Back to Dashboard*/}
                    {/*</Link>*/}
                    <button
                        className="create-ticket-btn primary"
                        onClick={handleCreateTicket}
                    >
                        Back to Dashboard
                    </button>
                    <h1>Support Ticket Dashboard</h1>
                </div>
                <p>Manage and track all support tickets efficiently</p>
            </header>

            <div className="filter-section">
                {/* Date Range Filter */}
                <div className="filter-card">
                    <h3>Filter by Date Range</h3>
                    <div className="date-picker-group">
                        <div className="date-input">
                            <label>Start Date</label>
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Select start date"
                                className="date-picker"
                            />
                        </div>
                        <div className="date-input">
                            <label>End Date</label>
                            <DatePicker
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="Select end date"
                                className="date-picker"
                            />
                        </div>
                    </div>
                    <button
                        className="filter-button"
                        onClick={handleDateFilter}
                        disabled={!startDate || !endDate}
                    >
                        Apply Date Filter
                    </button>
                </div>

                {/* Ticket Filter */}
                <div className="filter-card">
                    <h3>Filter by Ticket</h3>
                    <div className="ticket-filter-group">
                        <div className="input-group">
                            <label>Ticket Number</label>
                            <input
                                type="text"
                                value={ticketNumber}
                                onChange={e => setTicketNumber(e.target.value)}
                                placeholder="Enter ticket number"
                            />
                        </div>
                        <div className="input-group">
                            <label>Device Category</label>
                            <select
                                value={deviceCategory}
                                onChange={e => setDeviceCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {deviceCategories.map(category => (
                                    <option key={category.Id} value={category.Id}>
                                        {category.CategoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        className="filter-button"
                        onClick={handleTicketFilter}
                    >
                        Apply Ticket Filter
                    </button>
                </div>

                {/* Reset Button */}
                <div className="filter-card">
                    <h3>Reset Filters</h3>
                    <p>Clear all filters and show all tickets</p>
                    <button
                        className="reset-button"
                        onClick={resetFilters}
                    >
                        Reset All Filters
                    </button>
                </div>
            </div>

            {/* Status Indicators */}
            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading-indicator">Loading tickets...</div>}

            {/* Tickets Summary */}
            <div className="summary-section">
                <div className="summary-card">
                    <h3>Total Tickets</h3>
                    <p className="count">{tickets.length}</p>
                </div>
                <div className="summary-card">
                    <h3>Filtered Tickets</h3>
                    <p className="count">{filteredTickets.length}</p>
                </div>
                <div className="summary-card">
                    <h3>Current Page</h3>
                    <p className="count">{currentPage} of {totalPages}</p>
                </div>
            </div>

            {/* Tickets Table */}
            <div className="tickets-table-section">
                <h2>Ticket List</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Ticket #</th>
                                <th>Description</th>
                                <th>Device Category</th>
                                <th>Created Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTickets.length > 0 ? (
                                currentTickets.map(ticket => (
                                    <tr key={ticket.Id}>
                                        <td>{ticket.TicketNumber}</td>
                                        <td>{ticket.Description}</td>
                                        <td>{deviceCategories.find(c => c.Id === ticket.DeciveCategoryId)?.Name || ticket.DeciveCategoryId}</td>
                                        <td>{format(new Date(ticket.CreatedDate), 'dd MMM yyyy HH:mm')}</td>
                                        <td>
                                            <span className={`status-badge ${ticket.TicketStatusId === 1 ? 'open' : 'closed'}`}>
                                                {ticket.TicketStatusId === 1 ? 'Open' : 'Closed'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-results">No tickets found with current filters</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredTickets.length > itemsPerPage && (
                    <div className="pagination">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages).keys()].map(number => (
                            <button
                                key={number + 1}
                                onClick={() => paginate(number + 1)}
                                className={`pagination-button ${currentPage === number + 1 ? 'active' : ''}`}
                            >
                                {number + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketDashboard;







