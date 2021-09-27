import React from 'react'
import { connect } from 'react-redux'
import { orderBy } from '../../actions/actions'
import './FilterBy.css'

function FilterBy({orderBy, genres}) {

    const handleSelect = (e) => {
        orderBy(e.target.value)
    }
    return (
        <div className='container-div'>
            <select  className="selectCont" onChange={handleSelect} name="" id="">
                <option value="default" selected>Order by default....</option>
                <optgroup label="Alphabetic">
                    <option value="A-Z">A - Z</option>
                    <option value="Z-A">Z - A</option>
                </optgroup>
                <optgroup label="Rating">
                    <option value="asc">Higher to lower</option>
                    <option value="desc">Lower to higher</option>
                </optgroup>
                <optgroup label="Genres">
                    {genres && genres.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
                </optgroup>                
            </select>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allGames: state.allGames,
        genres: state.genres
    }
}

export default connect(mapStateToProps, {orderBy})(FilterBy)