import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ubi_get, ubi_post } from '../../../../../helpers/api/UbiRequest';
import { main_invent_images } from '../../../../../helpers/ImagesHelp';
import { Modal } from '../../../../pages/Modal/Modal';
import { Input } from '../../../../ui/Input/Input';
import "./Components.css";

export const ConfigInvent = () => {

    const user = JSON.parse(localStorage.getItem("usuario"));
    const [config_action, setconfig_action] = useState(0);
    const [modal_random, setmodal_random] = useState(false);
    const [find, setfind] = useState("");
    const [prev_ubi, setprev_ubi] = useState({});
    const [input_sectors, setinput_sectors] = useState(null);
    const [input_warehouses, setinput_warehouses] = useState(null);
    const [input_racks, setinput_racks] = useState(null);
    const [getubi, setgetubi] = useState(false);

    useEffect(() => { 

        ubi_get(user.id).then(info => { 

            if (info.status === 404) { setfind("No hay Ubicacion Registrada"); setprev_ubi(""); }
            else { setprev_ubi(info.data); setfind(true); }

        }); 

    }, [getubi]);
    
    useEffect(() => { 

        if (config_action === 1) {

            setmodal_random(true);

        }else if (config_action === 2) {

            setmodal_random(true);

        }else if (config_action === 3) {

            setmodal_random(true);
            setgetubi(!getubi);

        }
    }, [config_action]);

    useEffect(() => { if ( modal_random === false ){ setconfig_action(0); } }, [modal_random]);
    
    const handleConfigSectors = () => {

        let obj = {

            "id_rel_ubi": user.id,
            "sectors": input_sectors,
            "warehouses": prev_ubi.warehouses,
            "racks" : prev_ubi.racks
        }

        ubi_post(obj).then(info => {    

            if (info.status === 202) {

                setgetubi(!getubi);
                setmodal_random(false);
                
            }else{

                setmodal_random(false);
                setfind("Error al ingresar nuevos Sectores")
                setTimeout(() => { setfind("") }, 5000);

            }

        });


    }

    const handleConfigWarehouses = () => {

        let obj = {

            "id_rel_ubi": user.id,
            "sectors": prev_ubi.sectors,
            "warehouses": input_warehouses,
            "racks" : prev_ubi.racks
        }

        ubi_post(obj).then(info => {    

            if (info.status === 202) {

                setgetubi(!getubi);
                setmodal_random(false);
                
            }else{

                setmodal_random(false);
                setfind("Error al ingresar nuevas Bodegas")
                setTimeout(() => { setfind("") }, 5000);

            }

        });


    }

    const handleConfigRacks = () => {

        let obj = {

            "id_rel_ubi": user.id,
            "sectors": prev_ubi.sectors,
            "warehouses": prev_ubi.warehouses,
            "racks" : input_racks
        }

        ubi_post(obj).then(info => {    

            if (info.status === 202) {

                setgetubi(!getubi);
                setmodal_random(false);
                localStorage.setItem( "ubicacion", JSON.stringify(obj) )
                
            }else{

                setmodal_random(false);
                setfind("Error al ingresar nuevos Armarios")
                setTimeout(() => { setfind("") }, 5000);

            }

        });


    }
    

  return (
    <>
        <h1 style={{ marginLeft:"2rem", color:" rgb(0, 0, 0)" }}>{ "Configuracion de Inventario" }</h1>
        <div className='config_invent'>
            
            <div style={{ display:"flex", justifyContent:"center", width:"100%",zIndex:"100000",position:"absolute",marginTop:"30px" }}>
                
                { (!!find) && <h1>{ find }</h1> }

            </div>

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
                        <h1  style={{ color:"rgb(56 56 56)" }}>{ "Total Sectores Registrados: " }<span>{prev_ubi.sectors}</span></h1>
                    </div>
                    <div className="cont_card_config_info">
                        <Link onClick={ () => {setconfig_action(1);} } className={"btn btn_config"}>Configurar</Link>
                    </div>
                </div>

                {
                    (!!prev_ubi) &&

                    <>
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
                                <h1 style={{ color:"rgb(56 56 56)" }}>{ "Total Bodegas Registradas: " }<span>{prev_ubi.warehouses}</span></h1>
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
                                <h1 style={{ color:"rgb(56 56 56)" }}>{ "Total de Armarios Registrados: " }<span>{prev_ubi.racks}</span></h1>
                            </div>
                            <div className="cont_card_config_info">
                                <Link onClick={ () => {setconfig_action(3);} } className={"btn btn_config"}>Configurar</Link>
                            </div>
                        </div>
                    </>
                }

            </div>
        </div>
        {
            (!!modal_random) &&
            <Modal close={setmodal_random}>

                <div style={{zIndex:"10000"}}>

                    <h1>{config_action}</h1>

                </div>

                {
                    (config_action === 1) &&

                    <div class="animate__animated animate__fadeInRight modal_config">

                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                            <h1>Sectores Total: { prev_ubi.sectors }</h1>

                        </div>

                        <br />  
                        <hr />
                        <br />

                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                            <h3>Ingresar nuevos Sectores</h3>

                        </div>

                        <br />

                        <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>

                            <Input type={"number"} style={"input_config_number"} txt={"->"} eventChange={ (e) => { setinput_sectors(e.target.value) } } minLen={prev_ubi.sectors} maxLen={"999"}/>

                            <div className="cont_card_config_info">
                                <Link onClick={ handleConfigSectors } className={"btn btn_config"}>Aceptar</Link>
                                <Link onClick={ () => { setmodal_random(false); } } className={"btn btn_config"}>Cancelar</Link>
                            </div>

                        </div>

                    </div>

                }

                {
                    (config_action === 2) &&

                    <div class="animate__animated animate__fadeInRight modal_config">

                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                            <h1>Bodegas Total: { prev_ubi.warehouses }</h1>

                        </div>
                        
                        <br />  
                        <hr />
                        <br />

                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                            <h3>Ingresar nuevas Bodegas</h3>

                        </div>

                        <br />

                        <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>

                            <Input type={"number"} style={"input_config_number"} txt={"->"} eventChange={ (e) => { setinput_warehouses(e.target.value) } } minLen={prev_ubi.sectors} maxLen={"999"}/>

                            <div className="cont_card_config_info">
                                <Link onClick={ handleConfigWarehouses } className={"btn btn_config"}>Aceptar</Link>    
                                <Link onClick={ () => { setmodal_random(false); } } className={"btn btn_config"}>Cancelar</Link>
                            </div>

                        </div>

                    </div>

                }

                {
                    (config_action === 3) &&

                    <div class="animate__animated animate__fadeInRight modal_config">

                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                            <h1>Armarios Total: { prev_ubi.racks }</h1>

                        </div>
                        
                        <br />  
                        <hr />
                        <br />

                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                            <h3>Ingresar nuevos Armarios</h3>

                        </div>

                        <br />

                        <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>

                            <Input type={"number"} style={"input_config_number"} txt={"->"} eventChange={ (e) => { setinput_racks(e.target.value) } } minLen={prev_ubi.sectors} maxLen={"999"}/>

                            <div className="cont_card_config_info">
                                <Link onClick={ handleConfigRacks } className={"btn btn_config"}>Aceptar</Link>    
                                <Link onClick={ () => { setmodal_random(false); } } className={"btn btn_config"}>Cancelar</Link>
                            </div>

                        </div>

                    </div>

                }

            </Modal>
        }
    </> 
  )
}