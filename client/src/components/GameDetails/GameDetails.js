import {React, useEffect} from 'react'
import { connect }from 'react-redux'
import { getVideogameDetail } from '../../actions/actions'
import Navbar from '../NavBar/NavBar'

function GameDetails(props) {

    const {getgameDetails, gameDetails} = props
    const {idVideogame} = props.match.params;

    // me carga los details del juego
    useEffect(() => {
    getgameDetails(idVideogame);
    },[])


    return (
        <div className="">
            <Navbar />
            <div className="">
                <div className="">
                    {gameDetails ? <div>
                        <h3 className="">{gameDetails.name}</h3>
                        <img className="" src={gameDetails.background_image || 'https://myvideogamelist.com/assets/images/default.png'} alt="" />
                        <p className="">{gameDetails.description.replace(/(<([^>]+)>)/ig, '')}</p>
                        <p className="">{`Genres: ${gameDetails.genres.join(', ')}`}</p>
                        <p className="">{`Platforms: ${typeof gameDetails.platforms === 'string' ? gameDetails.platforms : gameDetails.platforms.join(', ')}`}</p>
                        <p className="">{`Release Date: ${gameDetails.releaseDate || 'None'}`}</p>
                        <p className="">{`Rating: ★ ${gameDetails.rating}`}</p>
                    </div> : <h1>Cargando</h1>}
                </div>
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