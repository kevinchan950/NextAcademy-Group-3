import axios from 'axios';
import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify';
import { TokenContext } from '../App';

const Payment = ({setIsCheckout, cart}) => {
    
    const { token } = useContext(TokenContext)
    const [clientToken, setClientToken] = useState(null)
    const [total, setTotal] = useState("")
    const [instance, setInstance] = useState(null)
    

    const deleteCart = () => {
        axios({
            method:"post",
            url:`http://127.0.0.1:5000/api/v1/carts/delete`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    const createOrder = () => {
        
        let formData = new FormData()
        formData.append("total_amount", total)
        axios({
            method:"POST",
            url: "http://127.0.0.1:5000/api/v1/orders/new",
            headers: {
                Authorization : `Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            const order = response.data.order_id
            
            cart.forEach((c)=>{
                let formData = new FormData()
                formData.append("quantity", c.quantity)
                formData.append("amount", c.amount)
                formData.append("name", c.ingredient)
                formData.append("order_id", order)  
                
                axios({
                    method:"POST",
                    url: "http://127.0.0.1:5000/api/v1/orders/new/order_ingredients",
                    headers: {
                        Authorization : `Bearer ${token}`
                    },
                    data: formData
                })
                .then(res=>{
                    console.log("successssssssssssssssssssssssssssssssssss")
                })
            })
        })
    }
    
    async function handleBuy() {
        const { nonce } = await instance.requestPaymentMethod()
        let formData = new FormData()
        formData.append("total", total)
        formData.append("nonce", nonce)   
    
        axios({
            method:"post",
            url: 'http://127.0.0.1:5000/api/v1/payments/pay',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            createOrder()
            deleteCart()
            toast(response.data.message,{
                autoClose:true,
                position:"top-right"
            })
            setIsCheckout(false)
            window.location.reload()
        })
    }

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/api/v1/payments/client_token`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response=>{
            setClientToken(response.data.client_token)
        })

        let total_amount = 0
        cart.forEach((c)=>{
            total_amount+=c.amount
        })
        setTotal(total_amount)
    },[])
    
    return (
        <>
            {
                clientToken ?
            <>            
                <div className="text-center container" style={{height:"84vh"}}>
                    <DropIn 
                        options={{authorization:clientToken,card: {
                            cardholderName: {
                                required: true
                            }
                          }}}
                        onInstance={(i)=>{
                            setInstance(i)
                        }}
                    />
                    <div>
                        Total amount: RM {total.toFixed(2)}
                    </div>
                    <button className="btn btn-primary mt-5" type="submit" style={{width:"10%"}} onClick={handleBuy}>Pay</button>
                </div>              
            </>
            :
            <>
                <div className="text-center">
                    <h1>Is loading...</h1>
                </div>
            </>
            }
        </>
    );
};

export default Payment;
