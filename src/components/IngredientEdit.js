import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { TokenContext } from '../App'

const IngredientEdit = ({setIsIngredientEdit}) => {
    
    const { token } = useContext(TokenContext)

    const [imageFile,setImageFile] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [ingredientType, setIngredientType] = useState("")
    const [allIngredient, setAllIngredient] = useState([])

    const [ingredientUpdateField, setIngredientUpdateField] = useState("")
    const [updateContent, setUpdateContent] = useState("")

    const handleClose = () => {
        setIsIngredientEdit(false)
    }

    const handleAddSubmit = (e) => {
        
        e.preventDefault()
        const ingredientType = "frozen"
        let formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("stock", stock)
        formData.append("ingredient_type", ingredientType)
        formData.append("image",imageFile)
        
        axios({
            method:"POST",
            url:"https://provision-backend.herokuapp.com/api/v1/ingredients/new",
            headers:{
                Authorization:`Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            toast("Ingredient has been added successfully!",{
                autoClose:true,
                position:"top-right"
            })
            setIsIngredientEdit(false)
        })
        .catch(errors=>{
            toast("Fail to add ingredient!",{
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append("name",name)

        axios({
            method:"POST",
            url:"https://provision-backend.herokuapp.com/api/v1/ingredients/delete",
            headers:{
                Authorization:`Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            toast("Ingredient has been deleted successfully!",{
                autoClose:true,
                position:"top-right"
            })
            setIsIngredientEdit(false)
        })
        .catch(errors=>{
            toast("Fail to delete ingredient!",{
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        console.log(ingredientUpdateField)
        console.log(updateContent)
        console.log(name)
        let formData = new FormData()
        if (ingredientUpdateField=="image"){
            formData.append("update_field", ingredientUpdateField)
            formData.append("update_content", imageFile)
            formData.append("name", name)
        }
        else{
            formData.append("update_field", ingredientUpdateField)
            formData.append("update_content", updateContent)
            formData.append("name", name)
        }

        axios({
            method:"post",
            url:"https://provision-backend.herokuapp.com/api/v1/ingredients/update",
            headers:{
                Authorization:`Bearer ${token}`
            },
            data: formData
        })
        .then(response=>{
            toast("Ingredient has been updated successfully!",{
                autoClose:true,
                position:"top-right"
            })
            setIsIngredientEdit(false)
        })
        .catch(errors=>{
            toast("Fail to update ingredient!",{
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleSelection = (e) => {
        setIngredientType(e.target.value)
    }

    const handleUpdateSelection = (e) => {
        setUpdateContent(e.target.value)
    }

    const handleIngredientSelection = (e) => {
        setName(e.target.value)
    }

    const handleUpdateField = (e) => {
        setIngredientUpdateField(e.target.value)
    }

    const handleUpload = (e) => {
        setImageFile(e.target.files[0])
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleUpdateContent = (e) => {
        setUpdateContent(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    const handleStock = (e) => {
        setStock(e.target.value)
    }

    useEffect(()=>{
        axios.get(`https://provision-backend.herokuapp.com/api/v1/ingredients`)
        .then(response=>{
            setAllIngredient(response.data.data)
        })
    },[])

    return(
        <>
            <div className="Form-container">
                <div className="Form-content">
                    <h1 className="text-center">Edit Ingredient</h1>
                    <hr style={{borderBottom:"2px groove"}}/>
                    <div className="text-center">
                        {/* Add Ingredient Section */}
                        <form onSubmit={handleAddSubmit}>
                            <h2 className="text-left font-weight-bolder">Add</h2>
                            <div className="form-group d-flex flex-wrap mt-3">
                                <label className="mr-3">Ingredient Name:</label>
                                <input className="mr-3 mb-3" type="text" style={{width:"20%"}} onChange={handleName}/>
                                <label className="mr-3">Ingredient Description:</label>
                                <input className="mr-3 mb-3" type="text" style={{width:"40%"}} placeholder="Type 'none' if no description" onChange={handleDescription}/>
                                <label className="mr-3">Ingredient Price:</label>
                                <input className="mr-3 mb-3" type="number" min="0" step="0.01" style={{width:"7%"}} onChange={handlePrice} placeholder="RM"/>
                                <label className="mr-3">Ingredient Stock:</label>
                                <input className="mr-3 mb-3" type="number" min="1" style={{width:"7%"}} onChange={handleStock}/>
                                <label className="mr-3">Choose Ingredient Type: </label>
                                <select className="mr-3" style={{width:"12%"}} onChange={handleSelection}>
                                    <option value="frozen">Select Type</option>
                                </select>
                                <label className="mr-3">Recipe Image:</label>
                                <input className="btn btn-lg" type="file" onChange={handleUpload} name="upload_picture" style={{width:"13%"}}/>
                            </div>
                            <button type="submit" className="btn btn-success" style={{ width:"20%", borderRadius : "12px", height:"10%"}}>Add</button>
                        </form>

                        <hr style={{borderBottom:"2px groove"}}/>

                        {/* Delete Ingredient Section */}
                        <form onSubmit={handleDeleteSubmit}>
                        <h2 className="text-left font-weight-bolder">Delete</h2>
                            <div className="form-group d-flex mt-3">
                                <label className="mr-3">Choose an Ingredient: </label>
                                <select className="mr-3" style={{width:"15%"}} onChange={handleIngredientSelection}>
                                    <option value="">Select Ingredient</option>
                                    {
                                        allIngredient.map((ingredient)=>{
                                            return(
                                                <option value={ingredient.name}>{ingredient.name}</option>
                                            )
                                        })
                                    }
                                </select>                       
                                <button type="submit" className="btn btn-danger my-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Delete</button>
                            </div>
                        </form>

                        <hr style={{borderBottom:"2px groove"}}/>

                        <form onSubmit={handleUpdateSubmit}>
                        <h2 className="text-left font-weight-bolder">Update</h2>
                            <div className="form-group d-flex mt-3">
                            <label className="mr-3">Choose an Ingredient: </label>
                            <select className="mr-3" style={{width:"15%"}} onChange={handleIngredientSelection}>
                                    <option value="">Select Ingredient</option>
                                    {
                                        allIngredient.map((ingredient)=>{
                                            return(
                                                <option value={ingredient.name}>{ingredient.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label className="mr-3">Select a field to update:</label>
                                <select className="mr-3" onChange={handleUpdateField} style={{width:"12%"}}>
                                    <option value="">Select a field</option>
                                    <option value={"new_name"}>Name</option>
                                    <option value={"image"}>Image</option>
                                    <option value={"price"}>Price</option>
                                    <option value={"stock"}>Stock</option>
                                    <option value={"ingredient_type"}>Ingredient Type</option>
                                    <option value={"description"}>Description</option>
                                </select>
                                {
                                    ingredientUpdateField == "new_name" ?
                                <>
                                    <label className="mr-3">New name: </label>
                                    <input className="mr-3" type="text" name="new_name" onChange={handleUpdateContent}/>
                                </>
                                :
                                <>
                                </>
                                }
                                {
                                    ingredientUpdateField == "price" ?
                                <>
                                    <label className="mr-3">New Price: </label>
                                    <input className="mr-3" type="number" min="0" step="0.01" placeholder="RM" name="new_price" onChange={handleUpdateContent}/>
                                </>
                                :
                                <>
                                </>
                                }
                                {
                                    ingredientUpdateField == "description" ?
                                <>
                                    <label className="mr-3">New Description: </label>
                                    <input className="mr-3" type="text" name="new_description" onChange={handleUpdateContent}/>               
                                </>
                                :
                                <>
                                </>
                                }
                                {
                                    ingredientUpdateField == "stock" ?
                                <>
                                    <label className="mr-3">New Stock Number: </label>
                                    <input className="mr-3" type="number" min="1" name="new_stock" onChange={handleUpdateContent}/>               
                                </>
                                :
                                <>
                                </>
                                }
                                {
                                    ingredientUpdateField == "ingredient_type" ?
                                <>
                                    <label className="mr-3">New Ingredient Type: </label>
                                    <select className="mr-3" style={{width:"12%"}} onChange={handleUpdateSelection}>
                                        <option value="frozen">Select Type</option>
                                    </select>                 
                                </>
                                :
                                <>
                                </>
                                }
                                {
                                    ingredientUpdateField == "image" ?
                                <>
                                    <label className="mr-3">New Image: </label>
                                    <input className="btn btn-lg" type="file" onChange={handleUpload} name="upload_picture" style={{width:"13%"}}/>                
                                </>
                                :
                                <>
                                </>
                                }
                            </div>
                            <button type="submit" className="btn btn-secondary my-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Update</button>
                        </form>

                        <hr style={{borderBottom:"2px groove"}}/>

                        <button className="btn btn-danger mt-3" style={{ width:"30%", borderRadius : "12px"}} onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IngredientEdit