import { useState } from 'react'
import {NavLink} from 'react-router-dom'

function Header() {
    return(
            <div className=' pt-6 pl-2'>
                <div className=" grid place-content-center relative">
                    <span className = "flex justify-center">
                        <NavLink to={'/logout'} className=" bg-gray-900 md:absolute md:right-32 text-white py-2 px-3 rounded-md mt-4 mr-4 text-center w-24">Logout</NavLink>
                        <NavLink to={'/signout'} className=" bg-gray-900 md:absolute md:right-1 text-white py-2 px-3 rounded-md mt-4 mr-4 text-center w-24">SignOut</NavLink>
                    </span>
                <h2 className=" text-8xl font-bold text-center py-4 text-gray-900 mt-7">ToDo..</h2>
                <div className=" w-[70%] mx-auto hidden md:block">Welcome to ToDo, your ultimate productivity companion!</div>
                <div className=" hidden md:block">ToDo is here to streamline your workflow and make accomplishing your goals a breeze.</div>
            </div>
            </div>
            
        )
}

export default Header