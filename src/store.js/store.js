import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './slice/authSlice'
import TodoReducer from './slice/todoSlice'

const store = configureStore({
    reducer : {
        auth : AuthReducer,
        todos : TodoReducer
    }
})

export default store;