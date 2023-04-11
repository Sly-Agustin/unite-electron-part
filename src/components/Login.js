import React, { useState, Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState();
  const [logged, setLogged] = useState(false);

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
        const response = await fetch('http://localhost:5001/auth/signin', {
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
          setLogged(true);
          localStorage.setItem('logged', true);
          localStorage.setItem('userId', responseJson.id)
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
      <h1>Login screen</h1>
      <form className="row" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-3">
          <input 
            className="form-control"
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
            className="form-control"
            type="password"
            placeholder="Password"
            {...register("password", {required: 'Password is required', minLength: {value: 6, message: 'Password must be at least 6 characters long'}})}
            onChange={handleInputDataChange}
          >
          </input>
          <p className="text-danger">{errors.password?.message}</p>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary">Login</button>
        </div>  
        <p>{messages}</p>
        {isLoading && <p>Loging in...</p>}
        {logged && <Navigate replace to="/games" />}
      </form>
    </Fragment>
  )
}

export default Login;