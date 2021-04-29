import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { TokenContext } from '../App'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const RecipeEdit = ({setIsRecipeEdit}) => {
    
    const { token } = useContext(TokenContext)
    
    const handleClose = () => {
        setIsRecipeEdit(false)
    }

    const [cuisine, setCuisine] = useState("")
    const [allCuisine, setAllCuisine] = useState([])
    const [allRecipe, setAllRecipe] = useState([])
    const [recipeName, setRecipeName] = useState("")
    const [recipeDifficulty, setRecipeDifficulty] = useState("")
    const [recipeUpdateField, setRecipeUpdateField] = useState("")
    const [recipeUpdateContent, setRecipeUpdateContent] = useState("")
    const[imageFile, setImageFile] = useState(null)

    const handleUpload = (e) => {
        setImageFile(e.target.files[0])
    }  


    const handleAddSubmit = (e) => {
        e.preventDefault()
       
        let formData = new FormData();
        formData.append("image", imageFile)
        formData.append("recipe_name", recipeName)
        formData.append("recipe_difficulty", recipeDifficulty)

        axios({
            method: 'post',
            url: `https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/new`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            toast(`${recipeName} recipe has been successfully created!`,{
                autoClose:true,
                position:"top-right"
            })
            setIsRecipeEdit(false)
        })
        .catch(errors=>{
            toast(`Fail to add ingredient!`,{
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: `https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/delete`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                "recipe_name" : recipeName
            }
        })
        .then(response=>{
            toast(`${recipeName} has been successfully deleted from ${cuisine} cuisine!`,{
                autoClose:true,
                position:"top-right"
            })
            setIsRecipeEdit(false)
        })
        .catch(errors=>{
            toast(`Fail to delete ingredient!`,{
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append("recipe_name", recipeName)
        formData.append("update_field", recipeUpdateField)
        formData.append("update_content", recipeUpdateContent)
        if (recipeUpdateField == "name" || recipeUpdateField == "difficulty"){
            axios({
                method: 'post',
                url: `https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/update`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: formData
            })
            .then(response=>{
                toast(`${recipeUpdateField.toUpperCase()} has been successfully updated!`,{
                    autoClose:true,
                    position:"top-right"
                })
                setIsRecipeEdit(false)
            })
            .catch(errors=>{
                toast(`Fail to update ingredient!`,{
                    autoClose:true,
                    position:"top-right"
                })
            })
        }
        else if (recipeUpdateField == "image"){
            let formData = new FormData();
            formData.append("recipe_name", recipeName)
            formData.append("image", imageFile)
            formData.append("update_field", recipeUpdateField)
            axios({
                method: 'post',
                url: `https://provision-backend.herokuapp.com/api/v1/cuisines/${cuisine}/recipes/update`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: formData
            })
            .then(response=>{
                toast(`${recipeUpdateField.toUpperCase()} has been successfully updated!`,{
                    autoClose:true,
                    position:"top-right"
                })
                setIsRecipeEdit(false)
            })
            .catch(errors=>{
                toast(`Fail to update ingredient!`,{
                    autoClose:true,
                    position:"top-right"
                })
            })
        }
    }

    const handleCuisineSelection = (e) =>{
        setCuisine(e.target.value)
    }

    const handleCuisineRecipeSelection = (e) =>{
        setCuisine(e.target.value)

        axios.get(`https://provision-backend.herokuapp.com/api/v1/cuisines/${e.target.value}/recipes`)
        .then(response=>{
            setAllRecipe(response.data.data)
        })
        .catch(err=>{
            setAllRecipe("")
        })
    }

    const handleRecipeSelection = (e) =>{
        setRecipeName(e.target.value)
    }

    const handleUpdateRecipeSelection = (e) =>{
        setRecipeUpdateField(e.target.value)
    }

    const handleRecipeName = (e) =>{
        setRecipeName(e.target.value)
    }

    const handleRecipeDifficulty = (e) =>{
        setRecipeDifficulty(e.target.value)
    }

    const handleUpdateRecipe = (e) => {
        setRecipeUpdateContent(e.target.value)
    }

    useEffect(()=>{
        axios.get(`https://provision-backend.herokuapp.com/api/v1/cuisines`)
        .then(response=>{
            setAllCuisine(response.data.data)
        })

    },[])

    return(
        <>
            <div className="Form-container">
                <div className="Form-content">
                    <h1 className="text-center">Edit Recipe</h1>
                    <hr style={{borderBottom:"2px groove"}}/>
                    <div className="text-center">
                        {/* Add Recipe Section */}
                        <form onSubmit={handleAddSubmit}>
                            <h2 className="text-left font-weight-bolder">Add</h2>
                            <div className="form-group d-flex mt-3">
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
                                <label className="mr-3">Recipe Name:</label>
                                <input className="mr-3" type="text" name="name" onChange={handleRecipeName} style={{width:"15%"}}/>
                                <label className="mr-3">Recipe Image:</label>
                                <input className="btn btn-lg" type="file" onChange={handleUpload} name="upload_picture" style={{width:"13%"}}/>
                                <label className="mr-3">Difficulty:</label>
                                <select onChange={handleRecipeDifficulty} style={{width:"15%"}}>
                                    <option value="">Select difficulty: </option>
                                    <option value={"beginner"}>Beginner</option>
                                    <option value={"experienced"}>Experienced</option>
                                    <option value={"pro"}>Pro</option>
                                </select>
                            </div>
                                <button type="submit" className="btn btn-success my-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Add</button>
                        </form>

                        <hr style={{borderBottom:"2px groove"}}/>
                        {/* Delete Recipe Section */}
                        <form onSubmit={handleDeleteSubmit}>
                            <h2 className="text-left font-weight-bolder">Delete</h2>
                            <div className="form-group d-flex mt-3">
                                <label className="mr-3">Choose a cuisine: </label>
                                <select className="mr-3" style={{width:"15%"}} onChange={handleCuisineRecipeSelection}>
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
                                <button type="submit" className="btn btn-danger my-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Delete</button>
                            </div>
                        </form>

                        <hr style={{borderBottom:"2px groove"}}/>
                        {/* Update Recipe Section */}
                        <form onSubmit={handleUpdateSubmit}>
                            <h2 className="text-left font-weight-bolder">Update</h2>
                            <div className="form-group d-flex mt-3">
                                <label className="mr-3">Choose a cuisine: </label>
                                <select className="mr-3" style={{width:"12%"}} onChange={handleCuisineRecipeSelection}>
                                    <option value="">Select cuisine</option>
                                    {
                                        allCuisine.map((cuisine)=>{
                                            return(
                                                <option value={cuisine.name} name="name">{cuisine.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label className="mr-3">Choose a recipe: </label>
                                <select className="mr-3" style={{width:"12%"}} onChange={handleRecipeSelection}>
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
                                <label className="mr-3">Select a field to update:</label>
                                <select className="mr-3" onChange={handleUpdateRecipeSelection} style={{width:"12%"}}>
                                    <option value="">Select a field</option>
                                    <option value={"name"}>Name</option>
                                    <option value={"image"}>Image</option>
                                    <option value={"difficulty"}>Difficulty</option>
                                </select>
                                {
                                    recipeUpdateField == "name" ?
                                <>
                                    <label className="mr-3">New name: </label>
                                    <input className="mr-3" type="text" name="new_name" onChange={handleUpdateRecipe}/>
                                </>
                                :
                                <>
                                </>
                                }
                                {
                                    recipeUpdateField == "difficulty" ?
                                <>
                                    <label className="mr-3">Select difficulty: </label>
                                    <select onChange={handleUpdateRecipe} style={{width:"15%"}}>
                                        <option value="">Select difficulty</option>
                                        <option value={"beginner"}>Beginner</option>
                                        <option value={"experienced"}>Experienced</option>
                                        <option value={"pro"}>Pro</option>
                                    </select>                  
                                </>
                                :
                                <>
                                </>
                                }
                                {
                                    recipeUpdateField == "image" ?
                                <>
                                    <label className="mr-3">Recipe Image:</label>
                                    <input className="btn btn-lg" type="file" onChange={handleUpload} name="upload_picture" style={{width:"13%"}}/>                
                                </>
                                :
                                <>
                                </>
                                }
                            </div>
                            <button type="submit" className="ml-3 btn btn-secondary my-auto mx-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Update</button>
                        </form>

                        <hr style={{borderBottom:"2px groove"}}/>

                        <h2 className="text-left font-weight-bolder">Or Go To</h2>
                                <div className="mt-3">
                                    <Link to = "/recipe/ingredient"><button className="btn btn-info btn-lg" style={{ width:"20%", borderRadius : "12px"}}>Edit Recipe Ingredient</button></Link>
                                </div>
                                <div className="mt-3">
                                    <Link to ="/recipe/step"><button className="btn btn-info btn-lg" style={{ width:"20%", borderRadius : "12px"}}>Edit Recipe Steps</button></Link>
                                </div>
                        <hr style={{borderBottom:"2px groove"}}/>

                        <button className="btn btn-danger mt-3" style={{ width:"20%", borderRadius : "12px"}} onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecipeEdit