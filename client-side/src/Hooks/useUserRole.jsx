import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import axios from 'axios';

const useUserRole = (email) => {
    const [userRole, setUserRole] = useState('')
    const {user} = useAuth();
    useEffect(()=>{
        const fetchUser = async() => {
            try{
                const res = await axios.get(`https://campserver.vercel.app/api/users/${email}`)
                const role = res.data.role;
                setUserRole(role)
            
            }catch(error){
                console.log('Error: ',error)
            }
        }
        fetchUser();
    },[email])
    return userRole
};

export default useUserRole;