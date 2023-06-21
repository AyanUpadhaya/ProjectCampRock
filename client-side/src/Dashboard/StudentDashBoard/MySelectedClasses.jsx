import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { useQueries, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

// The student will see all the Classes they booked after clicking the Select button. You must display the relevant information on the Class, Delete, and Pay buttons. More in point 9. On clicking the Delete button, a student can remove a selected Class from the list.

const MySelectedClasses = () => {
    const { user, loading } = useAuth()
    const [axiosSecure] = useAxios()
    if (loading) {
        return <div>Loading....</div>
    }

    const {data:selectedClass=[],refetch} = useQuery({
        queryKey:['selectedClass',user.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/api/studentclass?email=${user?.email}`)
            return res.data
        }
    })

    const handleDelete =async(id,storageId)=>{
        try{
            const res = await axiosSecure.delete(`/api/studentclass/${id}`)
            if(res.data.deletedCount>0){
                Swal.fire({title:'Deleted class',icon:'success'})
                refetch()
                const products = JSON.parse(localStorage.getItem('selectedClasses'))
                const updateProducts = products.filter(prod=>prod!==storageId)
                localStorage.setItem('selectedClasses',JSON.stringify(updateProducts))

            }
        }catch(error){
            Swal.fire({title:'Error',icon:'error'})
            console.log(error)
        }
    }
    const navigate = useNavigate()

    const handlePayment =(price,classId)=>{
        navigate('/dashboard/payment',{state:{price,classId}})
    }



    return (
        <div>
            <h2 className='text-3xl font-semibold'>My Selected Classes</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {selectedClass?.map((sc,id)=><tr key={sc._id}>
                        {/* sc = selected class */}
                            <td>{id+1}</td>
                            <td>{sc.className}</td>
                            <td>{sc.instructorName}</td>
                            <td>{sc.price}</td>
                            <td className='space-x-3'>
                                <button onClick={()=>handleDelete(sc._id,sc.classId)} className='btn-sm btn-primary'>Delete</button>
                                <button className='btn-sm btn-secondary' onClick={()=>handlePayment(sc.price,sc.classId)}>Pay</button>
                            </td>
                        </tr>)}
                        
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;