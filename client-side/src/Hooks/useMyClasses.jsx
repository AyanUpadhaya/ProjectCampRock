import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useMyClasses = () => {
    const {user} = useAuth()
    const [userClasses, setUserClasses] = useState([])
    useEffect(()=>{
        const fetchClasses = async() => {
            try{
                const res = await axios.get(`https://campserver.vercel.app/api/instructor/classes?email=${user.email}`)
                const data = res.data;
                setUserClasses(data)
                console.log(data)
            }catch(error){
                console.log('Error: ',error)
            }
        }
        fetchClasses();
    },[user])
    return userClasses
};

export default useMyClasses;