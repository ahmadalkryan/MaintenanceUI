//// src/App.js
//import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { AuthProvider } from './contexts/AuthContext';
//import NotificationDropdown from './components/NotificationDropDown';
//import Login from './pages/auth/Login';
//import CreateTicket from './pages/employee/CreateTickets';
//import TicketDashboard from './pages/admin/TicketDashboard';
////import { AuthProvider } from './contexts/AuthContext';
//import { NotificationProvider } from './contexts/NotificationContext';
////import TicketDetails from './pages/Maintenanc/TicketDetails';
////import './App.css';

//const RedirectToDashboard = () => {
//    const role = localStorage.getItem('role');

//    if (role === 'Employee') {
//        return <Navigate to="/create-ticket" replace />;
//    } else if (role === 'Maintenance') {
//        return <Navigate to="/tickets" replace />;
//    }

//    return <Navigate to="/unauthorized" replace />;
//};

//function App() {
//    return (
//        <AuthProvider>
//            <NotificationProvider>
//            <Router>
//                <div className="app-container">
//                    <header className="app-header">
//                        <div className="header-content">
//                            <h1>System Ticketing Maintenace </h1>
//                            <div className="header-actions">
//                                <NotificationDropdown />
//                            </div>
//                        </div>
//                    </header>

//                    <main className="app-main">
//                        <Routes>
//                            <Route path="/login" element={
//                                localStorage.getItem('authToken') ? (
//                                    <RedirectToDashboard />
//                                ) : (
//                                    <Login />
//                                )
//                            } />

//                            <Route path="/create-ticket" element={
//                                localStorage.getItem('role') === 'Employee' ? (
//                                    <CreateTicket />
//                                ) : (
//                                    <Navigate to="/login" replace />
//                                )
//                            } />

//                            <Route path="/tickets" element={
//                                localStorage.getItem('role') === 'Maintenance' ? (
//                                    <TicketDashboard />
//                                ) : (
//                                    <Navigate to="/login" replace />
//                                )
//                            } />

//                            <Route path="/" element={
//                                localStorage.getItem('authToken') ? (
//                                    <RedirectToDashboard />
//                                ) : (
//                                    <Navigate to="/login" replace />
//                                )
//                            } />

//                            <Route path="*" element={<Navigate to="/" replace />} />
//                        </Routes>
//                    </main>

//                    <footer className="app-footer">
//                        <p>© 2025 Maintenace Ticketing System All Rights saved. .</p>
//                    </footer>
//                </div>
//            </Router>
//            </NotificationProvider>
//        </AuthProvider>
//    );
//}

//export default App;
// src/App.jsx
// src/App.jsx

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import NotificationDropdown from './components/NotificationDropDown';
import Login from './pages/auth/Login';
import CreateTicket from './pages/employee/CreateTickets';
import TicketDashboard from './pages/admin/TicketDashboard';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './api/ProtectedRoute';
import Dashboard from './pages/admin/DashboardStatus';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import MaintenanceDashboard from './pages/maintenance/TicketTrace';
import AddTracePage from './pages/maintenance/AddTracePage';
import TicketTracesPage from './pages/maintenance/TicketTracesPage';
function App() {
    return (
        <AuthProvider>
            <NotificationProvider>
                <Router>
                    <div className="app-container">
                        <header className="app-header">
                            <div className="header-content">
                                <h1>System Ticketing Maintenance</h1>
                                <div className="header-actions">
                                    <NotificationDropdown />
                                </div>
                            </div>
                        </header>

                        <main className="app-main">
                            <Routes>
                                {/* صفحة تسجيل الدخول */}
                                <Route path="/login" element={
                                    <Login />
                                } />
                                 Employee Routes 
                                {/*<Route path="/employee-dashboard" element={*/}
                                {/*    <ProtectedRoute allowedRoles={['Employee']}>*/}
                                {/*        <EmployeeDashboard />*/}
                                {/*    </ProtectedRoute>*/}
                                {/*} />*/}


                                 إنشاء تذكرة - للموظفين فقط 
                                {/*<Route path="/create-ticket" element={*/}
                                {/*    <ProtectedRoute allowedRoles={['Employee']}>*/}
                                {/*        <CreateTicket />*/}
                                {/*    </ProtectedRoute>*/}
                                {/*} />*/}

                                 لوحة التحكم - لمشرفي الصيانة فقط 
                                {/*<Route path="/tickets" element={*/}
                                {/*    <ProtectedRoute allowedRoles={['Maintenance']}>*/}
                                {/*        <MaintenanceDashboard />*/}
                                        
                                {/*    </ProtectedRoute>*/}
                                {/*} />*/}

                                {/*<Route path="/traces" element={*/}
                                {/*    <ProtectedRoute allowedRoles={['Maintenance']}>*/}
                                {/*        <TicketTracesPage />*/}

                                {/*    </ProtectedRoute>*/}
                                {/*} />*/}
                                {/*<Route path="/add-trace" element={*/}
                                {/*    <ProtectedRoute allowedRoles={['Maintenance']}>*/}
                                {/*        <AddTracePage />*/}

                                {/*    </ProtectedRoute>*/}
                                {/*} />*/}


                                <Route path="/dash" element={
                                    <ProtectedRoute allowedRoles={['Admin']}>
                                        <Dashboard />
                                    </ProtectedRoute>
                                } />
                                <Route path="/tdash" element={
                                    <ProtectedRoute allowedRoles={['Admin']}>
                                        <TicketDashboard />
                                    </ProtectedRoute>
                                } />
                               
                                 الصفحة الرئيسية - توجيه بسيط 
                                <Route path="/" element={
                                    <Navigate to="/login" replace />
                                } />

                                {/* أي مسار غير معروف */}
                                <Route path="*" element={<Navigate to="/login" replace />} />
                            </Routes>
                        </main>

                        <footer className="app-footer">
                            <p>© 2025 Maintenance Ticketing System. All Rights Reserved.</p>
                        </footer>
                    </div>
                </Router>
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App;







//import React from 'react'; هاد شغال 
//import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { AuthProvider } from './contexts/AuthContext';
//import NotificationDropdown from './components/NotificationDropDown';
//import Login from './pages/auth/Login';
//import CreateTicket from './pages/employee/CreateTickets';
//import TicketDashboard from './pages/admin/TicketDashboard';
//import { NotificationProvider } from './contexts/NotificationContext';
//import ProtectedRoute from './api/ProtectedRoute';
//import RedirectToDashboard from './api/RedirectToDashboard';

//function App() {
//    return (
//        <AuthProvider>
//            <NotificationProvider>
//                <Router>
//                    <div className="app-container">
//                        <header className="app-header">
//                            <div className="header-content">
//                                <h1>System Ticketing Maintenance</h1>
//                                <div className="header-actions">
//                                    <NotificationDropdown />
//                                </div>
//                            </div>
//                        </header>

//                        <main className="app-main">
//                            <Routes>
//                                {/* صفحة تسجيل الدخول */}
//                                <Route path="/login" element={
//                                    <Login />
//                                } />

//                                {/* إنشاء تذكرة - للموظفين فقط */}
//                                <Route path="/create-ticket" element={
//                                    <ProtectedRoute allowedRoles={['Employee']}>
//                                        <CreateTicket />
//                                    </ProtectedRoute>
//                                } />

//                                {/* لوحة التحكم - لمشرفي الصيانة فقط */}
//                                <Route path="/tickets" element={
//                                    <ProtectedRoute allowedRoles={['Maintenance']}>
//                                        <TicketDashboard />
//                                    </ProtectedRoute>
//                                } />

//                                {/* الصفحة الرئيسية */}
//                                <Route path="/" element={
//                                    <RedirectToDashboard />
//                                } />

//                                {/* أي مسار غير معروف */}
//                                <Route path="*" element={<Navigate to="/" replace />} />
//                            </Routes>
//                        </main>

//                        <footer className="app-footer">
//                            <p>© 2025 Maintenance Ticketing System. All Rights Reserved.</p>
//                        </footer>
//                    </div>
//                </Router>
//            </NotificationProvider>
//        </AuthProvider>
//    );
//}

//export default App;

// في ملف التوجيه الرئيسي
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
        //        {/* مسارات أخرى... */}
        //    </Routes>
        //</Router>
//    );
//}







//import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { AuthProvider, useAuth } from './contexts/AuthContext';
//import Login from './pages/auth/Login';
//import CreateTickets from './pages/employee/CreateTickets';
////import Dashboard from './pages/Dashboard'; // صفحة مشرف الصيانة
//import TicketTracesPage from './pages/maintenance/TicketTracesPage';
////import Unauthorized from './pages/Unauthorized';
//import ProtectedRoute from './api/ProtectedRoute';

//// مكون لتوجيه المستخدم بعد تسجيل الدخول حسب الدور


//// ✅ مكون لتوجيه المستخدم بعد تسجيل الدخول
//const RedirectToDashboard = () => {
//    const token = localStorage.getItem('token');
//    const role = localStorage.getItem('role');

//    if (!token) {
//        return <Navigate to="/login" replace />;
//    }

//    if (role === 'Employee') {
//        return <Navigate to="/create-ticket" replace />;
//    } else if (role === 'Maintenance') {
//        return <Navigate to="/dashboard" replace />;
//    }

//    return <Navigate to="/unauthorized" replace />;
//};

//function App() {
//    return (
//        <AuthProvider> {/* ✅ Provider هنا */}
//            <Router>
//                <div className="app">
//                    <Routes>
//                        {/* تسجيل الدخول */}
//                        <Route path="/login" element={
//                            localStorage.getItem('token') ? (
//                                <RedirectToDashboard />
//                            ) : (
//                                <Login />
//                            )
//                        } />

//                        {/* إنشاء تذكرة - للموظفين فقط */}
//                        <Route path="/create-ticket" element={
//                            <ProtectedRoute allowedRoles={['Employee']}>
//                                <CreateTickets />
//                            </ProtectedRoute>
//                        } />

//                        {/* لوحة التحكم - لمشرف الصيانة فقط */}
//                        <Route path="/dashboard" element={
//                            <ProtectedRoute allowedRoles={['Maintenance']}>
//                                <TicketTracesPage />
//                            </ProtectedRoute>
//                        } />

//                        {/* غير مصرّح به */}
//                        <Route path="/unauthorized" element={<Unauthorized />} />

//                        {/* الصفحة الرئيسية */}
//                        <Route path="/" element={
//                            localStorage.getItem('token') ? (
//                                <RedirectToDashboard />
//                            ) : (
//                                <Navigate to="/login" replace />
//                            )
//                        } />

//                        {/* أي مسار غير معروف */}
//                        <Route path="*" element={<Navigate to="/" replace />} />
//                    </Routes>
//                </div>
//            </Router>
//        </AuthProvider>
//    );
//}

//export default App;
/****************** */

////import { NotificationProvider } from './contexts/NotificationContext';
//import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import { useContext } from 'react';

////all
//import Login from './pages/auth/Login';
////employee 
//import CreateTickets from './pages/employee/CreateTickets';
////Admin 
//import TicketDashboard from './pages/admin/TicketDashboard';
//import Dashboard from './pages/admin/DashboardStatus';
////maintenance
//import MaintenanceDashboard from './pages/maintenance/TicketTrace';
//import AddTracePage from './pages/maintenance/AddTracePage';
//import TicketTracesPage from './pages/maintenance/TicketTracesPage';
//////import Home from './components/pages/home';
//////import './App.css';
//import { AuthProvider, AuthContext } from './contexts/AuthContext';
////import SignalRWrapper from '../src/contexts/SignalEWrapper';


//function AppRoutes() {
//    const { isAuthenticated } = useContext(AuthContext);

//    return (
//        <Routes>
//            all user 
//            <Route path="/login"
//                element={isAuthenticated ? <Login /> : <Navigate to="/create-ticket" replace />}
//            />

//            has role Employee
//            <Route path="/create-ticket"
//                element={isAuthenticated ? <CreateTickets /> : <Navigate to="/login" replace />}
//            />




//            {/*all user*/}
//            {/*<Route path="/login"*/}
//            {/*    element={isAuthenticated ? <Login /> : <Navigate to="/create-ticket" replace />}*/}
//            {/*/>*/}

//            {/*has role Employee*/}
//            {/*<Route path="/create-ticket"*/}
//            {/*    element={isAuthenticated ? <CreateTickets /> : <Navigate to="/login" replace />}*/}
//            {/*/>*/}


//            {/*has role Maintenance*/}
//            {/*<Route path="/maindashboard"*/}
//            {/*    element={isAuthenticated ? <MaintenanceDashboard /> : <Navigate to="/login" replace />}*/}
//            {/*/>*/}

//            {/*has role Admin*/}
//            {/*<Route path="/stausdash"*/}
//            {/*    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}*/}
//            {/*/>*/}
//            {/*has role Admin*/}
//            {/*<Route path="/dash"*/}
//            {/*    element={isAuthenticated ? < TicketDashboard /> : <Navigate to="/login" replace />}*/}
//            {/*/>*/}
//            {/*                      <Route path="/" element={<MaintenanceDashboard />} />*/}
//            {/*                   <Route path="/maintenance/new-ticket" element={<div>New Ticket Page</div>} />*/}
//            {/*                 <Route path="/maintenance/add-trace" element={<AddTracePage />} />*/}
//            {/*                <Route path="/maintenance/traces" element={<TicketTracesPage />} />*/}


//        </Routes>
//    );

//}
//function App() {
//    return (
//        <AuthProvider>
          
              
//            <BrowserRouter>
//                <AppRoutes />
//            </BrowserRouter> 

                
//        </AuthProvider>
//    );
//}

//export default App;
































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

//    // حالات النماذج
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

//    // بيانات التطبيق
//    const [categories, setCategories] = useState([]);
//    const [tickets, setTickets] = useState([]);

//    // تحميل فئات الأجهزة عند بدء التحميل
//    useEffect(() => {
//        if (token) {
//            fetchDeviceCategories();
//        }
//    }, [token]);

//    // تحميل فئات الأجهزة
//    const fetchDeviceCategories = async () => {
//        try {
//            setLoading(true);
//            const result = await getAllDeviceCategories();
//            setCategories(result.data || []);
//        } catch (error) {
//            setApiResponse(`خطأ: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // تسجيل الدخول
//    const handleLogin = async () => {
//        try {
//            setLoading(true);
//            const result = await login(loginForm.username, loginForm.password); 
//            console.log("done log in ", result);
//            localStorage.setItem('authToken', result.token);
//            setToken(result.token);
//            setApiResponse('تم تسجيل الدخول بنجاح!');

//            // جلب بيانات المستخدم الحالي
//            const user = await getCurrentUser();
//            setCurrentUser(user);
//        } catch (error) {
//            setApiResponse(`خطأ في تسجيل الدخول: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // تسجيل الخروج
//    const handleLogout = async () => {
//        try {
//            setLoading(true);
//            await logout();
//            localStorage.removeItem('authToken');
//            setToken('');
//            setCurrentUser(null);
//            setApiResponse('تم تسجيل الخروج بنجاح!');
//        } catch (error) {
//            setApiResponse(`خطأ في تسجيل الخروج: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // جلب جميع التذاكر
//    const fetchAllTickets = async () => {
//        try {
//            setLoading(true);
//            const result = await getAllTickets();
//            setTickets(result.data || []);
//            setApiResponse(`تم جلب ${result.data.length} تذاكر`);
//        } catch (error) {
//            setApiResponse(`خطأ: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // إنشاء تذكرة جديدة
//    const handleCreateTicket = async () => {
//        try {
//            setLoading(true);
//            const result = await createTicket(ticketForm);
//            setApiResponse(`تم إنشاء التذكرة بنجاح: ${JSON.stringify(result)}`);
//            fetchAllTickets();
//        } catch (error) {
//            setApiResponse(`خطأ: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // إضافة تتبع تذكرة
//    const handleAddTrace = async () => {
//        try {
//            setLoading(true);
//            const result = await addTicketTrace(traceForm);
//            setApiResponse(`تم إضافة التتبع بنجاح: ${JSON.stringify(result)}`);
//        } catch (error) {
//            setApiResponse(`خطأ: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // تصفية التذاكر
//    const handleFilterTickets = async () => {
//        try {
//            setLoading(true);
//            const result = await filterTickets(filterForm);
//            setTickets(result.data || []);
//            setApiResponse(`تم العثور على ${result.data.length} تذكرة`);
//        } catch (error) {
//            setApiResponse(`خطأ: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // تصفية التذاكر حسب التاريخ
//    const handleDateFilter = async () => {
//        try {
//            setLoading(true);
//            const result = await filterTicketsByDate(dateFilterForm);
//            setTickets(result.data || []);
//            setApiResponse(`تم العثور على ${result.data.length} تذكرة في هذا النطاق الزمني`);
//        } catch (error) {
//            setApiResponse(`خطأ: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    // الحصول على إحصائيات التذاكر
//    const fetchStatistics = async () => {
//        try {
//            setLoading(true);
//            const result = await getTicketStatistics();
//            setApiResponse(JSON.stringify(result.data, null, 2));
//        } catch (error) {
//            setApiResponse(`خطأ: ${error.message}`);
//        } finally {
//            setLoading(false);
//        }
//    };

//    return (
//        <div className="min-h-screen bg-gray-50">
//            {/* شريط التنقل */}
//            <nav className="bg-blue-600 text-white p-4">
//                <div className="container mx-auto flex flex-wrap justify-between items-center">
//                    <h1 className="text-xl font-bold">تطبيق تجريبي للـ API</h1>

//                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'login' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('login')}
//                        >
//                            تسجيل الدخول
//                        </button>
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'profile' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('profile')}
//                        >
//                            الملف الشخصي
//                        </button>
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'categories' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('categories')}
//                        >
//                            فئات الأجهزة
//                        </button>
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'tickets' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('tickets')}
//                        >
//                            التذاكر
//                        </button>
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'traces' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('traces')}
//                        >
//                            تتبع التذاكر
//                        </button>
//                        <button
//                            className={`px-3 py-1 rounded ${activeTab === 'statistics' ? 'bg-blue-800' : 'bg-blue-500'}`}
//                            onClick={() => setActiveTab('statistics')}
//                        >
//                            الإحصائيات
//                        </button>
//                    </div>

//                    {token && (
//                        <button
//                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mt-2 md:mt-0"
//                            onClick={handleLogout}
//                        >
//                            تسجيل الخروج
//                        </button>
//                    )}
//                </div>
//            </nav>

//            <div className="container mx-auto p-4">
//                {/* حالة التحميل */}
//                {loading && (
//                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
//                        <div className="bg-white p-6 rounded-lg shadow-lg">
//                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//                            <p className="mt-3 text-center">جاري التحميل...</p>
//                        </div>
//                    </div>
//                )}

//                {/* منطقة النتائج */}
//                <div className="bg-white p-4 rounded-lg shadow mb-6">
//                    <h2 className="text-lg font-semibold mb-2">نتيجة الاستدعاء:</h2>
//                    <pre className="bg-gray-100 p-3 rounded max-h-60 overflow-auto">
//                        {apiResponse || 'لم يتم تنفيذ أي استدعاء بعد'}
//                    </pre>
//                </div>

//                {/* محتوى الأقسام */}
//                <div className="bg-white p-6 rounded-lg shadow">
//                    {/* قسم تسجيل الدخول */}
//                    {activeTab === 'login' && (
//                        <div className="space-y-4">
//                            <h2 className="text-xl font-bold text-blue-600">تسجيل الدخول</h2>

//                            {token ? (
//                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
//                                    أنت مسجل دخول بالفعل
//                                </div>
//                            ) : (
//                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                    <div>
//                                        <label className="block mb-1">اسم المستخدم:</label>
//                                        <input
//                                            type="text"
//                                            className="w-full p-2 border rounded"
//                                            value={loginForm.username}
//                                            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
//                                        />
//                                    </div>
//                                    <div>
//                                        <label className="block mb-1">كلمة المرور:</label>
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
//                                            تسجيل الدخول
//                                        </button>
//                                    </div>
//                                </div>
//                            )}
//                        </div>
//                    )}

//                    {/* قسم الملف الشخصي */}
//                    {activeTab === 'profile' && (
//                        <div className="space-y-4">
//                            <h2 className="text-xl font-bold text-blue-600">الملف الشخصي</h2>

//                            {!token ? (
//                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                                    يرجى تسجيل الدخول أولاً
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
//                                                setApiResponse(`خطأ: ${error.message}`);
//                                            } finally {
//                                                setLoading(false);
//                                            }
//                                        }}
//                                    >
//                                        جلب بيانات المستخدم
//                                    </button>

//                                    {currentUser && (
//                                        <div className="border border-gray-200 rounded p-4">
//                                            <h3 className="font-semibold">بيانات المستخدم:</h3>
//                                            <p><strong>الاسم:</strong> {currentUser.name}</p>
//                                            <p><strong>البريد الإلكتروني:</strong> {currentUser.email}</p>
//                                            <p><strong>الدور:</strong> {currentUser.role}</p>
//                                        </div>
//                                    )}
//                                </div>
//                            )}
//                        </div>
//                    )}

//                    {/* قسم فئات الأجهزة */}
//                    {activeTab === 'categories' && (
//                        <div className="space-y-4">
//                            <h2 className="text-xl font-bold text-blue-600">فئات الأجهزة</h2>

//                            {!token ? (
//                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                                    يرجى تسجيل الدخول أولاً
//                                </div>
//                            ) : (
//                                <div>
//                                    <button
//                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
//                                        onClick={fetchDeviceCategories}
//                                    >
//                                        جلب جميع الفئات
//                                    </button>

//                                    {categories.length > 0 && (
//                                        <div className="overflow-x-auto">
//                                            <table className="min-w-full bg-white border border-gray-200">
//                                                <thead>
//                                                    <tr className="bg-gray-100">
//                                                        <th className="py-2 px-4 border-b">ID</th>
//                                                        <th className="py-2 px-4 border-b">الاسم</th>
//                                                        <th className="py-2 px-4 border-b">الوصف</th>
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

//                    {/* قسم التذاكر */}
//                    {activeTab === 'tickets' && (
//                        <div className="space-y-6">
//                            <h2 className="text-xl font-bold text-blue-600">إدارة التذاكر</h2>

//                            {!token ? (
//                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                                    يرجى تسجيل الدخول أولاً
//                                </div>
//                            ) : (
//                                <>
//                                    {/* إنشاء تذكرة جديدة */}
//                                    <div className="border border-gray-200 rounded p-4">
//                                        <h3 className="font-semibold mb-3">إنشاء تذكرة جديدة</h3>
//                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                            <div>
//                                                <label className="block mb-1">وصف المشكلة:</label>
//                                                <textarea
//                                                    className="w-full p-2 border rounded"
//                                                    value={ticketForm.description}
//                                                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
//                                                />
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1">فئة الجهاز:</label>
//                                                <select
//                                                    className="w-full p-2 border rounded"
//                                                    value={ticketForm.deviceCategoryId}
//                                                    onChange={(e) => setTicketForm({ ...ticketForm, deviceCategoryId: e.target.value })}
//                                                >
//                                                    <option value="">اختر فئة</option>
//                                                    {categories.map(category => (
//                                                        <option key={category.id} value={category.id}>
//                                                            {category.name}
//                                                        </option>
//                                                    ))}
//                                                </select>
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1">معرف الجهاز (اختياري):</label>
//                                                <input
//                                                    type="text"
//                                                    className="w-full p-2 border rounded"
//                                                    value={ticketForm.deviceId}
//                                                    onChange={(e) => setTicketForm({ ...ticketForm, deviceId: e.target.value })}
//                                                />
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1">المرفق (اختياري):</label>
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
//                                                    إنشاء تذكرة
//                                                </button>
//                                            </div>
//                                        </div>
//                                    </div>

//                                    {/* تصفية التذاكر */}
//                                    <div className="border border-gray-200 rounded p-4">
//                                        <h3 className="font-semibold mb-3">تصفية التذاكر</h3>
//                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                            <div>
//                                                <label className="block mb-1">رقم التذكرة:</label>
//                                                <input
//                                                    type="text"
//                                                    className="w-full p-2 border rounded"
//                                                    value={filterForm.TicketNumber}
//                                                    onChange={(e) => setFilterForm({ ...filterForm, TicketNumber: e.target.value })}
//                                                />
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1">تاريخ الإنشاء:</label>
//                                                <input
//                                                    type="date"
//                                                    className="w-full p-2 border rounded"
//                                                    value={filterForm.CreatedDate}
//                                                    onChange={(e) => setFilterForm({ ...filterForm, CreatedDate: e.target.value })}
//                                                />
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1">فئة الجهاز:</label>
//                                                <select
//                                                    className="w-full p-2 border rounded"
//                                                    value={filterForm.DeciveCategoryId}
//                                                    onChange={(e) => setFilterForm({ ...filterForm, DeciveCategoryId: e.target.value })}
//                                                >
//                                                    <option value="">اختر فئة</option>
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
//                                                    تصفية التذاكر
//                                                </button>
//                                            </div>
//                                        </div>
//                                    </div>

//                                    {/* تصفية حسب التاريخ */}
//                                    <div className="border border-gray-200 rounded p-4">
//                                        <h3 className="font-semibold mb-3">تصفية حسب التاريخ</h3>
//                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                            <div>
//                                                <label className="block mb-1">تاريخ البداية:</label>
//                                                <input
//                                                    type="date"
//                                                    className="w-full p-2 border rounded"
//                                                    value={dateFilterForm.startDate}
//                                                    onChange={(e) => setDateFilterForm({ ...dateFilterForm, startDate: e.target.value })}
//                                                />
//                                            </div>
//                                            <div>
//                                                <label className="block mb-1">تاريخ النهاية:</label>
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
//                                                    تصفية حسب التاريخ
//                                                </button>
//                                            </div>
//                                        </div>
//                                    </div>

//                                    {/* جلب جميع التذاكر */}
//                                    <div className="flex justify-center">
//                                        <button
//                                            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//                                            onClick={fetchAllTickets}
//                                        >
//                                            جلب جميع التذاكر
//                                        </button>
//                                    </div>

//                                    {/* عرض التذاكر */}
//                                    {tickets.length > 0 && (
//                                        <div className="overflow-x-auto mt-4">
//                                            <table className="min-w-full bg-white border border-gray-200">
//                                                <thead>
//                                                    <tr className="bg-gray-100">
//                                                        <th className="py-2 px-4 border-b">رقم التذكرة</th>
//                                                        <th className="py-2 px-4 border-b">الوصف</th>
//                                                        <th className="py-2 px-4 border-b">الحالة</th>
//                                                        <th className="py-2 px-4 border-b">تاريخ الإنشاء</th>
//                                                        <th className="py-2 px-4 border-b">فئة الجهاز</th>
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

//                    {/* قسم تتبع التذاكر */}
//                    {activeTab === 'traces' && (
//                        <div className="space-y-4">
//                            <h2 className="text-xl font-bold text-blue-600">تتبع التذاكر</h2>

//                            {!token ? (
//                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                                    يرجى تسجيل الدخول أولاً
//                                </div>
//                            ) : (
//                                <div className="border border-gray-200 rounded p-4">
//                                    <h3 className="font-semibold mb-3">إضافة تتبع جديد</h3>
//                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                        <div>
//                                            <label className="block mb-1">معرف التذكرة:</label>
//                                            <input
//                                                type="number"
//                                                className="w-full p-2 border rounded"
//                                                value={traceForm.ticketId}
//                                                onChange={(e) => setTraceForm({ ...traceForm, ticketId: e.target.value })}
//                                            />
//                                        </div>
//                                        <div>
//                                            <label className="block mb-1">معرف الحالة:</label>
//                                            <select
//                                                className="w-full p-2 border rounded"
//                                                value={traceForm.statusId}
//                                                onChange={(e) => setTraceForm({ ...traceForm, statusId: e.target.value })}
//                                            >
//                                                <option value="">اختر الحالة</option>
//                                                <option value="1">جديدة</option>
//                                                <option value="2">قيد المعالجة</option>
//                                                <option value="3">مكتملة</option>
//                                                <option value="4">مرفوضة</option>
//                                            </select>
//                                        </div>
//                                        <div className="md:col-span-2">
//                                            <label className="block mb-1">ملاحظة:</label>
//                                            <textarea
//                                                className="w-full p-2 border rounded"
//                                                value={traceForm.note}
//                                                onChange={(e) => setTraceForm({ ...traceForm, note: e.target.value })}
//                                            />
//                                        </div>
//                                        <div>
//                                            <label className="block mb-1">معرف المستخدم:</label>
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
//                                                إضافة تتبع
//                                            </button>
//                                        </div>
//                                    </div>
//                                </div>
//                            )}
//                        </div>
//                    )}

//                    {/* قسم الإحصائيات */}
//                    {activeTab === 'statistics' && (
//                        <div className="space-y-4">
//                            <h2 className="text-xl font-bold text-blue-600">إحصائيات التذاكر</h2>

//                            {!token ? (
//                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//                                    يرجى تسجيل الدخول أولاً
//                                </div>
//                            ) : (
//                                <div>
//                                    <button
//                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
//                                        onClick={fetchStatistics}
//                                    >
//                                        جلب الإحصائيات
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
//import NotFound from './pages/NotFound'; // أضف هذا

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

//    // التحقق من أن المستخدم لديه أحد الأدوار المطلوبة
//    const hasRequiredRole = roles.some(role => hasPermission(role));

//    if (!hasRequiredRole) {
//        return <Navigate to="/unauthorized" replace />;
//    }

//    return children || <Outlet />;
//};

//const RoleBasedRedirect = () => {
//    const { user, loading } = useAuth();
//    console.log("RoleBasedRedirect - user:", user); // إضافة
//    console.log("RoleBasedRedirect - loading:", loading); // إضافة

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

//            {/* مسارات الموظفين */}
//            <Route element={<PrivateRoute roles={['Employee']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/my-tickets" element={<MyTickets />} />
//                    <Route path="/create-ticket" element={<CreateTickets />} />
//                    {/* إضافة مسار تفاصيل التذكرة للموظفين */}
//                    <Route path="/ticket/:id" element={<TicketDetails />} />
//                </Route>
//            </Route>

//            {/* مسارات الصيانة */}
//            <Route element={<PrivateRoute roles={['Maintenance']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/maintenance" element={<AssignedTickets />} />
//                    {/* إضافة مسار تفاصيل التذكرة لموظفي الصيانة */}
//                    <Route path="/ticket/:id" element={<TicketDetails />} />
//                </Route>
//            </Route>

//            {/* مسارات المدير */}
//            <Route element={<PrivateRoute roles={['Admin']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/admin" element={<Dashboard />} />
//                    <Route path="/admin/all-tickets" element={<AllTickets />} />
//                    {/* إضافة مسار تفاصيل التذكرة للمدراء */}
//                    <Route path="/ticket/:id" element={<TicketDetails />} />
//                </Route>
//            </Route>

//            {/* التوجيه التلقائي بناءً على الدور */}
//            <Route path="/" element={<RoleBasedRedirect />} />

//            {/* صفحة 404 */}
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
////import TicketDetails from './pages/employee/TicketDetails'; // تم التعديل هنا
//import Layout from './components/layout/Layout';
//import LoadingSpinner from './components/common/LoadingSpinner';
//import NotFound from './pages/NotFound';


//const PrivateRoute = ({ children, roles }) => {
//    const { user, loading } = useAuth();

//    if (loading) return <LoadingSpinner />;
//    if (!user) return <Navigate to="/login" replace />;

//    // تحقق من أن user.role موجود وفعّال
//    if (!user.role || !roles.includes(user.role)) {
//        return <Navigate to="/unauthorized" replace />;
//    }

//    return children;
//};

//const RoleBasedRedirect = () => {
//    const { user, loading } = useAuth();
//    console.log("RoleRedirect - user:", user); // مهم للتصحيح

//    if (loading) return <LoadingSpinner />;
//    if (!user) return <Navigate to="/login" replace />;

//    if (user.role === 'Employee') {
//        return <Navigate to="/create-ticket" replace />;
//    }

//    // توجيه الأدوار الأخرى إلى مساراتهم الخاصة
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

//            {/* مسارات الموظفين فقط */}
//            <Route element={
//                <PrivateRoute roles={['Employee']}>
//                    <Layout />
//                </PrivateRoute>
//            }>
//                <Route path="/my-tickets" element={<MyTickets />} />
//                <Route path="/create-ticket" element={<CreateTickets />} />
//                {/*<Route path="/ticket/:id" element={<TicketDetails />} />*/}
//            </Route>

//            {/* التوجيه التلقائي بناءً على الدور */}
//            <Route path="/" element={<RoleBasedRedirect />} />

//            {/* صفحة 404 */}
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
//                <p>جاري التحميل...</p>
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
//        <h2>غير مصرح بالوصول</h2>
//        <p>ليس لديك الصلاحيات اللازمة للوصول إلى هذه الصفحة.</p>
//        <button onClick={() => window.history.back()}>العودة</button>
//    </div>
//);

//const AppRoutes = () => {
//    return (
//        <Routes>
//            <Route path="/login" element={<Login />} />
//            <Route path="/unauthorized" element={<Unauthorized />} />

//            {/* مسارات الموظفين */}
//            <Route element={<PrivateRoute requiredRole="Employee" />}>
//                <Route element={<Layout />}>
//                    <Route path="/my-tickets" element={<MyTickets />} />
//                    <Route path="/create-ticket" element={<CreateTickets />} />
//                </Route>
//            </Route>

//            {/* مسارات الصيانة */}
//            <Route element={<PrivateRoute requiredRole="Maintenance" />}>
//                <Route element={<Layout />}>
//                    <Route path="/maintenance" element={<AssignedTickets />} />
//                </Route>
//            </Route>

//            {/* مسارات المدير */}
//            <Route element={<PrivateRoute requiredRole="Admin" />}>
//                <Route element={<Layout />}>
//                    <Route path="/admin" element={<Dashboard />} />
//                    <Route path="/admin/all-tickets" element={<AllTickets />} />
//                </Route>
//            </Route>

//            {/* مسار تفاصيل التذكرة متاح لجميع الأدوار */}
//            <Route element={<PrivateRoute requiredRole="Employee" />}>
//                <Route element={<Layout />}>
//                    <Route path="/ticket/:id" element={<TicketDetails />} />
//                </Route>
//            </Route>

//            {/* التوجيه التلقائي بناءً على الدور */}
//            <Route path="/" element={<RoleBasedRedirect />} />

//            {/* صفحة 404 */}
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

//// هيكل هرمي للأدوار (كل دور يحتوي على الأدوار الأدنى منه)
//const roleHierarchy = {
//    Admin: ['Admin', 'Maintenance', 'Employee'],
//    Maintenance: ['Maintenance', 'Employee'],
//    Employee: ['Employee']
//};

//const PrivateRoute = ({ children, roles }) => {
//    const { user, loading } = useAuth();

//    if (loading) {
//        return <div className="loader">جاري التحميل...</div>;
//    }

//    if (!user) {
//        return <Navigate to="/login" />;
//    }

//    // التحقق من الصلاحيات الهرمية
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

//    if (loading) return <div>جاري التحميل...</div>;
//    if (!user) return <Navigate to="/login" replace />;

//    // تحقق من الصلاحيات
//    if (!roles.includes(user.role)) {
//        return <Navigate to="/" replace />;
//    }

//    return <Outlet />;
//};
////const PrivateRoute = ({ children, roles }) => {
////    const { user, loading } = useAuth();

////    if (loading) {
////        return <div className="loader">جاري التحميل...</div>;
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

//            {/* مسارات الموظفين */}
//            <Route element={<PrivateRoute roles={['Employee']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/my-tickets" element={<MyTickets />} />
//                    <Route path="/create-ticket" element={<CreateTickets />} />
//                </Route>
//            </Route>

//            {/* مسارات الصيانة */}
//            <Route element={<PrivateRoute roles={['Maintenance']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/maintenance" element={<AssignedTickets />} />
//                </Route>
//            </Route>

//            {/* مسارات المدير */}
//            <Route element={<PrivateRoute roles={['Admin']} />}>
//                <Route element={<Layout />}>
//                    <Route path="/admin" element={<Dashboard />} />
//                    <Route path="/admin/all-tickets" element={<AllTickets />} />
//                </Route>
//            </Route>

//            {/* مسارات مشتركة لجميع المسجلين */}
//            <Route element={<PrivateRoute roles={['Employee', 'Maintenance', 'Admin']} />}>
//                <Route path="/ticket/:id" element={<TicketDetails />} />
//            </Route>

//            {/* التوجيه التلقائي */}
//            <Route path="/" element={<RoleBasedRedirect />} />
//        </Routes>
//    );
//};

////const AppRoutes = () => {
////    return (
////        <Routes>
////            <Route path="/login" element={<Login />} />

////            {/* طبقة الحماية الرئيسية */}
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
























