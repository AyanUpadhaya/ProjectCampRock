import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const axiosSecure = axios.create({baseURL:'https://campserver.vercel.app'})

const useAxios = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate()
    // const axiosSecure = axios.create({baseURL:'https://campserver.vercel.app'})

    useEffect(()=>{
        axiosSecure.interceptors.request.use((config)=>{
            const token = localStorage.getItem('access-token');
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })

        axiosSecure.interceptors.response.use(response=>response,async(error)=>{
            if (error.response && (error.response.status === 401 || error.response.status === 403)){
                await logOut()
                navigate('/login')

            }
        })
    },[logOut,navigate,axiosSecure])

    return [axiosSecure]
};

export default useAxios;