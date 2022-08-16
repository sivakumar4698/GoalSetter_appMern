import axios from 'axios'


const API_URL = 'http://localhost:8000/api/goals/'


//add goals

const createGoal = async(goalData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, goalData, config )
    return response.data
}

//get goals
const getGoals = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config )
    return response.data
}

//delete goals
const deleteGoal = async(id, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config )
    return response.data
}


const goalService = {
    createGoal,
    getGoals,
    deleteGoal
}

export default goalService