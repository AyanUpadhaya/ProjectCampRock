import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ClassCard from '../Components/ClassCard';

const Allclasses = () => {
    const [allClasses,setAllClasses]=useState([])

    useEffect(()=>{
        const fetchAllClasses = async()=>{
            const res = await axios.get('https://campserver.vercel.app/api/classes')
            const classData = res.data
            setAllClasses(classData.filter(c=>{
               return c.status!=="denied" && c.status!=="pending"}))
        }
        fetchAllClasses();
    },[])
    return (
        <div className='p-5 bg-slate-600'>
            <Helmet>
                <title>Classes</title>
            </Helmet>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    allClasses.map(item=><ClassCard key={item._id} item={item}/>)
                }
            </div>
            
        </div>
    );
};

export default Allclasses;