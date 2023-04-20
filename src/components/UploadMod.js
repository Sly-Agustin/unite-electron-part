import React, { useState, Fragment, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import loadingGif from '../assets/loading.gif'
import BackButton from "./BackButton";

const UploadMod = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gameData, setGameData] = useState();
  const [gameId, setGameId] = useState();
  const [data, setData] = useState();
  const [userId, setUserId] = useState('');
  const [messages, setMessages] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sendingMod, setSendingMod] = useState(false);

  const { id } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleInputDataChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const getGame = async() => {
      try{
        const response = await fetch(`${process.env.REACT_APP_HOST}/games/${id}`, {
          credentials: 'include'
        });
        const gameJson = await response.json(); 
        setUserId(userId);
        setGameId(gameJson._id);
        setGameData(gameJson);
        setIsLoading(false);        
      }
      catch(err){
        console.log('Something bad happened, try again later '+err);
        setIsLoading(false);
      }
    }

    getGame();
  }, [])

  useEffect(() => {
    setData({
      ...data,
      ownerId: userId
    })
  }, [gameData])

  useEffect(() => {
    setData({
      ...data,
      gameId: gameId
    })
  }, [gameId])
  
  const onSubmit = () => {
    const registerMod = async() => {
      try{
        setSendingMod(true);
        const response = await fetch(`${process.env.REACT_APP_HOST}/mod`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: 'include'
        });
        if(response.ok){
          const responseJson = await response.json();
          if(selectedImage!=null){
            const formData = new FormData();
            formData.append("file", selectedImage);
            await fetch(`${process.env.REACT_APP_HOST}/mod/${responseJson.id}/picture`, {
              method: "POST",
              body: formData,
              credentials: 'include'
            })
          }
          if(selectedFile!=null){
            const formDataFile = new FormData();
            formDataFile.append("file", selectedFile);
            await fetch(`${process.env.REACT_APP_HOST}/mod/${responseJson.id}/file`, {
              method: "POST",
              body: formDataFile,
              credentials: 'include'
            })
          }
          setMessages('Mod successfully sent!');
        }
        else{
          const error= await response.json()
          setSendingMod(false);
          setMessages('Error: '+error.message)
        }
        setSendingMod(false)
      }
      catch(err){
        console.log('Something bad happened, try again later');
      }
    } 

    registerMod();
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
        <h2>Uploading a mod for {gameData.name}</h2>

        <form /*className="row"*/ onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-3">
            <label for="modName">Mod name</label>
            <input className="form-control" 
              type="text" 
              placeholder="Enter name"
              id="modName" 
              {...register("name", {
                required: 'Mod name required', 
                minLength: {value: 3, message: 'Min length of mod name is 3 characters'}, 
                maxLength: {value: 100, message: 'Max length of mod name is 100 characters'}})} 
              onChange={handleInputDataChange}>
            </input>
            <p className="text-danger">{errors.name?.message}</p>
          </div>
          <div className="col-md-3">
            <label for="modDescription">Description</label>
            <textarea  className="form-control" 
              type="text" 
              placeholder="Enter description"
              id="modDescription" 
              {...register("description", {required: 'Mod description required', maxLength: {value: 10000, message: 'Max length of mod name is 10000 characters'}})} 
              onChange={handleInputDataChange}>
            </textarea>
            <p className="text-danger">{errors.description?.message}</p>
          </div>
          <div className="col-md-3">
            <label for="additionalInfo">Additional Info (any tips or things to install the mod)</label>
            <textarea  className="form-control" 
              type="text" 
              placeholder="Additional info"
              id="additionalInfo" 
              {...register("additionalInfo", {maxLength: {value: 10000, message: 'Max length is 10000 characters'}})} 
              onChange={handleInputDataChange}>
            </textarea>
            <p className="text-danger">{errors.additionalInfo?.message}</p>
          </div>
          <div className="col-md-3">
          <label for="picture">Mod picture (optional)</label>
            <input
              type="file"
              accept=".png, .jpg, .webp, jpeg"
              id="picture"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>
          <div className="col-md-3">
          <label for="modFile">Mod file</label>
            <input
              type="file"
              accept=".zip"
              id="modFile"
              name="myModFile"
              {...register("modFile", {required: 'You need to attach a mod file'})}
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedFile(event.target.files[0]);
              }}
            />
            <p className="text-danger">{errors.modFile?.message}</p>
          </div>
          <div className="col-md-3">
            {!sendingMod && <button className="btn button-dark mt-3">Send mod</button>}
            {sendingMod && <button className="btn button-dark mt-3" disabled>Send mod</button>}
          </div>  
          {sendingMod && <p>Sending mod...</p>}
          <p className="mt-3">{messages}</p>
        </form>
      </div>
    </Fragment>
  )
}

export default UploadMod;