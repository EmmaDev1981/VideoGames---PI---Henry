import React from 'react';
import { Link } from 'react-router-dom';

import imagen from '../../img/landing.jpg'
import './landing.css'

function Landing() {


  // const dispatch = useDispatch();

  // //Cargo mi store, searchAllGames y processGames para trabajar con este último
  // useEffect(() => {
  //   let initial = async function() {
  //     await dispatch(getAllGames());
  //     await dispatch(getGenres());
  //     }
  //     initial();
  // }, []);


  return (
    <div className="lading-div">
      <img src={imagen} alt=""/>
      <Link to="/videogames"><button className="btn-enter">Ingresar</button></Link>
    </div>
  );
}

export default Landing;