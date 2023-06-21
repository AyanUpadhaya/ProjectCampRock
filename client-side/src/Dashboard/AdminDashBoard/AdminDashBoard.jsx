import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { Fade,Flip } from "react-awesome-reveal";
const AdminDashBoard = () => {
    const {user,loading} = useAuth();
    const [paymentHistory,setPaymentHistory] = useState([])
    const [totalEnrolled,setTotalEnrolled] = useState([])
    const [users,setUsers] = useState([])
    const [axiosSecure] = useAxios();
    useEffect(()=>{
        const fetchPaymentHistory=async()=>{
            const res = await axiosSecure.get(`/payments`);
            const payments = res.data;
            setPaymentHistory(payments)
            setTotalEnrolled(payments)
        }
    
        const fetchAllUsers = async()=>{
            const res = await axiosSecure('/api/users')
            const data = res.data
            setUsers(data)
        }
        fetchPaymentHistory();
        fetchAllUsers();
    },[user.email])
    if(loading){
        return <div>Loading.....</div>
    }
    return (
        <div className='p-5'>
            <div className='p-3'>
            <h2 className='text-3xl font-semibold'>Welcome {user?.displayName}</h2>
            <div className='m-5 w-3/4 flex justify-between gap-3'>
                <Fade>
                <Flip>
                <div className='text-3xl font-bold bg-slate-800 text-white p-10'>
                   Revenue: {paymentHistory.reduce((sum,item)=>sum+parseInt(item.price),0)}$
                </div>
                </Flip>
                <Flip>
                    <div className='text-3xl font-bold bg-slate-800 text-white p-10'>
                        Enrolled: {totalEnrolled.length} 
                    </div>
                </Flip>
                <Flip>
                <div className='text-3xl font-bold bg-slate-800 text-white p-10'>
                    Total Users: {users.length}
                </div>
                </Flip>
                </Fade>
            </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;