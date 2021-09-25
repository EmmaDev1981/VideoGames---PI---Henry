import React from 'react'
import NavBar from '../NavBar/NavBar'
import SearchBar from '../SearchBar/SearchBar'
import { connect } from 'react-redux'
import Videogame from '../VideoGame/Videogame'
import Pagination from '../Pagination/Pagination'

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
        <div>
            <NavBar/>
            <SearchBar/>
            <h1>home</h1>
            <Pagination cardPerPage={cardPerPage} totalCards={allGames.length} paginate={paginate} currentPage={currentPage} />
            {currentCards && currentCards.map((g) => <Videogame key={g.id} name={g.name} genres={g.genres} image={g.image} id={g.id}/>)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allGames: state.allGames
    }
}

export default connect(mapStateToProps, null) (Videogames)
