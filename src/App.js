import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Home from './pages/Home';
import SignUp from './pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { updateFavorites } from './services/authService';
import Favorites from './pages/Favorites';
import { login } from './services/authService';
import { getUserFavorites } from './services/authService';
import Hero from './components/hero';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [favorites, setFavorites] = useState([])

    useEffect (() => {
        const fetchFavorites = async() => {
            const userId = localStorage.getItem('id')
            if(userId) {
                setIsAuthenticated(true)
                const userFavorites = await getUserFavorites(userId)
                setFavorites(userFavorites)
            }
        }

        fetchFavorites()
    },[])

    async function handleLogin(user, password) {
        const result = await login(user, password)
        if(result.success){
            setIsAuthenticated(true) 
            setFavorites(result.favorites)
        } else {
            alert(result.message)
        }
    }

    function handleLogout() {
        localStorage.removeItem('id')
        setIsAuthenticated(false)
    }

    function handleAddToFavorites(city) {
        const updatedFavorites = [...favorites, city]
        setFavorites(updatedFavorites)
        const userId = localStorage.getItem('id')
        updateFavorites(userId,updatedFavorites)
    }

    return (
        <Router>
            <div>
                <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout}></Navbar>
                <Hero></Hero>
                <Routes>
                    <Route path='/' element={<Home isAuthenticated={isAuthenticated} onAddToFavorites={handleAddToFavorites}></Home>}></Route>
                    <Route path='/signup' element={<SignUp onSignUp={handleLogin}></SignUp>}></Route>
                    <Route path='/login' element={<Login onLogin={handleLogin}></Login>}></Route>
                    <Route path='/favorites' element={<Favorites favorites={favorites}></Favorites>} ></Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App;
