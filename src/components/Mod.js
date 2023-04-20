import React, { Fragment, useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import loadingGif from '../assets/loading.gif'
import BackButton from "./BackButton";

const Mod = () => {
  const [mod, setMod] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getMod = async() => {
      try {
        const response = await fetch(`${process.env.REACT_APP_HOST}/mod/${id}`);
        if(!response.ok){
          setIsLoading(false);
          setMessages('This game does not exist');
        }
        else{
          const modJson = await response.json(); 
          setMod(modJson.data);
          setIsLoading(false);  
        }    
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
        new Blob([responseBlob], {type: "application/zip"}),
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
      <div className="container">
        <BackButton />
        <h2>{mod.name}</h2>
        <div  className="d-flex justify-content-center align-content-center align-items-center">
          {mod.picture && <img src={process.env.REACT_APP_HOST+'/mod/'+mod._id+'/picture'}></img>}
        </div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
          </li>
          {mod.additionalInfo &&
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="additionalInfo-tab" data-bs-toggle="tab" data-bs-target="#additionalInfo" type="button" role="tab" aria-controls="additionalInfo" aria-selected="false">Additional information</button>
          </li>
          }        
        </ul>
        <div className="tab-content mt-3" id="myTabContent">
          <div className="tab-pane fade show active font-color-light" id="overview" role="tabpanel" aria-labelledby="overview-tab">{mod.description}</div>
          {mod.additionalInfo &&
            <div className="tab-pane fade font-color-light" id="additionalInfo" role="tabpanel" aria-labelledby="additionalInfo-tab">{mod.additionalInfo}</div>
          }
        </div>
        {messages && <p>{messages}</p>}
        {Object.entries(mod).length!=0 && <button className="mt-3 btn button-dark" onClick={downloadFile}>Download</button>}
      </div>
    </Fragment>
  )
}

export default Mod;