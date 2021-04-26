import React, { useContext, useState } from 'react'
import { TokenContext } from '../App';
import Login from '../components/Login';
import Signup from '../components/Signup'
import { Link } from 'react-router-dom'

const CookBook = () => {
    const { token } = useContext(TokenContext)
    
    const [isLogin, setIsLogin] = useState(true)
    const [isSignup, setIsSignup] = useState(false)
    
    
    return (
        <>
            {    
                token ?
                
                <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="jumbotron-fluid" style={{height:"93vh"}}>
                                <img src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" classNameName="d-block w-100" style={{height:"100%", width:"100%"}}/>
                            </div>
                            <div className="carousel-caption d-none d-md-block">
                                <Link to="/cookbook/asian" className="text-decoration-none"><h1 className="display-1 text-orange">Asian Cuisine</h1></Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="jumbotron-fluid" style={{height:"93vh"}}>
                                <img src="https://images.unsplash.com/photo-1600803734709-83f30a78e312?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2090&q=80" className="d-block w-100" style={{height:"100%", width:"100%"}}/>
                            </div>
                            <div className="carousel-caption d-none d-md-block">
                                <Link to="/cookbook/western" className="text-decoration-none"><h1 className="display-1 text-orange">Western Cuisine</h1></Link>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

            :
            <>
                <div style={{height:"86vh"}} className="mt-3">
                    <h1 className="text-center">Kindly login for exploring our interesing CookBook!</h1>
                </div>
                {
                    isLogin ?
                    <Login setIsLogin={setIsLogin} setIsSignup={setIsSignup}/>                
                    :
                    <>
                    </>
                }
                {
                    isSignup ?
                    <Signup setIsLogin={setIsLogin} setIsSignup={setIsSignup}/>
                    :
                    <>
                    </>
                }
            </>
            }
        </>
    );
};

export default CookBook