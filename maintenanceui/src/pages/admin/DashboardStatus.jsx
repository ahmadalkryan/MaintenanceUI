
//import React, { useState, useEffect } from 'react';
//import { getTicketStatistics } from '../../api/tickets';
//import { Bar, Doughnut } from 'react-chartjs-2';
//import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

//ChartJS.register(
//    CategoryScale,
//    LinearScale,
//    BarElement,
//    Title,
//    Tooltip,
//    Legend,
//    ArcElement
//);

//const Dashboard = () => {
//    const [stats, setStats] = useState(null);
//    const [isLoading, setIsLoading] = useState(true);
//    const [error, setError] = useState('');

//    useEffect(() => {
//        const fetchStats = async () => {
//            try {
//                setIsLoading(true);
//                setError('');
//                const response = await getTicketStatistics();

//                if (response.success) {
//                    setStats(response.data);
//                } else {
//                    setError(response.message || 'Failed To Load Statistics');
//                }
//            } catch (err) {
//                console.error('Error fetching statistics:', err);
//                setError(err.message || 'Error occurs when loading Data');
//            } finally {
//                setIsLoading(false);
//            }
//        };

//        fetchStats();
//    }, []);

//    // Calculate percentages for pie chart
//    const total = stats?.totalTickets || 0;
//    const pieData = {
//        labels: ['New', 'Pending', 'Complete', 'Refund'],
//        datasets: [{
//            data: [
//                stats?.newTickets || 0,
//                stats?.pendingTickets || 0,
//                stats?.completeTickets || 0,
//                stats?.refundTickets || 0
//            ],
//            backgroundColor: [
//                'rgba(52, 152, 219, 0.8)', // Blue
//                'rgba(241, 196, 15, 0.8)', // Yellow
//                'rgba(46, 204, 113, 0.8)', // Green
//                'rgba(231, 76, 60, 0.8)'  // Red
//            ],
//            hoverBackgroundColor: [
//                'rgba(52, 152, 219, 1)',
//                'rgba(241, 196, 15, 1)',
//                'rgba(46, 204, 113, 1)',
//                'rgba(231, 76, 60, 1)'
//            ],
//            borderWidth: 0
//        }]
//    };

//    // Bar chart configuration
//    const barOptions = {
//        indexAxis: 'y',
//        elements: {
//            bar: {
//                borderRadius: 6,
//                borderWidth: 0
//            }
//        },
//        responsive: true,
//        maintainAspectRatio: false,
//        plugins: {
//            legend: {
//                display: false
//            },
//            tooltip: {
//                enabled: true,
//                backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                titleColor: '#2c3e50',
//                bodyColor: '#2c3e50',
//                borderColor: '#e0e6ed',
//                borderWidth: 1,
//                padding: 12,
//                boxPadding: 6,
//                usePointStyle: true,
//                callbacks: {
//                    label: function (context) {
//                        return `${context.dataset.label}: ${context.parsed.x}`;
//                    }
//                }
//            }
//        },
//        scales: {
//            x: {
//                grid: {
//                    display: false
//                },
//                ticks: {
//                    font: {
//                        family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
//                    }
//                }
//            },
//            y: {
//                grid: {
//                    display: false
//                },
//                ticks: {
//                    font: {
//                        family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
//                        size: 14
//                    }
//                }
//            }
//        }
//    };

//    return (
//        <div className="dashboard-page" style={{
//            display: 'flex',
//            minHeight: '100vh',
//            backgroundColor: '#f8fafc',
//            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//        }}>
//            {/* Sidebar */}
//            <div style={{
//                width: '240px',
//                minHeight: '100vh',
//                background: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)',
//                padding: '20px',
//                color: 'white',
//                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
//            }}>
//                <h2 style={{
//                    color: '#FFFFFF',
//                    fontSize: '24px',
//                    marginBottom: '30px',
//                    fontWeight: '600',
//                    paddingBottom: '15px',
//                    borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
//                }}>
//                    Admin Panel
//                </h2>
//                <nav>
//                    <ul style={{ listStyle: 'none', padding: 0 }}>
//                        <li><a href="#" style={{
//                            color: 'rgba(255, 255, 255, 0.85)',
//                            fontSize: '16px',
//                            padding: '14px 10px',
//                            display: 'block',
//                            borderRadius: '8px',
//                            transition: 'all 0.3s ease',
//                            fontWeight: '500'
//                        }}>Overview</a></li>
//                        <li><a href="#" style={{
//                            color: 'rgba(255, 255, 255, 0.85)',
//                            fontSize: '16px',
//                            padding: '14px 10px',
//                            display: 'block',
//                            borderRadius: '8px',
//                            transition: 'all 0.3s ease',
//                            fontWeight: '500'
//                        }}>Ticket Status</a></li>
//                        <li><a href="#" style={{
//                            color: 'rgba(255, 255, 255, 0.85)',
//                            fontSize: '16px',
//                            padding: '14px 10px',
//                            display: 'block',
//                            borderRadius: '8px',
//                            transition: 'all 0.3s ease',
//                            fontWeight: '500'
//                        }}>Settings</a></li>
//                    </ul>
//                </nav>
//            </div>

//            {/* Main Content */}
//            <div style={{
//                flex: 1,
//                padding: '30px',
//                overflowY: 'auto',
//                maxWidth: 'calc(100% - 240px)'
//            }}>
//                {/* Header */}
//                <div style={{
//                    display: 'flex',
//                    justifyContent: 'space-between',
//                    alignItems: 'center',
//                    marginBottom: '30px',
//                    flexWrap: 'wrap',
//                    gap: '20px'
//                }}>
//                    <div>
//                        <h1 style={{
//                            color: '#2c3e50',
//                            fontSize: '32px',
//                            fontWeight: 700,
//                            marginBottom: '8px'
//                        }}>Dashboard</h1>
//                        <p style={{
//                            color: '#718096',
//                            fontSize: '16px',
//                            maxWidth: '600px'
//                        }}>Welcome back! Here's an overview of your Maintenance Tickets System</p>
//                    </div>
//                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
//                        <div style={{
//                            padding: '12px 20px',
//                            backgroundColor: '#fff',
//                            borderRadius: '10px',
//                            border: '1px solid #e0e6ed',
//                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
//                            minWidth: '140px'
//                        }}>
//                            <p style={{
//                                margin: 0,
//                                color: '#718096',
//                                fontSize: '14px',
//                                fontWeight: '500'
//                            }}>Today</p>
//                            <p style={{
//                                margin: '4px 0 0',
//                                fontWeight: 600,
//                                color: '#2c3e50',
//                                fontSize: '18px'
//                            }}>{new Date().toLocaleDateString()}</p>
//                        </div>
//                        <button style={{
//                            padding: '12px 24px',
//                            background: 'linear-gradient(to right, #3498db, #2980b9)',
//                            color: 'white',
//                            border: 'none',
//                            borderRadius: '10px',
//                            fontSize: '16px',
//                            fontWeight: '600',
//                            cursor: 'pointer',
//                            transition: 'all 0.3s ease',
//                            boxShadow: '0 4px 6px rgba(52, 152, 219, 0.3)',
//                            display: 'flex',
//                            alignItems: 'center',
//                            gap: '8px',
//                            minHeight: '48px'
//                        }}>
//                            <span>View Report</span>
//                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//                                <polyline points="7 10 12 15 17 10"></polyline>
//                                <line x1="12" y1="15" x2="12" y2="3"></line>
//                            </svg>
//                        </button>
//                    </div>
//                </div>

//                {/* Loading and Error States */}
//                {isLoading && (
//                    <div style={{
//                        padding: '20px',
//                        backgroundColor: '#fff9db',
//                        color: '#2c3e50',
//                        borderRadius: '10px',
//                        textAlign: 'center',
//                        marginBottom: '30px',
//                        border: '1px solid #ffe066'
//                    }}>
//                        Loading dashboard data...
//                    </div>
//                )}

//                {error && (
//                    <div style={{
//                        padding: '20px',
//                        backgroundColor: '#fff5f5',
//                        color: '#e53e3e',
//                        borderRadius: '10px',
//                        textAlign: 'center',
//                        marginBottom: '30px',
//                        border: '1px solid #fc8181'
//                    }}>
//                        {error}
//                    </div>
//                )}

//                {/* Top Metrics */}
//                <div style={{
//                    display: 'grid',
//                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//                    gap: '20px',
//                    marginBottom: '30px'
//                }}>
//                    {/* Total Tickets */}
//                    <div style={{
//                        padding: '25px 20px',
//                        background: 'linear-gradient(135deg, #3498db, #2c3e50)',
//                        borderRadius: '12px',
//                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
//                        color: 'white',
//                        transition: 'transform 0.3s ease',
//                        position: 'relative',
//                        overflow: 'hidden'
//                    }}>
//                        <div style={{
//                            position: 'absolute',
//                            top: '-20px',
//                            right: '-20px',
//                            opacity: '0.1',
//                            transform: 'rotate(30deg)'
//                        }}>
//                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
//                                <path d="M13 5v2"></path>
//                                <path d="M13 17v2"></path>
//                                <path d="M13 11v2"></path>
//                            </svg>
//                        </div>
//                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                            <div>
//                                <p style={{
//                                    color: 'rgba(255, 255, 255, 0.85)',
//                                    margin: 0,
//                                    fontSize: '16px',
//                                    fontWeight: '500'
//                                }}>Total Tickets</p>
//                                <p style={{
//                                    fontSize: '32px',
//                                    fontWeight: 700,
//                                    marginTop: '8px',
//                                    letterSpacing: '-0.5px'
//                                }}>{stats?.totalTickets || 0}</p>
//                            </div>
//                        </div>
//                    </div>

//                    {/* New Tickets */}
//                    <div style={{
//                        padding: '25px 20px',
//                        background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
//                        borderRadius: '12px',
//                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
//                        color: 'white',
//                        transition: 'transform 0.3s ease',
//                        position: 'relative',
//                        overflow: 'hidden'
//                    }}>
//                        <div style={{
//                            position: 'absolute',
//                            top: '-20px',
//                            right: '-20px',
//                            opacity: '0.1',
//                            transform: 'rotate(30deg)'
//                        }}>
//                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                <circle cx="12" cy="12" r="10"></circle>
//                                <line x1="12" y1="8" x2="12" y2="16"></line>
//                                <line x1="8" y1="12" x2="16" y2="12"></line>
//                            </svg>
//                        </div>
//                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                            <div>
//                                <p style={{
//                                    color: 'rgba(255, 255, 255, 0.85)',
//                                    margin: 0,
//                                    fontSize: '16px',
//                                    fontWeight: '500'
//                                }}>New Tickets</p>
//                                <p style={{
//                                    fontSize: '32px',
//                                    fontWeight: 700,
//                                    marginTop: '8px',
//                                    letterSpacing: '-0.5px'
//                                }}>{stats?.newTickets || 0}</p>
//                            </div>
//                        </div>
//                    </div>

//                    {/* Pending Tickets */}
//                    <div style={{
//                        padding: '25px 20px',
//                        background: 'linear-gradient(135deg, #f39c12, #e67e22)',
//                        borderRadius: '12px',
//                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
//                        color: 'white',
//                        transition: 'transform 0.3s ease',
//                        position: 'relative',
//                        overflow: 'hidden'
//                    }}>
//                        <div style={{
//                            position: 'absolute',
//                            top: '-20px',
//                            right: '-20px',
//                            opacity: '0.1',
//                            transform: 'rotate(30deg)'
//                        }}>
//                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                <circle cx="12" cy="12" r="10"></circle>
//                                <polyline points="12 6 12 12 16 14"></polyline>
//                            </svg>
//                        </div>
//                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                            <div>
//                                <p style={{
//                                    color: 'rgba(255, 255, 255, 0.85)',
//                                    margin: 0,
//                                    fontSize: '16px',
//                                    fontWeight: '500'
//                                }}>Pending Tickets</p>
//                                <p style={{
//                                    fontSize: '32px',
//                                    fontWeight: 700,
//                                    marginTop: '8px',
//                                    letterSpacing: '-0.5px'
//                                }}>{stats?.pendingTickets || 0}</p>
//                            </div>
//                        </div>
//                    </div>

//                    {/* Resolved Tickets */}
//                    <div style={{
//                        padding: '25px 20px',
//                        background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
//                        borderRadius: '12px',
//                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
//                        color: 'white',
//                        transition: 'transform 0.3s ease',
//                        position: 'relative',
//                        overflow: 'hidden'
//                    }}>
//                        <div style={{
//                            position: 'absolute',
//                            top: '-20px',
//                            right: '-20px',
//                            opacity: '0.1',
//                            transform: 'rotate(30deg)'
//                        }}>
//                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
//                            </svg>
//                        </div>
//                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                            <div>
//                                <p style={{
//                                    color: 'rgba(255, 255, 255, 0.85)',
//                                    margin: 0,
//                                    fontSize: '16px',
//                                    fontWeight: '500'
//                                }}>Resolved Tickets</p>
//                                <p style={{
//                                    fontSize: '32px',
//                                    fontWeight: 700,
//                                    marginTop: '8px',
//                                    letterSpacing: '-0.5px'
//                                }}>{stats?.completeTickets || 0}</p>
//                            </div>
//                        </div>
//                    </div>
//                </div>

//                {/* Charts Section */}
//                <div style={{
//                    display: 'grid',
//                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
//                    gap: '25px',
//                    marginBottom: '40px'
//                }}>
//                    {/* Bar Chart */}
//                    <div style={{
//                        backgroundColor: '#FFFFFF',
//                        borderRadius: '12px',
//                        padding: '25px',
//                        border: '1px solid #e0e6ed',
//                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.05)',
//                        height: '400px',
//                        position: 'relative'
//                    }}>
//                        <h3 style={{
//                            color: '#2c3e50',
//                            fontSize: '20px',
//                            marginBottom: '20px',
//                            fontWeight: '600'
//                        }}>Ticket Status Distribution</h3>
//                        <Bar
//                            data={{
//                                labels: ['New', 'Pending', 'Complete', 'Refund'],
//                                datasets: [{
//                                    label: 'Number of Tickets',
//                                    data: [
//                                        stats?.newTickets || 0,
//                                        stats?.pendingTickets || 0,
//                                        stats?.completeTickets || 0,
//                                        stats?.refundTickets || 0
//                                    ],
//                                    backgroundColor: [
//                                        'rgba(52, 152, 219, 0.8)',
//                                        'rgba(241, 196, 15, 0.8)',
//                                        'rgba(46, 204, 113, 0.8)',
//                                        'rgba(231, 76, 60, 0.8)'
//                                    ],
//                                    borderColor: [
//                                        'rgba(52, 152, 219, 1)',
//                                        'rgba(241, 196, 15, 1)',
//                                        'rgba(46, 204, 113, 1)',
//                                        'rgba(231, 76, 60, 1)'
//                                    ],
//                                    borderWidth: 0
//                                }]
//                            }}
//                            options={barOptions}
//                        />
//                    </div>

//                    {/* Pie Chart */}
//                    <div style={{
//                        backgroundColor: '#FFFFFF',
//                        borderRadius: '12px',
//                        padding: '25px',
//                        border: '1px solid #e0e6ed',
//                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.05)',
//                        height: '400px',
//                        position: 'relative'
//                    }}>
//                        <h3 style={{
//                            color: '#2c3e50',
//                            fontSize: '20px',
//                            marginBottom: '20px',
//                            fontWeight: '600'
//                        }}>Ticket Status Percentage</h3>
//                        <div style={{ height: '300px' }}>
//                            <Doughnut data={pieData} options={{
//                                responsive: true,
//                                maintainAspectRatio: false,
//                                plugins: {
//                                    legend: {
//                                        position: 'right',
//                                        labels: {
//                                            font: {
//                                                family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//                                                size: 14
//                                            },
//                                            padding: 20
//                                        }
//                                    },
//                                    tooltip: {
//                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                                        titleColor: '#2c3e50',
//                                        bodyColor: '#2c3e50',
//                                        borderColor: '#e0e6ed',
//                                        borderWidth: 1,
//                                        padding: 12,
//                                        boxPadding: 6,
//                                        usePointStyle: true,
//                                        callbacks: {
//                                            label: function (context) {
//                                                const label = context.label || '';
//                                                const value = context.raw || 0;
//                                                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
//                                                return `${label}: ${value} (${percentage}%)`;
//                                            }
//                                        }
//                                    }
//                                },
//                                cutout: '65%'
//                            }} />
//                        </div>
//                    </div>
//                </div>
//            </div>
//        </div>
//    );
//};

//export default Dashboard;

//<style>
//    {`
//        @media (max-width: 1200px) {
//            .dashboard-page {
//                flex-direction: column;
//            }
            
//            .dashboard-page > div:first-child {
//                width: 100%;
//                min-height: auto;
//                padding: 15px;
//            }
            
//            .dashboard-page > div:last-child {
//                max-width: 100%;
//                padding: 20px;
//            }
            
//            .dashboard-page > div:first-child h2 {
//                margin-bottom: 15px;
//                padding-bottom: 10px;
//            }
            
//            .dashboard-page > div:first-child nav ul li a {
//                padding: 10px;
//            }
            
//            .dashboard-page > div:last-child > div:first-child {
//                flex-direction: column;
//                align-items: flex-start;
//                gap: 15px;
//            }
            
//            .dashboard-page > div:last-child > div:first-child > div:last-child {
//                flex-direction: row;
//                flex-wrap: wrap;
//            }
//        }
        
//        @media (max-width: 768px) {
//            .dashboard-page > div:last-child {
//                padding: 15px;
//            }
            
//            .dashboard-page > div:last-child > div:nth-child(3) {
//                grid-template-columns: 1fr;
//            }
            
//            .dashboard-page > div:last-child > div:first-child > div:last-child {
//                width: 100%;
//            }
            
//            .dashboard-page > div:last-child > div:first-child > div:last-child > div {
//                flex: 1;
//                min-width: 140px;
//            }
            
//            .dashboard-page > div:last-child > div:nth-child(4) > div {
//                min-width: 100%;
//            }
            
//            .dashboard-page > div:last-child > div:nth-child(4) > div h3 {
//                font-size: 18px;
//            }
//        }
        
//        @media (max-width: 480px) {
//            .dashboard-page > div:last-child > div:nth-child(3) {
//                grid-template-columns: 1fr;
//            }
            
//            .dashboard-page > div:last-child > div:first-child h1 {
//                font-size: 24px;
//            }
            
//            .dashboard-page > div:last-child > div:first-child p {
//                font-size: 14px;
//            }
//        }
//    `}
//</style>







// src/pages/admin/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getTicketStatistics } from '../../api/tickets';
import { Bar, Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useNavigate ,Link} from 'react-router-dom'; // ≈÷«›… Â–« «·«” Ì—«œ
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true);
                setError('');
                const response = await getTicketStatistics();
                if (response.success) {
                    setStats(response.data);
                } else {
                    setError(response.message || 'Failed To Load Statistics');
                }
            } catch (err) {
                console.error('Error fetching statistics:', err);
                setError(err.message || 'Error occurs when loading Data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);
    const handleCreateTicket = () => {
        navigate('/tdash');
    };

    // Calculate percentages for pie chart
    const total = stats?.totalTickets || 0;
    const pieData = {
        labels: ['New', 'Pending', 'Complete', 'Refund'],
        datasets: [{
            data: [
                stats?.newTickets || 0,
                stats?.pendingTickets || 0,
                stats?.completeTickets || 0,
                stats?.refundTickets || 0
            ],
            backgroundColor: [
                'rgba(52, 152, 219, 0.8)', // Blue
                'rgba(241, 196, 15, 0.8)', // Yellow
                'rgba(46, 204, 113, 0.8)', // Green
                'rgba(231, 76, 60, 0.8)' // Red
            ],
            hoverBackgroundColor: [
                'rgba(52, 152, 219, 1)',
                'rgba(241, 196, 15, 1)',
                'rgba(46, 204, 113, 1)',
                'rgba(231, 76, 60, 1)'
            ],
            borderWidth: 0
        }]
    };

    // Bar chart configuration
    const barOptions = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderRadius: 6,
                borderWidth: 0
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#2c3e50',
                bodyColor: '#2c3e50',
                borderColor: '#e0e6ed',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
                        size: 14
                    }
                }
            }
        }
    };

    return (
        <div className="dashboard-page" style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            {/* Sidebar */}
            <div style={{
                width: '240px',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)',
                padding: '20px',
                color: 'white',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{
                    color: '#FFFFFF',
                    fontSize: '24px',
                    marginBottom: '30px',
                    fontWeight: '600',
                    paddingBottom: '15px',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.1)'
                }}>Admin Panel</h2>
                <nav>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>
                            <a href="#" style={{
                                color: 'rgba(255, 255, 255, 0.85)',
                                fontSize: '16px',
                                padding: '14px 10px',
                                display: 'block',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontWeight: '500',
                                backgroundColor: '#2c3e50'
                            }}>Overview</a>
                        </li>
                        <li>
                            {/* —«»ÿ ≈·Ï ’›Õ… TicketDashboard */}
                            {/*<Link to="/tdash" style={{*/}
                            {/*    color: 'rgba(255, 255, 255, 0.85)',*/}
                            {/*    fontSize: '16px',*/}
                            {/*    padding: '14px 10px',*/}
                            {/*    display: 'block',*/}
                            {/*    borderRadius: '8px',*/}
                            {/*    transition: 'all 0.3s ease',*/}
                            {/*    fontWeight: '500',*/}
                            {/*    textDecoration: 'none'*/}
                            {/*}}>Ticket Management</Link>*/}
                            <button
                                className="create-ticket-btn primary"
                                onClick={handleCreateTicket}
                            >
                                Ticket Management
                            </button>
                        </li>
                        <li>
                            <a href="#" style={{
                                color: 'rgba(255, 255, 255, 0.85)',
                                fontSize: '16px',
                                padding: '14px 10px',
                                display: 'block',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontWeight: '500'
                            }}>Settings</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                padding: '30px',
                overflowY: 'auto',
                maxWidth: 'calc(100% - 240px)'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div>
                        <h1 style={{
                            color: '#2c3e50',
                            fontSize: '32px',
                            fontWeight: 700,
                            marginBottom: '8px'
                        }}>Dashboard</h1>
                        <p style={{
                            color: '#718096',
                            fontSize: '16px',
                            maxWidth: '600px'
                        }}>Welcome back! Here's an overview of your Maintenance Tickets System</p>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        {/* “— ·⁄—÷ Ã„Ì⁄ «· –«ﬂ— */}
                        <Link to="/ticket-dashboard" className="view-all-btn">
                            View All Tickets
                        </Link>
                    </div>
                </div>

                {isLoading && (
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        textAlign: 'center',
                        marginBottom: '30px',
                        border: '1px solid #ffe066'
                    }}>
                        Loading dashboard data...
                    </div>
                )}

                {error && (
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#fff5f5',
                        color: '#e53e3e',
                        borderRadius: '10px',
                        textAlign: 'center',
                        marginBottom: '30px',
                        border: '1px solid #fc8181'
                    }}>
                        {error}
                    </div>
                )}

                {/* Top Metrics */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px'
                }}>
                    {/* Total Tickets */}
                    <div style={{
                        padding: '25px 20px',
                        background: 'linear-gradient(135deg, #3498db, #2c3e50)',
                        borderRadius: '12px',
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            opacity: '0.1',
                            transform: 'rotate(30deg)'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    margin: 0,
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}>Total Tickets</p>
                                <p style={{
                                    fontSize: '32px',
                                    fontWeight: 700,
                                    marginTop: '8px',
                                    letterSpacing: '-0.5px'
                                }}>
                                    {stats?.totalTickets || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* New Tickets */}
                    <div style={{
                        padding: '25px 20px',
                        background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
                        borderRadius: '12px',
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            opacity: '0.1',
                            transform: 'rotate(30deg)'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12h14"></path>
                            </svg>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    margin: 0,
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}>New Tickets</p>
                                <p style={{
                                    fontSize: '32px',
                                    fontWeight: 700,
                                    marginTop: '8px',
                                    letterSpacing: '-0.5px'
                                }}>
                                    {stats?.newTickets || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pending Tickets */}
                    <div style={{
                        padding: '25px 20px',
                        background: 'linear-gradient(135deg, #f39c12, #e67e22)',
                        borderRadius: '12px',
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            opacity: '0.1',
                            transform: 'rotate(30deg)'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    margin: 0,
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}>Pending Tickets</p>
                                <p style={{
                                    fontSize: '32px',
                                    fontWeight: 700,
                                    marginTop: '8px',
                                    letterSpacing: '-0.5px'
                                }}>
                                    {stats?.pendingTickets || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Resolved Tickets */}
                    <div style={{
                        padding: '25px 20px',
                        background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                        borderRadius: '12px',
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            opacity: '0.1',
                            transform: 'rotate(30deg)'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.85)',
                                    margin: 0,
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}>Resolved Tickets</p>
                                <p style={{
                                    fontSize: '32px',
                                    fontWeight: 700,
                                    marginTop: '8px',
                                    letterSpacing: '-0.5px'
                                }}>
                                    {stats?.completeTickets || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                    gap: '25px',
                    marginBottom: '40px'
                }}>
                    {/* Bar Chart */}
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '25px',
                        border: '1px solid #e0e6ed',
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.05)',
                        height: '400px',
                        position: 'relative'
                    }}>
                        <h3 style={{
                            color: '#2c3e50',
                            fontSize: '20px',
                            marginBottom: '20px',
                            fontWeight: '600'
                        }}>Ticket Status Distribution</h3>
                        <Bar
                            data={{
                                labels: ['New', 'Pending', 'Complete', 'Refund'],
                                datasets: [{
                                    label: 'Number of Tickets',
                                    data: [
                                        stats?.newTickets || 0,
                                        stats?.pendingTickets || 0,
                                        stats?.completeTickets || 0,
                                        stats?.refundTickets || 0
                                    ],
                                    backgroundColor: [
                                        'rgba(52, 152, 219, 0.8)',
                                        'rgba(241, 196, 15, 0.8)',
                                        'rgba(46, 204, 113, 0.8)',
                                        'rgba(231, 76, 60, 0.8)'
                                    ],
                                    borderColor: [
                                        'rgba(52, 152, 219, 1)',
                                        'rgba(241, 196, 15, 1)',
                                        'rgba(46, 204, 113, 1)',
                                        'rgba(231, 76, 60, 1)'
                                    ],
                                    borderWidth: 0
                                }]
                            }}
                            options={barOptions}
                        />
                    </div>

                    {/* Pie Chart */}
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        padding: '25px',
                        border: '1px solid #e0e6ed',
                        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.05)',
                        height: '400px',
                        position: 'relative'
                    }}>
                        <h3 style={{
                            color: '#2c3e50',
                            fontSize: '20px',
                            marginBottom: '20px',
                            fontWeight: '600'
                        }}>Ticket Status Percentage</h3>
                        <div style={{ height: '300px' }}>
                            <Doughnut
                                data={pieData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'right',
                                            labels: {
                                                font: {
                                                    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                                    size: 14
                                                },
                                                padding: 20
                                            }
                                        },
                                        tooltip: {
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            titleColor: '#2c3e50',
                                            bodyColor: '#2c3e50',
                                            borderColor: '#e0e6ed',
                                            borderWidth: 1,
                                            padding: 12,
                                            boxPadding: 6,
                                            usePointStyle: true,
                                            callbacks: {
                                                label: function (context) {
                                                    const label = context.label || '';
                                                    const value = context.raw || 0;
                                                    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                                    return `${label}: ${value} (${percentage}%)`;
                                                }
                                            }
                                        }
                                    },
                                    cutout: '65%'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


















////import React, { useState, useEffect } from 'react';
////import { getTicketStatistics } from '../../api/tickets';
////import { Bar } from 'react-chartjs-2';
////import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

////ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

////const Dashboard = () => {
////    const [stats, setStats] = useState(null);
////    const [isLoading, setIsLoading] = useState(true);
////    const [error, setError] = useState('');

////    useEffect(() => {
////        const fetchStats = async () => {
////            try {
////                setIsLoading(true);
////                setError('');
////                const response = await getTicketStatistics();

////                if (response.success) {
////                    setStats(response.data); // «” Œœ„ response.data »œ·« „‰ response „»«‘—…
////                } else {
////                    setError(response.message || 'Failed To Load Statistics ');
////                }
////            } catch (err) {
////                console.error('Error fetching statistics:', err);
////                setError(err.message || ' Error occurs when loading Data');
////            } finally {
////                setIsLoading(false);
////            }
////        };

////        fetchStats();
////    }, []);

////    const chartData = stats ? {
////        labels: [' All Tickets', 'New', 'Pending', 'Complete', 'Refund'],
////        datasets: [
////            {
////                label: ' Number of Tickets',
////                data: [
////                    stats.totalTickets,
////                    stats.newTickets || 0,
////                    stats.pendingTickets,
////                    stats.completeTickets,
////                    stats.refundTickets
////                ],
////                backgroundColor: [
////                    'rgba(54, 162, 235, 0.6)', // √“—ﬁ
////                    'rgba(75, 192, 192, 0.6)', // √Œ÷—
////                    'rgba(255, 206, 86, 0.6)', // √’›—
////                    'rgba(153, 102, 255, 0.6)', // »‰›”ÃÌ
////                    'rgba(255, 99, 132, 0.6)'  // √Õ„—
////                ],
////                borderColor: [
////                    'rgba(54, 162, 235, 1)',
////                    'rgba(75, 192, 192, 1)',
////                    'rgba(255, 206, 86, 1)',
////                    'rgba(153, 102, 255, 1)',
////                    'rgba(255, 99, 132, 1)'
////                ],
////                borderWidth: 1,
////            },
////        ],
////    } : null;

////    const options = {
////        responsive: true,
////        maintainAspectRatio: false,
////        plugins: {
////            legend: {
////                position: 'top',
////                rtl: true,
////                labels: {
////                    font: {
////                        family: 'Tajawal, Arial' // Œÿ Ìœ⁄„ «·⁄—»Ì…
////                    }
////                }
////            },
////            title: {
////                display: true,
////                text: ' Tickets Statistics',
////                font: {
////                    size: 16,
////                    family: 'Tajawal, Arial'
////                }
////            },
////            tooltip: {
////                bodyFont: {
////                    family: 'Tajawal, Arial'
////                }
////            }
////        },
////        scales: {
////            y: {
////                beginAtZero: true,
////                ticks: {
////                    stepSize: 1,
////                    font: {
////                        family: 'Tajawal, Arial'
////                    }
////                }
////            },
////            x: {
////                ticks: {
////                    font: {
////                        family: 'Tajawal, Arial'
////                    }
////                }
////            }
////        }
////    };

////    return (
////        <div className="dashboard-page" style={{ direction: 'rtl' }}>
////            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>  Dashboard For Admin </h2>

////            {error && (
////                <div className="error-message" style={{
////                    color: 'red',
////                    textAlign: 'center',
////                    margin: '10px 0'
////                }}>
////                    {error}
////                </div>
////            )}

////            {isLoading ? (
////                <div style={{ textAlign: 'center', padding: '20px' }}>  Loading Statistics...</div>
////            ) : stats ? (
////                <div className="dashboard-content">
////                    <div style={{
////                        display: 'grid',
////                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
////                        gap: '15px',
////                        marginBottom: '30px'
////                    }}>
////                        <div style={{
////                            background: '#f8f9fa',
////                            padding: '15px',
////                            borderRadius: '8px',
////                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
////                            textAlign: 'center'
////                        }}>
////                            <h3> All Tickes</h3>
////                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalTickets}</p>
////                        </div>

////                        <div style={{
////                            background: '#e8f5e9',
////                            padding: '15px',
////                            borderRadius: '8px',
////                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
////                            textAlign: 'center'
////                        }}>
////                            <h3>New </h3>
////                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.newTickets || 0}</p>
////                        </div>

////                        <div style={{
////                            background: '#fff8e1',
////                            padding: '15px',
////                            borderRadius: '8px',
////                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
////                            textAlign: 'center'
////                        }}>
////                            <h3>Pending </h3>
////                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.pendingTickets}</p>
////                        </div>

////                        <div style={{
////                            background: '#e8f5e9',
////                            padding: '15px',
////                            borderRadius: '8px',
////                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
////                            textAlign: 'center'
////                        }}>
////                            <h3>Complete</h3>
////                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.completeTickets}</p>
////                        </div>

////                        <div style={{
////                            background: '#ffebee',
////                            padding: '15px',
////                            borderRadius: '8px',
////                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
////                            textAlign: 'center'
////                        }}>
////                            <h3>Refund</h3>
////                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.refundTickets}</p>
////                        </div>
////                    </div>

////                    <div style={{
////                        height: '400px',
////                        background: '#fff',
////                        padding: '20px',
////                        borderRadius: '8px',
////                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
////                    }}>
////                        <Bar data={chartData} options={options} />
////                    </div>
////                </div>
////            ) : null}
////        </div>
////    );
////};

////export default Dashboard;





//import React, { useState, useEffect } from 'react';
//import { getTicketStatistics } from '../../api/tickets';
//import { Bar, Doughnut } from 'react-chartjs-2';
//import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

//ChartJS.register(
//    CategoryScale,
//    LinearScale,
//    BarElement,
//    Title,
//    Tooltip,
//    Legend,
//    ArcElement
//);

//const Dashboard = () => {
//    const [stats, setStats] = useState(null);
//    const [isLoading, setIsLoading] = useState(true);
//    const [error, setError] = useState('');

//    useEffect(() => {
//        const fetchStats = async () => {
//            try {
//                setIsLoading(true);
//                setError('');
//                const response = await getTicketStatistics();

//                if (response.success) {
//                    setStats(response.data);
//                } else {
//                    setError(response.message || 'Failed To Load Statistics');
//                }
//            } catch (err) {
//                console.error('Error fetching statistics:', err);
//                setError(err.message || 'Error occurs when loading Data');
//            } finally {
//                setIsLoading(false);
//            }
//        };

//        fetchStats();
//    }, []);

//    // Calculate percentages for pie chart
//    const total = stats?.totalTickets || 0;
//    const pieData = {
//        labels: ['New', 'Pending', 'Complete', 'Refund'],
//        datasets: [{
//            data: [
//                stats?.newTickets || 0,
//                stats?.pendingTickets || 0,
//                stats?.completeTickets || 0,
//                stats?.refundTickets || 0
//            ],
//            backgroundColor: [
//                'rgba(75, 192, 192, 0.8)', // Teal
//                'rgba(255, 206, 86, 0.8)', // Yellow
//                'rgba(54, 162, 235, 0.8)', // Blue
//                'rgba(255, 99, 132, 0.8)'  // Red
//            ],
//            hoverBackgroundColor: [
//                'rgba(75, 192, 192, 1)',
//                'rgba(255, 206, 86, 1)',
//                'rgba(54, 162, 235, 1)',
//                'rgba(255, 99, 132, 1)'
//            ]
//        }]
//    };

//    // Bar chart configuration
//    const barOptions = {
//        indexAxis: 'y',
//        elements: {
//            bar: {
//                borderWidth: 2
//            }
//        },
//        responsive: true,
//        maintainAspectRatio: false,
//        plugins: {
//            legend: {
//                display: false
//            },
//            tooltip: {
//                enabled: false
//            }
//        },
//        scales: {
//            x: {
//                grid: {
//                    display: false
//                },
//                ticks: {
//                    font: {
//                        family: 'Arial'
//                    }
//                }
//            },
//            y: {
//                grid: {
//                    display: false
//                },
//                ticks: {
//                    font: {
//                        family: 'Arial'
//                    }
//                }
//            }
//        }
//    };

//    return (
//        <div className="dashboard-page" style={{
//            display: 'flex',
//            height: '100vh',
//            overflow: 'hidden'
//        }}>
//            {/* Sidebar */}
//            <div style={{
//                width: '240px',
//                height: '100%',
//                backgroundColor: '#1A202C',
//                padding: '20px',
//                color: 'white',
//                borderRight: '1px solid #2D3748'
//            }}>
//                <h2 style={{ color: '#FFFFFF', fontSize: '24px', marginBottom: '30px' }}>Admin Panel</h2>
//                <nav>
//                    <ul style={{ listStyle: 'none', padding: 0 }}>
//                        <li><a href="#" style={{ color: '#8EA2B6', fontSize: '14px', padding: '10px', display: 'block' }}>Overview</a></li>
//                        <li><a href="#" style={{ color: '#8EA2B6', fontSize: '14px', padding: '10px', display: 'block' }}>Ticket Status</a></li>
//                        <li><a href="#" style={{ color: '#8EA2B6', fontSize: '14px', padding: '10px', display: 'block' }}>Settings</a></li>
//                        {/*<li><a href="#" style={{ color: '#8EA2B6', fontSize: '14px', padding: '10px', display: 'block' }}></a></li>*/}
//                        {/*<li><a href="#" style={{ color: '#8EA2B6', fontSize: '14px', padding: '10px', display: 'block' }}>Settings</a></li>*/}
//                    </ul>
//                </nav>
//            </div>

//            {/* Main Content */}
//            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
//                {/* Header */}
//                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                    <div>
//                        <h1 style={{ color: '#1A202C', fontSize: '28px', fontWeight: 600 }}>Dashboard</h1>
//                        <p style={{ color: '#64748B', fontSize: '14px' }}>Welcome back! Here's an overview of your Maintenance Tickets System</p>
//                    </div>
//                    <div style={{ display: 'flex', gap: '15px' }}>
//                        <div style={{
//                            padding: '10px 20px',
//                            backgroundColor: '#F8F9FA',
//                            borderRadius: '8px',
//                            border: '1px solid #E2E8F0'
//                        }}>
//                            <p style={{ margin: 0, color: '#64748B' }}>Today</p>
//                            <p style={{ margin: 0, fontWeight: 600 }}></p>
//                        </div>
//                        <div style={{
//                            padding: '10px 20px',
//                            backgroundColor: '#3B82F6',
//                            borderRadius: '8px'
//                        }}>
//                            <p style={{ margin: 0, color: '#FFFFFF', fontWeight: 600 }}>View Report</p>
//                        </div>
//                    </div>
//                </div>

//                {/* Top Metrics */}
//                <div style={{
//                    display: 'grid',
//                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//                    gap: '20px',
//                    marginBottom: '30px'
//                }}>
//                    <div style={{
//                        padding: '20px',
//                        backgroundColor: '#FFFFFF',
//                        borderRadius: '12px',
//                        border: '1px solid #E2E8F0',
//                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//                    }}>
//                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                            <div>
//                                <p style={{ color: '#64748B', margin: 0 }}>Total Tickets</p>
//                                <p style={{ fontSize: '24px', fontWeight: 600, marginTop: '5px' }}>{stats?.totalTickets || 0}</p>
//                            </div>
//                            <div style={{
//                                width: '40px',
//                                height: '40px',
//                                backgroundColor: '#3B82F6',
//                                borderRadius: '50%',
//                                display: 'flex',
//                                alignItems: 'center',
//                                justifyContent: 'center'
//                            }}>
//                                <i className="fas fa-ticket-alt" style={{ color: '#FFFFFF' }}></i>
//                            </div>
//                        </div>
//                    </div>

//                    <div style={{
//                        padding: '20px',
//                        backgroundColor: '#FFFFFF',
//                        borderRadius: '12px',
//                        border: '1px solid #E2E8F0',
//                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//                    }}>
//                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                            <div>
//                                <p style={{ color: '#64748B', margin: 0 }}>New Tickets</p>
//                                <p style={{ fontSize: '24px', fontWeight: 600, marginTop: '5px' }}>{stats?.newTickets || 0}</p>
//                            </div>
//                            <div style={{
//                                width: '40px',
//                                height: '40px',
//                                backgroundColor: '#10B981',
//                                borderRadius: '50%',
//                                display: 'flex',
//                                alignItems: 'center',
//                                justifyContent: 'center'
//                            }}>
//                                <i className="fas fa-plus" style={{ color: '#FFFFFF' }}></i>
//                            </div>
//                        </div>
//                    </div>

//                    <div style={{
//                        padding: '20px',
//                        backgroundColor: '#FFFFFF',
//                        borderRadius: '12px',
//                        border: '1px solid #E2E8F0',
//                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//                    }}>
//                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                            <div>
//                                <p style={{ color: '#64748B', margin: 0 }}>Pending Tickets</p>
//                                <p style={{ fontSize: '24px', fontWeight: 600, marginTop: '5px' }}>{stats?.pendingTickets || 0}</p>
//                            </div>
//                            <div style={{
//                                width: '40px',
//                                height: '40px',
//                                backgroundColor: '#F59E0B',
//                                borderRadius: '50%',
//                                display: 'flex',
//                                alignItems: 'center',
//                                justifyContent: 'center'
//                            }}>
//                                <i className="fas fa-hourglass-half" style={{ color: '#FFFFFF' }}></i>
//                            </div>
//                        </div>
//                    </div>

//                    <div style={{
//                        padding: '20px',
//                        backgroundColor: '#FFFFFF',
//                        borderRadius: '12px',
//                        border: '1px solid #E2E8F0',
//                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//                    }}>
//                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                            <div>
//                                <p style={{ color: '#64748B', margin: 0 }}>Resolved Tickets</p>
//                                <p style={{ fontSize: '24px', fontWeight: 600, marginTop: '5px' }}>{stats?.completeTickets || 0}</p>
//                            </div>
//                            <div style={{
//                                width: '40px',
//                                height: '40px',
//                                backgroundColor: '#EF4444',
//                                borderRadius: '50%',
//                                display: 'flex',
//                                alignItems: 'center',
//                                justifyContent: 'center'
//                            }}>
//                                <i className="fas fa-check" style={{ color: '#FFFFFF' }}></i>
//                            </div>
//                        </div>
//                    </div>
//                </div>

//                {/* Charts Section */}
//                <div style={{
//                    display: 'grid',
//                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
//                    gap: '20px'
//                }}>
//                    {/* Bar Chart */}
//                    <div style={{
//                        backgroundColor: '#FFFFFF',
//                        borderRadius: '12px',
//                        padding: '20px',
//                        border: '1px solid #E2E8F0',
//                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//                        height: '400px'
//                    }}>
//                        <h3 style={{ color: '#1A202C', fontSize: '18px', marginBottom: '15px' }}>Ticket Status Distribution</h3>
//                        <Bar
//                            data={{
//                                labels: ['New', 'Pending', 'Complete', 'Refund'],
//                                datasets: [{
//                                    label: 'Number of Tickets',
//                                    data: [
//                                        stats?.newTickets || 0,
//                                        stats?.pendingTickets || 0,
//                                        stats?.completeTickets || 0,
//                                        stats?.refundTickets || 0
//                                    ],
//                                    backgroundColor: [
//                                        'rgba(75, 192, 192, 0.8)',
//                                        'rgba(255, 206, 86, 0.8)',
//                                        'rgba(54, 162, 235, 0.8)',
//                                        'rgba(255, 99, 132, 0.8)'
//                                    ],
//                                    borderColor: [
//                                        'rgba(75, 192, 192, 1)',
//                                        'rgba(255, 206, 86, 1)',
//                                        'rgba(54, 162, 235, 1)',
//                                        'rgba(255, 99, 132, 1)'
//                                    ],
//                                    borderWidth: 1
//                                }]
//                            }}
//                            options={barOptions}
//                        />
//                    </div>

//                    {/* Pie Chart */}
//                    <div style={{
//                        backgroundColor: '#FFFFFF',
//                        borderRadius: '12px',
//                        padding: '20px',
//                        border: '1px solid #E2E8F0',
//                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//                        height: '400px'
//                    }}>
//                        <h3 style={{ color: '#1A202C', fontSize: '18px', marginBottom: '15px' }}>Ticket Status Percentage</h3>
//                        <div style={{ height: '300px' }}>
//                            <Doughnut data={pieData} options={{
//                                responsive: true,
//                                maintainAspectRatio: false,
//                                plugins: {
//                                    legend: {
//                                        position: 'right'
//                                    }
//                                }
//                            }} />
//                        </div>
//                    </div>
//                </div>
//            </div>
//        </div>
//    );
//};

//export default Dashboard;




















//                        //import React, { useState, useEffect } from 'react';
////import { getTicketStatistics } from '../../api/tickets';
////import { Bar } from 'react-chartjs-2';
////import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

////ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

////const Dashboard = () => {
////    const [stats, setStats] = useState(null);
////    const [isLoading, setIsLoading] = useState(true);
////    const [error, setError] = useState('');

////    useEffect(() => {
////        const fetchStats = async () => {
////            try {
////                setIsLoading(true);
////                const data = await getTicketStatistics();
////                setStats(data);
////            } catch (err) {
////                setError('›‘· ›Ì  Õ„Ì· «·≈Õ’«∆Ì« ');
////            } finally {
////                setIsLoading(false);
////            }
////        };

////        fetchStats();
////    }, []);

////    const chartData = stats ? {
////        labels: ['≈Ã„«·Ì «· –«ﬂ—', 'ÃœÌœ…', 'ﬁÌœ «·„⁄«·Ã…', '„ﬂ „·…', '„—›Ê÷…'],
////        datasets: [
////            {
////                label: '⁄œœ «· –«ﬂ—',
////                data: [
////                    stats.totalTickets,
////                    stats.newTickets || 0,
////                    stats.pendingTickets,
////                    stats.completeTickets,
////                    stats.refundTickets
////                ],
////                backgroundColor: [
////                    'rgba(54, 162, 235, 0.6)',
////                    'rgba(75, 192, 192, 0.6)',
////                    'rgba(255, 206, 86, 0.6)',
////                    'rgba(75, 192, 192, 0.6)',
////                    'rgba(255, 99, 132, 0.6)'
////                ],
////                borderColor: [
////                    'rgba(54, 162, 235, 1)',
////                    'rgba(75, 192, 192, 1)',
////                    'rgba(255, 206, 86, 1)',
////                    'rgba(75, 192, 192, 1)',
////                    'rgba(255, 99, 132, 1)'
////                ],
////                borderWidth: 1,
////            },
////        ],
////    } : null;

////    const options = {
////        responsive: true,
////        plugins: {
////            legend: {
////                position: 'top',
////            },
////            title: {
////                display: true,
////                text: '≈Õ’«∆Ì«  «· –«ﬂ—',
////            },
////        },
////        scales: {
////            y: {
////                beginAtZero: true,
////                ticks: {
////                    stepSize: 1
////                }
////            }
////        }
////    };

////    return (
////        <div className="dashboard-page">
////            <h2>·ÊÕ…  Õﬂ„ «·„”ƒÊ·</h2>

////            {error && <div className="error-message">{error}</div>}

////            {isLoading ? (
////                <div className="loading">Ã«—Ì  Õ„Ì· «·≈Õ’«∆Ì« ...</div>
////            ) : stats ? (
////                <div className="dashboard-content">
////                    <div className="stats-cards">
////                        <div className="stat-card total">
////                            <h3>≈Ã„«·Ì «· –«ﬂ—</h3>
////                            <p>{stats.totalTickets}</p>
////                        </div>

////                        <div className="stat-card new">
////                            <h3>ÃœÌœ…</h3>
////                            <p>{stats.newTickets || 0}</p>
////                        </div>

////                        <div className="stat-card pending">
////                            <h3>ﬁÌœ «·„⁄«·Ã…</h3>
////                            <p>{stats.pendingTickets}</p>
////                        </div>

////                        <div className="stat-card completed">
////                            <h3>„ﬂ „·…</h3>
////                            <p>{stats.completeTickets}</p>
////                        </div>

////                        <div className="stat-card refund">
////                            <h3>„—›Ê÷…</h3>
////                            <p>{stats.refundTickets}</p>
////                        </div>
////                    </div>

////                    <div className="chart-container">
////                        <Bar data={chartData} options={options} />
////                    </div>
////                </div>
////            ) : null}
////        </div>
////    );
////};

////export default Dashboard;