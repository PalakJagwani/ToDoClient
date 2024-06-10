import { useNavigate } from "react-router-dom"
import { logout } from "../store.js/slice/authSlice"
import {useDispatch, useSelector} from 'react-redux'
import {isUserAuthenticated} from '../store.js/slice/authSlice'

function Logout(){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    let loading = useSelector(isLoading);
    const user = useSelector(isUserAuthenticated)

    const logoutUser = () => {
        dispatch(logout());
        if(!user){
            navigate('/login')
        }
    }
    return(
        <div className=" grid place-content-center h-screen">
            <div className = "text-center text-red-500 my-10 text-2xl">{loading ? "Loading" : ""}</div>
            <div className=" bg-gray-900 text-gray-300 px-20 py-8 mb-80">
                <span className=" text-xl font-medium block text-center pb-6 ">Do you wish to logout?</span>
                <div className=" flex justify-evenly">
                <span className=" bg-slate-800 text-slate-200 py-1 px-6 rounded-md cursor-pointer" onClick={() => navigate(-1)}>No</span>
                <span className=" bg-slate-800 text-slate-200 py-1 px-6 rounded-md cursor-pointer" onClick={() => logoutUser()}>Yes</span>
                </div>
            </div>
        </div>
    )
}

export default Logout