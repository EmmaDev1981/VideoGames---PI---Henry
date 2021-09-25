import axios from 'axios';

//* importo constantes
import { GET_ALL_GAMES,
         SEARCH_BY_NAME, 
         GET_VIDEOGAME_DETAIL,
         GET_GENRES,
         ORDER_BY } from './constantes'

//* carga todos los juegos
export function getAllGames() {
    return function(dispatch) {
        return axios.get('http://localhost:3001/videogames/')
        .then(res => {
            dispatch({type: GET_ALL_GAMES, payload: res.data})
        })
        .catch(err => {return err})
    }
}

//* carga todos los juegos buscados por nombre
export function searchByName(name) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/videogames?name=${name}`)
        .then(res => {

            dispatch({ type: SEARCH_BY_NAME, payload: res.data });
        })
        .catch(err => {return err})
    }
}

//* cargo los detalles del juego por ID
export function getVideogameDetail(id) {
    console.log(id)
    return function (dispatch) {
        axios.get(`http://localhost:3001/videogame/${id}`)
        .then(res => {

            dispatch({ type: GET_VIDEOGAME_DETAIL, payload: res.data });
        })
        .catch(err => {return err})
    }
}

//* cargo todos los generos
export function getGenres(){
	return function(dispatch){
		axios.get(`http://localhost:3001/genres`)
        .then(res => {

            dispatch({ type: GET_GENRES, payload: res.data });
        })
        .catch(err => {return err})
    }
}

//* ordenamiento
export function orderBy(order) {
    return function (dispatch) {
        dispatch({type: ORDER_BY, payload: order})
    }
}