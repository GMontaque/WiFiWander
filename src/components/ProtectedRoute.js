import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../components/CurrentUserContext';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
    const currentUser = useCurrentUser();

    if (currentUser === null) {
        return <Loader />;
    }

    if (!currentUser) {
        return <Navigate to="/signin" />;
    }

    return children;
};

export default ProtectedRoute;
