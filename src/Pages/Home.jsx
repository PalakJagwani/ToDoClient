import TodoForm from "../Components/TodoForm"
import {userData} from '../store.js/slice/authSlice'
import { useSelector } from "react-redux"
import Todos from "../Components/Todos"

function Home(){
    const user = useSelector(userData)
    return(
        <>
            <div className=" text-center text-xl font-medium pt-10">Welcome, {user.username}!</div>
            <TodoForm />
            <Todos/>
        </>
    )
}

export default Home