import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify';
import { TokenContext } from '../App';
const RecipeIngredient =() =>{
    
    const { token } = useContext(TokenContext)

    const [allCuisine, setAllCuisine] = useState([])
    const [allRecipe, setAllRecipe] = useState([])
    const [allIngredient, setAllIngredient] = useState([])
    const [cuisine, setCuisine] = useState("")
    const [recipe, setRecipe] = useState("")
    const [quantity, setQuantity] = useState("")
    const [ingredient, setIngredient] = useState("")

    const handleAddSubmit = (e) => {
        e.preventDefault()
        
        let formData = new FormData()
        formData.append("quantity", quantity)
        formData.append("name", ingredient)
        axios({
            method: 'post',
            url: `https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/${recipe}/ingredients/new`,
            headers: {
                Authorization : `Bearer ${token}`   
            },
            data: formData
        })
        .then(response=>{
            console.log(response)
          toast("Ingredient has been successfully created!", {
              autoClose:true,
              position:"top-right"
          })  
        })
        e.target[3].value=""
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append("name", ingredient)
        axios({
            method: 'post',
            url: `https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/${recipe}/ingredients/delete`,
            headers:{
                Authorization : `Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            toast("Ingredient has been successfully deleted!", {
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleCuisineSelection = (e) => {
        setCuisine(e.target.value)
        
        axios.get(`https://provision-backend.herokuapp.com/api/v1/cuisines/${e.target.value}/recipes`)
        .then(response=>{
            setAllRecipe(response.data.data)
        })
        .catch(err=>{
            setAllRecipe("")
        })
    }
    
    const handleRecipeSelection = (e) => {
        setRecipe(e.target.value)

        axios.get(`https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/${e.target.value}/ingredients`)
        .then(response=>{
            setAllIngredient(response.data.data)
        })
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleIngredient = (e) => {
        setIngredient(e.target.value)
    }

    const handleIngredientSelection = (e) => {
        setIngredient(e.target.value)
    }

    useEffect(()=>{
        axios.get(`https://provision-backend.herokuapp.com/api/v1/cuisines`)
        .then(response=>{
            setAllCuisine(response.data.data)
        })

    },[])

    return (
        <>
        <div className="px-4" style={{height:"85vh"}}>
            <h1 className="display-4 mb-5">Editing Recipe Ingredient: </h1>
            <div className="container-fluid">
                <form onSubmit={handleAddSubmit}>
                    <h2 className="text-left font-weight-bolder">Add Ingredient</h2>
                    <div className="form-group d-flex flex-wrap mt-3">
                        <label className="mr-3">Choose a cuisine: </label>
                        <select className="mr-3" style={{width:"15%"}} onChange={handleCuisineSelection}>
                            <option value="">Select cuisine</option>
                            {
                                allCuisine.map((cuisine)=>{
                                    return(
                                        <option value={cuisine.name}>{cuisine.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label className="mr-3">Choose a recipe: </label>
                        <select className="mr-3" style={{width:"20%"}} onChange={handleRecipeSelection}>
                            <option value="">Select recipe</option>
                            {
                                allRecipe ?
                                    allRecipe.map((recipe)=>{
                                        return(
                                            <option value={recipe.name}>{recipe.name}</option>
                                        )
                                    })
                                
                                :
                                <>
                                </>
                            }
                        </select>
                        <label className="mr-3">Quantity: </label>
                        <input className="mr-3" type="number" name="step_number" onChange={handleQuantity} min={1} max={15}/>
                        <div className="mt-3">
                            <label className="mr-3">Ingredient: </label>
                            <textarea className="mr-3" type="text" onChange={handleIngredient} style={{resize:"none"}} cols={"70"}/>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Add</button>
                    </div>
                </form>

                <hr style={{borderBottom:"2px groove"}}/>

                <form onSubmit={handleDeleteSubmit}>
                    <h2 className="text-left font-weight-bolder">Delete Ingredient</h2>
                    <div className="form-group d-flex flex-wrap mt-3">
                        <label className="mr-3">Choose a cuisine: </label>
                        <select className="mr-3" style={{width:"15%"}} onChange={handleCuisineSelection}>
                            <option value="">Select cuisine</option>
                            {
                                allCuisine.map((cuisine)=>{
                                    return(
                                        <option value={cuisine.name}>{cuisine.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label className="mr-3">Choose a recipe: </label>
                        <select className="mr-3" style={{width:"15%"}} onChange={handleRecipeSelection}>
                            <option value="">Select recipe</option>
                            {
                                allRecipe ?
                                    allRecipe.map((recipe)=>{
                                        return(
                                            <option value={recipe.name}>{recipe.name}</option>
                                        )
                                    })
                                
                                :
                                <>
                                </>
                            }
                        </select>
                        <label className="mr-3 mt-3">Choose an ingredient: </label>
                        <select className="mr-3 mt-3" style={{width:"35%"}} onChange={handleIngredientSelection}>
                            <option value="">Select ingredient</option>
                            {
                                allIngredient ?
                                    allIngredient.map((ingredient)=>{
                                        return(
                                            <option value={ingredient.name}>{ingredient.name}</option>
                                        )
                                    })
                                
                                :
                                <>
                                </>
                            }
                        </select>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-danger my-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default RecipeIngredient;