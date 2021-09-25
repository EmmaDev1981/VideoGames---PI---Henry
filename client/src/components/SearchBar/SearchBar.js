import {React, useState} from 'react'
import { connect } from 'react-redux'
import { searchByName, getAllGames } from '../../actions/actions'
import './SearchBar.css'


function SearchBar({searchByName, searchedGame, getAllGames, getGenres}) {

    const [input, setInput] = useState({
        buscar: ''
    })

    const handleInputChange = function(e) {
          setInput({
          [e.target.name]: e.target.value
        });
    }

    const handleOnClick = () => {
        searchByName(input.buscar)
        setInput({
            buscar: ''
        });
    }

    const handleOnClickAll = () => {
        getAllGames()
        setInput({
            buscar: ''
        });
    }

    return (
        <div className="searchbar-div">
            <input className="searchInput" name='buscar' placeholder="buscá tu juego..." onChange={handleInputChange} value={input.buscar}></input>
            <button className="btn" onClick={handleOnClick}>Buscar</button>
            <button className="btn" onClick={handleOnClickAll}>Todos</button>
        </div>
    )
}

function mapStatetoProps (state) {
    return {
        searchedGame: state.allGames
    }
}

export default connect(mapStatetoProps, { searchByName, getAllGames })(SearchBar)
