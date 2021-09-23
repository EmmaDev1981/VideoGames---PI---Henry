import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/reducers';
import thunk  from 'redux-thunk';

//* utilizo thunk (middleware) para manejar las acciones Asincronas
const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//* creo el store y le paso reducer y compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store