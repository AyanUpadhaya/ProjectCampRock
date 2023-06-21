import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Registration from '../Pages/Registration'
import Dashboard from '../Dashboard/Dashboard'
import Allusers from '../Dashboard/AdminDashBoard/Allusers'
import AdminDashBoard from '../Dashboard/AdminDashBoard/AdminDashBoard'
import InstructorDashBoard from '../Dashboard/InstructorDashBoard/InstructorDashBoard'
import AddClass from '../Dashboard/InstructorDashBoard/AddClass'
import MyClasses from '../Dashboard/InstructorDashBoard/MyClasses'
import ManageClasses from '../Dashboard/AdminDashBoard/ManageClasses'
import UpdateClass from '../Dashboard/InstructorDashBoard/UpdateClass'
import Allclasses from '../Pages/Allclasses'
import StudentDashBoard from '../Dashboard/StudentDashBoard/StudentDashBoard'
import MySelectedClasses from '../Dashboard/StudentDashBoard/MySelectedClasses'
import Instructors from '../Pages/Instructors'
import Payment from '../Dashboard/Payment/Payment'
import PaymentHistory from '../Dashboard/StudentDashBoard/PaymentHistory'
import MyEnrolledClasses from '../Dashboard/StudentDashBoard/MyEnrolledClasses'
import Private from '../Routes/Private/Private'
import NotFound from '../Pages/NotFound/NotFound'
import Profile from '../Pages/Profile'
import About from '../Pages/About'


const router = createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        errorElement:<NotFound></NotFound>,
        children:[
            {path:'/',element:<Home/>},
            {path:'/login',element:<Login/>},
            {path:'/register',element:<Registration/>},
            {path:'/allclasses',element:<Allclasses/>},
            {
                path:'/allinstructors',
                element:<Private><Instructors></Instructors></Private>
            },
            {
                path:'/myprofile',
                element:<Profile></Profile>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
            //admin options
            {
                path:'admin',
                element:<AdminDashBoard></AdminDashBoard>
            },
            {
                path:'allusers',
                element:<Allusers></Allusers>
            },
            {
                path:'manageclasses',
                element:<ManageClasses></ManageClasses>
            },
            //instructor options
            {
                path:'instructor',
                element:<InstructorDashBoard></InstructorDashBoard>
            },
            {
                path:'addclass',
                element:<AddClass></AddClass>
            },
            {
                path:'myclasses',
                element:<MyClasses></MyClasses>
            },
            {
                path:'updateclass/:id',
                element:<UpdateClass></UpdateClass>,
                loader:({params})=>fetch(`https://campserver.vercel.app/api/classes/${params.id}`)
            },
            //student options
            {
                path:'student',
                element:<StudentDashBoard></StudentDashBoard>
            },
            {
                path:'myselectedclass',
                element:<MySelectedClasses></MySelectedClasses>,
            },
            {
                path:'payment',
                element:<Payment></Payment>
            },
            {
                path:'paymenthistory',
                element:<PaymentHistory></PaymentHistory>
            },
            {
                path:'myenrolledclass',
                element:<MyEnrolledClasses></MyEnrolledClasses>
            },
            //about,
            {
                path:'about',
                element:<About></About>
            }
        ]
    }
])

export default router