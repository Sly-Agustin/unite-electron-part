import React, { useState, Fragment, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import loadingGif from '../assets/loading.gif'

const UploadMod = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gameData, setGameData] = useState();
  const [gameId, setGameId] = useState();
  const [data, setData] = useState();
  const [userId, setUserId] = useState('');
  const [messages, setMessages] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

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
        const response = await fetch(`${process.env.REACT_APP_HOST}/mod`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: 'include'
        });
        if(response.ok){
          setMessages('Mod successfully sent!');
          const responseJson = await response.json();
          if(selectedImage!=null){
            const formData = new FormData();
            formData.append("file", selectedImage);
            const responseImage = await fetch(`${process.env.REACT_APP_HOST}/mod/${responseJson.id}/picture`, {
              method: "POST",
              body: formData,
              credentials: 'include'
            })
          }
        }
        else{
          const error= await response.json()
          setMessages('Error: '+error.message)
        }
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
      <p>Upload mod screen of game {gameData.name}</p>

      <form /*className="row"*/ onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-3">
          <label for="modName">Mod name</label>
          <input className="form-control" 
            type="text" 
            placeholder="Enter name"
            id="modName" 
            {...register("name", {required: 'Mod name required', maxLength: {value: 100, message: 'Max length of mod name is 100 characters'}})} 
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
          <p className="text-danger">{errors.description?.message}</p>
        </div>
        <div className="col-md-3">
        <label for="picture">Mod picture (optional)</label>
          <input
            type="file"
            id="picture"
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary">Send mod</button>
        </div>  
        <p>{messages}</p>
      </form>
    </Fragment>
  )
}

export default UploadMod;