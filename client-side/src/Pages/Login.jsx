import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import SocialLogin from '../Components/SocialLogin';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate();
    const access_token = localStorage.getItem('access-token');
    if(access_token){
        navigate('/')
    }
    const {register, handleSubmit, watch, formState: { errors }} = useForm();
    const [error,setError] = useState('');
    const {user,loginUser,loading,checkUserRole}= useAuth();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    
    const onSubmit = (e)=>{
        loginUser(e.email,e.password)
        .then(result=>{
            const loggedUser = result.user;
            if(loggedUser){
                Swal.fire({title:'User Logged In',icon:'success'})
                navigate(from,{replace:true})
            }
        })
        .catch(err=>console.log(err))
    }

    const [showPassoword,setShowPassword] = useState(false)

    const toggleVisibility = ()=>{
        setShowPassword(!showPassoword)
    }
    
    return (
        <>
            <Helmet>
            <title>Login</title>
        </Helmet>
        <div>
        <div className="card p-10 lg:w-2/4 mx-auto lg:pt-10">
            <div className="flex-col">
                
                <form onSubmit={handleSubmit(onSubmit)} className="shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <input type="text" placeholder="Email" {...register('email',{required: true,})} className="input input-bordered" />
                            {errors.email?.type === 'required' && <p role="alert">Email is required</p>}
                        </div>
                        <div className="form-control relative">
                            <input type={showPassoword?"text":"password" }placeholder="Password" {...register('password',{required: true,})} className="input input-bordered" />
                            <button type='button' className='btn absolute right-0' onClick={toggleVisibility}>
                            <i class={showPassoword?"fa-sharp fa-solid fa-eye-slash":"fa-solid fa-eye"}></i>
                            </button>
                            
                            {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
                            <label className="label">
                                Don't have an account? <Link to="/register" className="label-text-alt link link-hover">Register</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary rounded-none">Login</button>
                        </div>
                        <SocialLogin></SocialLogin>
                    </div>
                </form>
                
            </div>
        </div>
        </div>
        </>
    );
    
};

export default Login;