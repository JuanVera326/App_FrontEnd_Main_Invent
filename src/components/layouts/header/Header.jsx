import React from 'react'
import { Link } from 'react-router-dom';
import { main_invent_images } from '../../../helpers/ImagesHelp'
import "./Header.css";

export const Header = () => {

  const handleCloseSesion = () => {

    localStorage.removeItem("usuario");
    window.location = "/";

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
