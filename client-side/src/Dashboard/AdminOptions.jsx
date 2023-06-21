import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdminPanelSettings,MdClass } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
const AdminOptions = () => {
    return (
        <div>
            <li><Link to="/dashboard/admin"><MdAdminPanelSettings></MdAdminPanelSettings> Admin Home</Link></li>
            <li><Link to="/dashboard/manageclasses"><MdClass></MdClass>Manage Classes</Link></li>
            <li><Link to="/dashboard/allusers"><FaUsers></FaUsers>Manage Users</Link></li>

        </div>
    );
};

export default AdminOptions;