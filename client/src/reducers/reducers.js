//* importo constantes
import { GET_ALL_GAMES, 
         SEARCH_BY_NAME, 
         GET_VIDEOGAME_DETAIL,
         GET_GENRES } from "../actions/constantes";

//* creo un objeto para iniciar el state
const initialState = {
    allGames: [],
    gameDetails: {},
    searchedGame: [],
    genres: []
};

//* creo el "reducer" que luego paso al store por argumento
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload
            };
            case GET_VIDEOGAME_DETAIL:
                return {
                ...state,
                gameDetails: action.payload
            };
            case SEARCH_BY_NAME:
            return {
                ...state,
                searchedGame: action.payload
            };
            case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            };
        default: 
            return state;
    }
};