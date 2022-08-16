import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {createGoal} from '../features/Goals/GoalSlice'

const AddGoals = () =>{

    const [text, settext] = useState(' ')

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createGoal({text}))
        settext('')
    }

    const dispatch = useDispatch()

return(
    <>
<section className="form">
    <form onSubmit={onSubmit}>
        <div className="form-group">
        <label htmlFor="text" style={{color:"#D65F45"}}>Goal</label>
        <input type="text" name="text" id="text" value={text} 
        onChange={(e)=> settext(e.target.value)}/>
        </div>
        <div className="form-group">
        <button className="btn btn-block" type="submit">Add goal</button>
        </div>
    </form>

</section>
</>
)

}

export default AddGoals;