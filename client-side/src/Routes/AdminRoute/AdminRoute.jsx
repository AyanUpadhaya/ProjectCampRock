import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';
import { Navigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
const AdminRoute = ({children}) => {
    const {user,loading} = useAuth();
    const userRole = useUserRole(user?.email)
    const location = useLocation();
    if(loading){
        return <progress className="progress w-56"></progress>
    }
    if(user && userRole=='admin'){
        return children
    }
    return <Navigate to="/" state={{from: location,}}replace/>
      
};

export default AdminRoute;