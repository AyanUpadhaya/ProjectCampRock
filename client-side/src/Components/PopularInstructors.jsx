import React from 'react';
import { useEffect, useState } from 'react';

const PopularInstructors = () => {
    const [instructors,setInstructors] = useState([])
    useEffect(()=>{
        fetch('https://campserver.vercel.app/api/instructors')
        .then(res=>res.json())
        .then(data=>setInstructors(data))
    },[])
    return (
        <div className='bg-base-100 py-5'>
            <h1 className='text-5xl font-bold text-center my-3'>Popular Instructors</h1>
            <div className='m-5 grid grid-cols-1 lg:grid-cols-3 gap-3'>
                {
                    instructors.slice(0,6).map(it=><div key={it._id} className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img src={it.image} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">Name: {it.name}</h2>
                      {/* <p>Email: {it.email}</p> */}
                    </div>
                  </div>)
                }
            </div>

            
        </div>
    );
};

export default PopularInstructors;
