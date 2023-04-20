import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import noimage from '../assets/no-image-icon.png'
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
        <div className="container">
          <h1>Games available</h1>
          <div className="App">
            <h2>Loading...</h2>
            <div className="container d-flex justify-content-center align-content-center">
              <img src={loadingGif} width={200} height={200} alt="Loading..."></img>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  return(
    <Fragment>
      <div className="container">
      <h1>Games available</h1>
      <div className="container">      
        <div className="row">
          {
            data.games.map((game) => 
              <div className="col-sm-2 me-2">
                <div className="card border-dark bg-dark" key={game._id}> 
                  <Link className="text-decoration-none" to={`/games/${game._id}`}>
                    <div className="card-body ">
                      {game.picture && <img src={`${process.env.REACT_APP_HOST}/games/${game._id}/picture`} width={200} height={200} alt="couldn't get image"></img>}
                      {!game.picture && <img src={noimage} width={200} height={200} alt="couldn't get image"></img>}
                      <h5 className="card-title mt-2">{game.name}</h5> 
                    </div>
                  </Link>
                </div>
              </div>
            )
          }
        </div>
      </div>
      </div>
    </Fragment>
  )
  
}

export default AllGames;