import React, { Fragment, useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import loadingGif from '../assets/loading.gif'

const Mod = () => {
  const [mod, setMod] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getMod = async() => {
      try {
        const response = await fetch(`${process.env.REACT_APP_HOST}/mod/${id}`);
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

  const downloadFile = () => {
    const download = async () => {
      const response = await fetch(`${process.env.REACT_APP_HOST}/mod/${id}/file`)
      console.log(response)
      const responseBlob = await response.blob();
      
      const url = window.URL.createObjectURL(
        new Blob([responseBlob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${mod.name}.zip`,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    }

    download();
    
  }

  if(isLoading){
    return(
      <Fragment>
        <div className="container d-flex justify-content-center align-content-center">
          <img src={loadingGif} width={200} height={200} alt="Loading..."></img>
        </div>
      </Fragment>
    )
  }
  return(
    <Fragment>
      <h2>{mod.name}</h2>
      <p>Description:</p>
      <p>{mod.description}</p>
      {mod.additionalInfo && <p>Additional info: {mod.additionalInfo}</p>}
      <button onClick={downloadFile}>Download</button>
    </Fragment>
  )
}

export default Mod;