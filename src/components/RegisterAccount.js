import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    email: ''
  })

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleInputDataChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
      [event.target.lastName]: event.target.value
    })
  }

  const sendData = (event) => {
    event.preventDefault();
    setData({
      ...data,
      [event.target.username]: event.target.value,
      [event.target.password]: event.target.value,
      [event.target.email]: event.target.value
    })
    console.log('Data introduced for register: '+JSON.stringify(data))
  }

  // Dummy until api connection
  const onSubmit = (data) => {
    console.log(data)
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
      </form>
    </Fragment>
  )
}

export default Register;