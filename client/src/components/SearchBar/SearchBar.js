import {React, useState} from 'react'
import { connect } from 'react-redux'
import { searchByName } from '../../actions/actions'
import './SearchBar.css'


function SearchBar({searchByName}) {

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

    return (
        <div className="searchbar-div">
            <input className="searchInput" name='buscar' placeholder="buscá tu juego..." onChange={handleInputChange} value={input.buscar}></input>
            <button className="btn" onClick={handleOnClick}>Buscar</button>
        </div>
    )
}

export default connect(null, { searchByName })(SearchBar)
