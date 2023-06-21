import React from 'react';
import { Link } from 'react-router-dom';
import { FaBeer,FaHome, FaHistory } from 'react-icons/fa';
import { MdOutlineClass } from 'react-icons/md';
const StudentOptions = () => {
    return (
        <div>
            <li><Link to="/dashboard/student"><FaHome></FaHome>Student Home</Link></li>
            <li><Link to='/dashboard/paymenthistory'><FaHistory></FaHistory> Payment History</Link></li>
            <li><Link to="/dashboard/myselectedclass"><MdOutlineClass></MdOutlineClass> My Selected Classes</Link></li>
            <li><Link to="/dashboard/myenrolledclass"><MdOutlineClass></MdOutlineClass> My Enrolled Classes</Link></li>
        </div>
    );
};

export default StudentOptions;