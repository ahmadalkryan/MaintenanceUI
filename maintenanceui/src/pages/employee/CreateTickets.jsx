
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../../api/tickets';
import { getAllDeviceCategories } from '../../api/deviceCategory';
import TicketForm from '../../components/tickets/TicketForm';

const CreateTickets = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllDeviceCategories();
                if (response.success) {
                    const categoriesData = response.data || response.data.data || [];
                    setCategories(categoriesData);
                } else {
                    setError(response.message || 'Failed to load device types');
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('An error occurred while loading device types');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (ticketData) => {
        try {
            setIsLoading(true);
            setError('');
            setSuccess(false);

            const response = await createTicket(ticketData);
            if (response.Result) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/employee/my-tickets');
                }, 2000);
            } else {
                setError(response.Message || 'Failed to create ticket');
            }
        } catch (err) {
            let errorMessage = 'An unexpected error occurred while creating the ticket';
            if (err.response) {
                if (err.response.status === 400 && err.response.data.errors) {
                    const validationErrors = err.response.data.errors;
                    errorMessage = Object.values(validationErrors).flat().join(', ');
                } else if (err.response.status === 415) {
                    errorMessage = 'Unsupported file type. Please upload only JPG, PNG, PDF, or DOC files.';
                } else if (err.response.data && err.response.data.Message) {
                    errorMessage = err.response.data.Message;
                }
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dashboard-container" style={styles.dashboardContainer}>
            <div className="card" style={styles.card}>
                <div className="card-header" style={styles.cardHeader}>
                    <h2 style={styles.title}>Create Maintenance Ticket</h2>
                    <p style={styles.subtitle}>Report a new maintenance issue</p>
                </div>

                <div className="card-body" style={styles.cardBody}>
                    {error && (
                        <div style={styles.errorMessage}>
                            <span style={styles.messageIcon}>??</span>
                            <div style={styles.messageText}>{error}</div>
                        </div>
                    )}

                    {success && (
                        <div style={styles.successMessage}>
                            <span style={styles.messageIcon}>?</span>
                            <div style={styles.messageText}>
                                Ticket created successfully! Redirecting to tickets page...
                            </div>
                        </div>
                    )}

                    {isLoading ? (
                        <div style={styles.loaderContainer}>
                            <div style={styles.spinner}></div>
                            <p style={styles.loaderText}>Loading device types...</p>
                        </div>
                    ) : (
                        <TicketForm
                            categories={categories}
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                            initialValues={{
                                description: '',
                                deviceCategoryId: '',
                                deviceId: '',
                                attachment: null
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Responsive styles with dashboard theme
const styles = {
    dashboardContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#f5f7fa',
        minHeight: '100vh'
    },
    card: {
        width: '100%',
        maxWidth: '800px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        margin: '20px 0'
    },
    cardHeader: {
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: '25px 30px',
        borderBottom: '1px solid #eaeaea'
    },
    title: {
        margin: '0 0 5px 0',
        fontSize: '1.75rem',
        fontWeight: '600'
    },
    subtitle: {
        margin: '0',
        fontSize: '1rem',
        color: '#ecf0f1',
        opacity: '0.9'
    },
    cardBody: {
        padding: '30px'
    },
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0'
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
    },
    loaderText: {
        color: '#7f8c8d',
        fontSize: '1rem'
    },
    errorMessage: {
        backgroundColor: '#fdeded',
        color: '#c0392b',
        padding: '15px 20px',
        borderRadius: '8px',
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'flex-start',
        borderLeft: '4px solid #c0392b'
    },
    successMessage: {
        backgroundColor: '#edf7ed',
        color: '#27ae60',
        padding: '15px 20px',
        borderRadius: '8px',
        marginBottom: '25px',
        display: 'flex',
        alignItems: 'flex-start',
        borderLeft: '4px solid #27ae60'
    },
    messageIcon: {
        marginRight: '12px',
        fontSize: '20px',
        flexShrink: 0
    },
    messageText: {
        flex: 1
    }
};

export default CreateTickets;







