import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { Navigate,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxios from '../Hooks/useAxios';

const Profile = () => {
    const { user, loading,updateUserProfile } = useAuth();
    const userRole = useUserRole(user?.email);
    const navigate = useNavigate();
    const [axiosSecure] = useAxios();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photoURL.value;

        updateUserProfile(name,photo)
        .then(()=>{})
        .catch(error=>console.log(error))
        const res = await axiosSecure.put(`/api/users/profile/${user.email}`,{name,photo})
        if(res.data.modifiedCount>0){
            Swal.fire({title:'Updated!',icon:'success'})
            navigate('/myprofile')
        }

    };

    return (
        <div className="hero min-h-screen bg-slate-600 text-white">
            <div className="hero-content flex-col lg:flex-row">
                <div className='flex  space-x-5'>
                    <img src={user?.photoURL} className="max-w-sm rounded-lg shadow-2xl w-2/4" />
                    <div>
                        <h1 className="text-5xl font-bold">{user?.displayName}</h1>
                        <button className="btn btn-primary mt-5">
                            {userRole}
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold m-5">Update Profile</h2>
                    <form onSubmit={handleSubmit} className="w-full p-5 shadow-2xl bg-base-100 text-black">
                        
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name'  className="input input-bordered" defaultValue={user.displayName} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="text" name='photoURL' className="input input-bordered" defaultValue={user.photoURL} />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary rounded-none">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;