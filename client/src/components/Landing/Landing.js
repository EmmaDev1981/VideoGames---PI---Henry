// import {React, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getAllGames, getGenres } from '../../actions/actions';
import './landing.css'

function Landing({getAllGames, getGenres}) {

  // useEffect(() => {
  //     getAllGames();
  //     getGenres();
  // });

 
  return (
    <div className="MyImage">
        <img className="theImage" src="" alt="" />
        <Link to="/videogames">
          <button className="myButton">INSERT COIN</button>
        </Link>
    </div>
  );
}

export default connect(null, {getAllGames, getGenres} )(Landing)