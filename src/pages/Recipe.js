import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Image from 'react-graceful-image'

const Recipe = () => {

    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    
    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/api/v1/cuisines/recipes/${id}`)
        .then(response=>{
            console.log(response.data.data.step)
            setRecipe(response.data.data)
        })
    },[id])
    return(
        <>
        {
            recipe?
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 mt-5">
                        <Image src={recipe.image} width={"100%"}/>
                    </div>
                    <div className="col-lg-6 mt-5">
                        <h1 className="display-1">{recipe.name}</h1>

                        <hr className="my-5" style={{borderBottom:"2px groove"}}/>

                        <div className="row">
                            <div className="col-lg-6">
                                Ingredients:
                                {
                                    recipe?
                                    (recipe.ingredient).map((i)=>{
                                        return(
                                            <p> - {i.name}</p>
                                        )
                                    })
                                    :
                                    <>
                                    </>   
                                }
                            </div>
                            <div className="col-lg-6">
                                Steps:
                                {
                                    recipe?
                                    (recipe.step).map((s)=>{
                                        return(
                                            <p>{s.number}) {s.description}</p>
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
            </div>
            :
            <>
            </>
        }
        </>
    );
};

export default Recipe