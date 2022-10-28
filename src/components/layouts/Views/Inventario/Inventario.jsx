import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getItemsElectricos, getItemsElectricosByGeneralName } from '../../../../helpers/api/ElectricosRequests';
import { getItemsElectronicos, getItemsElectronicosByGeneralName } from '../../../../helpers/api/ElectronicosRequests';
import { getItemsEleferre, getItemsEleferreByGeneralName } from '../../../../helpers/api/ElementosFerreteriaRequest';
import { getItemsModdev, getItemsModdevByGeneralName } from '../../../../helpers/api/ModdevRequest';
import { getItemsOtros, getItemsOtrosByGeneralName } from '../../../../helpers/api/OtrosRequest';
import { Input } from '../../../ui/Input/Input';
import { VscSearch } from "react-icons/vsc";
import { HiOutlineRefresh } from "react-icons/hi";
import "./Inventario.css"

export const Inventario = ( { user } ) => {

  const [loader, setloader] = useState(false);
  const [getAll, setgetAll] = useState(false);

  const [input_search_electricos, setinput_search_electricos] = useState("");
  const [items_electricos, setitems_electricos] = useState([]);
  const [val_request_electricos, setval_request_electricos] = useState(0);

  const [input_search_electronicos, setinput_search_electronicos] = useState("");
  const [items_electronicos, setitems_electronicos] = useState([]);
  const [val_request_electronicos, setval_request_electronicos] = useState(0);

  const [input_search_eleferre, setinput_search_eleferre] = useState("");
  const [items_eleferre, setitems_eleferre] = useState([]);
  const [val_request_eleferre, setval_request_eleferre] = useState(0);

  const [input_search_moddev, setinput_search_moddev] = useState("");
  const [items_moddev, setitems_moddev] = useState([]);
  const [val_request_moddev, setval_request_moddev] = useState(0);

  const [input_search_otros, setinput_search_otros] = useState("");
  const [items_otros, setitems_otros] = useState([]);
  const [val_request_otros, setval_request_otros] = useState(0);

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

    getItemsElectricosByGeneralName( e ).then((info) => {
      setitems_electricos( info.data ); 
    })

  }

  const searchItemElectronicos = ( e ) => {
    
    getItemsElectronicosByGeneralName( e ).then((info) => {
      setitems_electronicos( info.data ); 
    })
  }

  const searchItemEleFerre = ( e ) => {

    getItemsEleferreByGeneralName( e ).then((info) => {
      setitems_eleferre( info.data ); 
    })
  }

  const searchItemModDev = ( e ) => {
    
    getItemsModdevByGeneralName( e ).then((info) => {
      setitems_moddev( info.data ); 
    })
  }

  const searchItemOtros = ( e ) => {
    
    getItemsOtrosByGeneralName( e ).then((info) => {
      setitems_otros( info.data ); 
    })
  }

  const refreshRequest = () => { setgetAll(!getAll); }

  useEffect(() => {

    getItemsElectricos().then((info) => {
      setloader(true);
      if (info.status === 200) {
        setval_request_electricos(info.status);
        setitems_electricos( info.data );
        setloader(false);
      }else{
        setval_request_electricos(info.status);
      }
    });

    getItemsElectronicos().then((info) => {
      setloader(true);
      if (info.status === 200) {
        setval_request_electronicos(info.status);
        setitems_electronicos( info.data );
        setloader(false);
      }else{
        setval_request_electronicos(info.status);
      }
    });

    getItemsEleferre().then((info) => {
      setloader(true);
      if (info.status === 200) {
        setval_request_eleferre(info.status);
        setitems_eleferre( info.data );
        setloader(false);
      }else{
        setval_request_eleferre(info.status);
      }
    });

    getItemsModdev().then((info) => {
      setloader(true);
      if (info.status === 200) {
        setval_request_moddev(info.status);
        setitems_moddev( info.data );
        setloader(false);
      }else{
        setval_request_moddev(info.status);
      }
    });

    getItemsOtros().then((info) => {
      setloader(true);
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
    <div className='cont_invent'  style={{overflow:"scroll"}}>
        <HiOutlineRefresh title="Refresh" className="refresh_invent" onClick={refreshRequest} />
        <div className="input_title_cont">
          <h1>Ítems Electricos</h1>
          <div className="input-container input_inventario">
            <Input type={"text"} txt={"Buscar Electrico"} id={"electricos_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_electricos(e.target.value) }}/>
            <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"electricos_items_search_image"} onClick={ searchByClick }/>
          </div>
        </div>
        <br />
        <div className="electricos_cont">
          {
            ( !!loader )

              ? 
               
                <>
                  <div  className="card"> <span class="loader_cards"></span></div>
                  <div className="card"> <span class="loader_cards"></span></div>
                  <div className="card"> <span class="loader_cards"></span></div>
                  <div className="card"> <span class="loader_cards"></span></div>
                  <div className="card"> <span class="loader_cards"></span></div>
                  <div className="card"> <span class="loader_cards"></span></div>
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
                      <p>{ item.nombre_parte_electricos }</p>
                      <hr />
                      <div className="txt">
                        <h3>Tipo:</h3>
                        <p style={{color:"#ffc61b"}}>{ item.tipo_parte_electricos }</p>
                      </div>
                      <br />
                      <div className="txt">
                        <Link className='btn btn_invent'>Ver Detalles</Link>
                      </div>
                    </div>
    
                  </div>
                ))
            }
        </div>

        <br />
        <br />
        <div className="input_title_cont">
          <h1>Ítems Electronicos</h1>
          <div className="input-container input_inventario">
          <Input type={"text"} txt={"Buscar Electronicos"} id={"electronicos_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_electronicos(e.target.value) }}/>
            <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"electronicos_items_search_image"} onClick={ searchByClick }/>
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
                    <p>{ item.nombre_comp }</p>
                    <hr />
                    <div className="txt">
                      <h3>Tipo:</h3>
                      <p style={{color:"#ffc61b"}}>{ item.tipo_comp }</p>
                    </div>
                    <br />
                    <div className="txt">
                      <Link className='btn btn_invent'>Ver Detalles</Link>
                    </div>
                  </div>

                </div>

              ))
          }
        </div>

        <br />
        <br />
        <div className="input_title_cont">
          <h1>Ítems Elementos ferreteria</h1>
          <div className="input-container input_inventario">
          <Input type={"text"} txt={"Buscar Elementos de ferreteria"} id={"eleferre_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_eleferre(e.target.value) }}/>
            <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"eleferre_items_search_image"} onClick={ searchByClick }/>
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
                  <p>{ item.nombre_parte_elementosferreteria }</p>
                  <hr />
                  <div className="txt">
                    <h3>Tipo:</h3>
                    <p style={{color:"#ffc61b"}}>{ item.tipo_parte_elementosferreteria }</p>
                  </div>
                  <br />
                  <div className="txt">
                    <Link className='btn btn_invent'>Ver Detalles</Link>
                  </div>
                </div>

              </div>

            ))
        }
        </div>

        <br />
        <br />
        <div className="input_title_cont">
          <h1>Ítems Modulos de desarrollo</h1>
          <div className="input-container input_inventario">
          <Input type={"text"} txt={"Buscar modulo de desarrollo"} id={"moddev_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_moddev(e.target.value) }}/>
            <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"moddev_items_search_image"} onClick={ searchByClick }/>
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
                  <p>{ item.nombre_partemoddev }</p>
                  <hr />
                  <div className="txt">
                    <h3>Tipo:</h3>
                    <p style={{color:"#ffc61b"}}>{ item.tipo_parte_moddev }</p>
                  </div>
                  <br />
                  <div className="txt">
                    <Link className='btn btn_invent'>Ver Detalles</Link>
                  </div>
                </div>

              </div>

            ))
        }

        </div>

        <br />
        <br />
        <div className="input_title_cont">
          <h1>Ítems Otros</h1>
          <div className="input-container input_inventario">
          <Input type={"text"} txt={"Buscar Otros"} id={"otros_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_otros(e.target.value) }}/>
            <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"otros_items_search_image"} onClick={ searchByClick }/>
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
                  <p>{ item.nombre_parte_otros }</p>
                  <hr />
                  <div className="txt">
                    <h3>Tipo:</h3>
                    <p style={{color:"#ffc61b"}}>{ item.tipo_parte_otros }</p>
                  </div>
                  <br />
                  <div className="txt">
                    <Link className='btn btn_invent'>Ver Detalles</Link>
                  </div>
                </div>

              </div>

            ))
        }

        </div>
    </div>
  )
}