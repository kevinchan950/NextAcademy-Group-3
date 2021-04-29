import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify';
import { TokenContext } from '../App';

const RecipeStep =() =>{
    
    const { token } = useContext(TokenContext)

    const [allCuisine, setAllCuisine] = useState([])
    const [allRecipe, setAllRecipe] = useState([])
    const [recipeStep, setRecipeStep] = useState([])
    const [cuisine, setCuisine] = useState("")
    const [recipe, setRecipe] = useState("")
    const [stepNumber, setStepNumber] = useState("")
    const [stepDescription, setStepDescription] = useState("")

    const handleAddSubmit = (e) => {
        e.preventDefault()
        
        let formData = new FormData()
        formData.append("step_number", stepNumber)
        formData.append("step_description", stepDescription)
        axios({
            method: 'post',
            url: `https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/${recipe}/steps/new`,
            headers: {
                Authorization : `Bearer ${token}`   
            },
            data: formData
        })
        .then(response=>{
          toast("Step has been successfully created!", {
              autoClose:true,
              position:"top-right"
          })  
        })
        e.target[3].value=""
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append("step_number", stepNumber)
        axios({
            method: 'post',
            url: `https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/${recipe}/steps/delete`,
            headers:{
                Authorization : `Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            toast("Step has been successfully deleted!", {
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append("step_number", stepNumber)
        formData.append("new_description", stepDescription)
        axios({
            method:"post",
            url: `https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/${recipe}/steps/update`,
            headers:{
                Authorization : `Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            toast("Step has been successfully updated!", {
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

        axios({
            method:"get",
            url: `https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/${e.target.value}/steps`
        })
        .then(response=>{
            setRecipeStep(response.data.data)
        })
    }

    const handleStepNumber = (e) => {
        setStepNumber(e.target.value)
    }

    const handleStepDescription = (e) => {
        setStepDescription(e.target.value)
    }

    useEffect(()=>{
        axios.get(`https://provision-backend.herokuapp.com/api/v1/cuisines`)
        .then(response=>{
            setAllCuisine(response.data.data)
        })

    },[])

    return (
        <>
        <div className="px-4">
            <h1 className="display-4 mb-5">Editing Recipe Step: </h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={handleAddSubmit}>
                            <h2 className="text-left font-weight-bolder">Add Step</h2>
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
                                <label className="mr-3">Step number: </label>
                                <input className="mr-3" type="number" name="step_number" onChange={handleStepNumber} min={1} max={15}/>
                                <div className="mt-3">
                                    <label className="mr-3">Step description: </label>
                                    <textarea className="mr-3" type="text" name="step_description" onChange={handleStepDescription} style={{resize:"none"}} cols={"70"}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success my-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Add</button>
                        </form>

                        <hr style={{borderBottom:"2px groove"}}/>

                        <form onSubmit={handleDeleteSubmit}>
                            <h2 className="text-left font-weight-bolder">Delete Step</h2>
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
                                <label className="mr-3">Step number: </label>
                                <input className="mr-3" type="number" name="step_number" onChange={handleStepNumber} min={1} max={15}/>
                            </div>
                            <button type="submit" className="btn btn-danger my-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Delete</button>
                        </form>

                        <hr style={{borderBottom:"2px groove"}}/>

                        <form onSubmit={handleUpdateSubmit}>
                            <h2 className="text-left font-weight-bolder">Update Step</h2>
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
                                <label className="mr-3">Step number: </label>
                                <input className="mr-3" type="number" name="step_number" onChange={handleStepNumber} min={1} max={15}/>
                                <div className="mt-3">
                                    <label className="mr-3">New Step description: </label>
                                    <textarea className="mr-3" type="text" name="step_description" onChange={handleStepDescription} style={{resize:"none"}} cols={"70"}/>
                                </div>
                            </div>
                            <button type="submit" className="ml-3 mb-5 btn btn-secondary mx-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Update</button>
                        </form>
                    </div>

                    <div className="col-lg-6">
                        <h2 className="text-left font-weight-bolder">Steps</h2>
                        {
                            recipeStep?
                            recipeStep.map((step)=>{
                                return (
                                    <h2 className="mt-4">{step.step_number}. {step.step_description}</h2>
                                )
                            })
                            :
                            <>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default RecipeStep;