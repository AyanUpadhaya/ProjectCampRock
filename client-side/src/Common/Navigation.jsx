import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import logo from './../assets/images/logo/logo2.png'
import useUserRole from '../Hooks/useUserRole';
import DarkModeToggler from '../Components/DarkMode';


const Navigation = () => {
    const { user, logOut } = useAuth()
    const userRole = useUserRole(user?.email);
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login')
                localStorage.removeItem('user-role')
            })
            .catch(err => console.log(err))
    }
    const navigation = <>
        <li className='my-auto'><DarkModeToggler></DarkModeToggler></li>
        <li><Link to="/" className='font-semibold'>Home</Link></li>
        <li><Link to="/allinstructors" className='font-semibold'>Instructors</Link></li>
        <li><Link to="/allclasses" className='font-semibold'>Classes</Link></li>
        {user && <li><Link to="/myprofile" className='font-semibold'>{user?.displayName}</Link></li>}
        {user && userRole == 'admin' && <li><Link to="/dashboard/admin" className='font-semibold'>Dashboard</Link></li>}
        {user && userRole == 'instructor' && <li><Link to="/dashboard/instructor" className='font-semibold'>Dashboard</Link></li>}
        {user && userRole == 'student' && <li><Link to="/dashboard/student" className='font-semibold'>Dashboard</Link></li>}

    </>
    return (
        <div className="navbar bg-base-100 sticky">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navigation}
                    </ul>
                </div>
                <div className='flex items-center'>
                    <Link to="/" className="btn btn-ghost normal-case text-xl">
                        <img src={logo} alt="" style={{ width: '200px', height: '60px', display: 'block' }} className='m-0 p-0' />
                    </Link>
                    <div>
                        {user && 
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </label>
                        }
                    </div>
                </div>
            </div>
            <div className="navbar-end flex">
                <ul className="menu menu-horizontal px-1 hidden lg:flex">
                    {navigation}
                </ul>
                <div className="">
                    {
                        user ? <button onClick={handleLogOut} className="btn btn-secondary rounded-none">Logout</button> : <Link to="/login" className="btn btn-secondary rounded-none">Login</Link>
                    }
                </div>
            </div>

        </div>
    );
};

export default Navigation;