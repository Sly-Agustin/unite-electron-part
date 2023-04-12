import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import loadingGif from "../assets/loading.gif"

const AllGames = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // The empty array at the end is so we renderize this just the first time
  useEffect(() => {
    const getGames = async() => {
      try{
        const response = await fetch(`${process.env.REACT_APP_HOST}/games/all`);
        const games = await response.json(); 
        setData(games);
        setIsLoading(false);
      }
      catch(err){
        console.log('Something bad happened, try again later')
      }
    }

    getGames();
  }, []);

  if(isLoading){
    return(
      <Fragment>
        <h1>All games dummy</h1>
        <div className="App">
          <h2>Loading...</h2>
          <div className="container d-flex justify-content-center align-content-center">
            <img src={loadingGif} width={200} height={200} alt="Loading..."></img>
          </div>
        </div>
      </Fragment>
    )
  }

  return(
    <Fragment>
      <h1>All games dummy</h1>
      <div className="App">
        <h2>Juegos</h2>
        <ul> 
          {
            data.games.map((item, index) =>
              <li key={index}>
                <Link to={`/games/${item._id}`} state={{id: item._id, name: item.name}}>{item.name}</Link>
              </li>
            )
          }
        </ul>
      </div>
    </Fragment>
  )
  
}

export default AllGames;