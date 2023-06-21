import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import useUserRole from "../Hooks/useUserRole";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ClassCard = ({ item }) => {
    const { user } = useAuth();
    const userRole = useUserRole(user?.email);
    const [isDisabled,setDisabled] = useState(false);
    const [axiosSecure] = useAxios();
    const navigate = useNavigate();
    const {
        _id,
        className,
        classImage,
        instructorName,
        instructorEmail,
        availableSeats,
        price
    } = item;

    const sigNature = (item._id+user?.email)

    const handleAddToMyClass = async (item) => {
        if(!user){
            Swal.fire("You need to login first")
            navigate('/login')
            return

        }
        const myClass ={classId:item._id,className,classImage,instructorName,instructorEmail,price,email: user?.email, studentName: user?.displayName,sigNature }
        try {
            const res = await axiosSecure.post('/api/studentclass', myClass)

            if (res.data.insertedId) {
                Swal.fire({ title: 'Class added', icon: 'success' })
            }
        }catch(error){
            Swal.fire("Already added")
            console.log(error)
        }

    }
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={classImage} alt="Shoes" /></figure>
                <div className={availableSeats<1?"bg-red-800 card-body":"card-body"}>
                    <h2 className="card-title">{className}</h2>
                    <p>Instructor: {instructorName}</p>
                    <p>Available Seats: {availableSeats}</p>
                    <p>Price: {price}$</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" disabled={userRole === 'admin' || userRole === 'instructor' || availableSeats<1} onClick={()=>handleAddToMyClass(item)}>Select</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;