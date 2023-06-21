import React from 'react';
import { Link } from 'react-router-dom';
import { FaBeer,FaHome, FaHistory } from 'react-icons/fa';
import { MdOutlineClass } from 'react-icons/md';
const InstructorOptions = () => {
    return (
        <div>
            <li><Link to="/dashboard/instructor"><FaHome></FaHome>Instructor Home</Link></li>
            <li><Link to="/dashboard/addclass"><MdOutlineClass></MdOutlineClass>Add a Class</Link></li>
            <li><Link to="/dashboard/myclasses"><MdOutlineClass></MdOutlineClass>My Classes</Link></li>
        </div>
    );
};

export default InstructorOptions;