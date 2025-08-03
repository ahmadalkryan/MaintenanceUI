////import React, { useState, useEffect } from 'react';
////import { Container, Grid, Typography } from '@mui/material';
////import { getAssignedTickets, ticketStatistics } from '../../api/tickets';
////import TicketList from '../../components/tickets/TicketList';
////import StatisticsCard from '../../components/common/StatisticsCard';
////import TicketFilter from '../../components/tickets/TicketFilter';

////const MaintenanceDashboard = () => {
////    const [tickets, setTickets] = useState([]);
////    const [stats, setStats] = useState(null);
////    const [filters, setFilters] = useState({
////        status: '',
////        fromDate: '',
////        toDate: ''
////    });

////    useEffect(() => {
////        const fetchData = async () => {
////            const [ticketsData, statsData] = await Promise.all([
////                getAssignedTickets(),
////                ticketStatistics()
////            ]);

////            setTickets(ticketsData);
////            setStats(statsData);
////        };

////        fetchData();
////    }, []);

////    const handleFilter = async (newFilters) => {
////        setFilters(newFilters);
////        const filteredTickets = await filterTicket(newFilters);
////        setTickets(filteredTickets);
////    };

////    return (
////        <Container maxWidth="lg">
////            <Typography variant="h4" gutterBottom>���� ���� ���� �������</Typography>

////            {stats && (
////                <Grid container spacing={3} sx={{ mb: 4 }}>
////                    <Grid item xs={12} md={3}>
////                        <StatisticsCard title="������ �������" value={stats.total} color="primary" />
////                    </Grid>
////                    <Grid item xs={12} md={3}>
////                        <StatisticsCard title="������" value={stats.open} color="info" />
////                    </Grid>
////                    <Grid item xs={12} md={3}>
////                        <StatisticsCard title="��� ��������" value={stats.inProgress} color="warning" />
////                    </Grid>
////                    <Grid item xs={12} md={3}>
////                        <StatisticsCard title="�����" value={stats.closed} color="success" />
////                    </Grid>
////                </Grid>
////            )}

////            <TicketFilter onFilter={handleFilter} />

////            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>������� �������</Typography>
////            <TicketList tickets={tickets} showActions={true} />
////        </Container>
////    );
////};

////export default MaintenanceDashboard;



//import React, { useState, useEffect } from 'react';
//import { Container, Grid, Typography } from '@mui/material';
//import { getAllTickets, getTicketStatistics } from '../../api/tickets'; // �� ������� ���
//import { useAuth } from '../../context/AuthContext'; // ��� �������
//import TicketList from '../../components/tickets/TicketList';
//import StatisticsCard from '../../components/common/StatisticsCard';
//import TicketFilter from '../../components/tickets/TicketFilter';

//const MaintenanceDashboard = () => {
//    const { user } = useAuth(); // ��� �������
//    const [tickets, setTickets] = useState([]);
//    const [stats, setStats] = useState(null);
//    const [loading, setLoading] = useState(true); // ��� �������
//    const [error, setError] = useState(null); // ��� �������
//    const [filters, setFilters] = useState({
//        status: '',
//        fromDate: '',
//        toDate: ''
//    });

//    useEffect(() => {
//        const fetchData = async () => {
//            try {
//                setLoading(true);
//                setError(null);

//                // ��� ������� ������� �������� ������
//                const ticketsResponse = await getAllTickets();
//                if (!ticketsResponse.success) {
//                    throw new Error(ticketsResponse.message);
//                }

//                // ����� ������� ������� �������� ������ ���
//                const assignedTickets = ticketsResponse.data.filter(
//                    ticket => ticket.assignedToId === user.id
//                );

//                setTickets(assignedTickets);

//                // ��� �������� �������
//                const statsResponse = await getTicketStatistics();
//                if (!statsResponse.success) {
//                    throw new Error(statsResponse.message);
//                }

//                setStats({
//                    total: statsResponse.data.totalTickets,
//                    open: statsResponse.data.newTickets,
//                    inProgress: statsResponse.data.pendingTickets,
//                    closed: statsResponse.data.completeTickets
//                });

//            } catch (err) {
//                console.error('Error fetching data:', err);
//                setError(err.message || '��� ��� ����� ��� ��������');
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchData();
//    }, [user]); // ��� �������

//    const handleFilter = async (newFilters) => {
//        try {
//            setFilters(newFilters);
//            setLoading(true);
//            setError(null);

//            // ��� ������� �� �������
//            const filteredResponse = await getAllTickets();
//            if (!filteredResponse.success) {
//                throw new Error(filteredResponse.message);
//            }

//            // ����� ������� ��� �������
//            let filteredTickets = filteredResponse.data;

//            // ������ 1: ������� ������� �������� ������
//            filteredTickets = filteredTickets.filter(
//                ticket => ticket.assignedToId === user.id
//            );

//            // ������ 2: ���� �������
//            if (newFilters.status) {
//                filteredTickets = filteredTickets.filter(
//                    ticket => ticket.status === newFilters.status
//                );
//            }

//            // ������ 3: ���� �������
//            if (newFilters.fromDate) {
//                filteredTickets = filteredTickets.filter(
//                    ticket => new Date(ticket.createdDate) >= new Date(newFilters.fromDate)
//                );
//            }

//            if (newFilters.toDate) {
//                const endDate = new Date(newFilters.toDate);
//                endDate.setDate(endDate.getDate() + 1); // ����� ����� ������

//                filteredTickets = filteredTickets.filter(
//                    ticket => new Date(ticket.createdDate) < endDate
//                );
//            }

//            setTickets(filteredTickets);

//        } catch (err) {
//            console.error('Error filtering tickets:', err);
//            setError(err.message || '��� ��� ����� ����� �������');
//        } finally {
//            setLoading(false);
//        }
//    };

//    if (loading) {
//        return (
//            <Container maxWidth="lg">
//                <Typography variant="h6" align="center">���� ����� ��������...</Typography>
//            </Container>
//        );
//    }

//    if (error) {
//        return (
//            <Container maxWidth="lg">
//                <Typography variant="h6" color="error" align="center">
//                    {error}
//                </Typography>
//            </Container>
//        );
//    }

//    return (
//        <Container maxWidth="lg">
//            <Typography variant="h4" gutterBottom>���� ���� ���� �������</Typography>

//            {stats && (
//                <Grid container spacing={3} sx={{ mb: 4 }}>
//                    <Grid item xs={12} md={3}>
//                        <StatisticsCard
//                            title="������ �������"
//                            value={stats.total}
//                            color="primary"
//                        />
//                    </Grid>
//                    <Grid item xs={12} md={3}>
//                        <StatisticsCard
//                            title="������"
//                            value={stats.open}
//                            color="info"
//                        />
//                    </Grid>
//                    <Grid item xs={12} md={3}>
//                        <StatisticsCard
//                            title="��� ��������"
//                            value={stats.inProgress}
//                            color="warning"
//                        />
//                    </Grid>
//                    <Grid item xs={12} md={3}>
//                        <StatisticsCard
//                            title="�����"
//                            value={stats.closed}
//                            color="success"
//                        />
//                    </Grid>
//                </Grid>
//            )}

//            <TicketFilter onFilter={handleFilter} />

//            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
//                ������� ������� ({tickets.length})
//            </Typography>

//            <TicketList tickets={tickets} showActions={true} />
//        </Container>
//    );
//};

//export default MaintenanceDashboard;




import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { getAllTickets, getTicketStatistics } from '../../api/tickets';
import { useAuth } from '../../context/AuthContext';
import TicketList from '../../components/tickets/TicketList';
import StatisticsCard from '../../components/common/StatisticsCard';
import TicketFilter from '../../components/tickets/TicketFilter';
import './Dashboard.css'; // We'll create this CSS file

const Dashboard = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        fromDate: '',
        toDate: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const ticketsResponse = await getAllTickets();
                if (!ticketsResponse.success) {
                    throw new Error(ticketsResponse.message);
                }

                const assignedTickets = ticketsResponse.data.filter(
                    ticket => ticket.assignedToId === user.id
                );

                setTickets(assignedTickets);

                const statsResponse = await getTicketStatistics();
                if (!statsResponse.success) {
                    throw new Error(statsResponse.message);
                }

                setStats({
                    total: statsResponse.data.totalTickets,
                    open: statsResponse.data.newTickets,
                    inProgress: statsResponse.data.pendingTickets,
                    closed: statsResponse.data.completeTickets
                });

            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message || '��� ��� ����� ��� ��������');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleFilter = async (newFilters) => {
        try {
            setFilters(newFilters);
            setLoading(true);
            setError(null);

            const filteredResponse = await getAllTickets();
            if (!filteredResponse.success) {
                throw new Error(filteredResponse.message);
            }

            let filteredTickets = filteredResponse.data;

            filteredTickets = filteredTickets.filter(
                ticket => ticket.assignedToId === user.id
            );

            if (newFilters.status) {
                filteredTickets = filteredTickets.filter(
                    ticket => ticket.status === newFilters.status
                );
            }

            if (newFilters.fromDate) {
                filteredTickets = filteredTickets.filter(
                    ticket => new Date(ticket.createdDate) >= new Date(newFilters.fromDate)
                );
            }

            if (newFilters.toDate) {
                const endDate = new Date(newFilters.toDate);
                endDate.setDate(endDate.getDate() + 1);
                filteredTickets = filteredTickets.filter(
                    ticket => new Date(ticket.createdDate) < endDate
                );
            }

            setTickets(filteredTickets);

        } catch (err) {
            console.error('Error filtering tickets:', err);
            setError(err.message || '��� ��� ����� ����� �������');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <CircularProgress size={60} thickness={5} />
                <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                    ���� ����� ��������...
                </Typography>
            </div>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Alert severity="error" sx={{ fontSize: '1.1rem' }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <div className="maintenance-dashboard">
            <div className="dashboard-header">
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom className="dashboard-title">
                        ���� ���� ���� �������
                    </Typography>
                    <Typography variant="subtitle1" className="dashboard-subtitle">
                        ����� ������! ���� ���� ���� ��� ���� ����� �������
                    </Typography>
                </Container>
            </div>

            <Container maxWidth="lg" className="dashboard-content">
                {stats && (
                    <div className="stats-container">
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3}>
                                <StatisticsCard
                                    title="������ �������"
                                    value={stats.total}
                                    color="primary"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatisticsCard
                                    title="����� �����"
                                    value={stats.open}
                                    color="info"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatisticsCard
                                    title="����� �����"
                                    value={stats.inProgress}
                                    color="warning"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StatisticsCard
                                    title="����� �����"
                                    value={stats.closed}
                                    color="success"
                                />
                            </Grid>
                        </Grid>
                    </div>
                )}

                <Paper elevation={0} className="filter-card">
                    <TicketFilter onFilter={handleFilter} />
                </Paper>

                <Paper elevation={0} className="tickets-card">
                    <div className="tickets-header">
                        <Typography variant="h5">
                            ������� ������� ({tickets.length})
                        </Typography>
                    </div>
                    <TicketList tickets={tickets} showActions={true} />
                </Paper>
            </Container>
        </div>
    );
};

export default Dashboard;