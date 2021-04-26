import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TokenContext } from '../App'
import Login from '../components/Login'
import Signup from '../components/Signup'

const Modal = () => {
    
    const [isLogin, setIsLogin] = useState(false)
    const [isSignup, setIsSignup] = useState(false)

    const {token, setToken} = useContext(TokenContext)

    const history = useHistory()
    if (isLogin){
        return <Login setIsLogin={setIsLogin} setIsSignup={setIsSignup}/>
    }

    if (isSignup){
        return <Signup setIsLogin={setIsLogin} setIsSignup={setIsSignup}/>
    }

    const handleLogin = () => {
        setIsLogin(true)
    }

    const handleSignup = () => {
        setIsSignup(true)
    }

    const handleLogout = () => {
        localStorage.clear()
        setToken("")
        toast("Logout Successful!", {
            autoClose:true,
            position:'top-right'
        })
        history.push("/")
    }

    return (
        <li className="nav-item dropdown active">
            <a className="nav-link dropdown-toggle text-orange font-weight-normal" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="far fa-user"></i> Account
            </a>
            <div className="dropdown-menu" style={{fontSize:"1.5rem"}} aria-labelledby="navbarDropdown">
                {
                    token ?
                <>
                    <Link to="/MyProfile" className="dropdown-item">My Profile</Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={handleLogout}>Logout</a>
                </>
                    :
                <>    
                    <a className="dropdown-item" onClick={handleLogin}>Login</a>
                    <a className="dropdown-item" onClick={handleSignup}>Signup</a>
                </>
                }
            </div>
        </li>
    );
}

export default Modal;