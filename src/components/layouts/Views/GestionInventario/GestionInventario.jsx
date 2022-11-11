import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { main_invent_images } from '../../../../helpers/ImagesHelp';
import { Electricos } from "./ModalsComponents/Electricos";
import { Electronicos } from "./ModalsComponents/Electronicos";
import { Eleferre } from "./ModalsComponents/Eleferre";
import { Moddev } from "./ModalsComponents/Moddev";
import { Otros } from "./ModalsComponents/Otros";
import "./GestionInventario.css";

export const GestionInventario = () => {

  const [modal_type, setmodal_type] = useState("");
  const [modal_op, setmodal_op] = useState(false);
  
  return (
    <div className='cont_gest_invent'>

          <div className="header_gest_invent">

                <h1>{" Gestion Inventario "}</h1>

          </div>


          <div className="cont_buttons_ref_principal">

                <div className="sec_ref_btn">

                      <Link onClick={ () => { setmodal_type("electricos"); setmodal_op(true); } } className={"btn btn_ref_gest_invent animate__animated animate__zoomIn"}>
                        <img className='img_btn_gest_invent' src={ main_invent_images("./images/gestion_inventario/planta-de-energia.png") }/>
                        <h2>Electricos</h2>
                      </Link>

                      <Link onClick={ () => { setmodal_type("electronicos"); setmodal_op(true); } } className={"btn btn_ref_gest_invent animate__animated animate__zoomIn"}>
                        <img className='img_btn_gest_invent' src={ main_invent_images("./images/gestion_inventario/chip-de-computadora.png") }/>
                        <h2>Electronicos</h2>
                      </Link>

                      <Link onClick={ () => { setmodal_type("eleferre"); setmodal_op(true); } } className={"btn btn_ref_gest_invent animate__animated animate__zoomIn"}>
                        <img className='img_btn_gest_invent' src={ main_invent_images("./images/gestion_inventario/llave-inglesa.png") }/>
                        <h2>Elementos Ferreteria</h2>
                      </Link>

                </div>

                <div className="sec_ref_btn">

                      <Link onClick={ () => { setmodal_type("moddev"); setmodal_op(true); } } className={"btn btn_ref_gest_invent animate__animated animate__zoomIn"}>
                        <img className='img_btn_gest_invent' src={ main_invent_images("./images/gestion_inventario/tarjeta-madre.png") }/>
                        <h2>Modulos de Desarrollo</h2>
                      </Link>

                      <Link onClick={ () => { setmodal_type("otros"); setmodal_op(true); } } className={"btn btn_ref_gest_invent animate__animated animate__zoomIn"}>
                        <img className='img_btn_gest_invent' src={ main_invent_images("./images/gestion_inventario/caja-de-carton.png") }/>
                        <h2>Otros Varios</h2>
                      </Link>

                </div>

          </div>

          {
                ( modal_type === "electricos" ) 

              ?   <Electricos mdl={modal_op} evt={setmodal_op}/>

              : ( modal_type === "electronicos" )

              ?   <Electronicos mdl={modal_op} evt={setmodal_op}/>

              : ( modal_type === "eleferre" )

              ?   <Eleferre mdl={modal_op} evt={setmodal_op}/>

              : ( modal_type === "moddev" )

              ?   <Moddev mdl={modal_op} evt={setmodal_op}/>

              : ( modal_type === "otros" ) 

              &&  <Otros mdl={modal_op} evt={setmodal_op}/>
          }

    </div>
  )
}
