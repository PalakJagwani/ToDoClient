import {useForm} from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { signupUser, Error } from '../store.js/slice/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import {isUserAuthenticated} from '../store.js/slice/authSlice'

function Signup(){
    const {register, handleSubmit, setValue, formState : {errors}, getValues} = useForm({})
    const dispatch = useDispatch();
    let userAuthentication = useSelector(isUserAuthenticated);
    const navigate = useNavigate()
    const userError = useSelector(Error);

    const mySubmit= (data) => {
        console.log(data)
        dispatch(signupUser({username : data.username, password : data.password}))
        
        setValue('username', '')
        setValue('password', '')
        setValue('confirmpassword', '')
    }

    useEffect(() => {
        if (userAuthentication) {
            navigate('/');
        }
    }, [userAuthentication])
    return(
        <div className=' grid place-content-center my-48'>
            <form onSubmit={handleSubmit(mySubmit)} className='  bg-gray-900 shadow-xl shadow-gray-800 md:pt-7 pt-4 px-6'>
                <div className=' text-3xl font-bold text-center pb-2 text-gray-400'>Signup</div>
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
                <label htmlFor="confirmpassword" className=' block py-2 text-xl text-gray-200'>Confirm Password : </label>
                <input type="password" name='confirmpassword' id='confirmpassword' className='bg-gray-400 text-black block w-[17rem] md:w-80 py-1 px-2 focus:outline-none' {...register('confirmpassword', {
                    required : {
                        value : true,
                        message : "Confirm your password..."
                    },
                    validate : (v) => {
                        return v === getValues('password') || "Passwords don't match"
                    }
                })}/>
                <p className=" py-1 text-red-500">{errors.confirmpassword?.message}</p>
                <button className=' mt-4 bg-gray-400 text-black py-2 px-6 mx-auto block '>Signup</button>
                {userError ? <p className=' text-red-500 pt-4 text-center'>{userError.message}</p> : ''}
                <div className=' py-4 text-gray-200'>Already have account? <NavLink to={'/login'}>Login</NavLink></div>
            </form>
        </div>
    )
}

export default Signup