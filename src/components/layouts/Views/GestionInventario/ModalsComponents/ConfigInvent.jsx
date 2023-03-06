import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { main_invent_images } from '../../../../../helpers/ImagesHelp';
import { Modal } from '../../../../pages/Modal/Modal';
import "./Components.css";

export const ConfigInvent = () => {

    const [config_action, setconfig_action] = useState(0);
    const [modal_random, setmodal_random] = useState(false);

    useEffect(() => { 

        if (config_action === 1) {

            setmodal_random(!modal_random);

        }else if (config_action === 2) {

            setmodal_random(!modal_random);

        }else if (config_action === 3) {

            setmodal_random(!modal_random);

        }else if ( modal_random === false ){

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
                    <h1 style={{ color:"rgb(57 180 45)" }}>1</h1>
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
                    <h1 style={{ color:"rgb(57 180 45)" }}>2</h1>
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
                    <h1 style={{ color:"rgb(57 180 45)" }}>3</h1>
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
        {
            (!!modal_random) &&
            <Modal close={setmodal_random}>

                <div style={{zIndex:"10000"}}>
                    <h1>{config_action}</h1>
                </div>

            </Modal>
        }
    </> 
  )
}