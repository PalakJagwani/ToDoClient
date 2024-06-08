import Todo from "./Todo"
import { allTodos, getAllTodos} from "../store.js/slice/todoSlice"
import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from "react"
import {userData} from '../store.js/slice/authSlice'

function Todos(){
    const dispatch = useDispatch();
    const user = useSelector(userData);
    
    const userTodos = useSelector(allTodos);
    let [todos, setTodos] = useState([]);
    useEffect(() => {
        dispatch(getAllTodos(user.username))
    }, [dispatch])

    useEffect(() => {
        userTodos ? setTodos(userTodos) : setTodos([])
    }, [userTodos])

    function completedTodos() {
        const completedtodos = userTodos.filter((todo) => todo.completed === true);
        setTodos(completedtodos)
    }

    function notCompletedTodos() {
        const uncompletedtodos = userTodos.filter((todo) => todo.completed === false);
        setTodos(uncompletedtodos)
    }

    function allTheTodos() {
        setTodos(userTodos)
    }

    return(
        <div>
            <div className = "mt-3 mb-7 flex justify-center">
                <span className="p-1 mx-1 md:p-3 bg-gray-700 text-gray-200 md:mx-3 rounded-md cursor-pointer text-center" onClick={() => {completedTodos()}}>Completed Todos</span>
                <span className="p-1 mx-1 md:p-3 bg-gray-700 text-gray-200 md:mx-3 rounded-md cursor-pointer text-center" onClick={() => {notCompletedTodos()}}>Uncompleted Todos</span>
                <span className="p-1 mx-1 md:p-3 bg-gray-700 text-gray-200 md:mx-3 rounded-md cursor-pointer text-center" onClick={() => {allTheTodos()}}>All Todos</span>
            </div>

            {todos.slice(0).reverse().map((todo) => (
                <Todo key={todo._id} data = {todo}/>
            ))}
        </div>
    )
}
export default Todos