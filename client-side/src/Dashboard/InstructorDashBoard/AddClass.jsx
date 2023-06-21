import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2'
import useAxios from '../../Hooks/useAxios';

//TODO: LATER USE AXIOS SECURE WHEN POST DATA
const AddClass = () => {
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
    const {user} = useAuth();
    const [axiosSecure] = useAxios()
   

  const onSubmit = (data) => {
    const myNewClass = data;
    const postData =async()=>{
      try{
        const res = await axiosSecure.post('https://campserver.vercel.app/api/classes',myNewClass)
        const data = res.data
        if(data.insertedId){
          Swal.fire({title:'Classe added',icon:'success'})
          reset();
        }
      }catch(error){
        Swal.fire('oops! something went wrong')
      }
    }
    postData();
  }

  return (
    <>

    <div className="card lg:w-full p-10 my-3 mx-auto lg:mt-3">
    <div className='my-3 bg-base-100 p-10'>
        <h2 className='text-4xl font-semibold'>Create New Class</h2>
    </div>
      <form onSubmit={handleSubmit(onSubmit)} className='shadow-2xl bg-base-100 p-10'>
        <div className='form-control'>
          <label htmlFor="className">Class Name</label>
          <input
            type="text"
            className='input input-bordered'
            {...register('className')}
            placeholder='Add Class Name'
          />
        </div>

        <div className='form-control'>
          <label htmlFor="classImage">Class Image</label>
          <input
            type="text"
            className='input input-bordered'
            {...register('classImage')}
            placeholder='Class Photo url'
            
          />
        </div>
        <div className='form-control'>
          <label htmlFor="classImage">Instructor</label>
          <input
            type="text"
            className='input input-bordered'
            {...register('instructorName')}
            value={user.displayName}
          />
        </div>
        <div className='form-control'>
          <label htmlFor="classImage">Instructor Email</label>
          <input
            type="text"
            className='input input-bordered'
            {...register('instructorEmail')}
            value={user.email}
          />
        </div>

        <div className='form-control'>
          <label htmlFor="availableSeats">Available Seats</label>
          <input
            type="number"
            className='input input-bordered'
            {...register('availableSeats')}
          />
        </div>

        <div className='form-control'>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className='input input-bordered mb-3'
            {...register('price')}
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-none">
          Add
        </button>
      </form>
    </div>
    </>
  );
};

export default AddClass;