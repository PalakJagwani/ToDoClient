import { useNavigate } from "react-router-dom"
import { signoutUser } from "../store.js/slice/authSlice";
import {useDispatch, useSelector} from 'react-redux'
import {userData} from '../store.js/slice/authSlice'
import {isUserAuthenticated} from '../store.js/slice/authSlice'
import {deleteAllTodos} from '../store.js/slice/todoSlice'

function Signout(){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user  = useSelector(userData)
    let loading = useSelector(isLoading);
    const {userAuthentication} = useSelector(isUserAuthenticated)

    const signOutuser = () => {
        console.log(user._id)
        //before signing out delete all todos
        dispatch(deleteAllTodos(user.username));
        dispatch(signoutUser(user._id));

        if(!userAuthentication){
            navigate('/signup')
        }
    }
    return(
        <div className=" grid place-content-center h-screen">
            <div className = "text-center text-red-500 my-10 text-2xl">{loading ? "Loading" : ""}</div>
            <div className=" bg-gray-900 text-gray-300 px-20 py-8 mb-80">
                <span className=" text-xl font-medium block text-center pb-6 ">Do you wish to signout?</span>
                <div className=" flex justify-evenly">
                <span className=" bg-slate-800 text-slate-200 py-1 px-6 rounded-md cursor-pointer" onClick={() => navigate(-1)}>No</span>
                <span className=" bg-slate-800 text-slate-200 py-1 px-6 rounded-md cursor-pointer" onClick={() => signOutuser()}>Yes</span>
                </div>
            </div>
        </div>
    )
}

export default Signout