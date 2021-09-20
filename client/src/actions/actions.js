import axios from 'axios';

//Constantes
export const GET_ALL_GAMES = 'GET_ALL_GAMES';

//importo todos los juegos de la API
export function getAllGames() {
    return function(dispatch) {
        return axios.get('http://localhost:3001/videogames/')
        .then(res => {
            dispatch({type: GET_ALL_GAMES, payload: res.data})
        })
        .catch(err => {return err})
    }
}  