import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/Auth/AuthSlice'
import GoalReducer from '../features/Goals/GoalSlice'


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    goals: GoalReducer
  },
});
