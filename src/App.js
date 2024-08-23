import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import PrivateRoute from './PrivateRoute';
import OtpInput from './pages/OtpInput';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check localStorage for authentication status
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/OtpInput" element={<OtpInput />} />
                <Route 
                    path="/home" 
                    element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Home />} />} 
                />
            </Routes>
        </Router>
    );
};

export default App;
