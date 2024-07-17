import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { replace: true, state: { from: location } });
        }
    }, [isLoggedIn, navigate, location]);

    return isLoggedIn ? element : null;
};

export default ProtectedRoute;
