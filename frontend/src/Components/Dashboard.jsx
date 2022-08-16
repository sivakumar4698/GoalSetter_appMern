import React from 'react';
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Components/Spinner'
import AddGoals from './AddGoals';
import { getGoals, reset } from '../features/Goals/GoalSlice';
import GoalItem from './GoalItem'
import dashlogo from '../assets/goal.png'
const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state)=> state.auth)
  const {goals, isLoading, isError, message} = useSelector((state)=> state.goals)

  useEffect(() => {
    if(isError){
      console.log(message);
    }
    if(!user){
      navigate('/login')
    }

    if(user){
      dispatch(getGoals())
    }
    
    return() => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading){
    return <Spinner />
  }
  return (
    <>  
      <section className='heading'>
        <img src={dashlogo} style={{width:"100px", height:"100px"}}/>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
        <AddGoals />

        <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>

      </section>
    </>
  );
}

export default Dashboard;
