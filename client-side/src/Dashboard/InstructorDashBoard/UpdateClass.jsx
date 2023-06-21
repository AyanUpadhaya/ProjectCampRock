import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxios from '../../Hooks/useAxios';
const UpdateClass = () => {
    const loadedData = useLoaderData()
    const { loading, } = useAuth()
    const navigate = useNavigate()
    const [axiosSecure] = useAxios()

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { user } = useAuth();

    if (loading) {
        return <div>Loading....</div>
    }

    const onSubmit = async(data) => {
        const updateClass = {...data,_id:loadedData._id}
        const res = await axiosSecure.put(`https://campserver.vercel.app/api/classes`, updateClass)
        console.log(res)
        const modified = res.data.modifiedCount;
        if (modified > 0) {
            Swal.fire({ title: 'Class updated', icon: 'success' })
            navigate('/dashboard/myclasses')
        }
    }
    return (
        <div className="card lg:w-full p-10 my-3 mx-auto lg:mt-3">
            <div className='my-3 bg-base-100 p-10'>
                <h2 className='text-4xl font-semibold'>Update Class</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='shadow-2xl bg-base-100 p-10'>
                <div className='form-control'>
                    <label htmlFor="className">Class Name</label>
                    <input
                        type="text"
                        className='input input-bordered'
                        defaultValue={loadedData?.className}
                        {...register('className')}
                        placeholder='Add Class Name'
                    />
                </div>

                <div className='form-control'>
                    <label htmlFor="classImage">Class Image</label>
                    <input
                        type="text"
                        className='input input-bordered'
                        defaultValue={loadedData?.classImage}
                        {...register('classImage')}
                        placeholder='Class Photo url'

                    />
                </div>
                <div className='form-control'>
                    <label htmlFor="classImage">Instructor</label>
                    <input
                        type="text"
                        className='input input-bordered'
                        value={loadedData?.instructorName}
                        {...register('instructorName')}
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor="classImage">Instructor Email</label>
                    <input
                        type="text"
                        className='input input-bordered'
                        value={loadedData?.instructorEmail}
                        {...register('instructorEmail')}

                    />
                </div>

                <div className='form-control'>
                    <label htmlFor="availableSeats">Available Seats</label>
                    <input
                        type="number"
                        className='input input-bordered'
                        defaultValue={loadedData?.availableSeats}
                        {...register('availableSeats')}
                    />
                </div>

                <div className='form-control'>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className='input input-bordered mb-3'
                        defaultValue={loadedData?.price}
                        {...register('price')}
                    />
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-none">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateClass;