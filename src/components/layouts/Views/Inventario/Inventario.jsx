import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getItemsElectricos, getItemsElectricosByGeneralId, getItemsElectricosByGeneralName, getItemsElectricosByType } from '../../../../helpers/api/ElectricosRequests';
import { getItemsElectronicos, getItemsElectronicosByGeneralId, getItemsElectronicosByGeneralName, getItemsElectronicosByType } from '../../../../helpers/api/ElectronicosRequests';
import { getItemsEleferre, getItemsEleferreByGeneralId, getItemsEleferreByGeneralName, getItemsEleferreByType } from '../../../../helpers/api/ElementosFerreteriaRequest';
import { getItemsModdev, getItemsModdevByGeneralId, getItemsModdevByGeneralName, getItemsModdevByType } from '../../../../helpers/api/ModdevRequest';
import { getItemsOtros, getItemsOtrosByGeneralId, getItemsOtrosByGeneralName, getItemsOtrosByType } from '../../../../helpers/api/OtrosRequest';
import { Input } from '../../../ui/Input/Input';
import { VscSearch } from "react-icons/vsc";
import { HiOutlineRefresh } from "react-icons/hi";
import { Modal } from '../../../pages/Modal/Modal';
import { get_doc } from '../../../../helpers/api/DocsRequest';
import "./Inventario.css"

export const Inventario = ( { user } ) => {

  const [loader, setloader] = useState(false);
  const [getAll, setgetAll] = useState(false);
  const [modal, setmodal] = useState(false);
  const [modal_obj, setmodal_obj] = useState({});
  const [doc, setdoc] = useState(null);

  const [input_search_electricos, setinput_search_electricos] = useState("");
  const [items_electricos, setitems_electricos] = useState([]);
  const [val_request_electricos, setval_request_electricos] = useState(0);
  const [selectFilterElectricos, setSelectFilterElectricos] = useState("1");

  const [input_search_electronicos, setinput_search_electronicos] = useState("");
  const [items_electronicos, setitems_electronicos] = useState([]);
  const [val_request_electronicos, setval_request_electronicos] = useState(0);
  const [selectFilterElectronicos, setSelectFilterElectronicos] = useState("1");

  const [input_search_eleferre, setinput_search_eleferre] = useState("");
  const [items_eleferre, setitems_eleferre] = useState([]);
  const [val_request_eleferre, setval_request_eleferre] = useState(0);
  const [selectFilterEleferre, setSelectFilterEleferre] = useState("1");

  const [input_search_moddev, setinput_search_moddev] = useState("");
  const [items_moddev, setitems_moddev] = useState([]);
  const [val_request_moddev, setval_request_moddev] = useState(0);
  const [selectFilterModdev, setSelectFilterModdev] = useState("1");

  const [input_search_otros, setinput_search_otros] = useState("");
  const [items_otros, setitems_otros] = useState([]);
  const [val_request_otros, setval_request_otros] = useState(0);
  const [selectFilterOtros, setSelectFilterOtros] = useState("1");

  const searchByClick = ( e ) => {
    
    switch (e.target.id) {

      case "electricos_items_search_image": searchItemElectricos( input_search_electricos ); break;
      case "electronicos_items_search_image": searchItemElectronicos( input_search_electronicos ); break;
      case "eleferre_items_search_image": searchItemEleFerre( input_search_eleferre ); break;
      case "moddev_items_search_image": searchItemModDev( input_search_moddev ); break;
      case "otros_items_search_image": searchItemOtros( input_search_otros ); break;
    
      default: break;
    }

  }

  const handleKeyPress = ( e ) => {

    if (e.key === "Enter" || e.keyCode === 13) {

      switch (e.target.id) {

        case "electricos_items_search_image": searchItemElectricos( input_search_electricos ); break;
        case "electronicos_items_search_image": searchItemElectronicos( input_search_electronicos ); break;
        case "eleferre_items_search_image": searchItemEleFerre( input_search_eleferre ); break;
        case "moddev_items_search_image": searchItemModDev( input_search_moddev ); break;
        case "otros_items_search_image": searchItemOtros( input_search_otros ); break;
      
        default: break;
      }

    }else if (e.target.value === "") {
      
      setgetAll(!getAll);

    }
  }

  const searchItemElectricos = ( e ) => {

    if ( e === "" ) {
      
      setgetAll(!getAll);

    }else{

      switch ( selectFilterElectricos ) {
        case "1":
          getItemsElectricosByGeneralName( e ).then((info) => {
            setitems_electricos( info.data ); 
          })
        break;
  
        case "2":
          console.log("Entra a ID electricos");
          getItemsElectricosByGeneralId( e ).then((info) => {
            setitems_electricos( info.data ); 
          })
        break;
  
        case "3":
          getItemsElectricosByType( e ).then((info) => {
            setitems_electricos( info.data ); 
          })
        break;
      
        default: break;
      }

    }

  }

  const searchItemElectronicos = ( e ) => {

    if ( e === "" ) {
      
      setgetAll(!getAll);

    }else{
    
      switch ( selectFilterElectronicos ) {
        case "1":
          getItemsElectronicosByGeneralName( e ).then((info) => {
            setitems_electronicos( info.data ); 
          })
        break;

        case "2":
          getItemsElectronicosByGeneralId( e ).then((info) => {
            setitems_electronicos( info.data ); 
          })
        break;

        case "3":
          getItemsElectronicosByType( e ).then((info) => {
            setitems_electronicos( info.data ); 
          })
        break;
      
        default: break;
      }

    }

  }

  const searchItemEleFerre = ( e ) => {

    if ( e === "" ) {
      
      setgetAll(!getAll);

    }else{

      switch ( selectFilterEleferre ) {
        case "1":
          getItemsEleferreByGeneralName( e ).then((info) => {
            setitems_eleferre( info.data ); 
          })
        break;

        case "2":
          getItemsEleferreByGeneralId( e ).then((info) => {
            setitems_eleferre( info.data ); 
          })
        break;

        case "3":
          getItemsEleferreByType( e ).then((info) => {
            setitems_eleferre( info.data ); 
          })
        break;
      
        default: break;
      }

    }

  }

  const searchItemModDev = ( e ) => {

    if ( e === "" ) {
      
      setgetAll(!getAll);

    }else{
    
      switch ( selectFilterModdev ) {
        case "1":
          getItemsModdevByGeneralName( e ).then((info) => {
            setitems_moddev( info.data ); 
          })
        break;

        case "2":
          getItemsModdevByGeneralId( e ).then((info) => {
            setitems_moddev( info.data ); 
          })
        break;

        case "3":
          getItemsModdevByType( e ).then((info) => {
            setitems_moddev( info.data ); 
          })
        break;
      
        default: break;
      }
    
    }

  }

  const searchItemOtros = ( e ) => {

    if ( e === "" ) {
      
      setgetAll(!getAll);

    }else{
    
      switch ( selectFilterOtros ) {
        case "1":
          getItemsOtrosByGeneralName( e ).then((info) => {
            setitems_otros( info.data ); 
          })
        break;

        case "2":
          getItemsOtrosByGeneralId( e ).then((info) => {
            setitems_otros( info.data ); 
          })
        break;

        case "3":
          getItemsOtrosByType( e ).then((info) => {
            setitems_otros( info.data ); 
          })
        break;
      
        default: break;
      }

    }
    
  }

  const refreshRequest = () => { setgetAll(!getAll); }

  useEffect(() => {
    
    setloader(true);
    getItemsElectricos().then((info) => {
      if (info.status === 200) {
        setval_request_electricos(info.status);
        setitems_electricos( info.data );
        setloader(false);
      }else{
        setval_request_electricos(info.status);
      }
    });

    getItemsElectronicos().then((info) => {
      if (info.status === 200) {
        setval_request_electronicos(info.status);
        setitems_electronicos( info.data );
        setloader(false);
      }else{
        setval_request_electronicos(info.status);
      }
    });

    getItemsEleferre().then((info) => {
      if (info.status === 200) {
        setval_request_eleferre(info.status);
        setitems_eleferre( info.data );
        setloader(false);
      }else{
        setval_request_eleferre(info.status);
      }
    });

    getItemsModdev().then((info) => {
      if (info.status === 200) {
        setval_request_moddev(info.status);
        setitems_moddev( info.data );
        setloader(false);
      }else{
        setval_request_moddev(info.status);
      }
    });

    getItemsOtros().then((info) => {
      if (info.status === 200) {
        setval_request_otros(info.status);
        setitems_otros( info.data );
        setloader(false);
      }else{
        setval_request_otros(info.status);
      }
    });
    
  }, [ getAll ])
  
  return (
    <div className='cont_invent'>
        <HiOutlineRefresh title="Refresh" className="refresh_invent" onClick={refreshRequest} />
        <div className="input_title_cont">
          <h1 style={{color:"rgb(0 0 0)"}}>Ítems Electricos</h1>
          <div className="input-container input_inventario">
            <Input type={"text"} txt={"Buscar Electrico"} id={"electricos_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_electricos(e.target.value) }}/>
            <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"electricos_items_search_image"} onClick={ searchByClick }/>

            <select style={{color:"rgb(0 0 0)"}} id="select_filter" onChange={ ( e ) => { setSelectFilterElectricos( e.target.value ) } }>
              <option style={{color:"rgb(0 0 0)"}} value="1">Por Nombre Item</option>
              <option style={{color:"rgb(0 0 0)"}} value="2">Por ID Item</option>
              <option style={{color:"rgb(0 0 0)"}} value="3">Por Tipo Item</option>
            </select>
          </div>
        </div>
        <br />
        <div className="electricos_cont">
          {
            ( !!loader )

              ? 
               
                <>
                  <div className="card"> <span className="loader_cards"></span></div>
                  <div className="card"> <span className="loader_cards"></span></div>
                  <div className="card"> <span className="loader_cards"></span></div>
                  <div className="card"> <span className="loader_cards"></span></div>
                  <div className="card"> <span className="loader_cards"></span></div>
                  <div className="card"> <span className="loader_cards"></span></div>
                </>

              :  
                items_electricos.map((item) => (

                  <div className='animate__animated animate__fadeInRight card'>
    
                    <div className="cont_img">
                      <img src={ item.imagen_parte_electricos } className="img_card" alt={ item.tipo_parte_electricos }/>
                    </div>
    
                    <div className="text_cont">
                      <div className="txt">
                        <h3>ID:</h3>
                        <p>{ item.id_parte_electricos }</p>
                      </div>
                      <hr />
                      <p className='p_card'>{ item.nombre_parte_electricos }</p>
                      <hr />
                      <div className="txt">
                        <h3>Tipo:</h3>
                        <p style={{color:"#ffc61b"}}>{ item.tipo_parte_electricos }</p>
                      </div>
                      <br />
                      <div className="txt">
                        <Link className='btn btn_invent' onClick={ () => { 

                          setmodal(true); 
                          let obj_item = {

                            nombre : item.nombre_parte_electricos,
                            id : item.id_parte_electricos,
                            imagen : item.imagen_parte_electricos,
                            descp : item.descripcion_parte_electricos,
                            tipo : item.tipo_parte_electricos,
                            cant_disp : item.cantidad_disponible_electricos,
                            cont_cons : item.cantidad_consumida_electricos, 
                            ubicacion : item.ubicacion_parte_electricos,
                            data_sht : item.datasheet_parte_electricos,

                          }
                          setmodal_obj(obj_item);
   

                          }}>Ver Detalles</Link>
                      </div>
                    </div>
    
                  </div>
                ))
            }
            {
              ( items_electricos.length === 0 ) && <><h1>Vacio</h1></>
            }

        </div>

        <br />
        <br />
        <div className="input_title_cont">
          <h1 style={{color:"rgb(0 0 0)"}}>Ítems Electronicos</h1>
          <div className="input-container input_inventario">
          <Input type={"text"} txt={"Buscar Electronicos"} id={"electronicos_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_electronicos(e.target.value) }}/>
            <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"electronicos_items_search_image"} onClick={ searchByClick }/>

            <select style={{color:"rgb(0 0 0)"}} id="select_filter" onChange={ ( e ) => { setSelectFilterElectronicos( e.target.value ) } }>
              <option style={{color:"rgb(0 0 0)"}} value="1">Por Nombre parte fabricante Item</option>
              <option style={{color:"rgb(0 0 0)"}} value="2">Por ID Item</option>
              <option style={{color:"rgb(0 0 0)"}} value="3">Por Tipo Item</option>
            </select>

          </div>
        </div>
        <br />
        <div className="electronicos_cont">
          {
            ( !!loader )
            
            ?
                <>
                <div className="card"> <span class="loader_cards"></span></div>
                <div className="card"> <span class="loader_cards"></span></div>
                <div className="card"> <span class="loader_cards"></span></div>
                <div className="card"> <span class="loader_cards"></span></div>
                <div className="card"> <span class="loader_cards"></span></div>
                <div className="card"> <span class="loader_cards"></span></div>
              </>

            :
              items_electronicos.map((item) => (

                <div className='animate__animated animate__fadeInRight card'>

                  <div className="cont_img">
                    <img src={ item.pinout_comp } className="img_card" alt={ item.tipo_parte_electricos }/>
                  </div>

                  <div className="text_cont">
                    <div className="txt">
                      <h3>ID:</h3>
                      <p>{ item.id_Comp }</p>
                    </div>
                    <hr />
                    <p className='p_card'>{ item.nombre_comp }</p>
                    <hr />
                    <div className="txt">
                      <h3>Tipo:</h3>
                      <p style={{color:"#ffc61b"}}>{ item.tipo_comp }</p>
                    </div>
                    <br />
                    <div className="txt">
                      <Link className='btn btn_invent' onClick={  () => { 
                        
                        setmodal(true); 
                        let obj_item = {

                          id : item.id_Comp,
                          nombre : item.nombre_comp,
                          imagen : item.pinout_comp,
                          descp : item.descripcion_comp,
                          tipo : item.tipo_comp,
                          encap : item.encampsulado_comp,
                          cant_disp : item.cantidad_disponible_comp,
                          cont_cons : item.cantidad_consumida_comp,
                          ubicacion : item.ubicacion_comp,
                          data_sht : item.datasheet_comp,
                          num_part : item.numero_partefabricante_comp,
                          esquema : item.esquematico_comp, 
                          elemento: "Electronico"

                        }
                        setmodal_obj(obj_item);
 
                      
                    
                      } }>Ver Detalles</Link>
                    </div>
                  </div>

                </div>

              ))
          }
          {
           ( items_electronicos.length === 0 ) && <><h1>Vacio</h1></>
          }

        </div>

        <br />
        <br />
        <div className="input_title_cont">
          <h1 style={{color:"rgb(0 0 0)"}}>Ítems Elementos ferreteria</h1>
          <div className="input-container input_inventario">
            <Input type={"text"} txt={"Buscar Elementos de ferreteria"} id={"eleferre_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_eleferre(e.target.value) }}/>
            <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"eleferre_items_search_image"} onClick={ searchByClick }/>

            <select style={{color:"rgb(0 0 0)"}} id="select_filter" onChange={ ( e ) => { setSelectFilterEleferre( e.target.value ) } }>
              <option style={{color:"rgb(0 0 0)"}} value="1">Por Nombre Item</option>
              <option style={{color:"rgb(0 0 0)"}} value="2">Por ID Item</option>
              <option style={{color:"rgb(0 0 0)"}} value="3">Por Tipo Item</option>
            </select>

          </div>
        </div>
        <br />
        <div className="eleferre_cont">
        {
          ( !!loader )
          
          ?
            <>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
          </>

          :
            items_eleferre.map((item) => (

              <div className='animate__animated animate__fadeInRight card'>

                <div className="cont_img">
                  <img src={ item.imagen_parte_elementosferreteria } className="img_card" alt={ item.tipo_parte_electricos }/>
                </div>

                <div className="text_cont">
                  <div className="txt">
                    <h3>ID:</h3>
                    <p>{ item.id_parte_elementosferreteria }</p>
                  </div>
                  <hr />
                  <p className='p_card'>{ item.nombre_parte_elementosferreteria }</p>
                  <hr />
                  <div className="txt">
                    <h3>Tipo:</h3>
                    <p style={{color:"#ffc61b"}}>{ item.tipo_parte_elementosferreteria }</p>
                  </div>
                  <br />
                  <div className="txt">
                    <Link className='btn btn_invent' onClick={  () => {
                      
                      setmodal(true); 
                      let obj_item = {
                      
                        nombre : item.nombre_parte_elementosferreteria,
                        id : item.id_parte_elementosferreteria,
                        imagen : item.imagen_parte_elementosferreteria,
                        descp : item.descripcion_parte_elementosferreteria,
                        tipo : item.tipo_parte_elementosferreteria,
                        cant_disp : item.cantidad_disponible_elementosferreteria,
                        cont_cons : item.cantidad_consumida_elementosferreteria, 
                        ubicacion : item.ubicacion_parte_elementosferreteria,
                        data_sht : item.datasheet_parte_elementosferreteria,

                      }
                      setmodal_obj(obj_item);

                    } }>Ver Detalles</Link>
                  </div>
                </div>

              </div>

            ))
        }
        {
          ( items_eleferre.length === 0 ) && <><h1>Vacio</h1></>
        }
        </div>

        <br />
        <br />
        <div className="input_title_cont">
          <h1 style={{color:"rgb(0 0 0)"}}>Ítems Modulos de desarrollo</h1>
          <div className="input-container input_inventario">
          <Input type={"text"} txt={"Buscar modulo de desarrollo"} id={"moddev_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_moddev(e.target.value) }}/>
            <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"moddev_items_search_image"} onClick={ searchByClick }/>

            <select style={{color:"rgb(0 0 0)"}} id="select_filter" onChange={ ( e ) => { setSelectFilterModdev( e.target.value ) } }>
              <option style={{color:"rgb(0 0 0)"}} value="1">Por Nombre Item</option>
              <option style={{color:"rgb(0 0 0)"}} value="2">Por ID Item</option>
              <option style={{color:"rgb(0 0 0)"}} value="3">Por Tipo Item</option>
            </select>

          </div>
        </div>
        <br />
        <div className="moddev_cont">

        {
          ( !!loader )
          
          ?
            <>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
          </>

          :
            items_moddev.map((item) => (

              <div className='animate__animated animate__fadeInRight card'>

                <div className="cont_img">
                  <img src={ item.imagen_partemoddev } className="img_card" alt={ item.tipo_parte_electricos }/>
                </div>

                <div className="text_cont">
                  <div className="txt">
                    <h3>ID:</h3>
                    <p>{ item.id_parte_moddev }</p>
                  </div>
                  <hr />
                  <p className='p_card'>{ item.nombre_partemoddev }</p>
                  <hr />
                  <div className="txt">
                    <h3>Tipo:</h3>
                    <p style={{color:"#ffc61b"}}>{ item.tipo_parte_moddev }</p>
                  </div>
                  <br />
                  <div className="txt">
                  <Link className='btn btn_invent' onClick={  () => {
                      
                      setmodal(true); 
                      let obj_item = {
                      
                        nombre : item.nombre_partemoddev,
                        id : item.id_parte_moddev,
                        imagen : item.imagen_partemoddev,
                        descp : item.descripcion_parte_moddev,
                        tipo : item.tipo_parte_moddev,
                        cant_disp : item.cantidad_disponible_moddev,
                        cont_cons : item.cantidad_consumida_moddev, 
                        ubicacion : item.ubicacion_parte_moddev,
                        data_sht : item.datasheet_parte_moddev,

                      }
                      setmodal_obj(obj_item);

                    } }>Ver Detalles</Link>
                  </div>
                </div>

              </div>

            ))
        }
            {
              ( items_moddev.length === 0 ) && <><h1>Vacio</h1></>
            }

        </div>

        <br />
        <br />
        <div className="input_title_cont">
          <h1 style={{color:"rgb(0 0 0)"}}>Ítems Otros</h1>
          <div className="input-container input_inventario">
          <Input type={"text"} txt={"Buscar Otros"} id={"otros_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_otros(e.target.value) }}/>
            <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"otros_items_search_image"} onClick={ searchByClick }/>

            <select style={{color:"rgb(0 0 0)"}} id="select_filter" onChange={ ( e ) => { setSelectFilterOtros( e.target.value ) } }>
              <option style={{color:"rgb(0 0 0)"}} value="1">Por Nombre Item</option>
              <option style={{color:"rgb(0 0 0)"}} value="2">Por ID Item</option>
              <option style={{color:"rgb(0 0 0)"}} value="3">Por Tipo Item</option>
            </select>

          </div>
        </div>
        <br />
        <div className="otros_cont">

        {
          ( !!loader )
          
          ? 
            <>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
            <div className="card"> <span class="loader_cards"></span></div>
          </>
          : 
            items_otros.map((item) => (

              <div className='animate__animated animate__fadeInRight card'>

                <div className="cont_img">
                  <img src={ item.imagen_parte_otros } className="img_card" alt={ item.tipo_parte_electricos }/>
                </div>

                <div className="text_cont">
                  <div className="txt">
                    <h3>ID:</h3>
                    <p>{ item.id_parte_otros }</p>
                  </div>
                  <hr />
                  <p className='p_card'>{ item.nombre_parte_otros }</p>
                  <hr />
                  <div className="txt">
                    <h3>Tipo:</h3>
                    <p style={{color:"#ffc61b"}}>{ item.tipo_parte_otros }</p>
                  </div>
                  <br />
                  <div className="txt">
                  <Link className='btn btn_invent' onClick={  () => {
                      
                      setmodal(true); 
                      let obj_item = {
                      
                        nombre : item.nombre_parte_otros,
                        id : item.id_parte_otros,
                        imagen : item.imagen_parte_otros,
                        descp : item.descripcion_parte_otros,
                        tipo : item.tipo_parte_otros,
                        cant_disp : item.cantidad_disponible_otros,
                        cont_cons : item.cantidad_consumida_otros, 
                        ubicacion : item.ubicacion_parte_otros,
                        data_sht : item.datasheet_parte_otros,

                      }
                      setmodal_obj(obj_item);

                    } }>Ver Detalles</Link>
                  </div>
                </div>

              </div>

            ))
        }
            {
              ( items_otros.length === 0 ) && <><h1>Vacio</h1></>
            }

        </div>

        {

          ( modal ) &&
            <Modal close={ setmodal }>
                <div className='animate__animated animate__fadeInRight modal_details'>

                  <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }} className="row">
                    <h2 className='modal_object_text'>ID:</h2><h3>{modal_obj.id}</h3>
                  </div>

                  <div className="header_card_details">

                    <div className="cont_img_details">
                      <img src={ modal_obj.imagen } className="img_card"/>
                    </div>
      
                    {
                      ( !!modal_obj.esquema ) && 
                      <div className="cont_img_details">
                        <img src={ modal_obj.esquema } className="img_card"/>
                      </div>
                    }

                  </div>
                   <div className='modal_objects'>
                    <div className="cont_txt_details">
                      <h1 style={{color:"#ffc61b"}}>{modal_obj.nombre}</h1>
                    </div>
                    <hr />
                    <br />

                    <div className="div_text_details">
                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>TIPO: </h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.tipo}</h3>
                          </div>
                      </div>

                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>CANT Disp.: </h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.cant_disp}</h3>
                          </div>
                      </div>

                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>CANT Cons.: </h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.cont_cons}</h3>
                          </div>
                      </div>

                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>UBICACION: </h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.ubicacion}</h3>
                          </div>
                      </div>

                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>DT-SHEET: </h4>
                          </div>

                          <div className="contain_detail">
                          <Link className='btn btn_invent'  style={{ fontSize:"13px",width:"20vh" }} onClick={ () => { get_doc(modal_obj.data_sht).then(info => { setdoc(info.data); window.open(`/pdf:${doc}`); })}}>Ver PDF</Link>
                          </div>
                      </div>

                      {
                        ( !!modal_obj.elemento ) &&

                        <div className="row">
                          <div className="name_detail">
                              <h4 className='modal_object_text'>ENCAPSULADO: </h4>
                            </div>

                            <div className="contain_detail">
                              <h3>{modal_obj.encap}</h3>
                            </div>
                        </div>

                      }

                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>DESCRIPCION: </h4>
                          </div>

                          <div className="contain_detail">
                            <h3 style={{ padding:"10px",textAlign:"center" }}>{modal_obj.descp}</h3>
                          </div>
                      </div>

                    </div>

                </div>
                </div>
            </Modal>

        }
    </div>
  )
}