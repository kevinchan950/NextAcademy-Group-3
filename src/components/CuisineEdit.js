import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { TokenContext } from '../App'

const CuisineEdit = ({setIsCuisineEdit}) => {
    
    const { token } = useContext(TokenContext)
    const [allCuisine,setAllCuisine] = useState([])
    const [cuisineName, setCuisineName] = useState("")
    const [cuisineUpdateName, setCuisineUpdateName] = useState("")

    const handleClose = () => {
        setIsCuisineEdit(false)
    }

    const handleAddSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'https://provision-backend.herokuapp.com/api/v1/cuisines/new',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                "name" : cuisineName
            }
        })
        .then(response=>{
            toast(`${cuisineName} cuisine has been successfully created!`,{
                autoClose:true,
                position:"top-right"
            })
            setIsCuisineEdit(false)
        })
        .catch(errors=>{
            toast(`Fail to add cuisine!`,{
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleDeleteSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'https://provision-backend.herokuapp.com/api/v1/cuisines/delete',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                "name" : cuisineName
            }
        })
        .then(response=>{
            toast(`${cuisineName} cuisine has been successfully deleted!`,{
                autoClose:true,
                position:"top-right"
            })
            setIsCuisineEdit(false)
        })
        .catch(errors=>{
            toast(`Fail to delete cuisine!`,{
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'https://provision-backend.herokuapp.com/api/v1/cuisines/update',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                "name" : cuisineName,
                "new_name" : cuisineUpdateName
            }
        })
        .then(response=>{
            toast(`${cuisineName} cuisine has been successfully updated!`,{
                autoClose:true,
                position:"top-right"
            })
            setIsCuisineEdit(false)
        })
        .catch(errors=>{
            toast(`Fail to update cuisine!`,{
                autoClose:true,
                position:"top-right"
            })
        })
    }

    const handleSelection = (e) =>{
        setCuisineName(e.target.value)
    }

    const handleCuisineName = (e) =>{
        setCuisineName(e.target.value)
    }

    const handleUpdateCuisineName = (e) => {
        setCuisineUpdateName(e.target.value)
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
                    <h1 className="text-center">Edit Cuisine</h1>
                    <hr style={{borderBottom:"2px groove"}}/>
                    <div className="text-center">
                        <form onSubmit={handleAddSubmit}>
                            <h2 className="text-left font-weight-bolder">Add</h2>
                            <div className="form-group d-flex mt-3">
                                <label className="mr-3">Cuisine Name:</label>
                                <input className="mr-3" type="text" name="name" onChange={handleCuisineName}/>
                                <button type="submit" className="btn btn-success my-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Add</button>
                            </div>
                        </form>
                        <hr style={{borderBottom:"2px groove"}}/>
                        <form onSubmit={handleDeleteSubmit}>
                            <h2 className="text-left font-weight-bolder">Delete</h2>
                            <div className="form-group d-flex mt-3">
                                <label className="mr-3">Choose a cuisine: </label>
                                <select className="mr-3" style={{width:"20%"}} onChange={handleSelection}>
                                    <option value="">Select your cuisine</option>
                                    {
                                        allCuisine.map((cuisine)=>{
                                            return(
                                                <option value={cuisine.name}>{cuisine.name}</option>
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
                                <label className="mr-3">Choose a cuisine: </label>
                                <select className="mr-3" style={{width:"20%"}} onChange={handleSelection}>
                                    <option value="">Select your cuisine</option>
                                    {
                                        allCuisine.map((cuisine)=>{
                                            return(
                                                <option value={cuisine.name} name="name">{cuisine.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label className="mr-3">New Name:</label>
                                <input className="mr-3" type="text" name="new_name" onChange={handleUpdateCuisineName}/>
                                <button type="submit" className="btn btn-secondary my-auto" style={{ width:"20%", borderRadius : "12px", height:"100%"}}>Update</button>
                            </div>
                        </form>

                        <hr style={{borderBottom:"2px groove"}}/>
                        
                        <button className="btn btn-danger mt-3" style={{ width:"20%", borderRadius : "12px"}} onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CuisineEdit