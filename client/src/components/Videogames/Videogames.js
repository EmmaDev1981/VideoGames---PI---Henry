import React from 'react'
import NavBar from '../NavBar/NavBar'
import SearchBar from '../SearchBar/SearchBar'
import { connect } from 'react-redux'
import Videogame from '../VideoGame/Videogame'
import Pagination from '../Pagination/Pagination'
import FilterBy from '../FilterBy/FilterBy'
import './videogames.css'

function Videogames({allGames}) {

    const [currentPage, setCurrentPage] = React.useState(1)
    const [cardPerPage] = React.useState(15)

    const indexOfLastCard = currentPage * cardPerPage
    const indexOfFirstCard = indexOfLastCard - cardPerPage;
    var currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard)
    
    const paginate = (pageNumber) => {
         setCurrentPage(pageNumber)
    }

    return (
        <div className="container">
            <NavBar/>
            <SearchBar/>
            <FilterBy />
            <Pagination cardPerPage={cardPerPage} totalCards={allGames.length} paginate={paginate} currentPage={currentPage} />
            <div className="games-div">
               {currentCards && currentCards.map((g) => <Videogame key={g.id} name={g.name} genres={g.genres} image={g.background_image} id={g.id}/>)}
            </div>
            <Pagination cardPerPage={cardPerPage} totalCards={allGames.length} paginate={paginate} currentPage={currentPage} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allGames: state.allGames
    }
}

export default connect(mapStateToProps, null) (Videogames)
