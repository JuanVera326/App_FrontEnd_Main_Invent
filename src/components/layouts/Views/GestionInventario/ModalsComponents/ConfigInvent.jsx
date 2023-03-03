import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { main_invent_images } from '../../../../../helpers/ImagesHelp';
import "./Components.css";

export const ConfigInvent = () => {

    const [config_action, setconfig_action] = useState(0);
    const [sectors, setsectors] = useState(0);
    const [bdgs, setbdgs] = useState(0);
    const [arms, setarms] = useState(0);


    useEffect(() => { 

        if (config_action === 1) {

            console.log(config_action);
            setconfig_action(0);

        }else if (config_action === 2) {

            console.log(config_action);
            setconfig_action(0);

        }else if (config_action === 3) {

            console.log(config_action);
            setconfig_action(0);

        }

    }, [config_action])
    

  return (
    <>
        <h1 style={{ marginLeft:"2rem", color:" rgb(0, 0, 0)" }}>{ "Configuracion de Inventario" }</h1>
        <div className='config_invent'>
            <br />
            <br />  
            <div className="sec_ref_btn">

                <div className="cont_card_config">
                    <h1>1</h1>
                    <br />
                    <div className={"btn btn_ref_config_invent animate__animated animate__zoomIn"}>
                        <img className='img_btn_gest_invent' src={ main_invent_images("./images/configuracion_inventario/almacen.png") }/>
                        <br />
                        <h2 style={{ color:"rgb(104 104 104)" }}>Sectores</h2>
                    </div>
                    <br />
                    <div className="cont_card_config_info">
                        <h1  style={{ color:"rgb(56 56 56)" }}>{ "Total Sectores Registrados: " }<span>{"5"}</span></h1>
                    </div>
                    <div className="cont_card_config_info">
                        <Link onClick={ () => {setconfig_action(1);} } className={"btn btn_config"}>Configurar</Link>
                    </div>
                </div>

                <div className="cont_card_config">
                    <h1>2</h1>
                    <br />
                    <div className={"btn btn_ref_config_invent animate__animated animate__zoomIn"}>
                        <img className='img_btn_gest_invent' src={ main_invent_images("./images/configuracion_inventario/deposito.png") }/>
                        <br />
                        <h2 style={{ color:"rgb(104 104 104)" }}>Bodegas</h2>
                    </div>
                    <br />
                    <div className="cont_card_config_info">
                        <h1 style={{ color:"rgb(56 56 56)" }}>{ "Total Bodegas Registradas: " }<span>{"5"}</span></h1>
                    </div>
                    <div className="cont_card_config_info">
                        <Link onClick={ () => {setconfig_action(2);} } className={"btn btn_config"}>Configurar</Link>
                    </div>
                </div>

                <div className="cont_card_config">
                    <h1>3</h1>
                    <br />
                    <div className={"btn btn_ref_config_invent animate__animated animate__zoomIn"}>
                        <img className='img_btn_gest_invent' src={ main_invent_images("./images/configuracion_inventario/rack.png") }/>
                        <br />
                        <h2 style={{ color:"rgb(104 104 104)" }}>Armarios</h2>
                    </div>
                    <br />
                    <div className="cont_card_config_info">
                        <h1 style={{ color:"rgb(56 56 56)" }}>{ "Total de Armarios Registrados: " }<span>{"25"}</span></h1>
                    </div>
                    <div className="cont_card_config_info">
                        <Link onClick={ () => {setconfig_action(3);} } className={"btn btn_config"}>Configurar</Link>
                    </div>
                </div>

            </div>
        </div>
    </> 
  )
}
