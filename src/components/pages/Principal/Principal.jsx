import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { main_invent_images } from '../../../helpers/ImagesHelp';
import { Header } from '../../layouts/header/Header';
import { AiOutlineHome } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { TbUserSearch } from "react-icons/tb";
import { MdOutlineInventory } from "react-icons/md";
import { Exception } from '../Not Found/Exception';
import { GestionInventario } from "../../layouts/Views/GestionInventario/GestionInventario";
import { GestionUsuarios } from "./../../layouts/Views/GestionUsuarios/GestionUsuarios";
import { Inventario } from "./../../layouts/Views/Inventario/Inventario";
import { Perfil } from "./../../layouts/Views/Perfil/Perfil";
import "./Principal.css"

export const Principal = () => {

  const [user_data, setuser_data] = useState(JSON.parse(localStorage.getItem("usuario")));
  const [button_comp, setbutton_comp] = useState("home");

  return (
    <div className='animate__animated animate__fadeIn'>
        {
        ( !!user_data ) && 
          <>
            <Header/>
                <div className='principal_comps'>
                  <div className='profile_cont_temp'>
                  <div className='profile_cont_child'>
                  <div className='cont_image_profile'>
                    <img className="PFP" src={user_data.imagen} alt="imagenuser"></img>
                  </div>
                      <div className="cont_text_profile">
                        <div className='str_profile'>
                          <h1 style={{color:"rgb(255, 203, 58)"}}>{user_data.nombre}</h1>
                          <p>{user_data.cargo}</p>
                        </div>
                      </div>
                      <nav className="menu">
                        <ul>
                          <li><Link onClick={ () => { setbutton_comp( "home" ) } } className={ ` a_principal ${( button_comp === "home" ) && "a_principal_active" } ` }><AiOutlineHome/> Inventario</Link></li>
                          <li><Link onClick={ () => { setbutton_comp( "perfil" ) } } className={ ` a_principal ${( button_comp === "perfil" ) && "a_principal_active" } ` }><ImProfile/> Perfil</Link></li>
                          { ( user_data.rol === 1 ) && <li><Link onClick={ () => { setbutton_comp( "usuarios_gest" ) } } className={ ` a_principal ${( button_comp === "usuarios_gest" ) && "a_principal_active" } ` }><TbUserSearch/>Gestion usuarios</Link></li> }
                          { ( user_data.rol === 1 ) && <li><Link onClick={ () => { setbutton_comp( "inv_gest" ) } } className={ ` a_principal ${( button_comp === "inv_gest" ) && "a_principal_active" } ` }><MdOutlineInventory/>Gestion inventario</Link></li> }
                        </ul>
                      </nav>
                    </div> 
                  </div>

                  <div className="container_invents">
                    
                    { ( button_comp === "home" ) && <Inventario user={user_data}/> }
                    { ( button_comp === "perfil" ) && <Perfil/> }
                    { ( button_comp === "usuarios_gest" ) && <GestionUsuarios/> }
                    { ( button_comp === "inv_gest" ) && <GestionInventario/> }

                  </div>

                </div>
                <footer className='footer'>
                    <img className='img4' src={main_invent_images("./images/home/logoSena.png")}/> 
                    <div className="cont_text_header">
                        <h1 className='footer_text'>Main invent</h1>  
                        <p className='copyright'>SENA CEAI 2022</p>
                    </div>
                </footer>
          </>
        }
        {
          ( !user_data ) && <Exception/>
        }
    </div>
  )
}
