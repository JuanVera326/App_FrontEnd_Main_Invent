import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { main_invent_images } from '../../../helpers/ImagesHelp';
import { Header } from '../../layouts/header/Header';
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { TbUserSearch } from "react-icons/tb";
import { MdOutlineInventory } from "react-icons/md";
import { Exception } from '../Not Found/Exception';
import { GestionInventario } from "../../layouts/Views/GestionInventario/GestionInventario";
import { GestionUsuarios } from "./../../layouts/Views/GestionUsuarios/GestionUsuarios";
import { Inventario } from "./../../layouts/Views/Inventario/Inventario";
import { Perfil } from "./../../layouts/Views/Perfil/Perfil";
import { ConfigInvent } from '../../layouts/Views/GestionInventario/ModalsComponents/ConfigInvent';
import { useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import "./Principal.css"

export const Principal = () => {

  const [user_data, setuser_data] = useState({});
  const [button_comp, setbutton_comp] = useState("home");
  const [config_space_invent, setconfig_space_invent] = useState(null);
  const [modal_alert, setmodal_alert] = useState(false);
  const [ubi, setubi] = useState(localStorage.getItem("ubicacion"));

  useEffect(() => { ( user_data.rol === 1 ) && !!ubi.ubicacion === null  ? setconfig_space_invent(true) : setconfig_space_invent(false); }, [ user_data ]);  
  useEffect(() => { if ( (button_comp === "inv_gest") && config_space_invent === false ){ setmodal_alert(true); }else{ setmodal_alert(false) } }, [button_comp]);
  useEffect(() => { if ( (!modal_alert && button_comp === "inv_gest") && user_data.rol === 1 ){ setbutton_comp("invent_config"); }else if (!modal_alert && user_data.rol === 3){ window.location = "/principal"; } }, [modal_alert]);

  useEffect(() => { 

    let user = JSON.parse(localStorage.getItem("usuario"));
    !!user && setuser_data(user);
    
  }, []);
    
  return (
    <div className='animate__animated animate__fadeIn'>
        { 
        ( user_data.rol === 0 ) 
          ? 
            <>
              <Exception/>
            </>
          :
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
                        { ( user_data.rol === 1 ) && <li><Link onClick={ () => { setbutton_comp( "usuarios_gest" ); console.log(button_comp); } } className={ ` a_principal ${( button_comp === "usuarios_gest" ) && "a_principal_active" } ` }><TbUserSearch/>Gestion usuarios</Link></li> }
                        { ( user_data.rol === 2 || user_data.rol === 3 ) && <li><Link onClick={ () => { setbutton_comp( "perfil" ) } } className={ ` a_principal ${( button_comp === "perfil" ) && "a_principal_active" } ` }><ImProfile/> Perfil</Link></li> }
                        { ( user_data.rol === 1 || user_data.rol === 3 ) && <li><Link onClick={ () => { setbutton_comp( "inv_gest" ) } } className={ ` a_principal ${( button_comp === "inv_gest" ) && "a_principal_active" } ` }><MdOutlineInventory/>Gestion inventario</Link></li> }
                        { ( user_data.rol === 1 ) && <li><Link onClick={ () => { setbutton_comp( "invent_config" ) } } className={ ` a_principal ${( button_comp === "invent_config" ) && "a_principal_active" } ` }><AiOutlineSetting/>Configuracion Inventario</Link></li> }

                        {
                          ( !!modal_alert ) &&
                          <Modal close={setmodal_alert}>
            
                            <div className="animate__animated animate__fadeInRight cont_decision" style={{ zIndex:"10000" }}>
                              <div>
                                  { 
                                    ( user_data.rol === 1 ) 
                                    ?
                                      <h1>{ "Antes de poder gestionar tu inventario Por Favor configura tu inventario!" }</h1>
                                    :
                                      <h1>{ "Antes de poder gestionar el inventario contacta el Administrador para configurar el inventario!" }</h1>
                                  }
                                  <br />

                                  <div className="cont_buttons_desha">
                                    <Link className='btn btn_invent' onClick={ () => { setmodal_alert(false); } }>Ok</Link>
                                  </div>

                              </div>
                            </div>
            
                          </Modal>
                        }

                      </ul>
                    </nav>
                  </div> 
                </div>

                <div className="container_invents">
                  
                  { ( button_comp === "home" ) && <Inventario user={user_data}/> }
                  { ( button_comp === "perfil" ) && <Perfil/> }
                  { ( button_comp === "usuarios_gest" ) && <GestionUsuarios/> }
                  { ( button_comp === "inv_gest" ) && <GestionInventario/> }
                  { ( button_comp === "invent_config" ) && <ConfigInvent/> }

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
    </div>
  )
}