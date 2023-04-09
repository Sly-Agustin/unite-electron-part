import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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
        const response = await fetch('http://localhost:5001/auth/register', {
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
      <h1>Prototype register component</h1>
      <form className="row" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-3">
          <input className="form-control" 
            type="email" 
            placeholder="Email" 
            {...register("email", {required: 'Email required', maxLength: {value: 100, message: 'Max length of email is 1000 characters'}})} 
            onChange={handleInputDataChange}>
          </input>
          <p className="text-danger">{errors.email?.message}</p>
        </div>  
        <div className="col-md-3">
          <input className="form-control" placeholder="Username" 
            {...register("username", {required: 'Username is required', minLength: {value: 5, message: 'Username must be at least 5 characters long'}})} 
            onChange={handleInputDataChange}>
          </input>
          <p className="text-danger">{errors.username?.message}</p>
        </div>  
        <div className="col-md-3">
          <input className="form-control" type="password" placeholder="password" 
            {...register("password", {required: 'Password is required', minLength: {value: 6, message: 'Password must be at least 6 characters long'}})} 
            onChange={handleInputDataChange}>
          </input>
          <p className="text-danger">{errors.password?.message}</p>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary">Registrarse</button>
        </div>    
        <p>{messages}</p>
        {registered && <Fragment>
          <p>Return to <Link to="/login">login</Link></p>
        </Fragment>}
        {isLoading && <p>sending registration...</p>}
      </form>
    </Fragment>
  )
}

export default Register;