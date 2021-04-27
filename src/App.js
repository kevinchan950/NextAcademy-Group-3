import "react-toastify/dist/ReactToastify.min.css"
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import NavBar from './containers/NavBar'
import Footer from './containers/Footer'
import HomePage from './pages/HomePage'
import MyProfile from './pages/MyProfile'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Route } from 'react-router-dom'
import Grocery from './pages/Grocery'
import CookBook from './pages/CookBook'
import RecipeStep from "./pages/RecipeStep";
import RecipeIngredient from "./pages/RecipeIngredient";
import AdminSignup from "./components/AdminSignup";
import Western from "./pages/Western";
import Asian from "./pages/Asian";
import Recipe from "./pages/Recipe";
import OrderIngredient from "./pages/OrderIngredient";


function App() {
  
  const [token, setToken] = useState(localStorage.getItem("token"))
  return (
    <TokenContext.Provider value={{token, setToken}}>
        <ToastContainer />
        <NavBar />
        <Route exact path ="/">
          <HomePage />
        </Route>

        <Route exact path ="/MyProfile">
          <MyProfile />
        </Route>

        <Route exact path ="/grocery">
          <Grocery />
        </Route>

        <Route exact path ="/cookbook">
          <CookBook />
        </Route>

        <Route exact path ="/cookbook/western">
          <Western />
        </Route>

        <Route exact path ="/cookbook/asian">
          <Asian />
        </Route>

        <Route exact path ="/recipe/ingredient">
          <RecipeIngredient />
        </Route>

        <Route exact path ="/recipe/step">
          <RecipeStep />
        </Route>

        <Route exact path ="/admin/signup">
          <AdminSignup />
        </Route>

        <Route exact path ="/recipe/:id">
          <Recipe />
        </Route>

        <Route exact path ="/order/:id">
          <OrderIngredient />
        </Route>

        <Footer />
    </TokenContext.Provider>
  );
}

export default App;
export const TokenContext = React.createContext()