import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <div className="navbar-div">
                <NavLink to="/videogames"><h3>Videogames</h3></NavLink>
                <NavLink to="/crearjuego"><h3>Crear Juego</h3></NavLink>
        </div>
    )
}

export default NavBar
