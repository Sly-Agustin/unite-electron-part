import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import loadingGif from '../assets/loading.gif'

const Register = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    email: ''
  })
  const [messages, setMessages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleInputDataChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = (data) => {
    const registerAccount = async() => {
      setIsLoading(true);
      try{
        // Change to env var received from electron in future refactor
        const response = await fetch(`${process.env.REACT_APP_HOST}/auth/register`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        if(response.ok){
          setMessages('Successfully saved');
          setRegistered(true);
          setIsLoading(false);
        }
        else{
          const responseFromServer = await response.json();
          if (responseFromServer.errCode === 101) {
            setMessages('Username already exists, try another one');
            setIsLoading(false);
          }
          if (responseFromServer.errCode === 102) {
            setMessages('An account associated to that email already exists');
            setIsLoading(false);
          }
        }
      }
      catch(err){
        setMessages('Something bad happened, try again later');
        setIsLoading(false);
      }
    }

    registerAccount();
  }

  return(
    <Fragment>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card dark-bg-no-hover">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <h2 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h2>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <input className="form-control bg-dark-hover border-0" 
                          type="email" 
                          placeholder="Email" 
                          {...register("email", {required: 'Email required', maxLength: {value: 100, message: 'Max length of email is 1000 characters'}})} 
                          onChange={handleInputDataChange}>
                        </input>
                        <p className="text-danger">{errors.email?.message}</p>
                      </div>  
                      <div className="d-flex flex-row align-items-center mb-4">
                        <input className="form-control bg-dark-hover border-0" placeholder="Username" 
                          {...register("username", {required: 'Username is required', minLength: {value: 5, message: 'Username must be at least 5 characters long'}})} 
                          onChange={handleInputDataChange}>
                        </input>
                        <p className="text-danger">{errors.username?.message}</p>
                      </div>  
                      <div className="d-flex flex-row align-items-center mb-4">
                        <input className="form-control bg-dark-hover border-0" type="password" placeholder="Password" 
                          {...register("password", {required: 'Password is required', minLength: {value: 6, message: 'Password must be at least 6 characters long'}})} 
                          onChange={handleInputDataChange}>
                        </input>
                        <p className="text-danger">{errors.password?.message}</p>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <button className="btn btn-primary">Register</button>
                      </div>    
                      <p>{messages}</p>
                      {registered && <Fragment>
                        <p>Return to <Link to="/login">login</Link></p>
                      </Fragment>}
                      {isLoading && 
                      <div className="container d-flex justify-content-center align-content-center">
                        <img src={loadingGif} width={200} height={200} alt="Loading..."></img>
                      </div>}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Register;