import {React, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getAllGames, getGenres } from '../../actions/actions';

//*CSS
import imagen from '../../img/landing.jpg'
import './landing.css'

function Landing({getAllGames, getGenres}) {

  //* Cargo mi store
  useEffect(() => {
      getAllGames();
      getGenres();
  });


  return (
    <div className="lading-div">
      <img src={imagen} alt=""/>
      <Link to="/videogames"><button className="btn-enter">Ingresar</button></Link>
    </div>
  );
}

export default connect(null, {getAllGames, getGenres} )(Landing)