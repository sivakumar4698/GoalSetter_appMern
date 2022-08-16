import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import AuthService  from './AuthService'
//local Storage

const user = JSON.parse(localStorage.getItem('user'))

const initialState ={ 
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ' '
}

//Register user
export const register = createAsyncThunk('Auth/register', async(user, thunkAPI)=>{
    try{
        return await AuthService.register(user)
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message 
        ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

//login user
export const login = createAsyncThunk('Auth/login', async(user, thunkAPI)=>{
    try{
        return await AuthService.login(user)
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message 
        ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

export const logout = createAsyncThunk('Auth/logout', async()=>{

         await AuthService.logout()

})

export const AuthSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: (state) => {
    state.isError = false
    state.isSuccess = false
    state.isLoading = false
    state.message = ' '
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(register.pending, (state)=> {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action)=> {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload

            })
            .addCase(register.rejected, (state, action)=> {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state)=> {
                
                state.user = null
            })
            .addCase(login.pending, (state)=> {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action)=> {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload

            })
            .addCase(login.rejected, (state, action)=> {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})

export const {reset} = AuthSlice.actions
export default AuthSlice.reducer