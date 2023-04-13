import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import noimage from '../assets/no-image-icon.png'
import loadingGif from '../assets/loading.gif'
import cssFile from '../assets/css/index.css'

const SpecificGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mods, setMods] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [gameName, setGameName] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getMods = async() => {
      try{
        const response = await fetch(`${process.env.REACT_APP_HOST}/mod/game/${id}`, {
          credentials: 'include'
        });
        const modsJson = await response.json(); 
        setMods(modsJson);    
        const responseGame = await fetch(`${process.env.REACT_APP_HOST}/games/${id}`, {
          credentials: 'include'
        });
        const gameJson = await responseGame.json();
        setGameName(gameJson.name);
        setIsLoading(false);
      }
      catch(err){
        console.log('Something bad happened, try again later')
        setIsLoading(false);
      }
    }

    if (localStorage.getItem('logged')) {
      setIsLogged(true);
    }

    getMods();
  }, [])
  
  if(isLoading){
    return(
      <Fragment>
        <p>Specific game page</p>
        
        <div className="container d-flex justify-content-center align-content-center">
          <img src={loadingGif} width={200} height={200} alt="Loading..."></img>
        </div>
      </Fragment>
    )

  }

  return (
    <Fragment>
      <p>Specific game page</p>
      <p>Name: {gameName}</p>
      {isLogged && <p>Want to upload your mod? <Link className="btn btn-primary" to={`upload`}>yes</Link></p>}
      <div className="container d-flex">
        <div className="row">


        {
          mods.map((mod) => 
          <div className="col-6">
            <Link className="justify-content-center d-flex text-decoration-none" to={`/mod/${mod._id}`}>
              <div className="card w-100 dark-bg mb-3" key={mod._id} style={{width: "18rem"}}>
                <div className="row">
                  <div className="col-4">
                    {mod.picture && <img src={`${process.env.REACT_APP_HOST}/mod/${mod._id}/picture`} width={175} height={175} alt="couldn't get image"></img>}
                    {!mod.picture && <img src={noimage} width={200} height={200} alt="couldn't get image"></img>}
                  </div>  
                  <div className="col-8 p-3">
                  <h5 className="card-title text-white">{mod.name}</h5> 
                  </div>
                </div> 
                
              </div>
            </Link>
          </div>
          )
        }
        </div>
      </div>
    </Fragment>
  )
}

export default SpecificGame;