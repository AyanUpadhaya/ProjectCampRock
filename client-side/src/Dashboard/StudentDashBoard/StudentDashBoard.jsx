import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { Fade,Flip } from "react-awesome-reveal";
const StudentDashBoard = () => {
    const {user,loading} = useAuth();
    const [enrolledClasses,setEnrolledClasses] = useState([])
    const [paymentHistory,setPaymentHistory] = useState([])
    const [addedClass,setAddedClass] = useState([])
    const [axiosSecure] = useAxios();
    useEffect(()=>{
        const fetchEnrolledClass =async()=>{
            const res = await axiosSecure.get(`/api/payments/${user?.email}`);
            const payments = res.data;
            setEnrolledClasses(payments)
        }
        const fetchPaymentHistory =async()=>{
            const res = await axiosSecure.get(`/api/payments/${user?.email}`);
            const payments = res.data;
            setPaymentHistory(payments)
        }
        const fetchAddedClass = async()=>{
            const res = await axiosSecure.get(`/api/studentclass?email=${user?.email}`)
            setAddedClass(res.data)
        }
        fetchEnrolledClass();
        fetchPaymentHistory();
        fetchAddedClass();
    },[user.email])
    return (
        <div className='p-5'>
            <h2 className='text-3xl font-semibold'>Welcome {user?.displayName}</h2>
            <div className='m-5 w-3/4 flex justify-between gap-3'>
                <Fade>
                <Flip>
                    <div className='text-3xl font-bold bg-slate-800 text-white p-10'>
                        Enrolled: {enrolledClasses.length} 
                    </div>
                </Flip>
                <Flip>
                <div className='text-3xl font-bold bg-slate-800 text-white p-10'>
                   Paid: {paymentHistory.reduce((sum,item)=>sum+parseInt(item.price),0)} $
                </div>
                </Flip>
                <Flip>
                <div className='text-3xl font-bold bg-slate-800 text-white p-10'>
                    Added: {addedClass.length}
                </div>
                </Flip>
                </Fade>
            </div>
        </div>
    );
};

export default StudentDashBoard;