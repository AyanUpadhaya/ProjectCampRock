import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';

const PaymentHistory = () => {
    const {user} = useAuth()
    const [axiosSecure] = useAxios()
    const [history,setHistory] = useState([])
    useEffect(()=>{
        const fetchHistory =async()=>{
            const res = await axiosSecure.get(`/api/payments/${user?.email}`)
            setHistory(res.data)
            // console.log(res.data)

        }

        if(user&&user.email){
            fetchHistory()
        }

    },[user.email])

    const total = history.reduce((sum,item)=>sum+item.price,0)
    return (
        <div className='p-5'>
            <h2 className='text-4xl font-bold'>Payment History</h2>
            <h3 className='font-semibold my-3'>Student Name: {user?.displayName}</h3>
            <h4 className='font-semibold my-4'>Total Payment:{total}$</h4>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Class Id</th>
                            <th>Transaction Id</th>
                            <th>Price</th>
                            <th>Date</th>
                        </tr>                   
                    </thead>
                    <tbody>
                    {history?.map((hs,id)=><tr key={hs._id}>
                        {/* sc = selected class */}
                            <td>{id+1}</td>
                            <td>{hs.classId}</td>
                            <td>{hs.transactionId}</td>
                            <td>{hs.price}$</td>
                            <td>{hs.date}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;