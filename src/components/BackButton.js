import React, { Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import back from '../assets/back.svg'

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <button className="btn font-color-light" onClick={()=>navigate(-1)}><img src={back} height={30}width={30}></img> Back</button>
    </Fragment>
  )
}

export default BackButton;