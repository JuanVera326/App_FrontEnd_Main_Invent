import React from 'react'
import { Link } from 'react-router-dom';
import { main_invent_images } from '../../../helpers/ImagesHelp'
import "./Header.css";

export const Header = () => {

  const handleCloseSesion = () => {

    localStorage.removeItem("usuario");
    localStorage.removeItem("ubicacion");
    // window.location = "/"; //Tests
    window.location = "http://desktop-jfi9mo7/Main-Invent/";  //Production

  }

  return (
    <div className='header'>
        <img className='logo' src={main_invent_images("./images/home/pngegg.png")}></img> 
        <div className="cont_text_header">
            <h1 className='logotexto'>Main invent</h1> 
            <p className='texto'>"Mas orden, mas control"</p>
        </div>
            <Link onClick={handleCloseSesion} className={"btn a_close_sesion"}>Cerrar Sesión</Link>
    </div>
  )
}
