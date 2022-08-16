import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import GoalService  from './GoalService'

const initialState ={ 
    goals:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ' '
}

//add new goals

export const createGoal = createAsyncThunk('Goal/addgoal', async(goalData, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await GoalService.createGoal(goalData, token)
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message 
        ) || error.message || error.toString()
        console.log(message)
        return thunkAPI.rejectWithValue(message)
    }

})

//get goals

export const getGoals = createAsyncThunk('Goal/getgoals', async(_, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await GoalService.getGoals(token)
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message 
        ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

//delete Goal
export const deleteGoal = createAsyncThunk('Goal/deletegoal', async(id, thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await GoalService.deleteGoal(id, token)
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message 
        ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

export const GoalSlice = createSlice({
    name:'goals',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) => {
        builder
            .addCase(createGoal.pending, (state)=> {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action)=> {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)

            })
            .addCase(createGoal.rejected, (state, action)=> {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getGoals.pending, (state)=> {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action)=> {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload

            })
            .addCase(getGoals.rejected, (state, action)=> {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state)=> {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action)=> {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal)=> goal._id !== action.payload.id)

            })
            .addCase(deleteGoal.rejected, (state, action)=> {
                state.isLoading = false
                state.isError = true    
                state.message = action.payload
            })
    }
})


export const {reset} = GoalSlice.actions
export default GoalSlice.reducer
