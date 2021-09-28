//* importo constantes
import { GET_ALL_GAMES, 
         SEARCH_BY_NAME,
         GET_VIDEOGAME_DETAIL,
         GET_GENRES,
         ORDER_BY } from "../actions/constantes";

//* creo un objeto para iniciar el state
const initialState = {
    allGames: [],
    gamesBackUp: [],
    gameDetails: {},
    genres: []
};

//* creo el "reducer" que luego paso al store por argumento
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload, gamesBackUp: action.payload
            };
            case GET_VIDEOGAME_DETAIL:
                return {
                ...state,
                gameDetails: action.payload
            };
            case SEARCH_BY_NAME:
            return {
                ...state,
                allGames: action.payload
            };
            case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            };
            case ORDER_BY:
                if(action.payload === 'default'){
                    return {...state, allGames: state.gamesBackUp}
                }
                if(action.payload === 'A-Z'){
                    return {...state, allGames: [...state.gamesBackUp].sort((prev, next) => {
                    if(prev.name > next.name) return 1
                    if(prev.name < next.name) return -1
                    return 0
                    })}}
                if(action.payload === 'Z-A'){
                    return {...state, allGames: [...state.gamesBackUp].sort((prev, next) => {
                    if(prev.name > next.name) return -1
                    if(prev.name < next.name) return 1
                    return 0
                    })}}
                if(action.payload === 'desc'){
                    return {...state, allGames: [...state.gamesBackUp].sort((prev,next) => prev.rating - next.rating)}
                }
                if(action.payload === 'asc'){
                    return {...state, allGames: [...state.gamesBackUp].sort((prev,next) => next.rating - prev.rating)}
                }
                if(action.payload === 'DB'){
                    return {...state, allGames: state.gamesBackUp.filter((game)=> (typeof game.id) === 'string')}
                }
                if(action.payload === 'API'){
                    return {...state, allGames: state.gamesBackUp.filter((game)=> (typeof game.id) === 'number')}
                }
                else {
                     return {...state, allGames: state.gamesBackUp.filter((game) => {
                        return game.genres.find((genre) => {
                              return genre === action.payload})
                    })}    
                };
        default: 
            return state;
    }
};