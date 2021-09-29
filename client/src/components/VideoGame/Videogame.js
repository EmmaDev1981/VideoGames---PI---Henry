
import React from 'react'
import { Link } from 'react-router-dom'
import './videogame.css'
import photo from '../../img/notphoto.jpg'


export default function Videogame(props) {
    
    return (
        <div className="container-game">
            <div className="title">
               {props.name}
            </div>
             <div className="game-div">
               {props.image ? <img src={`${props.image}`} alt="Videogame" className="Img"></img> : <img src={photo} alt="Videogame" className="Img"></img>}
            </div>
                 <div className="infoRating">
                     {<p><strong>Rating</strong>: ★ {`${props.rating}`}</p>} 
                 </div>
                 <div className="infoContGenres">
                    {<p className=""><strong>Genres :</strong> {`${typeof props.genres === 'string' ? props.genres : props.genres.join(', ')}`}</p>}
                 </div>
                 <div className="div-button">
                { props.id && <Link to={`/videogame/${props.id}`} className="Link"><button className="LinkButton">Details</button></Link> }
                </div>
            </div>
    )
}