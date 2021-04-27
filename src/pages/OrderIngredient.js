import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { TokenContext } from '../App';


const OrderIngredient = () => {
    
    const {token} = useContext(TokenContext)
    const { id } = useParams()
    const [orderIngredient, setOrderIngredient] = useState([])

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/api/v1/orders/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response=>{
            setOrderIngredient(response.data.data)
        })
    },[id])
    return(
        <>
            <div className="container mb-5 mt-5">
                <h1 className="display-4 mb-5">Order ID : {id}</h1>
                <div className="row">
                    <div className="col-4 mb-2">
                        Ingredients:                
                    </div>
                    
                    <div className="col-4 mb-2">
                        Quantities: 
                    </div>
                    
                    <div className="col-4 mb-2">
                        Amount:
                    </div>
                </div>
                <hr style={{borderBottom:"2px solid black"}}/>
            {
                orderIngredient.map((o)=>{
                    return ( 
                    <>
                        <div className="row">
                            <div className="col-4 mt-3">
                                {o.name}
                            </div>
                            <div className="col-4 mt-3">
                                {o.quantity}
                            </div>
                            <div className="col-4 mt-3">
                               RM {o.amount}
                            </div>
                        </div>
                    </>
                    )
                })
            }
            </div>
        </>
    );
};

export default OrderIngredient