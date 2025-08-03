
// ›Ì „·› «· ÊÃÌÂ «·—∆Ì”Ì
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import MaintenanceDashboard from './pages/maintenance/TicketTrace';
//import AddTracePage from './pages/maintenance/AddTracePage';
//import TicketTracesPage from './pages/maintenance/TicketTracesPage';
//import './index.css';
//export default function App() {
//    return (
//        <Router>
//            <div >
//                <Routes>
//                    <Route path="/" element={<MaintenanceDashboard />} />
//                    <Route path="/maintenance/new-ticket" element={<div>New Ticket Page</div>} />
//                    <Route path="/maintenance/add-trace" element={<AddTracePage />} />
//                    <Route path="/maintenance/traces" element={<TicketTracesPage />} />
//                </Routes>
//            </div>
//        </Router>
        //<Router>
        //    <Routes>
        //        <Route path="/maintenance" element={<MaintenanceDashboard />} />
        //        <Route path="/maintenance/add-trace" element={<AddTracePage />} />
        //        <Route path="/maintenance/traces" element={<TicketTracesPage />} />
        //        {/* „”«—«  √Œ—Ï... */}
        //    </Routes>
        //</Router>
//    );
//}





import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Login from './pages/auth/Login';
import CreateTickets from './pages/employee/CreateTickets';
import TicketDashboard from './pages/admin/TicketDashboard';
import Dashboard from './pages/admin/DashboardStatus';
import MaintenanceDashboard from './pages/maintenance/TicketTrace';
import AddTracePage from './pages/maintenance/AddTracePage';
import TicketTracesPage from './pages/maintenance/TicketTracesPage';
////import Home from './components/pages/home';
////import './App.css';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

function AppRoutes() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            {/*all user */}
            {/*<Route path="/login"*/}
            {/*    element={isAuthenticated ? <Login /> : <Navigate to="/home" replace />}*/}
            {/*/>*/}

            {/*has role Employee*/}
            {/*<Route path="/create-ticket"*/}
            {/*    element={isAuthenticated ? <CreateTickets /> : <Navigate to="/login" replace />}*/}
            {/*/>*/}
            {/*has role Maintenance*/}
            {/*<Route path="/maindashboard"*/}
            {/*    element={isAuthenticated ? <MaintenanceDashboard /> : <Navigate to="/login" replace />}*/}
            {/*/>*/}

            {/*has role Admin*/}
            {/*<Route path="/stausdash"*/}
            {/*    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}*/}
            {/*/>*/}
            {/*has role Admin*/}
            {/*<Route path="/dash"*/}
            {/*    element={isAuthenticated ? < TicketDashboard /> : <Navigate to="/login" replace />}*/}
            {/*/>*/}
                                  <Route path="/" element={<MaintenanceDashboard />} />
                               <Route path="/maintenance/new-ticket" element={<div>New Ticket Page</div>} />
                             <Route path="/maintenance/add-trace" element={<AddTracePage />} />
                            <Route path="/maintenance/traces" element={<TicketTracesPage />} />


        </Routes>
    );

}
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
































//// src/App.jsx
//import React, { useState, useEffect } from 'react';
//import { login, getCurrentUser, logout } from './api/auth';
//import { getAllDeviceCategories, getCategoryById } from './api/deviceCategory';
//import {
//    getAllTickets,
//    getTicketById,
//    createTicket,
//    updateTicket,
//    filterTickets,
//    filterTicketsByDate,
//    getTicketStatistics,
//    mapTicketStatus
//} from './api/tickets';
//import { getTicketTraces, addTicketTrace } from './api/ticketTraces';

//const App = () => {
//    const [activeTab, setActiveTab] = useState('login');
//    const [token, setToken] = useState(localStorage.getItem('authToken') || '');
//    const [currentUser, setCurrentUser] = useState(null);
//    const [apiResponse, setApiResponse] = useState('');
//    const [loading, setLoading] = useState(false);

//    // Õ«·«  «·‰„«–Ã
//    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
//    const [ticketForm, setTicketForm] = useState({
//        description: '',
//        deviceCategoryId: '',
//        deviceId: '',
//        attachment: null
//    });
//    const [traceForm, setTraceForm] = useState({
//        ticketId: '',
//        statusId: '',
//        note: '',
//        userId: ''
//    });
//    const [filterForm, setFilterForm] = useState({
//        TicketNumber: '',
//        CreatedDate: '',
//        DeciveCategoryId: ''
//    });
//    const [dateFilterForm, setDateFilterForm] = useState({
//        startDate: '',
//        endDate: ''
//    });

//    // »Ì«‰«  «· ÿ»Ìﬁ
//    const [categories, setCategories] = useState([]);
//    const [tickets, setTickets] = useState([]);

//    //  Õ„Ì· ›∆«  «·√ÃÂ“… ⁄‰œ »œ¡ «· Õ„Ì·
//    useEffect(() => {
//        if (token) {
//            fetchDeviceCategories();
//        }
//    }, [token]);

//    //  Õ„Ì· ›∆«  «·√ÃÂ“…
//    const fetchDeviceCategories = async () => {
//        try {
//            setLoading(true);
//            const result = await getAllDeviceCategories();
//            setCategories(result.data || []);
//        } catch (error) {
//            setApiResponse(`Œÿ√: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    //  ”ÃÌ· «·œŒÊ·
//    const handleLogin = async () => {
//        try {
//            setLoading(true);
//            const result = await login(loginForm.username, loginForm.password); 
//            console.log("done log in ", result);
//            localStorage.setItem('authToken', result.token);
//            setToken(result.token);
//            setApiResponse(' „  ”ÃÌ· «·œŒÊ· »‰Ã«Õ!');

//            // Ã·» »Ì«‰«  «·„” Œœ„ «·Õ«·Ì
//            const user = await getCurrentUser();
//            setCurrentUser(user);
//        } catch (error) {
//            setApiResponse(`Œÿ√ ›Ì  ”ÃÌ· «·œŒÊ·: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    //  ”ÃÌ· «·Œ—ÊÃ
//    const handleLogout = async () => {
//        try {
//            setLoading(true);
//            await logout();
//            localStorage.removeItem('authToken');
//            setToken('');
//            setCurrentUser(null);
//            setApiResponse(' „  ”ÃÌ· «·Œ—ÊÃ »‰Ã«Õ!');
//        } catch (error) {
//            setApiResponse(`Œÿ√ ›Ì  ”ÃÌ· «·Œ—ÊÃ: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // Ã·» Ã„Ì⁄ «· –«ﬂ—
//    const fetchAllTickets = async () => {
//        try {
//            setLoading(true);
//            const result = await getAllTickets();
//            setTickets(result.data || []);
//            setApiResponse(` „ Ã·» ${result.data.length}  –«ﬂ—`);
//        } catch (error) {
//            setApiResponse(`Œÿ√: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // ≈‰‘«¡  –ﬂ—… ÃœÌœ…
//    const handleCreateTicket = async () => {
//        try {
//            setLoading(true);
//            const result = await createTicket(ticketForm);
//            setApiResponse(` „ ≈‰‘«¡ «· –ﬂ—… »‰Ã«Õ: ${JSON.stringify(result)}`);
//            fetchAllTickets();
//        } catch (error) {
//            setApiResponse(`Œÿ√: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // ≈÷«›…   »⁄  –ﬂ—…
//    const handleAddTrace = async () => {
//        try {
//            setLoading(true);
//            const result = await addTicketTrace(traceForm);
//            setApiResponse(` „ ≈÷«›… «·  »⁄ »‰Ã«Õ: ${JSON.stringify(result)}`);
//        } catch (error) {
//            setApiResponse(`Œÿ√: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    //  ’›Ì… «· –«ﬂ—
//    const handleFilterTickets = async () => {
//        try {
//            setLoading(true);
//            const result = await filterTickets(filterForm);
//            setTickets(result.data || []);
//            setApiResponse(` „ «·⁄ÀÊ— ⁄·Ï ${result.data.length}  –ﬂ—…`);
//        } catch (error) {
//            setApiResponse(`Œÿ√: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    //  ’›Ì… «· –«ﬂ— Õ”» «· «—ÌŒ
//    const handleDateFilter = async () => {
//        try {
//            setLoading(true);
//            const result = await filterTicketsByDate(dateFilterForm);
//            setTickets(result.data || []);
//            setApiResponse(` „ «·⁄ÀÊ— ⁄·Ï ${result.data.length}  –ﬂ—… ›Ì Â–« «·‰ÿ«ﬁ «·“„‰Ì`);
//        } catch (error) {
//            setApiResponse(`Œÿ√: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // «·Õ’Ê· ⁄·Ï ≈Õ’«∆Ì«  «· –«ﬂ—
//    const fetchStatistics = async () => {
//        try {
//            setLoading(true);
//            const result = await getTicketStatistics();
//            setApiResponse(JSON.stringify(result.data, null, 2));
//        } catch (error) {
//            setApiResponse(`Œÿ√: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    return (
//        <div className="min-h-screen bg-gray-50">
//            {/* ‘—Ìÿ «· ‰ﬁ· */}
//            <nav className="bg-blue-600 text-white p-4">
//                <div className="container mx-auto flex flex-wrap justify-between items-center">
//                    <h1 className="text-xl font-bold"> ÿ»Ìﬁ  Ã—Ì»Ì ··‹ API</h1>

//                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'login' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('login')}
//                        >
//                             ”ÃÌ· «·œŒÊ·
//                        </button>
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'profile' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('profile')}
//                        >
//                            «·„·› «·‘Œ’Ì
//                        </button>
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'categories' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('categories')}
//                        >
//                            ›∆«  «·√ÃÂ“…
//                        </button>
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'tickets' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('tickets')}
//                        >
//                            «· –«ﬂ—
//                        </button>
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'traces' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('traces')}
//                        >
//                              »⁄ «· –«ﬂ—
//                        </button>
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'statistics' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('statistics')}
//                        >
//                            «·≈Õ’«∆Ì« 
//                        </button>
//                    </div>

//                    {token && (
//                        <button
//                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mt-2 md:mt-0"
//                            onClick={handleLogout}
//                        >
//                             ”ÃÌ· «·Œ—ÊÃ
//                        </button>
//                    )}
//                </div>
//            </nav>

//            <div className="container mx-auto p-4">
//                {/* Õ«·… «· Õ„Ì· */}
//                {loading && (
//                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
//                        <div className="bg-white p-6 rounded-lg shadow-lg">
//                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//                            <p className="mt-3 text-center">Ã«—Ì «· Õ„Ì·...</p>
//                        </div>
//                    </div>
//                )}

//                {/* „‰ÿﬁ… «·‰ «∆Ã */}
//                <div className="bg-white p-4 rounded-lg shadow mb-6">
//                    <h2 className="text-lg font-semibold mb-2">‰ ÌÃ… «·«” œ⁄«¡:</h2>
//                    <pre className="bg-gray-100 p-3 rounded max-h-60 overflow-auto">
//                        {apiResponse || '·„ Ì „  ‰›Ì– √Ì «” œ⁄«¡ »⁄œ'}
//                    </pre>
//                </div>

//                {/* „Õ ÊÏ «·√ﬁ”«„ */}
//                <div className="bg-white p-6 rounded-lg shadow">
//                    {/* ﬁ”„  ”ÃÌ· «·œŒÊ· */}
//                    {activeTab === 'login' && (
//                        <div className="space-y-4">
//                            <h2 className="text-xl font-bold text-blue-600"> ”ÃÌ· «·œŒÊ·</h2>

//                            {token ? (
//                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//                                    √‰  „”Ã· œŒÊ· »«·›⁄·
//                                </div>
//                            ) : (
//                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                    <div>
//                                        <label className="block mb-1">«”„ «·„” Œœ„:</label>
//                                        <input
//                                            type="text"
//                                            className="w-full p-2 border rounded"
//                                            value={loginForm.username}
//                                            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
//                                        />
//                                    </div>
//                                    <div>
//                                        <label className="block mb-1">ﬂ·„… «·„—Ê—:</label>
//                                        <input
//                                            type="password"
//                                            className="w-full p-2 border rounded"
//                                            value={loginForm.password}
//                                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
//                                        />
//                                    </div>
//                                    <div className="md:col-span-2">
//                                        <button
//                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                                            onClick={handleLogin}
//                                        >
//                                             ”ÃÌ· «·œŒÊ·
//                                        </button>
//                                    </div>
//                                </div>
//                            )}
//                        </div>
//                    )}

//                    {/* ﬁ”„ «·„·› «·‘Œ’Ì */}
//                    {activeTab === 'profile' && (
//                        <div className="space-y-4">
//                            <h2 className="text-xl font-bold text-blue-600">«·„·› «·‘Œ’Ì</h2>

//                            {!token ? (
//                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                                    Ì—ÃÏ  ”ÃÌ· «·œŒÊ· √Ê·«
//                                </div>
//                            ) : (
//                                <div>
//                                    <button
//                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
//                                        onClick={async () => {
//                                            try {
//                                                setLoading(true);
//                                                const user = await getCurrentUser();
//                                                setCurrentUser(user);
//                                                setApiResponse(JSON.stringify(user, null, 2));
//                                            } catch (error) {
//                                                setApiResponse(`Œÿ√: ${error.message}`);
//                                            } finally {
//                                                setLoading(false);
//                                            }
//                                        }}
//                                    >
//                                        Ã·» »Ì«‰«  «·„” Œœ„
//                                    </button>

//                                    {currentUser && (
//                                        <div className="border border-gray-200 rounded p-4">
//                                            <h3 className="font-semibold">»Ì«‰«  «·„” Œœ„:</h3>
//                                            <p><strong>«·«”„:</strong> {currentUser.name}</p>
//                                            <p><strong>«·»—Ìœ «·≈·ﬂ —Ê‰Ì:</strong> {currentUser.email}</p>
//                                            <p><strong>«·œÊ—:</strong> {currentUser.role}</p>
//                                        </div>
//                                    )}
//                                </div>
//                            )}
//                        </div>
//                    )}

//                    {/* ﬁ”„ ›∆«  «·√ÃÂ“… */}
//                    {activeTab === 'categories' && (
//                        <div className="space-y-4">
//                            <h2 className="text-xl font-bold text-blue-600">›∆«  «·√ÃÂ“…</h2>

//                            {!token ? (
//                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                                    Ì—ÃÏ  ”ÃÌ· «·œŒÊ· √Ê·«
//                                </div>
//                            ) : (
//                                <div>
//                                    <button
//                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
//                                        onClick={fetchDeviceCategories}
//                                    >
//                                        Ã·» Ã„Ì⁄ «·›∆« 
//                                    </button>

//                                    {categories.length > 0 && (
//                                        <div className="overflow-x-auto">
//                                            <table className="min-w-full bg-white border border-gray-200">
//                                                <thead>
//                                                    <tr className="bg-gray-100">
//                                                        <th className="py-2 px-4 border-b">ID</th>
//                                                        <th className="py-2 px-4 border-b">«·«”„</th>
//                                                        <th className="py-2 px-4 border-b">«·Ê’›</th>
//                                                    </tr>
//                                                </thead>
//                                                <tbody>
//                                                    {categories.map(category => (
//                                                        <tr key={category.id}>
//                                                            <td className="py-2 px-4 border-b">{category.id}</td>
//                                                            <td className="py-2 px-4 border-b">{category.name}</td>
//                                                            <td className="py-2 px-4 border-b">{category.description}</td>
//                                                        </tr>
//                                                    ))}
//                                                </tbody>
//                                            </table>
//                                        </div>
//                                    )}
//                                </div>
//                            )}
//                        </div>
//                    )}

//                    {/* ﬁ”„ «· –«ﬂ— */}
//                    {activeTab === 'tickets' && (
//                        <div className="space-y-6">
//                            <h2 className="text-xl font-bold text-blue-600">≈œ«—… «· –«ﬂ—</h2>

//                            {!token ? (
//                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                                    Ì—ÃÏ  ”ÃÌ· «·œŒÊ· √Ê·«
//                                </div>
//                            ) : (
//                                <>
//                                    {/* ≈‰‘«¡  –ﬂ—… ÃœÌœ… */}
//                                    <div className="border border-gray-200 rounded p-4">
//                                        <h3 className="font-semibold mb-3">≈‰‘«¡  –ﬂ—… ÃœÌœ…</h3>
//                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                            <div>
//                                                <label className="block mb-1">Ê’› «·„‘ﬂ·…:</label>
//                                                <textarea
//                                                    className="w-full p-2 border rounded"
//                                                    value={ticketForm.description}
//                                                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
//                                                />
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1">›∆… «·ÃÂ«“:</label>
//                                                <select
//                                                    className="w-full p-2 border rounded"
//                                                    value={ticketForm.deviceCategoryId}
//                                                    onChange={(e) => setTicketForm({ ...ticketForm, deviceCategoryId: e.target.value })}
//                                                >
//                                                    <option value="">«Œ — ›∆…</option>
//                                                    {categories.map(category => (
//                                                        <option key={category.id} value={category.id}>
//                                                            {category.name}
//                                                        </option>
//                                                    ))}
//                                                </select>
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1">„⁄—› «·ÃÂ«“ («Œ Ì«—Ì):</label>
//                                                <input
//                                                    type="text"
//                                                    className="w-full p-2 border rounded"
//                                                    value={ticketForm.deviceId}
//                                                    onChange={(e) => setTicketForm({ ...ticketForm, deviceId: e.target.value })}
//                                                />
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1">«·„—›ﬁ («Œ Ì«—Ì):</label>
//                                                <input
//                                                    type="file"
//                                                    className="w-full p-2 border rounded"
//                                                    onChange={(e) => setTicketForm({ ...ticketForm, attachment: e.target.files[0] })}
//                                                />
//                                            </div>
//                                            <div className="md:col-span-2">
//                                                <button
//                                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                                                    onClick={handleCreateTicket}
//                                                >
//                                                    ≈‰‘«¡  –ﬂ—…
//                                                </button>
//                                            </div>
//                                        </div>
//                                    </div>

//                                    {/*  ’›Ì… «· –«ﬂ— */}
//                                    <div className="border border-gray-200 rounded p-4">
//                                        <h3 className="font-semibold mb-3"> ’›Ì… «· –«ﬂ—</h3>
//                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                            <div>
//                                                <label className="block mb-1">—ﬁ„ «· –ﬂ—…:</label>
//                                                <input
//                                                    type="text"
//                                                    className="w-full p-2 border rounded"
//                                                    value={filterForm.TicketNumber}
//                                                    onChange={(e) => setFilterForm({ ...filterForm, TicketNumber: e.target.value })}
//                                                />
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1"> «—ÌŒ «·≈‰‘«¡:</label>
//                                                <input
//                                                    type="date"
//                                                    className="w-full p-2 border rounded"
//                                                    value={filterForm.CreatedDate}
//                                                    onChange={(e) => setFilterForm({ ...filterForm, CreatedDate: e.target.value })}
//                                                />
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1">›∆… «·ÃÂ«“:</label>
//                                                <select
//                                                    className="w-full p-2 border rounded"
//                                                    value={filterForm.DeciveCategoryId}
//                                                    onChange={(e) => setFilterForm({ ...filterForm, DeciveCategoryId: e.target.value })}
//                                                >
//                                                    <option value="">«Œ — ›∆…</option>
//                                                    {categories.map(category => (
//                                                        <option key={category.id} value={category.id}>
//                                                            {category.name}
//                                                        </option>
//                                                    ))}
//                                                </select>
//                                            </div>
//                                            <div className="md:col-span-3">
//                                                <button
//                                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                                                    onClick={handleFilterTickets}
//                                                >
//                                                     ’›Ì… «· –«ﬂ—
//                                                </button>
//                                            </div>
//                                        </div>
//                                    </div>

//                                    {/*  ’›Ì… Õ”» «· «—ÌŒ */}
//                                    <div className="border border-gray-200 rounded p-4">
//                                        <h3 className="font-semibold mb-3"> ’›Ì… Õ”» «· «—ÌŒ</h3>
//                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                            <div>
//                                                <label className="block mb-1"> «—ÌŒ «·»œ«Ì…:</label>
//                                                <input
//                                                    type="date"
//                                                    className="w-full p-2 border rounded"
//                                                    value={dateFilterForm.startDate}
//                                                    onChange={(e) => setDateFilterForm({ ...dateFilterForm, startDate: e.target.value })}
//                                                />
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1"> «—ÌŒ «·‰Â«Ì…:</label>
//                                                <input
//                                                    type="date"
//                                                    className="w-full p-2 border rounded"
//                                                    value={dateFilterForm.endDate}
//                                                    onChange={(e) => setDateFilterForm({ ...dateFilterForm, endDate: e.target.value })}
//                                                />
//                                            </div>
//                                            <div className="md:col-span-2">
//                                                <button
//                                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                                                    onClick={handleDateFilter}
//                                                >
//                                                     ’›Ì… Õ”» «· «—ÌŒ
//                                                </button>
//                                            </div>
//                                        </div>
//                                    </div>

//                                    {/* Ã·» Ã„Ì⁄ «· –«ﬂ— */}
//                                    <div className="flex justify-center">
//                                        <button
//                                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//                                            onClick={fetchAllTickets}
//                                        >
//                                            Ã·» Ã„Ì⁄ «· –«ﬂ—
//                                        </button>
//                                    </div>

//                                    {/* ⁄—÷ «· –«ﬂ— */}
//                                    {tickets.length > 0 && (
//                                        <div className="overflow-x-auto mt-4">
//                                            <table className="min-w-full bg-white border border-gray-200">
//                                                <thead>
//                                                    <tr className="bg-gray-100">
//                                                        <th className="py-2 px-4 border-b">—ﬁ„ «· –ﬂ—…</th>
//                                                        <th className="py-2 px-4 border-b">«·Ê’›</th>
//                                                        <th className="py-2 px-4 border-b">«·Õ«·…</th>
//                                                        <th className="py-2 px-4 border-b"> «—ÌŒ «·≈‰‘«¡</th>
//                                                        <th className="py-2 px-4 border-b">›∆… «·ÃÂ«“</th>
//                                                    </tr>
//                                                </thead>
//                                                <tbody>
//                                                    {tickets.map(ticket => (
//                                                        <tr key={ticket.id}>
//                                                            <td className="py-2 px-4 border-b">{ticket.ticketNumber}</td>
//                                                            <td className="py-2 px-4 border-b">{ticket.description}</td>
//                                                            <td className="py-2 px-4 border-b">{mapTicketStatus(ticket.statusID)}</td>
//                                                            <td className="py-2 px-4 border-b">{new Date(ticket.createdTime).toLocaleDateString()}</td>
//                                                            <td className="py-2 px-4 border-b">{ticket.deciveCategoryName}</td>
//                                                        </tr>
//                                                    ))}
//                                                </tbody>
//                                            </table>
//                                        </div>
//                                    )}
//                                </>
//                            )}
//                        </div>
//                    )}

//                    {/* ﬁ”„   »⁄ «· –«ﬂ— */}
//                    {activeTab === 'traces' && (
//                        <div className="space-y-4">
//                            <h2 className="text-xl font-bold text-blue-600">  »⁄ «· –«ﬂ—</h2>

//                            {!token ? (
//                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                                    Ì—ÃÏ  ”ÃÌ· «·œŒÊ· √Ê·«
//                                </div>
//                            ) : (
//                                <div className="border border-gray-200 rounded p-4">
//                                    <h3 className="font-semibold mb-3">≈÷«›…   »⁄ ÃœÌœ</h3>
//                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                        <div>
//                                            <label className="block mb-1">„⁄—› «· –ﬂ—…:</label>
//                                            <input
//                                                type="number"
//                                                className="w-full p-2 border rounded"
//                                                value={traceForm.ticketId}
//                                                onChange={(e) => setTraceForm({ ...traceForm, ticketId: e.target.value })}
//                                            />
//                                        </div>
//                                        <div>
//                                            <label className="block mb-1">„⁄—› «·Õ«·…:</label>
//                                            <select
//                                                className="w-full p-2 border rounded"
//                                                value={traceForm.statusId}
//                                                onChange={(e) => setTraceForm({ ...traceForm, statusId: e.target.value })}
//                                            >
//                                                <option value="">«Œ — «·Õ«·…</option>
//                                                <option value="1">ÃœÌœ…</option>
//                                                <option value="2">ﬁÌœ «·„⁄«·Ã…</option>
//                                                <option value="3">„ﬂ „·…</option>
//                                                <option value="4">„—›Ê÷…</option>
//                                            </select>
//                                        </div>
//                                        <div className="md:col-span-2">
//                                            <label className="block mb-1">„·«ÕŸ…:</label>
//                                            <textarea
//                                                className="w-full p-2 border rounded"
//                                                value={traceForm.note}
//                                                onChange={(e) => setTraceForm({ ...traceForm, note: e.target.value })}
//                                            />
//                                        </div>
//                                        <div>
//                                            <label className="block mb-1">„⁄—› «·„” Œœ„:</label>
//                                            <input
//                                                type="text"
//                                                className="w-full p-2 border rounded"
//                                                value={traceForm.userId}
//                                                onChange={(e) => setTraceForm({ ...traceForm, userId: e.target.value })}
//                                            />
//                                        </div>
//                                        <div className="md:col-span-2">
//                                            <button
//                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                                                onClick={handleAddTrace}
//                                            >
//                                                ≈÷«›…   »⁄
//                                            </button>
//                                        </div>
//                                    </div>
//                                </div>
//                            )}
//                        </div>
//                    )}

//                    {/* ﬁ”„ «·≈Õ’«∆Ì«  */}
//                    {activeTab === 'statistics' && (
//                        <div className="space-y-4">
//                            <h2 className="text-xl font-bold text-blue-600">≈Õ’«∆Ì«  «· –«ﬂ—</h2>

//                            {!token ? (
//                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                                    Ì—ÃÏ  ”ÃÌ· «·œŒÊ· √Ê·«
//                                </div>
//                            ) : (
//                                <div>
//                                    <button
//                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
//                                        onClick={fetchStatistics}
//                                    >
//                                        Ã·» «·≈Õ’«∆Ì« 
//                                    </button>
//                                </div>
//                            )}
//                        </div>
//                    )}
//                </div>
//            </div>
//        </div>
//    );
//};

//export default App;      

















































//import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
//import { AuthProvider, useAuth } from './contexts/AuthContext';
//import Login from './pages/auth/Login';
//import CreateTickets from './pages/employee/CreateTickets';
//import MyTickets from './pages/employee/MyTickets';
//import AssignedTickets from './pages/maintenance/AssignedTickets';
//import TicketDetails from './pages/maintenance/TicketDetails';
//import AllTickets from './pages/admin/AllTickets';
//import Dashboard from './pages/admin/Dashboard';
//import Layout from './components/layout/Layout';
//import LoadingSpinner from './components/common/LoadingSpinner';
//import NotFound from './pages/NotFound'; // √÷› Â–«

//const PrivateRoute = ({ children, roles }) => {
//    const { user, loading, hasPermission } = useAuth();

//    if (loading) {
//        return (
//            <div className="full-page-loader">
//                <LoadingSpinner />
//                <p>Loading...</p>
//            </div>
//        );
//    }

//    if (!user) {
//        return <Navigate to="/login" replace />;
//    }

//    // «· Õﬁﬁ „‰ √‰ «·„” Œœ„ ·œÌÂ √Õœ «·√œÊ«— «·„ÿ·Ê»…
//    const hasRequiredRole = roles.some(role => hasPermission(role));

//    if (!hasRequiredRole) {
//        return <Navigate to="/unauthorized" replace />;
//    }

//    return children || <Outlet />;
//};

//const RoleBasedRedirect = () => {
//    const { user, loading } = useAuth();
//    console.log("RoleBasedRedirect - user:", user); // ≈÷«›…
//    console.log("RoleBasedRedirect - loading:", loading); // ≈÷«›…

//    if (loading) {
//        return (
//            <div className="full-page-loader">
//                <LoadingSpinner />
//                <p>Loading...</p>
//            </div>
//        );
//    }

//    if (!user) {
//        return <Navigate to="/login" replace />;
//    }

//    switch (user.role) {
//        case 'Admin':
//            return <Navigate to="/admin" replace />;
//        case 'Maintenance':
//            return <Navigate to="/maintenance" replace />;
//        case 'Employee':
//            return <Navigate to="/my-tickets" replace />;
//        default:
//            return <Navigate to="/login" replace />;
//    }
//};

//const Unauthorized = () => (
//    <div className="unauthorized-page">
//        <h2>Unauthorized Access</h2>
//        <p>You do not have permission to access this page.</p>
//        <button onClick={() => window.history.back()}>Go Back</button>
//    </div>
//);

//const AppRoutes = () => {
//    return (
//        <Routes>
//            <Route path="/login" element={<Login />} />
//            <Route path="/unauthorized" element={<Unauthorized />} />

//            {/* „”«—«  «·„ÊŸ›Ì‰ */}
//            <Route element={<PrivateRoute roles={['Employee']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/my-tickets" element={<MyTickets />} />
//                    <Route path="/create-ticket" element={<CreateTickets />} />
//                    {/* ≈÷«›… „”«—  ›«’Ì· «· –ﬂ—… ··„ÊŸ›Ì‰ */}
//                    <Route path="/ticket/:id" element={<TicketDetails />} />
//                </Route>
//            </Route>

//            {/* „”«—«  «·’Ì«‰… */}
//            <Route element={<PrivateRoute roles={['Maintenance']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/maintenance" element={<AssignedTickets />} />
//                    {/* ≈÷«›… „”«—  ›«’Ì· «· –ﬂ—… ·„ÊŸ›Ì «·’Ì«‰… */}
//                    <Route path="/ticket/:id" element={<TicketDetails />} />
//                </Route>
//            </Route>

//            {/* „”«—«  «·„œÌ— */}
//            <Route element={<PrivateRoute roles={['Admin']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/admin" element={<Dashboard />} />
//                    <Route path="/admin/all-tickets" element={<AllTickets />} />
//                    {/* ≈÷«›… „”«—  ›«’Ì· «· –ﬂ—… ··„œ—«¡ */}
//                    <Route path="/ticket/:id" element={<TicketDetails />} />
//                </Route>
//            </Route>

//            {/* «· ÊÃÌÂ «· ·ﬁ«∆Ì »‰«¡ ⁄·Ï «·œÊ— */}
//            <Route path="/" element={<RoleBasedRedirect />} />

//            {/* ’›Õ… 404 */}
//            <Route path="*" element={<NotFound />} />
//        </Routes>
//    );
//};

//function App() {
//    return (
//        <Router>
//            <AuthProvider>
//                <AppRoutes />
//            </AuthProvider>
//        </Router>
//    );
//}

//export default App;






//import { BrowserRouter as Router, Routes, Route, Navigate,useNavigate } from 'react-router-dom';
//import { AuthProvider, useAuth } from './contexts/AuthContext';
//import Login from './pages/auth/Login';
//import CreateTickets from './pages/employee/CreateTickets';
//import MyTickets from './pages/employee/MyTickets';
////import TicketDetails from './pages/employee/TicketDetails'; //  „ «· ⁄œÌ· Â‰«
//import Layout from './components/layout/Layout';
//import LoadingSpinner from './components/common/LoadingSpinner';
//import NotFound from './pages/NotFound';


//const PrivateRoute = ({ children, roles }) => {
//    const { user, loading } = useAuth();

//    if (loading) return <LoadingSpinner />;
//    if (!user) return <Navigate to="/login" replace />;

//    //  Õﬁﬁ „‰ √‰ user.role „ÊÃÊœ Ê›⁄¯«·
//    if (!user.role || !roles.includes(user.role)) {
//        return <Navigate to="/unauthorized" replace />;
//    }

//    return children;
//};

//const RoleBasedRedirect = () => {
//    const { user, loading } = useAuth();
//    console.log("RoleRedirect - user:", user); // „Â„ ·· ’ÕÌÕ

//    if (loading) return <LoadingSpinner />;
//    if (!user) return <Navigate to="/login" replace />;

//    if (user.role === 'Employee') {
//        return <Navigate to="/create-ticket" replace />;
//    }

//    //  ÊÃÌÂ «·√œÊ«— «·√Œ—Ï ≈·Ï „”«—« Â„ «·Œ«’…
//    return <Navigate to="/create-ticket" replace />;
//};

////const Unauthorized = () => {
////    const navigate = useNavigate();
////    return (
////        <div className="unauthorized-page">
////            <h2>Unauthorized Access</h2>
////            <p>You do not have permission to access this page.</p>
////            <button onClick={() => navigate('/login')}>Go to Login</button>
////        </div>
////    );
////};
//const Unauthorized = () => {
//    const navigate = useNavigate();

//    return (
//        <div className="unauthorized-page" style={{
//            textAlign: 'center',
//            padding: '40px',
//            maxWidth: '600px',
//            margin: '0 auto'
//        }}>
//            <h2 style={{ color: '#d32f2f' }}>Unauthorized Access</h2>
//            <p style={{ margin: '20px 0' }}>
//                You do not have permission to access this page.
//            </p>
//            <button
//                onClick={() => navigate('/login')}
//                style={{
//                    padding: '10px 20px',
//                    backgroundColor: '#1976d2',
//                    color: 'white',
//                    border: 'none',
//                    borderRadius: '4px',
//                    cursor: 'pointer'
//                }}
//            >
//                Go to Login
//            </button>
//        </div>
//    );
//};

//const AppRoutes = () => {
//    return (
//        <Routes>
//            <Route path="/login" element={<Login />} />
//            <Route path="/unauthorized" element={<Unauthorized />} />

//            {/* „”«—«  «·„ÊŸ›Ì‰ ›ﬁÿ */}
//            <Route element={
//                <PrivateRoute roles={['Employee']}>
//                    <Layout />
//                </PrivateRoute>
//            }>
//                <Route path="/my-tickets" element={<MyTickets />} />
//                <Route path="/create-ticket" element={<CreateTickets />} />
//                {/*<Route path="/ticket/:id" element={<TicketDetails />} />*/}
//            </Route>

//            {/* «· ÊÃÌÂ «· ·ﬁ«∆Ì »‰«¡ ⁄·Ï «·œÊ— */}
//            <Route path="/" element={<RoleBasedRedirect />} />

//            {/* ’›Õ… 404 */}
//            <Route path="*" element={<NotFound />} />
//        </Routes>
//    );
//};

//function App() {
//    return (
//        <Router>
//            <AuthProvider>
//                <AppRoutes />
//            </AuthProvider>
//        </Router>
//    );
//}

//export default App;

































//import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
//import { AuthProvider, useAuth } from './contexts/AuthContext';
//import Login from './pages/auth/Login';
//import CreateTickets from './pages/employee/CreateTickets';
//import MyTickets from './pages/employee/MyTickets';
//import AssignedTickets from './pages/maintenance/AssignedTickets';
//import TicketDetails from './pages/maintenance/TicketDetails';
//import AllTickets from './pages/admin/AllTickets';
//import Dashboard from './pages/admin/Dashboard';
//import Layout from './components/layout/Layout';
//import LoadingSpinner from './components/common/LoadingSpinner';

//const PrivateRoute = ({ children, requiredRole }) => {
//    const { user, loading } = useAuth();

//    if (loading) {
//        return (
//            <div className="full-page-loader">
//                <LoadingSpinner />
//                <p>Ã«—Ì «· Õ„Ì·...</p>
//            </div>
//        );
//    }

//    if (!user) {
//        return <Navigate to="/login" replace />;
//    }

//    if (!user.hasPermission(requiredRole)) {
//        return <Navigate to="/unauthorized" replace />;
//    }

//    return children || <Outlet />;
//};

//const RoleBasedRedirect = () => {
//    const { user } = useAuth();

//    if (!user) return <Navigate to="/login" replace />;

//    switch (user.role) {
//        case 'Admin':
//            return <Navigate to="/admin" replace />;
//        case 'Maintenance':
//            return <Navigate to="/maintenance" replace />;
//        case 'Employee':
//            return <Navigate to="/my-tickets" replace />;
//        default:
//            return <Navigate to="/login" replace />;
//    }
//};

//const Unauthorized = () => (
//    <div className="unauthorized-page">
//        <h2>€Ì— „’—Õ »«·Ê’Ê·</h2>
//        <p>·Ì” ·œÌﬂ «·’·«ÕÌ«  «··«“„… ··Ê’Ê· ≈·Ï Â–Â «·’›Õ….</p>
//        <button onClick={() => window.history.back()}>«·⁄Êœ…</button>
//    </div>
//);

//const AppRoutes = () => {
//    return (
//        <Routes>
//            <Route path="/login" element={<Login />} />
//            <Route path="/unauthorized" element={<Unauthorized />} />

//            {/* „”«—«  «·„ÊŸ›Ì‰ */}
//            <Route element={<PrivateRoute requiredRole="Employee" />}>
//                <Route element={<Layout />}>
//                    <Route path="/my-tickets" element={<MyTickets />} />
//                    <Route path="/create-ticket" element={<CreateTickets />} />
//                </Route>
//            </Route>

//            {/* „”«—«  «·’Ì«‰… */}
//            <Route element={<PrivateRoute requiredRole="Maintenance" />}>
//                <Route element={<Layout />}>
//                    <Route path="/maintenance" element={<AssignedTickets />} />
//                </Route>
//            </Route>

//            {/* „”«—«  «·„œÌ— */}
//            <Route element={<PrivateRoute requiredRole="Admin" />}>
//                <Route element={<Layout />}>
//                    <Route path="/admin" element={<Dashboard />} />
//                    <Route path="/admin/all-tickets" element={<AllTickets />} />
//                </Route>
//            </Route>

//            {/* „”«—  ›«’Ì· «· –ﬂ—… „ «Õ ·Ã„Ì⁄ «·√œÊ«— */}
//            <Route element={<PrivateRoute requiredRole="Employee" />}>
//                <Route element={<Layout />}>
//                    <Route path="/ticket/:id" element={<TicketDetails />} />
//                </Route>
//            </Route>

//            {/* «· ÊÃÌÂ «· ·ﬁ«∆Ì »‰«¡ ⁄·Ï «·œÊ— */}
//            <Route path="/" element={<RoleBasedRedirect />} />

//            {/* ’›Õ… 404 */}
//            <Route path="*" element={<Navigate to="/" replace />} />
//        </Routes>
//    );
//};

//function App() {
//    return (
//        <Router>
//            <AuthProvider>
//                <AppRoutes />
//            </AuthProvider>
//        </Router>
//    );
//}

//export default App;













//import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
//import { AuthProvider } from './contexts/AuthContext';
//import Login from './pages/auth/Login';
//import CreateTickets from './pages/employee/CreateTickets';
//import MyTickets from './pages/employee/MyTickets';
//import AssignedTickets from './pages/maintenance/AssignedTickets';
//import TicketDetails from './pages/maintenance/TicketDetails';
//import AllTickets from './pages/admin/AllTickets';
//import Dashboard from './pages/admin/Dashboard';
//import Layout from './components/layout/Layout';

//// ÂÌﬂ· Â—„Ì ··√œÊ«— (ﬂ· œÊ— ÌÕ ÊÌ ⁄·Ï «·√œÊ«— «·√œ‰Ï „‰Â)
//const roleHierarchy = {
//    Admin: ['Admin', 'Maintenance', 'Employee'],
//    Maintenance: ['Maintenance', 'Employee'],
//    Employee: ['Employee']
//};

//const PrivateRoute = ({ children, roles }) => {
//    const { user, loading } = useAuth();

//    if (loading) {
//        return <div className="loader">Ã«—Ì «· Õ„Ì·...</div>;
//    }

//    if (!user) {
//        return <Navigate to="/login" />;
//    }

//    // «· Õﬁﬁ „‰ «·’·«ÕÌ«  «·Â—„Ì…
//    const hasRequiredRole = roles.some(requiredRole =>
//        roleHierarchy[user.role]?.includes(requiredRole)
//    );

//    if (!hasRequiredRole) {
//        return <Navigate to="/" />;
//    }

//    return children ? children : <Outlet />;
//};

//const RoleBasedRedirect = () => {
//    const { user } = useAuth();

//    if (!user) return <Navigate to="/login" />;

//    switch (user.role) {
//        case 'Admin':
//            return <Navigate to="/admin" />;
//        case 'Maintenance':
//            return <Navigate to="/maintenance" />;
//        case 'Employee':
//            return <Navigate to="/my-tickets" />;
//        default:
//            return <Navigate to="/login" />;
//    }
//};

//const AppRoutes = () => {
//    return (
//        <Routes>
//            <Route path="/login" element={<Login />} />

//            <Route element={<PrivateRoute roles={['Employee', 'Maintenance', 'Admin']} />}>
//                <Route element={<Layout />}>
//                    <Route index element={<RoleBasedRedirect />} />

//                    <Route path="create-ticket" element={
//                        <PrivateRoute roles={['Employee']}>
//                            <CreateTickets />
//                        </PrivateRoute>
//                    } />

//                    <Route path="my-tickets" element={
//                        <PrivateRoute roles={['Employee']}>
//                            <MyTickets />
//                        </PrivateRoute>
//                    } />

//                    <Route path="ticket/:id" element={
//                        <PrivateRoute roles={['Employee', 'Maintenance', 'Admin']}>
//                            <TicketDetails />
//                        </PrivateRoute>
//                    } />

//                    <Route path="maintenance" element={
//                        <PrivateRoute roles={['Maintenance']}>
//                            <AssignedTickets />
//                        </PrivateRoute>
//                    } />

//                    <Route path="admin" element={
//                        <PrivateRoute roles={['Admin']}>
//                            <Dashboard />
//                        </PrivateRoute>
//                    } />

//                    <Route path="admin/all-tickets" element={
//                        <PrivateRoute roles={['Admin']}>
//                            <AllTickets />
//                        </PrivateRoute>
//                    } />
//                </Route>
//            </Route>
//        </Routes>
//    );
//};

//function App() {
//    return (
//        <Router>
//            <AuthProvider>
//                <AppRoutes />
//            </AuthProvider>
//        </Router>
//    );
//}

//export default App;


//import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
//import { AuthProvider, useAuth } from './contexts/AuthContext';
//import Login from './pages/auth/Login';
//import CreateTickets from './pages/employee/CreateTickets';
//import MyTickets from './pages/employee/MyTickets';
//import AssignedTickets from './pages/maintenance/AssignedTickets';
//import TicketDetails from './pages/maintenance/TicketDetails';
//import AllTickets from './pages/admin/AllTickets';
//import Dashboard from './pages/admin/Dashboard';
//import Layout from './components/layout/Layout';

//const roleHierarchy = {
//    Admin: ['Admin', 'Maintenance', 'Employee'],
//    Maintenance: ['Maintenance', 'Employee'],
//    Employee: ['Employee']
//};
//const PrivateRoute = ({ roles }) => {
//    const { user, loading } = useAuth();

//    if (loading) return <div>Ã«—Ì «· Õ„Ì·...</div>;
//    if (!user) return <Navigate to="/login" replace />;

//    //  Õﬁﬁ „‰ «·’·«ÕÌ« 
//    if (!roles.includes(user.role)) {
//        return <Navigate to="/" replace />;
//    }

//    return <Outlet />;
//};
////const PrivateRoute = ({ children, roles }) => {
////    const { user, loading } = useAuth();

////    if (loading) {
////        return <div className="loader">Ã«—Ì «· Õ„Ì·...</div>;
////    }

////    if (!user) {
////        return <Navigate to="/login" replace />;
////    }

////    const hasRequiredRole = roles.some(requiredRole =>
////        roleHierarchy[user.role]?.includes(requiredRole)
////    );

////    if (!hasRequiredRole) {
////        return <Navigate to="/" replace />;
////    }

////    return children ? children : <Outlet />;
////};
//const RoleBasedRedirect = () => {
//    const { user } = useAuth();

//    if (!user) return <Navigate to="/login" replace />;

//    switch (user.role) {
//        case 'Admin':
//            return <Navigate to="/admin" replace />;
//        case 'Maintenance':
//            return <Navigate to="/maintenance" replace />;
//        case 'Employee':
//            return <Navigate to="/my-tickets" replace />;
//        default:
//            return <Navigate to="/login" replace />;
//    }
//};
////const RoleBasedRedirect = () => {
////    const { user } = useAuth();

////    if (!user) return <Navigate to="/login" replace />;

////    switch (user.role) {
////        case 'Admin':
////            return <Navigate to="/admin" replace />;
////        case 'Maintenance':
////            return <Navigate to="/maintenance" replace />;
////        case 'Employee':
////            return <Navigate to="/my-tickets" replace />;
////        default:
////            return <Navigate to="/login" replace />;
////    }
////};

////const RoleBasedRedirect = () => {
////    const { user } = useAuth();

////    if (!user) return <Navigate to="/login" replace />;

////    switch (user.role) {
////        case 'Admin':
////            return <Navigate to="/admin" replace />;
////        case 'Maintenance':
////            return <Navigate to="/maintenance" replace />;
////        case 'Employee':
////            return <Navigate to="/my-tickets" replace />;
////        default:
////            return <Navigate to="/login" replace />;
////    }
////};

//const AppRoutes = () => {
//    return (
//        <Routes>
//            <Route path="/login" element={<Login />} />

//            {/* „”«—«  «·„ÊŸ›Ì‰ */}
//            <Route element={<PrivateRoute roles={['Employee']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/my-tickets" element={<MyTickets />} />
//                    <Route path="/create-ticket" element={<CreateTickets />} />
//                </Route>
//            </Route>

//            {/* „”«—«  «·’Ì«‰… */}
//            <Route element={<PrivateRoute roles={['Maintenance']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/maintenance" element={<AssignedTickets />} />
//                </Route>
//            </Route>

//            {/* „”«—«  «·„œÌ— */}
//            <Route element={<PrivateRoute roles={['Admin']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/admin" element={<Dashboard />} />
//                    <Route path="/admin/all-tickets" element={<AllTickets />} />
//                </Route>
//            </Route>

//            {/* „”«—«  „‘ —ﬂ… ·Ã„Ì⁄ «·„”Ã·Ì‰ */}
//            <Route element={<PrivateRoute roles={['Employee', 'Maintenance', 'Admin']} />}>
//                <Route path="/ticket/:id" element={<TicketDetails />} />
//            </Route>

//            {/* «· ÊÃÌÂ «· ·ﬁ«∆Ì */}
//            <Route path="/" element={<RoleBasedRedirect />} />
//        </Routes>
//    );
//};

////const AppRoutes = () => {
////    return (
////        <Routes>
////            <Route path="/login" element={<Login />} />

////            {/* ÿ»ﬁ… «·Õ„«Ì… «·—∆Ì”Ì… */}
////            <Route element={<PrivateRoute roles={['Employee', 'Maintenance', 'Admin']} />}>
////                <Route element={<Layout />}>
////                    <Route index element={<RoleBasedRedirect />} />
////                    <Route path="create-ticket" element={<CreateTickets />} />
////                    <Route path="my-tickets" element={<MyTickets />} />
////                    <Route path="ticket/:id" element={<TicketDetails />} />
////                    <Route path="maintenance" element={<AssignedTickets />} />
////                    <Route path="admin" element={<Dashboard />} />
////                    <Route path="admin/all-tickets" element={<AllTickets />} />
////                </Route>
////            </Route>
////        </Routes>
////    );
////};

//function App() {
//    return (
//        <Router>
//            <AuthProvider>
//                <AppRoutes />
//            </AuthProvider>
//        </Router>
//    );
//}

//export default App;













//import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { AuthProvider, useAuth } from './contexts/AuthContext';
//import Login from './pages/auth/Login';
//import CreateTickets from './pages/employee/CreateTickets';
//import MyTickets from './pages/employee/MyTickets';
//import AssignedTickets from './pages/maintenance/AssignedTickets';
//import TicketDetails from './pages/maintenance/TicketDetails';
//import AllTickets from './pages/admin/AllTickets';
//import Dashboard from './pages/admin/Dashboard';
//import Layout from './components/layout/Layout';




























//const PrivateRoute = ({ children, roles }) => {
//    const { user, loading } = useAuth();

//    if (loading) {
//        return <div className="loader">Loading...</div>;
//    }

//    if (!user) {
//        return <Navigate to="/login" />;
//    }

//    if (roles && !roles.includes(user.role)) {
//        return <Navigate to="/" />;
//    }

//    return children;
//};

//const AppRoutes = () => {
//    return (
//        <Routes>
//            <Route path="/login" element={<Login />} />
//            <Route path="/" element={<Layout />}>
//                <Route index element={
//                    <PrivateRoute roles={['Employee']}>
//                        <MyTickets />
//                    </PrivateRoute>
//                } />
//                <Route path="create-ticket" element={
//                    <PrivateRoute roles={['Employee']}>
//                        <CreateTickets />
//                    </PrivateRoute>
//                } />
//                <Route path="ticket/:id" element={
//                    <PrivateRoute roles={['Employee', 'Maintenance', 'Admin']}>
//                        <TicketDetails />
//                    </PrivateRoute>
//                } />
//                <Route path="maintenance" element={
//                    <PrivateRoute roles={['Maintenance', 'Admin']}>
//                        <AssignedTickets />
//                    </PrivateRoute>
//                } />
//                <Route path="admin" element={
//                    <PrivateRoute roles={['Admin']}>
//                        <Dashboard />
//                    </PrivateRoute>
//                } />
//                <Route path="admin/all-tickets" element={
//                    <PrivateRoute roles={['Admin']}>
//                        <AllTickets />
//                    </PrivateRoute>
//                } />
//            </Route>
//        </Routes>
//    );
//};

//function App() {
//    return (
//        <Router>
//            <AuthProvider>
//                <AppRoutes />
//            </AuthProvider>
//        </Router>
//    );
//}

//export default App;
























