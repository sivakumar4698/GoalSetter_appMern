import React from 'react';
import {useState, useEffect} from 'react'
import {FaUserAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/Auth/AuthSlice'
import Spinner from './Spinner'

const Register = () => {

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  })

  const {name, email, password, confirmpassword} = registerData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //using the precent state
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

  const onChange = e => setRegisterData({...registerData, [e.target.name]: e.target.value})
  //const onChange = (e)=> {
   // setRegisterData((prevState) => {
    //  ...prevState,
    //  [e.target.name]: [e.target.value]
   // })

 // } 

  const onSubmit = (e)=> {
    e.preventDefault()

    if(password !== confirmpassword) {
      toast.error('password do not match')
    } else {
      const userData = {
        name, email, password
      }

      dispatch(register(userData))
    }
  } 

  if(isLoading){
    return <Spinner />
  }
  return (
    <>
     <React.StrictMode>
    <section className= 'heading' >
      <h1>
        <FaUserAlt /> Register
      </h1>
      <p> Create your account to get started.</p>
    </section>
  
    <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
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
            <input
              type='password'
              className='form-control'
              id='confirmpassword'
              name='confirmpassword'
              value={confirmpassword}
              placeholder='Confirm password'
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

export default Register;