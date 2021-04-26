import React, { useState } from 'react'
import AsianBeginner from '../components/AsianBeginner';
import AsianExperience from '../components/AsianExperience';
import AsianPro from '../components/AsianPro';

const Asian = () => {
    
    const [isRecipeBeginner, setIsRecipeBeginner] = useState(false)
    const [isRecipeExperience, setIsRecipeExperience] = useState(false)
    const [isRecipePro, setIsRecipePro] = useState(false)

    const handleRecipeBeginner = () => {
        setIsRecipeBeginner(true)
    }

    if (isRecipeBeginner){
        return <AsianBeginner setIsRecipeBeginner={setIsRecipeBeginner}/>
    }

    const handleRecipeExperience = () => {
        setIsRecipeExperience(true)
    }

    if (isRecipeExperience){
        return <AsianExperience setIsRecipeExperience={setIsRecipeExperience}/>
    }

    const handleRecipePro = () => {
        setIsRecipePro(true)
    }

    if (isRecipePro){
        return <AsianPro setIsRecipePro={setIsRecipePro}/>
    }

    return (
        <>
            <div style={{height:"93vh"}}>
                <div className="container-fluid hoverSection" style={{backgroundImage:"url(https://images.unsplash.com/photo-1568899466260-b6d4e061856f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80)", height:"31vh"}}>
                    <div className="Section">
                        <a className="text-decoration-none text-orange d-flex justify-content-center" style={{marginTop:"15vh"}} onClick={handleRecipeBeginner}>Beginner <i class="fas fa-seedling ml-2"></i></a>
                    </div>   
                </div>
                
                <div className="container-fluid hoverSection" style={{backgroundImage:"url(https://images.unsplash.com/photo-1617692855027-33b14f061079?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)", height:"31vh"}}>
                    <div className="Section">
                        <a className="text-decoration-none text-orange d-flex justify-content-center" style={{marginTop:"15vh"}} onClick={handleRecipeExperience}>Experience <i class="fas fa-bread-slice ml-2"></i> </a>
                    </div> 
                </div>
                
                <div className="container-fluid hoverSection" style={{backgroundImage:"url(https://images.unsplash.com/photo-1547167292-af104438561d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2001&q=80)", height:"31vh"}}>
                    <div className="Section">
                        <a className="text-decoration-none text-orange d-flex justify-content-center" style={{marginTop:"15vh"}} onClick={handleRecipePro}>Pro <i class="fas fa-fish ml-2"></i></a>
                    </div> 
                </div>
            </div>
        </>
    );
};

export default Asian;