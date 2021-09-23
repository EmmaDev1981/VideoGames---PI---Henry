import axios from 'axios';
import { GET_ALL_GAMES, SEARCH_BY_NAME, GET_VIDEOGAME_DETAIL } from './constantes'


export function getAllGames() {
    return function(dispatch) {
        return axios.get('http://localhost:3000/videogames/')
        .then(res => {
            dispatch({type: GET_ALL_GAMES, payload: res.data})
        })
        .catch(err => {return err})
    }
}

export function searchByName(name) {
    return function (dispatch) {
        return axios.get(`http://localhost:3000/videogames?name=${name}`)
        .then(res => {

            dispatch({ type: SEARCH_BY_NAME, payload: res.data });
        })
        .catch(err => {return err})
    }
}

export function getVideogameDetail(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3000/videogame/${id}`)
        .then(res => {

            dispatch({ type: GET_VIDEOGAME_DETAIL, payload: res.data });
        })
        .catch(err => {return err})
    }
}