import "react-toastify/dist/ReactToastify.min.css"
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import NavBar from './containers/NavBar'
import HomePage from './pages/HomePage'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Route } from 'react-router-dom'


function App() {
  
  const [token, setToken] = useState(localStorage.getItem("token"))
  return (
    <TokenContext.Provider value={{token, setToken}}>
        <ToastContainer />
        <NavBar />
        
        <Route exact path ="/">
          <HomePage />
        </Route>
    </TokenContext.Provider>
  );
}

export default App;
export const TokenContext = React.createContext()