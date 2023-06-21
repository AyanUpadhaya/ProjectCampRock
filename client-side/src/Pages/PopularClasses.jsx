import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ClassCard from '../Components/ClassCard';

const PopularClasses = () => {
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
    const sortedClasses = allClasses.sort((a, b) => {
        return a.enrolledStudents.length - b.enrolledStudents.length;
      });
    const topSixClasses = sortedClasses.slice(0, 6);
    return (
        <div className='p-5 bg-base-100'>
            <h2 className='text-5xl font-bold text-center my-3'>Popular Classes</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {
                    topSixClasses.map(item=><ClassCard key={item._id} item={item}/>)
                }
            </div>
            
        </div>
    );
};

export default PopularClasses;