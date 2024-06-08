import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import { addTodo } from '../store.js/slice/todoSlice';
import {userData} from '../store.js/slice/authSlice';
import { useEffect } from 'react';

function TodoForm(){
    const {register, handleSubmit, setValue, formState : {errors}} = useForm({});
    const dispatch = useDispatch();
    const user = useSelector(userData);
    
    const mySubmit = (data) => {
        // console.log(data)
        dispatch(addTodo({todoData : data.todo, username : user.username}));
        setValue('todo', "")
    }


    return (
        <div className=" h-full w-screen grid place-content-center py-10">
            <form onSubmit={handleSubmit(mySubmit)}>
                <input type="text" name="todo" id="todo" className=" py-2 px-2 focus:outline-none w[20rem] lg:w-[40rem] md:w[30rem] mr-2 opacity-60" placeholder="Enter your Todo..."
                {...register('todo', {
                    required : {
                        value : true,
                        message : "Please give me your upcoming todo.."
                    }
                })}
                />
                <button className=" px-6 py-2 bg-black text-white">Add</button>
            </form>
        </div>
    )
}

export default TodoForm