import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { Fade,Flip } from "react-awesome-reveal";
const InstructorDashBoard = () => {
    const {user,loading} = useAuth();
    const [totalClasses,setTotalClasses] = useState([])
    const [totalStudents,setTotalStudents] = useState([])
    const [paymentHistory,setPaymentHistory] = useState([])
    const [axiosSecure] = useAxios();

    useEffect(()=>{
        const fetchTotalClass =async()=>{
            const res = await axiosSecure.get(`/api/instructor/classes?email=${user.email}`)
            const data = res.data
            setTotalClasses(data)
        }
        const fetchTotalStudents =async()=>{
            const res = await axiosSecure.get(`/api/instructor/classes?email=${user.email}`)
            const data = res.data
            setTotalStudents(data)
        }
      
        fetchTotalClass();
        fetchTotalStudents();
    },[user.email])
    return (
        <div className='p-5'>
            <h2 className='text-3xl font-semibold'>Welcome {user?.displayName}</h2>
            <div className='m-5 w-3/4 flex justify-between gap-3'>
                <Fade>
                <Flip>
                    <div className='text-3xl font-bold bg-slate-800 text-white p-10'>
                        Created Class: {totalClasses.length} 
                    </div>
                </Flip>
                <Flip>
                <div className='text-3xl font-bold bg-slate-800 text-white p-10'>
                   Total Students: {totalStudents.reduce((sum,item)=>sum+parseInt(item.enrolledStudents),0)} 
                </div>
                </Flip>

                </Fade>
            </div>
        </div>
    );
};

export default InstructorDashBoard;