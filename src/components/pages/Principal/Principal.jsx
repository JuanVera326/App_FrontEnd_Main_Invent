import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { main_invent_images } from '../../../helpers/ImagesHelp';
import { Header } from '../../layouts/header/Header';
import "./Principal.css"

export const Principal = () => {

  const [user_data, setuser_data] = useState(JSON.parse(localStorage.getItem("usuario")));

  return (
    <div>
        <Header/>

        <div className='profile_cont_temp'>
         <div className='profile_cont_child'>
            <div className='PFP_cont'>
              <img class="PFP" src={user_data.imagen} alt="imagenuser"></img>
            </div>
            <div className="cont_text_profile">
              <div className='str_profile'>
                <h1 style={{color:"rgb(255 198 28)"}}>{user_data.nombre}</h1>
                <p>{user_data.cargo}</p>
              </div>
            </div>
            <nav className="menu">
              <ul>
                <li><Link to="#" className='a_principal'><img src={main_invent_images("./images/principal/exportar.png")} className="img3"/> Inicio</Link></li>
                <li><Link to="#" className='a_principal'><img src={main_invent_images("./images/principal/avatar.png")} className="img3"/>Perfil</Link></li>
                <li><Link to="#" className='a_principal'><img src={main_invent_images("./images/principal/documentos.png")} className="img3"/>Gestion usuarios</Link></li>
                <li><Link to="#" className='a_principal'><img src={main_invent_images("./images/principal/camion2.png")} className="img3"/>Gestion inventario</Link></li>
              </ul>
            </nav>
          </div> 
        </div>
        <div className='principal_comps'></div>
        <footer className='footer'>
            <img className='img4' src={main_invent_images("./images/home/logoSena.png")}/> 
            <div className="cont_text_header">
                <h1 className='footer_text'>Main invent</h1>  
                <p className='copyright'>SENA CEAI 2022</p>
            </div>
            {/* <div className="waveWrapper waveAnimation">
              <div className="waveWrapperInner bgTop">
                <div className="wave waveTop" style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-top.png')"}}></div>
              </div>
              <div className="waveWrapperInner bgMiddle">
                <div className="wave waveMiddle" style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png')"}}></div>
              </div>
              <div className="waveWrapperInner bgBottom">
                <div className="wave waveBottom" style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png')"}}></div>
              </div>
            </div> */}
        </footer>
    </div>
  )
}
