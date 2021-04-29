import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { TokenContext } from '../App'
import { toast } from 'react-toastify'
import { GoogleLogin } from 'react-google-login'

const Login = ({setIsLogin, setIsSignup}) => {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("") 
    
    const {setToken} = useContext(TokenContext)
    const history = useHistory()

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        axios.post(`https://provision-backend.herokuapp.com/api/v1/sessions/login`, {
            username, password
        })
        .then(response=>{
            localStorage.setItem("token", response.data.token)
            setToken(response.data.token)
            toast("Login Successful!", {
                autoClose:true,
                position:"top-right"
            })
            setIsLogin(false)
            history.push("/")
        })
        .catch(error=>{
            toast("Username or password is incorrect!",{
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleClose = () => {
        setIsLogin(false)
    }

    const handleSwap = () => {
        setIsLogin(false)
        setIsSignup(true)
    }

    const handleLoginUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleLoginPassword = (e) => {
        setPassword(e.target.value)
    }
    
    const responseGoogle = (response) => {
        axios.post(`https://provision-backend.herokuapp.com/api/v1/sessions/authorize/google`,{
            "token" : response.tokenObj
        })
        .then(response=>{
            localStorage.setItem("token", response.data.token)
            setToken(response.data.token)
            toast("Login Successful!", {
                autoClose:true,
                position:"top-right"
            })
            toast("Message here",{

            })
            setIsLogin(false)
            history.push("/")
        })
    }

    return (
        <>
            <div className="Form-container">
                <div className="Form-content">
                    <h1>Login Form</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <label for="loginInputUsername">Username</label>
                            <input type='text' className='form-control' onChange={handleLoginUsername}></input>
                        </div>
                        <div className="form-group">
                            <label for="loginInputPassword">Password</label>
                            <input type='password' className='form-control' onChange={handleLoginPassword}></input>
                        </div>
                        <div className="small font-italic">
                            <span>Not a member? <Link onClick={handleSwap}>Signup Now!</Link> <i class="fas fa-arrow-circle-left"></i></span>
                        </div>
                        <div className="small font-italic mt-2">
                            <div>OR <GoogleLogin 
                                        clientId="30871566928-olbk2d546tirt0ft8qo7978nvhvl38dg.apps.googleusercontent.com"
                                        buttonText="Login with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                            </div>
                        </div>
                        <div className="button-group">
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary mt-3"  style={{ width:"30%", borderRadius : "12px"}}>
                                    Login
                                </button>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-danger mt-3"  style={{ width:"30%", borderRadius : "12px"}} onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;