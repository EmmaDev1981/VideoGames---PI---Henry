import {React, useState} from 'react'
import NavBar from '../NavBar/NavBar'

import imageNewGame from '../../img/default_newgame.png'
import './CrearJuego.css'

function CrearJuego() {

    const [input, setInput] = useState(
        {
            name: '',
            description: '',
            released: '',
            rating: '',
            platforms: [],
            genres: [],
            image: imageNewGame
        });

    return (
        <div>
            <NavBar />
            <h2>Crear Juego</h2>
        </div>
    )
}

export default CrearJuego
