import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { TokenContext } from '../App'

const UploadPicture = ({setIsUploadPage}) => {
    
    const { token } = useContext(TokenContext)
    const[imageFile, setImageFile] = useState(null)
    const handleUpload = (e) => {
        setImageFile(e.target.files[0])
    }   

    const history = useHistory()
    
    const handleUploadSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData();
        formData.append("image", imageFile)
        axios.post(`http://127.0.0.1:5000/api/v1/users/uploadImage`, formData,{
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response=>{
            history.push("/")
            setIsUploadPage(false)
        })
    }

    const handleClose = () => {
        setIsUploadPage(false)
    }

    return (
        <div className="Form-container">
            <div className="Form-content">
                <h1>Upload Profile Picture</h1>
                <div className="text-center">
                    <form onSubmit={handleUploadSubmit}>
                        <div className="form-group">
                            <input className="btn btn-lg" type="file" onChange={handleUpload} name="upload_picture"/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success" style={{ width:"30%", borderRadius : "12px"}}>Upload</button>
                        </div>
                    </form>
                    <button className="btn btn-danger mt-3" style={{ width:"30%", borderRadius : "12px"}} onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default UploadPicture;