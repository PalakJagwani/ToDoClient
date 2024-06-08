import { useState, useEffect } from 'react';
import {allTodos, deleteTodo, isTodoCompleted, updateTodoData} from '../store.js/slice/todoSlice'
import {useDispatch, useSelector} from 'react-redux'


function Todo({data}) {
    const loading = useSelector((state) => state.isLoading);
    const [checked, setChecked] = useState(data.completed);
    const [update, setUpdate] = useState(false);
    const Todos = useSelector(allTodos);
    const [updatedData , setUpdatedData] = useState(data.todoData);
    const dispatch = useDispatch();
    const [deleted, setDeleted] = useState(false);
    const deleteTheTodo = () => {
        dispatch(deleteTodo(data._id));
        setDeleted(prev => !prev)
    }

    useEffect(() => {
    }, [Todos])


    const setDone = () => {
        const updatedchecked =  !checked;
        setChecked(updatedchecked)
        dispatch(isTodoCompleted({id : data._id, completed : updatedchecked}))
    }


    const updateTheTodo = () => {
        setUpdate(false);
        dispatch(updateTodoData({id : data._id, todoData : updatedData}))
    }

    return (
        <div className=" grid place-content-center">
            <div>
                <form action="">
                    <div className= {`bg-gray-800 text-gray-200 rounded-md my-2 md:w-[40rem] w-[18rem]`}>
                    <input type="checkbox" className=" ml-2" checked = {checked} onChange={() => {setDone()}}/>
                    <input type="text" defaultValue={data.todoData} className={`py-2 pl-2 text-left focus:outline-none md:w-96 bg-gray-800 text-gray-200 ${checked ? 'opacity-60 line-through' : ''}`} readOnly = {!update} onChange = {(e) => {setUpdatedData(e.target.value)}} />
                    <span className=' float-right pr-3 cursor-pointer' onClick={() => {deleteTheTodo()}}><i className='fas fa-trash mt-3'/></span>
                    <span className={` float-right pr-3 cursor-pointer ${checked ? 'hidden' : ''} ${update ? 'hidden' : '' }`} onClick={() => {setUpdate(true)}}><i className="fa-solid fa-pen-to-square mt-3"></i></span>
                    <span className={` float-right pr-3 cursor-pointer ${checked ? 'hidden' : ''} ${update ? '' : 'hidden' }`} onClick={() => {updateTheTodo()}}><i className="fa-solid fa-check mt-3"></i></span>
                    <span className={` float-right pr-3 cursor-pointer ${checked ? 'hidden' : ''} ${update ? '' : 'hidden'}`} onClick={() => setUpdate(false)}><i className="fa-solid fa-xmark mt-3"></i></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Todo;