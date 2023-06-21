import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import StudentOptions from './StudentOptions';
import AdminOptions from './AdminOptions';
import InstructorOptions from './InstructorOptions';
import { FaHome,FaBook } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';

const Dashboard = () => {
    const {user,loading} = useAuth();
    if(loading){
        return <div>Loading...</div>
    }
    const userRole = useUserRole(user.email)

    

    const renderDashboard = ()=>{
        switch (userRole){
            case 'student':
                return <StudentOptions/>
            case 'admin':
                return <AdminOptions/>
            case 'instructor':
                return <InstructorOptions/>
        }

    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-slate-600 text-white">
                <div htmlFor="my-drawer-2" className="font-bold text-center py-3 border-b-orange-50">
                    <span className='text-3xl italic'>CAMP ROCK</span>
                </div>
                <ul className="menu p-4 w-80 h-full text-white bg-slate-600">
                    {renderDashboard()}
                    <li className='divder'></li>
                    <li><Link to="/"><FaHome></FaHome> Home</Link></li>
                    <li><Link to="/dashboard/about"><FaBook></FaBook>About</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;