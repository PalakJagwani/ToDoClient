import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'https://to-do-server-snowy.vercel.app';

export const addTodo = createAsyncThunk(
    'addTodo', async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/addtodo`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }  
)

export const getAllTodos = createAsyncThunk(
    'getTodos', async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API}/getTodos/${data}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'deleteTodo', async (id, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${API}/deleteTodo/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const isTodoCompleted = createAsyncThunk(
    'isTodoCompleted', async(data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${API}/todoCompleted/${data.id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    });

export const updateTodoData = createAsyncThunk(
    'updateTodoData', async(data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${API}/updateTodo/${data.id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteAllTodos = createAsyncThunk(
    'deleteAllTodos', async(username, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${API}/deleteAllTodos/${username}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const todoSlice = createSlice({
    name : 'todos',
    initialState : {
        todos : [],
        isLoading : false,
        isError : false
    },
    reducers : {},
    extraReducers : (builder) => {
        //addTodo : 
        builder.addCase(addTodo.fulfilled, (state, action) => {
            // state.todos.todos.push(action.payload);
            state.todos = [...state.todos, action.payload.newTodo]
            state.isError = false
            state.isLoading = false
        })
        .addCase(addTodo.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(addTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })

        //getTodos : 
        builder.addCase(getAllTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
            state.isError = false,
            state.isLoading = false
        })
        .addCase(getAllTodos.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllTodos.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })

        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.todos.todos = state.todos.todos.filter(todo => todo._id !== action.payload.todo);
        })
        .addCase(deleteTodo.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(deleteTodo.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })

        builder.addCase(isTodoCompleted.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            const updatedTodo = action.payload;
            state.todos.todos = state.todos.todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo);
        })
        .addCase(isTodoCompleted.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(isTodoCompleted.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })

        builder.addCase(updateTodoData.fulfilled, (state, action) => {
            const updatedTodo = action.payload;
            state.todos.todos = state.todos.todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo);
            state.isError = false;
            state.isLoading = false;
        })
        .addCase(updateTodoData.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(updateTodoData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })

        builder.addCase(deleteAllTodos.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.todos == action.payload;
        })
        .addCase(deleteAllTodos.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(deleteAllTodos.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
    }
})

export default todoSlice.reducer
export const loading = (state) => state.todos.isLoading
export const allTodos = (state) => state.todos.todos