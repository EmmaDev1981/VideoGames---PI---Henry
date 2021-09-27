import {React, useEffect} from 'react'
import { connect }from 'react-redux'
import { getVideogameDetail } from '../../actions/actions'
import Navbar from '../NavBar/NavBar'
import photo from '../../img/notphoto.jpg'
import './gamedetail.css'

function GameDetails(props) {

    const {getVideogameDetail, gameDetails} = props
    const {idVideogame} = props.match.params;

    // me carga los details del juego
    useEffect(() => {
    getVideogameDetail(idVideogame);
    },[idVideogame])


    return (
        <div className="container-detail">
            <Navbar />
                <div className="details-div">
                    {gameDetails ? <div>
                        <h3 className="name">{gameDetails.name}</h3>
                        {gameDetails.background_image ? <img src={gameDetails.background_image} alt="Videogame" className="Img"></img> : <img src={photo} alt="Videogame" className="Img"></img>}
                        {/* <img src={gameDetails.background_image} alt="" /> */}
                        {<p className="">{`Release Date: ${gameDetails.releaseDate || 'None'}`}</p>}
                        <p className="">{`Rating: ★ ${gameDetails.rating}`}</p>
                    </div> : <h1>Cargando</h1>}
                    
                    {(gameDetails.description && gameDetails.genres && gameDetails.platforms) ? <div>
                        {<p className="">{gameDetails.description.replace(/(<([^>]+)>)/ig, '')}</p>}
                        {<p className="">{`Genres: ${gameDetails.genres.join(', ')}`}</p>}
                        {<p className="">{`Platforms: ${typeof gameDetails.platforms === 'string' ? gameDetails.platforms : gameDetails.platforms.join(', ')}`}</p>}
                    </div> : <h1>Cargando</h1>}
                </div>
        </div >
    )
}


const mapStateToProps = (state) => {
    return {
        gameDetails: state.gameDetails
    }
}

export default connect(mapStateToProps, {getVideogameDetail}) (GameDetails)