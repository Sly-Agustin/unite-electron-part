import React, { Fragment, useEffect, useState } from "react";
import {useParams} from 'react-router-dom'

const Mod = () => {
  const [mod, setMod] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getMod = async() => {
      try {
        const response = await fetch(`http://localhost:5001/mod/${id}`);
        const modJson = await response.json(); 
        setMod(modJson.data);
        setIsLoading(false);
      }
      catch(err){
        console.log('Something bad happened, try again later')
        setIsLoading(false);
      }
    }

    getMod();
  }, [])

  if(isLoading){
    return(
      <Fragment>
        <p>Loading...</p>
      </Fragment>
    )
  }
  return(
    <Fragment>
      <h2>{mod.name}</h2>
      <p>Description:</p>
      <p>{mod.description}</p>
      {mod.additionalInfo && <p>Additional info: {mod.additionalInfo}</p>}
    </Fragment>
  )
}

export default Mod;