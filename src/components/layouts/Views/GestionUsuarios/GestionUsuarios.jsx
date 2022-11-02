import React, { useEffect, useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi';
import { VscSearch } from 'react-icons/vsc';
import { IoMdEye } from "react-icons/io";
import { Link } from 'react-router-dom';
import { getItemsUsuarios } from '../../../../helpers/api/UsuariosRequest';
import { Input } from '../../../ui/Input/Input';
import "./GestionUsuarios.css";
import { Modal } from '../../../pages/Modal/Modal';

export const GestionUsuarios = () => {

  const [modal, setmodal] = useState(false);
  const [modal_obj, setmodal_obj] = useState({});

  const [user_data, setuser_data] = useState(JSON.parse(localStorage.getItem("usuario")));
  const [button_comp, setbutton_comp] = useState("home");
  const [getAll, setgetAll] = useState(true);

  const [input_search_usuarios, setinput_search_usuarios] = useState("");
  const [items_usuarios, setitems_usuarios] = useState([]);
  const [val_request_usuarios, setval_request_usuarios] = useState(0);
  const [selectFilterUsuarios, setSelectFilterUsuarios] = useState("");
  const [loader, setloader] = useState(true);

  const handleKeyPress = () => {}

  const searchByClick = () => {}

  useEffect(() => {

    setloader(true);
    getItemsUsuarios().then((info) => {

      if (info.status == 200) {
        setval_request_usuarios(info.status);
        setitems_usuarios(info.data);
        setloader(false);
      }else{
        setval_request_usuarios(info.status);
      }

    })
    
  }, [ getAll ])
  
  const refreshRequest = () => { setgetAll(!getAll); }

  return (
    <div className='cont_invent'  style={{overflow:"scroll"}}>
    <HiOutlineRefresh title="Refresh" className="refresh_invent" onClick={refreshRequest} />
    <div className="input_title_cont">
      <h1>Gestion de usuarios</h1>
      <div className="input-container input_inventario">
        <Input type={"text"} txt={"Buscar Usuario"} id={"usuarios_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_usuarios(e.target.value) }}/>
        <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"usuarios_items_search_image"} onClick={ searchByClick }/>

        <select id="select_filter" onChange={ ( e ) => { setSelectFilterUsuarios( e.target.value ) } }>
          <option value="1">Por Nombre Usuario</option>
          <option value="2">Por ID Usuario</option>
          <option value="3">Por Edad Usuario</option>
        </select>
      </div>
    </div>
    <br />
    <div className="usuarios_cont">
      {
        ( !!loader )

          ? 
           
            <>
              <div className="card_usuarios"> <span class="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span class="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span class="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span class="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span class="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span class="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span class="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span class="loader_cards_usuarios"></span></div>
            </>

          :  
            items_usuarios.map((item) => (

              <div className='animate__animated animate__fadeInRight card_usuarios'>

                <div className="img_gest">
                  <div className="cont_img">
                      <img src={ item.imagen } className="img_card"/>
                  </div>
               </div>

                <div className="text_cont">
                <div className="txt">
                    <h3>Num. Documento:</h3>
                    <p>{ item.id }</p>
                  </div>
                  <div className="txt">
                    <h3>Nombre:</h3>
                    <p>{ item.nombre } { item.apellido }</p>
                  </div>
                  <hr />
                  <div className="txt">
                    <h3>Cargo:</h3>
                    <p style={{color:"#ffc61b"}}>{ item.cargo }</p>
                  </div>
                  <div className="txt">
                    <h3>Edad:</h3>
                    <p>{ item.edad }</p>
                  </div>
                  <br />
                  <div className="txt">
                    <Link className='btn btn_invent'>Editar</Link>
                    <Link className='btn btn_invent'>Deshabilitar</Link>
                    <Link className='btn btn_view' onClick={ () => {

                     setmodal(true);
                     setmodal_obj(item)

                    }}><IoMdEye/></Link>
                  </div>
                </div>
              </div>
              
              ))
            }
    
            </div>
            {
                        ( modal ) &&
                        <Modal close={ setmodal }>
                            <div className='animate__animated animate__fadeInRight modal_details'>
                            <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }} className="row">
                            <h2 className='modal_object_text'>Usuario</h2>
                  </div>

                  <div className="header_card_details">

                    <div className="cont_img_details">
                      <img src={ modal_obj.imagen } className="img_card"/>
                    </div>
                    </div>
                    <div className='modal_objects'>
                    <div className="cont_txt_details">
                    </div>
                    <hr />
                    <br />        
                    </div>
                    <div className="div_text_details">
                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>Nombre</h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.nombre}</h3>
                          </div>
                      </div>
                    <div className="div_text_details">
                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>Apellido</h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.apellido}</h3>
                          </div>
                      </div>
                      <div className="div_text_details">
                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>Edad</h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.edad}</h3>
                          </div>
                      </div>
                      </div>
                      <div className="div_text_details">
                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>Numero documento</h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.id}</h3>
                          </div>
                      </div>
                      </div>
                      <div className="div_text_details">
                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>Correo</h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.correo}</h3>
                          </div>
                      </div>
                      </div>
                      <div className="div_text_details">
                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>Cargo</h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.cargo}</h3>
                          </div>
                      </div>
                      </div>
                      <div className="div_text_details">
                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>Rol</h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.rol}</h3>
                          </div>
                      </div>
                      </div>
                      <div className="div_text_details">
                      <div className="row">
                        <div className="name_detail">
                            <h4 className='modal_object_text'>Estado</h4>
                          </div>

                          <div className="contain_detail">
                            <h3>{modal_obj.estado += ""}</h3>
                          </div>
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
  