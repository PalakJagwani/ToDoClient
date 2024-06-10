import {useForm} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { loginUser, Error } from '../store.js/slice/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import { isUserAuthenticated } from '../store.js/slice/authSlice'
import { useEffect } from 'react'

function Login(){
    const {register, handleSubmit, setValue, formState : {errors}} = useForm({})
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userError = useSelector(Error)
    let loading = useSelector(isLoading);
    const isuserAuthenticated = useSelector(isUserAuthenticated)

    const mySubmit = (data) => {
        
        try {
            dispatch(loginUser({username : data.username, password : data.password}))
        } catch (error) {
            console.log(error.message)  
        }
        setValue('username', '')
        setValue('password', '')
    }

    useEffect(() => {
        if (isuserAuthenticated) {
            navigate('/');
        }
    }, [isuserAuthenticated]);

    return(
        
        <div className=' grid place-content-center my-48'>
            <div className = "text-center text-red-500 my-10 text-2xl">{loading ? "Loading" : ""}</div>
            <form onSubmit={handleSubmit(mySubmit)} className=' bg-gray-900 shadow-xl shadow-gray-800 md:pt-7 pt-4 px-6'>
                <div className=' text-3xl font-bold text-center pb-2 text-gray-400'>Login</div>
                <label htmlFor="username" className=' block py-2 text-xl text-gray-200'>Username : </label>
                <input type="username" name='username' id='username' className='bg-gray-400 text-black block md:w-80 w-[17rem] py-1 px-2 focus:outline-none' {...register('username', {
                    required : {
                        value : true,
                        message : "Username is required.."
                    }
                })}/>
                <p className=" py-1 text-red-500">{errors.username?.message}</p>
                <label htmlFor="password" className=' block py-2 text-xl text-gray-200'>Password : </label>
                <input type="password" name='password' id='password' className='bg-gray-400 text-black block w-[17rem] md:w-80 py-1 px-2 focus:outline-none' {...register('password', {
                    required : {
                        value : true,
                        message : "Password is required..."
                    },
                    maxLength : {
                        value : 10,
                        message : "Password should be atmost 10 characters..."
                    },
                    minLength : {
                        value : 8,
                        message : "Password should be atleast 8 characters..."
                    }
                })}/>
                <p className=" py-1 text-red-500">{errors.password?.message}</p>
                <button className=' mt-6 bg-gray-400 text-black py-2 px-6 mx-auto block '>Login</button>
                {userError ? <p className=' text-red-500 pt-4 text-center'>{userError.message}</p> : ''}
                <div className=' py-6 text-gray-200'>New to ToDo? <NavLink to={'/signup'}>Signup</NavLink></div>
            </form>
        </div>
    )
}

export default Login