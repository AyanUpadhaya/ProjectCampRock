import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2'
import { Helmet} from 'react-helmet-async';


const Registration = () => {
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm();
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [disabled,setDisbaled] = useState(true)
    const {createUser,updateUserProfile} = useAuth()
    const navigate = useNavigate()
    

    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
        setDisbaled(e.target.value!==confirmPassword)
    }
    const handlePasswordConfirmChange = (e)=>{
        setConfirmPassword(e.target.value)
        setDisbaled(e.target.value!==password)
    }
    const onSubmit = data => {
        createUser(data.email,data.password)
        .then(result=>{
            const loggedUser = result.user;
            updateUserProfile(data.name,data.photoURL)
            .then(()=>{
                const saveUser = {name:data.name,email:data.email,image:data.photoURL,role:'student'}

                fetch('https://campserver.vercel.app/api/users',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json',
                    },
                    body:JSON.stringify(saveUser)
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.insertedId){
                        reset()
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User has been created',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          navigate('/')
                    }
                })
                
            })
            .catch(error=> console.log(error))
        })
        .catch(err=>console.log(err))

    }
    return (
        <>
        <Helmet>
            <title>Registration</title>
        </Helmet>
        <div className="card p-10 lg:w-2/4 mx-auto lg:mt-3">
            <div className="flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <input type="text" placeholder="Name" {...register('name')} className="input input-bordered" />
                            
                        </div>  
                        <div className="form-control">
                            <input type="text" placeholder="email" {...register('email')} className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <input type="text" placeholder="photo Url" {...register('photoURL')} className="input input-bordered" />
                        </div>
                        
                        <div className="form-control">
                            <input type="password" placeholder="password" value={password} {...register('password',{
                                required: 'Password is required',
                                minLength:{
                                    value:6,
                                    message:'Password should be at least 6 characters long',
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
                                    message:
                                      'Password should have at least one capital letter and one special character',
                                },
                            })} onChange={(e)=>handlePasswordChange(e)} className="input input-bordered" />
                            {errors.password && <p>{errors.password.message}</p>}
                        </div>
                        <div className="form-control">
                            <input type="password" placeholder="Confirm Password" {...register('confirmPassword')} onChange={(e)=>handlePasswordConfirmChange(e)} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                Already have an account?<Link to="/login" className="label-text-alt link link-hover">Login Now</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary" disabled={disabled}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default Registration;