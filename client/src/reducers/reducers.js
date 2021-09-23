import { GET_ALL_GAMES, SEARCH_BY_NAME, GET_VIDEOGAME_DETAIL } from "../actions/constantes";


const initialState = {
    allGames: [],
    searchedGame: [],
    gameDetails: [],

}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload
            }
        case SEARCH_BY_NAME:
            return {
                ...state,
                searchedGame: action.payload
            }
        case GET_VIDEOGAME_DETAIL:
            return {
                ...state,
                gameDetails: action.payload
            }
    
        default: 
            return state;
    }
}