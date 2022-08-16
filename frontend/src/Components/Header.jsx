import {GoSignIn, GoSignOut} from 'react-icons/go'
import {RiUserSmileFill} from 'react-icons/ri'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../features/Auth/AuthSlice'
import header from '../assets/header.png'

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/dashboard')
    }

    const logo = () => {
        navigate('/')

    }

    return (
        <header className = "header">
            <div className = 'logo'>
                <img onClick={logo} src={header} style={{width:"100px", height:"100px"}}/>
            </div>
            <ul>
                {user ? (<li>
                <button className = 'btn' onClick={onLogout}> <GoSignOut />Logout </button>
                </li>): (<><li>
                <Link to='/Login'><GoSignIn />Login</Link> 
                </li>
                <li>
                <Link to='/Register'><RiUserSmileFill />Register</Link> 
                </li></>)}
               
            </ul>
        </header>
    )
}

export default Header;