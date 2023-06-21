import { useQuery, } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async';
import { FaUserShield, FaChalkboardTeacher } from 'react-icons/fa';
import  axios  from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
//todo: check if update is working with axios secure
const Allusers = () => {
    const {loading}= useAuth();
    const [axiosSecure] = useAxios();
    if(loading){
        return <div>Loading....</div>
    }
    const accessToken = localStorage.getItem('access-token')
    const { data: users = [], refetch,} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure('/api/users')
            const data = res.data
            return data
        }
    });
    const handleRoleUpdate = async(email,role)=>{
        const res = await axiosSecure.put(`https://campserver.vercel.app/api/users/${email}`,{role})
        if(res.data.modifiedCount>0){
            Swal.fire(`Role has been updated to ${role}`,'success')
            refetch();
        }
    }
    return (
        <div className="w-full">
            <Helmet>
                <title>Camp Rock | All users</title>
            </Helmet>
            <h3 className="text-3xl font-semibold my-4">Total CampUsers: {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user?.role === 'admin' ?
                                    <button className="btn btn-secondary rounded-none  text-white" disabled={true}><FaUserShield></FaUserShield></button> :
                                    <button onClick={() => handleRoleUpdate(user?.email,'admin')} className="btn btn-secondary rounded-none  text-white"><FaUserShield></FaUserShield></button> 
                                    }
                
                                    {user?.role === 'instructor' ?
                                        <button className="btn btn-ghost bg-slate-600 rounded-none  text-white" disabled={true}><FaChalkboardTeacher></FaChalkboardTeacher></button>
                                        : <button onClick={() => handleRoleUpdate(user?.email,'instructor')} className="btn btn-ghost bg-slate-600 rounded-none  text-white"><FaChalkboardTeacher></FaChalkboardTeacher></button>}
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allusers;