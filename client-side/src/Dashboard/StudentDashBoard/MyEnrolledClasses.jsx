import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';

const MyEnrolledClasses = () => {
    const [enrolledClasses,setEnrolledClasses] = useState([])
    const {user,loading} = useAuth();
    const [axiosSecure] = useAxios();

    

    useEffect(()=>{

        const fetchEnrolledClasses =async()=>{

            try {
                const res = await axiosSecure.get(`/api/payments/${user?.email}`);
                const payments = res.data;
            
                const classIds = payments.map((pm) => pm.classId);
            
                console.log(classIds);
            
                const respondedClass = await axiosSecure.get('/api/enrolled', {
                  params: { ids: classIds }, // Pass class IDs as query parameters
                });
                setEnrolledClasses(respondedClass.data);
              } catch (error) {
                console.error('Error fetching enrolled classes:', error);
              }
    }

    fetchEnrolledClasses();
    },[user.email])

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div className='p-5'>
            <h2 className='text-4xl font-bold'>My Enrolled Classes</h2>
            <h3 className='font-semibold my-3'>Student Name: {user?.displayName}</h3>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Instructor Email</th>
                            <th>Paid</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {enrolledClasses?.map((ec,id)=><tr key={ec._id}>
                        {/* ec = enrolled Classes */}
                            <td>{id+1}</td>
                            <td>{ec.className}</td>
                            <td>{ec.instructorName}</td>
                            <td>{ec.instructorEmail}</td>
                            <td>{ec.price}$</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEnrolledClasses;