
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const {signInWithGoogle} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || "/";
    const handleGoogleSignIn = ()=>{
        signInWithGoogle()
        .then((result)=>{
            const loggedUser = result.user;
            console.log(loggedUser)
            const saveUser = {name:loggedUser.displayName,email:loggedUser.email,image:loggedUser.photoURL,role:'student'}
            fetch('https://campserver.vercel.app/api/users',{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify(saveUser)
            })
            .then(res=>res.json())
            .then(()=>{
                Swal.fire({title:'User has been loggedIn',timer:1500,icon: 'success',})
                navigate(from, { replace: true });
            })
        })
    }
    return (
        <div>
            <div className="divider"></div>
            <div className="w-full text-center my-4 space-x-3">
                <p className="font-bold">
                Login with
                </p>
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;