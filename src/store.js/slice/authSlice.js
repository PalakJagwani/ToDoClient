import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const API = 'https://to-do-server-snowy.vercel.app'

export const signupUser = createAsyncThunk(
    'signupUser', async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/signup`, data,)
            return await response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }  
)

export const loginUser = createAsyncThunk(
    'loginUser', async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/login`, data,  );
            console.log(response.data)
            return await response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const signoutUser = createAsyncThunk(
    'signoutUser', async (id, {rejectWithValue}) =>  {
        try {
            const response = await axios.delete(`${API}/signout/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(response.data);
        }
    }
)

const authSlice = createSlice({
    name : 'auth', 
    initialState : {
        user : {},
        isAuthenticated : false,
        isLoading : false,
        isError : ""
    },
    reducers : {
        logout : (state, action) => {
            state.isAuthenticated = false;
            state.user = {}
        }
    },
    extraReducers : (builder) => {
        //signin : 
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            
        })
        .addCase(signupUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
            console.log(state.isError);
        })

        //login : 
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        })
        .addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
            console.log(action.payload)
        })

        //signout
        builder.addCase(signoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = "";
        })
        .addCase(signoutUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(signoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.isError = action.payload;
        })
    }
})

export const isUserAuthenticated = (state) => state.auth.isAuthenticated;
export const userData = (state) => state.auth.user
export const isLoading = (state) => state.auth.isLoading
export const Error = (state) => state.auth.isError
export const {logout} = authSlice.actions
export default authSlice.reducer;