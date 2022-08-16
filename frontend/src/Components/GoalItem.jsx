import { useDispatch } from "react-redux";
import {deleteGoal} from '../features/Goals/GoalSlice'
import {getGoals} from '../features/Goals/GoalSlice'

const GoalItem = ({goal}) => {
    console.log(goal._id)
    const dispatch = useDispatch()

    const reload = ()=> {
        dispatch(deleteGoal(goal._id))
        dispatch(getGoals())
        dispatch(getGoals())
    }
    return (
            <div className="goal">
                <p>{goal.text}</p>
                <a style={{fontSize:"20px"}}>{new Date(goal.createdAt).toLocaleString('en-US')}</a>
                <button onClick={reload}
                className="close"> X </button>
            </div>
    )
}

export default GoalItem;