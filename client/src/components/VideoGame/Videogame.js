
import React from 'react'
import { Link } from 'react-router-dom'
import './videogame.css'


export default function Videogame(props) {
    return (
        <div className="container-game">
             <div className="game-div">
               {props.image ? <img src={`${props.image}`} alt="Videogame" className="Img"></img> : <img src="" alt="Videogame" className="Img"></img>}
            </div>
            <div className="title">
               {props.name}
            </div>
            <div className="infoCont">
                 <div className="infoContGenres">
                    {props.genres && props.genres.map((g, i) => { if(i < 3) <p>{g.name}</p> })}
                 </div>
                { props.id && <Link to={`/videogame/${props.id}`} className="Link"><button className="LinkButton">Detail</button></Link> }
            </div>
        </div>
    )
}