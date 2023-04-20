import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link, useParams } from 'react-router-dom'
import noimage from '../assets/no-image-icon.png'
import loadingGif from '../assets/loading.gif'
import cssFile from '../assets/css/index.css'
import { AuthContext } from "./App";

const SpecificGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mods, setMods] = useState([]);
  const [gameName, setGameName] = useState();
  const {isLoggedOn} = useContext(AuthContext);

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

    getMods();
  }, [])
  
  if(isLoading){
    return(
      <Fragment>
        <div className="container d-flex justify-content-center align-content-center">
          <img src={loadingGif} width={200} height={200} alt="Loading..."></img>
        </div>
      </Fragment>
    )

  }

  return (
    <Fragment>
      <div className="container">
      <h2 className="mb-4">Viewing mods for {gameName}</h2>
      {isLoggedOn && <p>Want to upload your mod? <Link className="btn button-dark ms-4" to={`upload`}>Let's do it!</Link></p>}
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
                  {mod.description && mod.description.slice(150)!=[] && <p>{mod.description.slice(0,150)}...</p>}
                  {mod.description && mod.description.slice(150)==[] && <p>{mod.description}</p>}
                  </div>
                </div> 
                
              </div>
            </Link>
          </div>
          )
        }
        </div>
      </div>
      </div>
    </Fragment>
  )
}

export default SpecificGame;