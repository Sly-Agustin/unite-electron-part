import React, { useState, Fragment, useContext } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import loadingGif from '../assets/loading.gif'

import { AuthContext } from "./App";

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState();
  const [logged, setLogged] = useState(false);
  const {setIsLoggedOn} = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleInputDataChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = (data) => {
    const loginAccount = async () => {
      setIsLoading(true)
      try{
        const response = await fetch(`${process.env.REACT_APP_HOST}/auth/signin`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        });
        if(response.ok){
          const responseJson = await response.json();
          setMessages('Login complete!');
          setIsLoading(false);
          setIsLoggedOn(true);
          setLogged(true);
          localStorage.setItem('logged', true);
          localStorage.setItem('userId', responseJson.id);
        }
        else{
          setMessages('Login failed, check your credentials and try again')
        }
        setIsLoading(false);
      }
      catch(err){
        setMessages('Something bad happened, try again later '+err);
        setIsLoading(false);
      }
    }

    loginAccount();
  }

  return(
    <Fragment>
      <div className="container">
      <h1>Login</h1>
      <form className="row mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-3">
          <input 
            className="form-control bg-dark-hover"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: 'Username is required', 
              minLength: {value: 5, message: 'Username must be at least 5 characters long'},
            })}
            onChange={handleInputDataChange}
            
          >
          </input>
          <p className="text-danger">{errors.email?.message}</p>
        </div>
        <div className="col-md-3">
          <input 
            className="form-control bg-dark-hover"
            type="password"
            placeholder="Password"
            {...register("password", {required: 'Password is required', minLength: {value: 6, message: 'Password must be at least 6 characters long'}})}
            onChange={handleInputDataChange}
          >
          </input>
          <p className="text-danger">{errors.password?.message}</p>
        </div>
        <div className="col-md-3">
          <button className="btn button-dark">Login</button>
        </div>  
        <p>{messages}</p>
        {isLoading && 
        <div className="container d-flex justify-content-center align-content-center">
          <img src={loadingGif} width={200} height={200} alt="Loading..."></img>
        </div>}
        {logged && <Navigate replace to="/games" />}
      </form>
      </div>
    </Fragment>
  )
}

export default Login;