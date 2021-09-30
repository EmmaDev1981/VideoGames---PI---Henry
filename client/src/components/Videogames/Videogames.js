import React, {useState, useEffect} from 'react'
import NavBar from '../NavBar/NavBar'
import SearchBar from '../SearchBar/SearchBar'
import { connect } from 'react-redux'
import Videogame from '../VideoGame/Videogame'
import Pagination from '../Pagination/Pagination'
import FilteredBy from '../FilterBy/FilterBy'
import './videogames.css'
import { getAllGames, getGenres } from '../../actions/actions'
import notFound from '../../img/llorando.gif'

function Videogames({allGames, getAllGames, getGenres }) {

    const [currentPage, setCurrentPage] = useState(1)
    const [cardPerPage] = useState(15)

    const indexOfLastCard = currentPage * cardPerPage
    const indexOfFirstCard = indexOfLastCard - cardPerPage;

    var currentCards;
    if(typeof allGames === 'string'){
        currentCards = allGames
    }else {
        currentCards = allGames.slice(indexOfFirstCard, indexOfLastCard)
    }
    
    const paginate = (pageNumber) => {
         setCurrentPage(pageNumber)
    }


    useEffect (() => {
        getAllGames()
        getGenres()
    }, [])

    return (
        <div className="container">
            <NavBar/>
            <SearchBar/>
            <FilteredBy />
            <Pagination cardPerPage={cardPerPage} totalCards={allGames.length} paginate={paginate} currentPage={currentPage} />
            <div className="games-div">
               {typeof currentCards === 'string' ? <div><img className="nonono" src={notFound} alt=""></img></div> : currentCards.map((g) => <Videogame key={g.id} name={g.name} rating={g.rating} genres={g.genres} image={g.background_image} id={g.id}/>)}
            </div>
            <Pagination cardPerPage={cardPerPage} totalCards={allGames.length} paginate={paginate} currentPage={currentPage} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allGames: state.filtered
    }
}

export default connect(mapStateToProps,{ getAllGames, getGenres }) (Videogames)
