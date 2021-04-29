import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { TokenContext } from '../App';
import Login from '../components/Login';
import Signup from '../components/Signup'

const Grocery = () => {
    const { token } = useContext(TokenContext)
    
    const [isLogin, setIsLogin] = useState(true)
    const [isSignup, setIsSignup] = useState(false)
    
    const [allIngredient, setAllIngredient] = useState([])
    const [quantity, setQuantity] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        let formData = new FormData()
        formData.append("name", e.target[1].value)
        formData.append("quantity", quantity)

        axios({
            method:"POST",
            url:"https://provision-backend.herokuapp.com/api/v1/carts/new",
            headers:{
                Authorization:`Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            toast(response.data.message,{
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    useEffect(()=>{
        axios.get('https://provision-backend.herokuapp.com/api/v1/ingredients')
        .then(response=>{
            setAllIngredient(response.data.data)
        })
    },[])
    return (
        <>
            {
                token ?
            <>
                
                <nav className="d-flex justify-content-between mt-3">
                    <div className="display-4 ml-5">
                        Welcome To Provision Grocery ! <i class="fas fa-store"></i>
                    </div>
                </nav>

                <hr className="my-5" style={{borderBottom:"2px groove"}}/>

                <div className="px-5">
                    <div className="row">
                        {
                            allIngredient?
                            <>
                            {
                                allIngredient.map((ingredient)=>{
                                    return (
                                        <>
                                        <div className="col-lg-3 mb-3">
                                            <div className="card" style={{height:"75vh"}}>
                                                <img src={ingredient.image} style={{height:"50%"}}/>
                                                <div className="card-body">
                                                    <h1 className="card-title">
                                                        Name: {ingredient.name}
                                                    </h1>
                                                    <p>Description: {ingredient.description}</p>                                                      
                                                    <p>Price: RM{ingredient.price}</p>
                                                    <form onSubmit={handleSubmit}>
                                                        <label className="mr-3">Quantity: </label>
                                                        <input type="number" min="1" onChange={handleQuantity}/>
                                                        <div>
                                                            <button type="submit" className="btn btn-secondary" value={ingredient.name}>Add to Cart</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        </>           
                                    )
                                })
                            }
                            </>
                            :
                            <>
                                <h1>Sorry. There is currently no ingredients available for displayed!</h1>
                            </>               
                        }
                    </div>
                </div>

            </>
            :
            <>
                <div style={{height:"86vh"}} className="mt-3">
                    <h1 className="text-center">Kindly login for exploring our Grocery Store!</h1>
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

export default Grocery 