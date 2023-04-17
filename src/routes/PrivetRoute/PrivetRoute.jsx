import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoute = ({ children }) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    
    if (loading) {
        return (
            <div className='h-screen -mt-10 md:-mt-20 flex items-center justify-center z-10'>
                <div className='w-8 h-8 border-4 border-blue-500 rounded-full border-dashed animate-spin'>
                </div>
            </div>
        )
    }
    
    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivetRoute;