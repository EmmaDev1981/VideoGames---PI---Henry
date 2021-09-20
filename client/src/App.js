import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import CrearJuego from "./components/CrearJuego/CrearJuego";
import Landing from './components/Landing/Landing';
import Videogames from "./components/Videogames/Videogames";


function App() {
  return (
      <BrowserRouter>
          <Route exact path="/" component={Landing} />
          <Route exact path="/videogames" component={Videogames} />
          <Route exact path="/crearjuego" component={CrearJuego} />
      </BrowserRouter>
  );
}

export default App;
