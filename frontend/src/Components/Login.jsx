import React from 'react';
import {useState, useEffect} from 'react'
import {GoSignIn} from 'react-icons/go'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/Auth/AuthSlice'
import Spinner from './Spinner'

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = loginData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/dashboard')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = e => setLoginData({...loginData, [e.target.name]: e.target.value})
  //const onChange = (e)=> {
   // setRegisterData((prevState) => {
    //  ...prevState,
    //  [e.target.name]: [e.target.value]
   // })

 // } 

  const onSubmit = (e)=> {
    e.preventDefault()
    const userData = {
      email, password
    }

    dispatch(login(userData))

  } 

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
     <React.StrictMode>
    <section className= 'heading' >
      <h1>
        <GoSignIn /> Login
      </h1>
      <p>Please login with your credentials</p>
    </section>
  
    <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </React.StrictMode>
  </>
  );
}

export default Login;