import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react' 
import { TokenContext } from "../App"
import Image from 'react-graceful-image'
import UploadPicture from '../components/UploadPicture';
import IngredientEdit from '../components/IngredientEdit';
import CuisineEdit from '../components/CuisineEdit';
import RecipeEdit from '../components/RecipeEdit'
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import Payment from './Payment';


const MyProfile = () => {
    
    const { token } = useContext(TokenContext)
    const [user, setUser] = useState([])
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/api/v1/users/me', {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response=>{
            setUser(response.data)
        })
        
        axios.get(`http://127.0.0.1:5000/api/v1/carts/me`,{
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response=>{
            setCart(response.data.data)

            let total_amount = 0
            response.data.data.forEach((i)=>{
                total_amount+= i.amount
            })
            setTotal(total_amount)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    
    const [isUploadPage, setIsUploadPage] = useState(false)
    const [isIngredientEdit, setIsIngredientEdit] = useState(false)
    const [isCuisineEdit, setIsCuisineEdit] = useState(false)
    const [isRecipeEdit, setIsRecipeEdit] = useState(false)
    const [isCheckout, setIsCheckout] = useState(false)

    
    const handleUploadPage = () => {
        setIsUploadPage(true)
    }

    if (isUploadPage){
        return <UploadPicture setIsUploadPage={setIsUploadPage}/>
    }


    const handleIngredientEdit = () => {
        setIsIngredientEdit(true)
    }

    if (isIngredientEdit){
        return <IngredientEdit setIsIngredientEdit={setIsIngredientEdit}/>
    }


    const handleCuisineEdit = () => {
        setIsCuisineEdit(true)
    }

    if (isCuisineEdit){
        return <CuisineEdit setIsCuisineEdit={setIsCuisineEdit}/>
    }


    const handleRecipeEdit = () => {
        setIsRecipeEdit(true)
    }

    if (isRecipeEdit){
        return <RecipeEdit setIsRecipeEdit={setIsRecipeEdit}/>
    }

    const handleRemove = (e) => {
        
        let formData = new FormData()
        formData.append("name",e.target.value)

        axios({
            method:"post",
            url: "http://127.0.0.1:5000/api/v1/carts/single/delete",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            toast("Ingredient has been successfully removed from cart!", {
                autoClose:true,
                position:"top-right"
            })
            window.location.reload()
        })
        .catch(errors=>{
            console.log(errors)
        })
    }

    const handleReset = () => {

        axios({
            method:"post",
            url:"http://127.0.0.1:5000/api/v1/carts/delete",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            toast("Cart has been successfully reset!", {
                autoClose:true,
                position:"top-right"
            })
            window.location.reload()
        })
    }

    const handleCheckout = () => {
        setIsCheckout(true)
    }
    
    if (isCheckout){
        return <Payment setIsCheckout={setIsCheckout} cart={cart}/>
    }

    return (
        
        <>
            <div className="container">
                <div>
                    <div className="text-center mt-5">
                        <Image src={user.profile_picture} style={{width:"100%", borderRadius:"50%"}}/>
                    </div>
                    <h1 className="text-center mt-5">{user.username}</h1>
                </div>
                <div className="form-group">
                    <div className="mt-5 text-center">
                        <button className="btn btn-outline-primary" style={{fontSize:"2rem"}} onClick={handleUploadPage}>
                            Upload Profile Picture
                        </button>
                    </div>
                    {
                        user.is_admin ?
                    <>
                        <div className="mt-5 text-center">
                            <h3>Ingredients</h3>
                            <button className="btn btn-info mr-3" style={{fontSize:"2rem", width:"150px"}} onClick={handleIngredientEdit}>
                                Edit 
                            </button>
                        </div>
                        <div className="mt-5 text-center">
                            <h3>Cuisines</h3>
                            <button className="btn btn-info mr-3" style={{fontSize:"2rem", width:"150px"}} onClick={handleCuisineEdit}>
                                Edit
                            </button>
                        </div>
                        <div className="mt-5 text-center">
                            <h3>Recipes</h3>
                            <button className="btn btn-info mr-3" style={{fontSize:"2rem", width:"150px"}} onClick={handleRecipeEdit}>
                                Edit 
                            </button>
                        </div>
                    </>       
                        :
                    <>
                    </>
                    }
                </div>
            </div>            
            {
                user.is_admin ?
            <>
            </>
                :
            <>
            <hr style={{borderBottom:"2px solid black"}}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-12 col-md-6 text-center divider">
                            <h2>
                                Cart <i class="fas fa-shopping-cart"></i>
                            </h2>
                            <div className="mt-5 px-5">
                                <div className="row" style={{borderBottom:"2px groove"}}>
                                    <div className="col-3">
                                        Ingredient:
                                    </div>
                                    <div className="col-3">
                                        Quantity:
                                    </div>
                                    <div className="col-3">
                                        Amount:
                                    </div>
                                </div>
                                {
                                    cart.map((c)=>{
                                        return(
                                            <div className="row">
                                                <div className="col-3 mt-2">
                                                    {c.ingredient}
                                                </div>
                                                <div className="col-3 mt-2">
                                                    {c.quantity}
                                                </div>
                                                <div className="col-3 mt-2">
                                                    RM {c.amount}
                                                </div>
                                                <div className="col-3 mt-2">
                                                    <button className="btn btn-danger" value={c.ingredient} onClick={handleRemove}>Remove</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="mt-5">
                                    Total Amount: RM {total}
                                </div>
                                <div>
                                    <button className="btn btn-primary mt-5" style={{width:"15%"}} onClick={handleCheckout}>Checkout</button>
                                </div>
                                
                                <div>
                                    <button className="btn btn-outline-danger mt-3 mb-2" style={{width:"15%"}} onClick={handleReset}>Reset</button>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-md-6 text-center">
                            <h2>
                                Order History <i class="fas fa-file-invoice-dollar"></i>
                            </h2>
                            <div className="mt-5">
                                <p>Order History Info</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    );
};

export default MyProfile;