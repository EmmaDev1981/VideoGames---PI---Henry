import {React, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getAllGames, getGenres } from '../../actions/actions';

//*CSS
import imagen2 from '../../img/75zW.gif'
import './landing.css'

function Landing({getAllGames, getGenres}) {

  //* Cargo mi store
  useEffect(() => {
      getAllGames();
      getGenres();
  });

 
  return (
    <div className="landing-div">
    <div className="img-land">
      <img src={imagen2} alt=""/>
    </div>
      <Link to="/videogames"><button className="btn-enter">Ingresar</button></Link>
    </div>
  );
}

export default connect(null, {getAllGames, getGenres} )(Landing)