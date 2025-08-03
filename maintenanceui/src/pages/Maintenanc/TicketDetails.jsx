//import React, { useState, useEffect } from 'react';
//import { useParams, useNavigate } from 'react-router-dom';
//import { useAuth } from '../../contexts/AuthContext';
//import { getTicketById, updateTicket } from '../../api/tickets';
//import { getTicketTraces, addTicketTrace } from '../../api/ticketTraces';
//import { mapTicketStatus, mapStatusToValue } from '../../api/tickets';

//const TicketDetails = () => {
//    const { id } = useParams();
//    const navigate = useNavigate();
//    const { user, isMaintenance, isAdmin } = useAuth();
//    const [ticket, setTicket] = useState(null);
//    const [traces, setTraces] = useState([]);
//    const [newStatus, setNewStatus] = useState('');
//    const [note, setNote] = useState('');
//    const [isLoading, setIsLoading] = useState(true);
//    const [error, setError] = useState('');
//    const [success, setSuccess] = useState('');

//    useEffect(() => {
//        const fetchTicketData = async () => {
//            try {
//                setIsLoading(true);

//                // Ã·» »Ì«‰«  «· –ﬂ—…
//                const ticketData = await getTicketById(id);
//                setTicket(ticketData);

//                // Ã·» ”Ã· «·  »⁄
//                const tracesData = await getTicketTraces(id);
//                setTraces(tracesData);

//                //  ⁄ÌÌ‰ «·Õ«·… «·Õ«·Ì…
//                setNewStatus(mapTicketStatus(ticketData.ticketStatusId));
//            } catch (err) {
//                setError('›‘· ›Ì  Õ„Ì· »Ì«‰«  «· –ﬂ—…');
//            } finally {
//                setIsLoading(false);
//            }
//        };

//        fetchTicketData();
//    }, [id]);

//    const handleStatusChange = async () => {
//        if (!newStatus) return;

//        try {
//            setIsLoading(true);
//            setError('');

//            // ≈÷«›…   »⁄ ÃœÌœ
//            await addTicketTrace({
//                ticketId: id,
//                statusId: mapStatusToValue(newStatus),
//                note: note,
//                userId: user.userId
//            });

//            //  ÕœÌÀ Õ«·… «· –ﬂ—…
//            await updateTicket({
//                id: id,
//                ticketStatusId: mapStatusToValue(newStatus)
//            });

//            setSuccess(' „  ÕœÌÀ Õ«·… «· –ﬂ—… »‰Ã«Õ!');
//            setTimeout(() => {
//                setSuccess('');
//                navigate(`/ticket/${id}`);
//            }, 2000);
//        } catch (err) {
//            setError('›‘· ›Ì  ÕœÌÀ Õ«·… «· –ﬂ—…: ' + err.message);
//        } finally {
//            setIsLoading(false);
//        }
//    };

//    if (isLoading) {
//        return <div className="loading">Ã«—Ì  Õ„Ì· »Ì«‰«  «· –ﬂ—…...</div>;
//    }

//    if (!ticket) {
//        return <div className="error-message">·„ Ì „ «·⁄ÀÊ— ⁄·Ï «· –ﬂ—…</div>;
//    }

//    return (
//        <div className="ticket-details-page">
//            <h2> ›«’Ì· «· –ﬂ—…: {ticket.ticketNumber}</h2>

//            {error && <div className="error-message">{error}</div>}
//            {success && <div className="success-message">{success}</div>}

//            <div className="ticket-info">
//                <div className="info-row">
//                    <span className="label">«·Ê’›:</span>
//                    <span className="value">{ticket.description}</span>
//                </div>

//                <div className="info-row">
//                    <span className="label">‰Ê⁄ «·ÃÂ«“:</span>
//                    <span className="value">{ticket.deviceCategory?.categoryName}</span>
//                </div>

//                <div className="info-row">
//                    <span className="label">„⁄—› «·ÃÂ«“:</span>
//                    <span className="value">{ticket.deviceId || '€Ì— „Õœœ'}</span>
//                </div>

//                <div className="info-row">
//                    <span className="label">«·Õ«·… «·Õ«·Ì…:</span>
//                    <span className="value status">{mapTicketStatus(ticket.ticketStatusId)}</span>
//                </div>

//                <div className="info-row">
//                    <span className="label"> «—ÌŒ «·≈‰‘«¡:</span>
//                    <span className="value">{new Date(ticket.createdDate).toLocaleString()}</span>
//                </div>

//                {ticket.attachmentPath && (
//                    <div className="info-row">
//                        <span className="label">«·„—›ﬁ« :</span>
//                        <span className="value">
//                            <a
//                                href={`https://localhost:7220${ticket.attachmentPath}`}
//                                target="_blank"
//                                rel="noopener noreferrer"
//                            >
//                                ⁄—÷ «·„—›ﬁ
//                            </a>
//                        </span>
//                    </div>
//                )}
//            </div>

//            {(isMaintenance || isAdmin) && (
//                <div className="update-section">
//                    <h3> ÕœÌÀ Õ«·… «· –ﬂ—…</h3>

//                    <div className="form-group">
//                        <label>«·Õ«·… «·ÃœÌœ…:</label>
//                        <select
//                            value={newStatus}
//                            onChange={(e) => setNewStatus(e.target.value)}
//                            disabled={isLoading}
//                        >
//                            <option value="New">ÃœÌœ…</option>
//                            <option value="Pending">ﬁÌœ «·„⁄«·Ã…</option>
//                            <option value="Complete">„ﬂ „·…</option>
//                            <option value="Refund">„—›Ê÷…</option>
//                        </select>
//                    </div>

//                    <div className="form-group">
//                        <label>„·«ÕŸ…:</label>
//                        <textarea
//                            value={note}
//                            onChange={(e) => setNote(e.target.value)}
//                            disabled={isLoading}
//                            placeholder="√œŒ· „·«ÕŸ« ﬂ Â‰«..."
//                        />
//                    </div>

//                    <button
//                        onClick={handleStatusChange}
//                        disabled={isLoading || !newStatus}
//                        className="update-btn"
//                    >
//                        {isLoading ? 'Ã«—Ì «· ÕœÌÀ...' : ' ÕœÌÀ «·Õ«·…'}
//                    </button>
//                </div>
//            )}

//            <div className="ticket-traces">
//                <h3>”Ã· «·  »⁄</h3>

//                {traces.length === 0 ? (
//                    <p>·« ÌÊÃœ ”Ã·   »⁄ ·Â–Â «· –ﬂ—…</p>
//                ) : (
//                    <div className="traces-list">
//                        {traces.map(trace => (
//                            <div key={trace.id} className="trace-item">
//                                <div className="trace-header">
//                                    <span className="status">{mapTicketStatus(trace.newStatusId)}</span>
//                                    <span className="date">{new Date(trace.createdDate).toLocaleString()}</span>
//                                </div>
//                                <div className="trace-note">{trace.note || '·«  ÊÃœ „·«ÕŸ« '}</div>
//                                <div className="trace-user">»Ê«”ÿ…: {trace.user?.fullName || '„” Œœ„'}</div>
//                            </div>
//                        ))}
//                    </div>
//                )}
//            </div>
//        </div>
//    );
//};

//export default TicketDetails;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getTicketById, updateTicket } from '../../api/tickets';
import { getTicketTraces, addTicketTrace } from '../../api/ticketTraces';
import { mapTicketStatus, mapStatusToValue } from '../../api/tickets';

const TicketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isMaintenance, isAdmin } = useAuth();
    const [ticket, setTicket] = useState(null);
    const [traces, setTraces] = useState([]);
    const [newStatus, setNewStatus] = useState('');
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchTicketData = async () => {
        try {
            setIsLoading(true);
            setError('');

            // Ã·» »Ì«‰«  «· –ﬂ—…
            const ticketResponse = await getTicketById(id);
            if (!ticketResponse.success) {
                throw new Error(ticketResponse.message || '›‘· ›Ì Ã·» »Ì«‰«  «· –ﬂ—…');
            }

            setTicket(ticketResponse.data);
            setNewStatus(mapTicketStatus(ticketResponse.data.TicketStatusId));

            // Ã·» ”Ã· «·  »⁄
            const tracesResponse = await getTicketTraces(id);
            if (!tracesResponse.success) {
                throw new Error(tracesResponse.message || '›‘· ›Ì Ã·» ”Ã· «·  »⁄');
            }

            setTraces(tracesResponse.data);
        } catch (err) {
            setError(err.message || '›‘· ›Ì  Õ„Ì· »Ì«‰«  «· –ﬂ—…');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTicketData();
    }, [id]);

    const handleStatusChange = async () => {
        if (!newStatus) return;

        try {
            setIsLoading(true);
            setError('');

            // «· Õﬁﬁ „‰  €ÌÌ— «·Õ«·…
            const currentStatus = mapTicketStatus(ticket.TicketStatusId);
            if (currentStatus === newStatus) {
                throw new Error('·„  ﬁ„ » €ÌÌ— Õ«·… «· –ﬂ—…');
            }

            // ≈÷«›…   »⁄ ÃœÌœ
            await addTicketTrace({
                ticketId: id,
                statusId: mapStatusToValue(newStatus),
                note: note,
                userId: user.id // «” Œœ«„ user.id »œ·« „‰ user.userId
            });

            //  ÕœÌÀ Õ«·… «· –ﬂ—…
            const updateResponse = await updateTicket({
                id: id,
                TicketStatusId: mapStatusToValue(newStatus) // «” Œœ«„ TicketStatusId »œ·« „‰ ticketStatusId
            });

            if (!updateResponse.success) {
                throw new Error(updateResponse.message || '›‘· ›Ì  ÕœÌÀ «· –ﬂ—…');
            }

            setSuccess(' „  ÕœÌÀ Õ«·… «· –ﬂ—… »‰Ã«Õ!');
            setTimeout(() => {
                setSuccess('');
                fetchTicketData(); // ≈⁄«œ…  Õ„Ì· «·»Ì«‰«  »œ·« „‰ «· ‰ﬁ·
            }, 2000);
        } catch (err) {
            setError(err.message || '›‘· ›Ì  ÕœÌÀ Õ«·… «· –ﬂ—…');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="loading">Ã«—Ì  Õ„Ì· »Ì«‰«  «· –ﬂ—…...</div>;
    }

    if (!ticket) {
        return <div className="error-message">·„ Ì „ «·⁄ÀÊ— ⁄·Ï «· –ﬂ—…</div>;
    }

    // œ«·… „”«⁄œ… · ÕÊÌ· «· «—ÌŒ
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('ar-EG', options);
    };

    return (
        <div className="ticket-details-page">
            <h2> ›«’Ì· «· –ﬂ—…: {ticket.TicketNumber}</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="ticket-info">
                <div className="info-row">
                    <span className="label">«·Ê’›:</span>
                    <span className="value">{ticket.Description}</span>
                </div>

                <div className="info-row">
                    <span className="label">‰Ê⁄ «·ÃÂ«“:</span>
                    <span className="value">{ticket.DeviceCategory?.CategoryName}</span>
                </div>

                <div className="info-row">
                    <span className="label">„⁄—› «·ÃÂ«“:</span>
                    <span className="value">{ticket.DeviceId || '€Ì— „Õœœ'}</span>
                </div>

                <div className="info-row">
                    <span className="label">«·Õ«·… «·Õ«·Ì…:</span>
                    <span className="value status">{mapTicketStatus(ticket.TicketStatusId)}</span>
                </div>

                <div className="info-row">
                    <span className="label"> «—ÌŒ «·≈‰‘«¡:</span>
                    <span className="value">{formatDate(ticket.CreatedDate)}</span>
                </div>

                {ticket.AttachmentPath && (
                    <div className="info-row">
                        <span className="label">«·„—›ﬁ« :</span>
                        <span className="value">
                            <a
                                href={`https://localhost:7220/${ticket.AttachmentPath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="attachment-link"
                            >
                                ⁄—÷ «·„—›ﬁ
                            </a>
                        </span>
                    </div>
                )}
            </div>

            {(isMaintenance || isAdmin) && (
                <div className="update-section">
                    <h3> ÕœÌÀ Õ«·… «· –ﬂ—…</h3>

                    <div className="form-group">
                        <label>«·Õ«·… «·ÃœÌœ…:</label>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="">«Œ — Õ«·… ÃœÌœ…</option>
                            <option value="New">ÃœÌœ…</option>
                            <option value="Pending">ﬁÌœ «·„⁄«·Ã…</option>
                            <option value="Complete">„ﬂ „·…</option>
                            <option value="Refund">„—›Ê÷…</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>„·«ÕŸ…:</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            disabled={isLoading}
                            placeholder="√œŒ· „·«ÕŸ« ﬂ Â‰«..."
                            rows={3}
                        />
                    </div>

                    <button
                        onClick={handleStatusChange}
                        disabled={isLoading || !newStatus}
                        className="update-btn"
                    >
                        {isLoading ? 'Ã«—Ì «· ÕœÌÀ...' : ' ÕœÌÀ «·Õ«·…'}
                    </button>
                </div>
            )}

            <div className="ticket-traces">
                <h3>”Ã· «·  »⁄</h3>

                {traces.length === 0 ? (
                    <p>·« ÌÊÃœ ”Ã·   »⁄ ·Â–Â «· –ﬂ—…</p>
                ) : (
                    <div className="traces-list">
                        {traces.map(trace => (
                            <div key={trace.Id} className="trace-item">
                                <div className="trace-header">
                                    <span className="status">{mapTicketStatus(trace.StatusId)}</span>
                                    <span className="date">{formatDate(trace.CreateTime)}</span>
                                </div>
                                <div className="trace-note">{trace.Note || '·«  ÊÃœ „·«ÕŸ« '}</div>
                                <div className="trace-user">»Ê«”ÿ…: {trace.User?.FullName || '„” Œœ„'}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketDetails;