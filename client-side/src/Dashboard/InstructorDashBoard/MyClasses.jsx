import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useMyClasses from '../../Hooks/useMyClasses';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
//For instructors
const MyClasses = () => {
    const { user, loading } = useAuth()
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
    const [myClasses,setMyClasses] = useState()
    if (loading) {
        return <div>Loading...</div>
    }
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`https://campserver.vercel.app/api/instructor/classes?email=${user.email}`)
        .then(res=>res.json())
        .then(data=>setMyClasses(data))
    },[user])


    return (
        <div>
            <h2 className='text-3xl font-semibold text-center my-5'>My Total Classes: {myClasses?.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Instructor</th>
                            <th>Available</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myClasses?.filter(mc=>mc.instructorEmail==user.email)?.map((uc, index) => <tr key={uc._id}>
                            <th>{index + 1}</th>
                            <td>{uc.className}</td>
                            <td>{uc.instructorName}</td>
                            <td>{uc.availableSeats}</td>
                            <td>{uc.price}$</td>
                            <td className={uc.status == 'pending' ? 'text-red-800' : 'text-green-800'}>{uc.status}</td>
                            <td><button  className="btn btn-secondary rounded-none" onClick={()=>navigate(`/dashboard/updateclass/${uc._id}`)}>Update</button></td>
                            {<td>{uc.feedback}</td>}
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;