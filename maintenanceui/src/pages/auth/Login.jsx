
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext'; // ✅ استخدم useAuth
import './Login.css';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticated } = useAuth(); // ✅ استخدم useAuth
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await login(name, password);

            if (!response.Data?.Token) {
                throw new Error('Invalid response structure');
            }

            // ✅ حفظ جميع المعلومات المطلوبة
            localStorage.setItem('authToken', response.Data.Token);
            localStorage.setItem('userId', response.Data.userId);
            localStorage.setItem('role', response.Data.role);
            localStorage.setItem('userName', response.Data.FullName);

            setIsAuthenticated(true); // ✅ الآن هذه دالة


            if (response.Data.role == 'Admin') {
                navigate('/dash', { replace: true });
            }
            //// التوجيه حسب الدور
            
            //if (response.Data.role === 'Employee') {
            //    navigate('/employee-dashboard', { replace: true });
            //} else if (response.Data.role === 'Maintenance') {
            //    navigate('/tickets', { replace: true });

            //} else if (response.Data.role=='Admin') {
            //    navigate('/dash', { replace: true });
            //}
            
            

        } catch (err) {
            let errorMessage = 'Login failed. Please try again.';

            if (err.response) {
                errorMessage = err.response.data?.Message || errorMessage;
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);

            // تنظيف البيانات في حالة الفشل
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            setIsAuthenticated(false);

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Sign In</h2>
                    <p>Welcome back! Please enter your credentials</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">User Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            placeholder="Enter your password"
                            minLength={6}
                        />
                    </div>

                    {error && (
                        <div className="alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="remember-forgot">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Signing In...
                            </>
                        ) : 'Sign In'}
                    </button>

                    <div className="divider">
                        <span>or</span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="social-btn google">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 10.5c0 .83-.67 1.5-1.5 1.5H13v1.5h-2V14H9.5c-.83 0-1.5-.67-1.5-1.5v-3c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v3z" />
                            </svg>
                            Sign in with Google
                        </button>
                        <button type="button" className="social-btn microsoft">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M0 0v11.408h11.408V0H0zm12.594 0v11.408H24V0H12.594zM0 12.594V24h11.408V12.594H0zm12.594 0V24H24V12.594H12.594z" />
                            </svg>
                            Sign in with Microsoft
                        </button>
                    </div>

                    <div className="auth-links">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </div>
                </form>
            </div>

            <div className="auth-footer">
                <p>© 2025 Maintenance Tickets System. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Us</a>
                </div>
            </div>
        </div>
    );
};

export default Login;







// src/pages/Auth/Login.js
//import { useState, useContext, useEffect } from 'react';
//import { useNavigate, Link } from 'react-router-dom';
//import { login } from '../../api/auth';
//import { AuthContext } from '../../contexts/AuthContext';
//import './Login.css';

//const Login = () => {
//    const [name, setName] = useState('');
//    const [password, setPassword] = useState('');
//    const [error, setError] = useState('');
//    const [isLoading, setIsLoading] = useState(false);
//    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
//    const navigate = useNavigate();

//    useEffect(() => {
//        //if (isAuthenticated) {
//        //    navigate('/home', { replace: true });
//        //}
//    }, [isAuthenticated, navigate]);

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        setIsLoading(true);
//        setError('');

//        try {
//            const response = await login(name, password);
            
//            if (!response.Data?.Token) {
//                throw new Error('Invalid response structure');
//            }

//            localStorage.setItem('token', response.Data.Token);
//            setIsAuthenticated(true);
//        } catch (err) {
//            setError(err.response?.data?.Message || 'Login failed. Please try again.');
//            localStorage.removeItem('token');
//            setIsAuthenticated(false);
//        } finally {
//            setIsLoading(false);
//        }
//    };

//    return (
//        <div className="auth-container">
//            <div className="auth-card">
//                <div className="auth-header">
//                    <h2>Sign In</h2>
//                    <p>Welcome back! Please enter your credentials</p>
//                </div>

//                <form onSubmit={handleSubmit} className="auth-form">
//                    <div className="form-group">
//                        <label htmlFor="name">User Name</label>
//                        <input
//                            id="name"
//                            type="text"
//                            value={name}
//                            onChange={(e) => setName(e.target.value)}
//                            required
//                            disabled={isLoading}
//                            placeholder="Enter your name"
//                        />
//                    </div>
//                    <div className="form-group">
//                        <label htmlFor="password">Password</label>
//                        <input
//                            id="password"
//                            type="password"
//                            value={password}
//                            onChange={(e) => setPassword(e.target.value)}
//                            required
//                            disabled={isLoading}
//                            placeholder="Enter your password"
//                            minLength={6}
//                        />
//                    </div>

//                    {error && (
//                        <div className="alert-error">
//                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
//                            </svg>
//                            {error}
//                        </div>
//                    )}

//                    <div className="remember-forgot">
//                        <label className="remember-me">
//                            <input type="checkbox" />
//                            <span>Remember me</span>
//                        </label>
//                        <Link to="/forgot-password">Forgot password?</Link>
//                    </div>

//                    <button
//                        type="submit"
//                        className="btn-primary"
//                        disabled={isLoading}
//                    >
//                        {isLoading ? (
//                            <>
//                                <span className="spinner"></span>
//                                Signing In...
//                            </>
//                        ) : 'Sign In'}
//                    </button>

//                    <div className="divider">
//                        <span>or</span>
//                    </div>

//                    <div className="social-login">
//                        <button type="button" className="social-btn google">
//                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 10.5c0 .83-.67 1.5-1.5 1.5H13v1.5h-2V14H9.5c-.83 0-1.5-.67-1.5-1.5v-3c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v3z" />
//                            </svg>
//                            Sign in with Google
//                        </button>
//                        <button type="button" className="social-btn microsoft">
//                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                                <path d="M0 0v11.408h11.408V0H0zm12.594 0v11.408H24V0H12.594zM0 12.594V24h11.408V12.594H0zm12.594 0V24H24V12.594H12.594z" />
//                            </svg>
//                            Sign in with Microsoft
//                        </button>
//                    </div>

//                    <div className="auth-links">
//                        Don't have an account? <Link to="/register">Sign Up</Link>
//                    </div>
//                </form>
//            </div>

//            <div className="auth-footer">
//                <p>© 2025 Maintenance Tickets System. All rights reserved.</p>
//                <div className="footer-links">
//                    <a href="#">Privacy Policy</a>
//                    <a href="#">Terms of Service</a>
//                    <a href="#">Contact Us</a>
//                </div>
//            </div>
//        </div>
//    );
//};

//export default Login;














//import { useState, useContext, useEffect } from 'react';
//import { useNavigate, Link } from 'react-router-dom';
//import { login } from '../../api/auth';
//import { AuthContext } from '../../contexts/AuthContext';
//import './Login.css';

//const Login = () => {
//    const [name, setName] = useState('');
//    const [password, setPassword] = useState('');
//    const [error, setError] = useState('');
//    const [isLoading, setIsLoading] = useState(false);
//    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
//    const navigate = useNavigate();

//    // Monitor authentication changes
//    useEffect(() => {
//        console.log('isAuthenticated changed to:', isAuthenticated);
//        if (isAuthenticated) {
//            console.log('Redirecting to /home...');
//            //navigate('/home', { replace: true });
//        }
//    }, [isAuthenticated, navigate]);

//    const handleSubmit = async (e) => {
//        e.preventDefault();
//        setIsLoading(true);
//        setError('');

//        try {
//            console.log('Attempting login...'); // Debug
//            //  const response = await api.post('/Auth/Login', { email, password });
//            const response = await login(name, password);
//            if (!response.Data?.Token) {
//                throw new Error('Invalid response structure');
//            }

//            console.log('Login successful, storing token'); // Debug
//            localStorage.setItem('token', response.Data.Token);
//            setIsAuthenticated(true);

//        } catch (err) {
//            console.error('Login error:', err); // Debug
//            setError(err.response?.data?.Message || 'Login failed. Please try again.');
//            localStorage.removeItem('token');
//            setIsAuthenticated(false);
//        } finally {
//            setIsLoading(false);
//        }
//    };



//    return (
//        <div className="auth-container">
//            <div className="auth-card">
//                <h2>Sign In</h2>
//                <form onSubmit={handleSubmit} className="auth-form">
//                    <div className="form-group">
//                        <label htmlFor="name">User Name</label>
//                        <input
//                            id="name"
//                            type="text"
//                            value={name}
//                            onChange={(e) => setName(e.target.value)}
//                            required
//                            disabled={isLoading}
//                            placeholder="Enter your name"
//                        />
//                    </div>
//                    <div className="form-group">
//                        <label htmlFor="password">Password</label>
//                        <input
//                            id="password"
//                            type="password"
//                            value={password}
//                            onChange={(e) => setPassword(e.target.value)}
//                            required
//                            disabled={isLoading}
//                            placeholder="Enter your password"
//                            minLength={6}
//                        />
//                    </div>
//                    {error && (
//                        <div className="alert-error">
//                            {error}
//                        </div>
//                    )}

//                    <button
//                        type="submit"
//                        className="btn-primary"
//                        disabled={isLoading}
//                    >
//                        {isLoading ? (
//                            <>
//                                <span className="spinner"></span>
//                                Signing In...
//                            </>
//                        ) : 'Sign In'}
//                    </button>

//                    <div className="auth-links">
//                        <Link to="/forgot-password">Forgot password?</Link>
//                        <span className="divider">|</span>
//                        <Link to="/register">Create account</Link>
//                    </div>
//                    {error && (
//                        <div className="alert alert-error">
//                            {error}
//                        </div>
//                    )}

//                </form>
//            </div>
//        </div>
//    );
//};

//export default Login;
















































































































































