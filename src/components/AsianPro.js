import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AsianPro = ({setIsRecipePro}) => {
    
    const [recipePro, setRecipePro] = useState([])
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/api/v1/cuisines/Asian/recipes/pro`)
        .then(response=>{
            setRecipePro(response.data.data)
        })
    },[])

    const handleClose = () => {
        setIsRecipePro(false)
    }

    return (
        <>
            <div className="mb-5">
                <nav className="d-flex justify-content-between mt-3">
                    <div className="display-4 ml-5">
                        Asian Cuisine Recipes (Pro) 
                    </div>
                    <div className="mr-5"> 
                        <button className="btn btn-danger" style={{width:"5vw"}} onClick={handleClose}>X</button>
                    </div>
                </nav>

                <hr className="my-5" style={{borderBottom:"2px groove"}}/>

                <div className="px-5">
                    <div className="row">
                        <div className="col-lg-3 mb-3">
                            <div className="card">
                                {
                                    recipePro?
                                    <>
                                    {
                                        recipePro.map((recipe)=>{
                                            return (
                                                <>
                                                    <img src={recipe.image} />
                                                    <div className="card-body">
                                                        <h1 className="card-title">
                                                            {recipe.name}
                                                        </h1>
                                                        <Link to={`/recipe/${recipe.id}`} class="btn btn-info">Details</Link>
                                                    </div>
                                                </>           
                                            )
                                        })
                                    }
                                    </>
                                    :
                                    <>
                                        <h1>Sorry. There is currently no recipes for this difficulty level!</h1>
                                    </>               
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );  
};

export default AsianPro;