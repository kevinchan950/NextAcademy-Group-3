import React, { useState } from 'react'
import WesternBeginner from '../components/WesternBeginner';
import WesternExperience from '../components/WesternExperience';
import WesternPro from '../components/WesternPro';

const Western = () => {
    
    const [isRecipeBeginner, setIsRecipeBeginner] = useState(false)
    const [isRecipeExperience, setIsRecipeExperience] = useState(false)
    const [isRecipePro, setIsRecipePro] = useState(false)

    const handleRecipeBeginner = () => {
        setIsRecipeBeginner(true)
    }

    if (isRecipeBeginner){
        return <WesternBeginner setIsRecipeBeginner={setIsRecipeBeginner}/>
    }

    const handleRecipeExperience = () => {
        setIsRecipeExperience(true)
    }

    if (isRecipeExperience){
        return <WesternExperience setIsRecipeExperience={setIsRecipeExperience}/>
    }

    const handleRecipePro = () => {
        setIsRecipePro(true)
    }

    if (isRecipePro){
        return <WesternPro setIsRecipePro={setIsRecipePro}/>
    }

    return (
        <>
            <div style={{height:"93vh"}}>
                <div className="container-fluid hoverSection" style={{backgroundImage:"url(https://images.unsplash.com/photo-1543353071-873f17a7a088?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)", height:"31vh"}}>
                    <div className="Section">
                        <a className="text-decoration-none text-orange d-flex justify-content-center" style={{marginTop:"15vh"}} onClick={handleRecipeBeginner}>Beginner <i className="fas fa-leaf ml-1"></i></a>
                    </div>   
                </div>
                
                <div className="container-fluid hoverSection" style={{backgroundImage:"url(https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)", height:"31vh"}}>
                    <div className="Section">
                        <a className="text-decoration-none text-orange d-flex justify-content-center" style={{marginTop:"15vh"}} onClick={handleRecipeExperience}>Experience <i className="fas fa-hamburger ml-2"></i> </a>
                    </div> 
                </div>
                
                <div className="container-fluid hoverSection" style={{backgroundImage:"url(https://images.unsplash.com/photo-1614226317829-e2a948c67bd8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)", height:"31vh"}}>
                    <div className="Section">
                        <a className="text-decoration-none text-orange d-flex justify-content-center" style={{marginTop:"15vh"}} onClick={handleRecipePro}>Pro <i className="fas fa-pizza-slice ml-2"></i></a>
                    </div> 
                </div>
            </div>
        </>
    );
};

export default Western;