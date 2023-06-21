import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import { MdRssFeed } from 'react-icons/md';
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
const ManageClasses = () => {
    const { loading } = useAuth();
    const [myFeedback,setMyFeedBack] = useState('')
    const [axiosSecure] = useAxios();

    const { data: classes, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axios.get('https://campserver.vercel.app/api/classes')
            const data = res.data;
            return data
        }
    })
    if (loading) {
        return <div>Loading...</div>
    }

    const handleStatusUpadate = async (id, status) => {

        try {
            const res = await axiosSecure.patch(`/api/classes?id=${id}&status=${status}`)
            const modified = res.data.modifiedCount

            if (modified > 0) {
                Swal.fire({ title: 'Status has been updated', icon: 'success' })
                refetch()
            }

            console.log(res)
        } catch (error) {
            Swal.fire({ title: 'OOPs something went wrong', icon: 'error' })
            console.log(error)
        }

    }
    const handleFeedBack = async (id, feedback) => {
        try {
            const res = await axiosSecure.patch(`/api/classes/feedback?id=${id}&feedback=${feedback}`)
            const modified = res.data.modifiedCount

            if (modified > 0) {
                Swal.fire({ title: 'Feedback has been sent', icon: 'success' })
                refetch()
            }

            console.log(res)
        } catch (error) {
            Swal.fire({ title: 'OOPs something went wrong', icon: 'error' })
            console.log(error)
        }
    }

    return (
        <div>
            <h2 className='text-3xl font-semibold text-center my-5'>Total Classes: {classes?.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>
                                Image
                            </th>
                            <th>Name</th>
                            <th>Instructor</th>
                            <th>Available</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {classes?.map((uc, index) => <tr key={uc._id}>
                            <th>{index + 1}</th>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={uc.classImage} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                            <td>{uc.className}..</td>
                            <td>{uc.instructorName}</td>
                            <td>{uc.availableSeats}</td>
                            <td>{uc.price}</td>
                            <td className={uc.status == 'pending' ? 'text-red-800' : 'text-green-800'} disabled={uc.status === 'denied' || uc.status == 'approved'}>{uc.status}</td>
                            <td className="flex-col space-y-3 py-5">
                                <button className='btn btn-secondary' disabled={uc.status === 'denied' || uc.status == 'approved'} onClick={() => handleStatusUpadate(uc._id, 'approved')}><FcApprove />Approve</button>
                                <button className="btn btn-error" disabled={uc.status === 'denied' || uc.status == 'approved'} onClick={() => handleStatusUpadate(uc._id, 'denied')}><FcDisapprove />Deny</button>
                                <label htmlFor={uc._id} className="btn btn-neutral"><MdRssFeed />Feedback</label>
                            </td>

                            <input type="checkbox" id={uc._id} className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Feedback!</h3>
                                    <textarea value={myFeedback} onChange={(e)=>setMyFeedBack(e.target.value)} className="textarea textarea-bordered w-full"></textarea>
                                    <div className="modal-action">
                                        <button className="btn btn-primary rounded-none" onClick={()=>handleFeedBack(uc._id,myFeedback)}>Send</button>
                                        <label htmlFor={uc._id} className="btn">Close!</label>
                                    </div>
                                </div>
                            </div>

                        </tr>)}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageClasses;