import React, { useEffect, useState } from 'react'
import { HiOutlineRefresh } from 'react-icons/hi';
import { VscSearch } from 'react-icons/vsc';
import { IoMdEye } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import { MdImageSearch } from "react-icons/md";
import { Link } from 'react-router-dom';
import { getItemsUsuarios, getItemsUsuariosByCargo, getItemsUsuariosById, getItemsUsuariosByName, usuariosPost, usuariosPut } from '../../../../helpers/api/UsuariosRequest';
import { Input } from '../../../ui/Input/Input';
import { Modal } from '../../../pages/Modal/Modal';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSendImage } from '../../../../helpers/image/useSendImage';
import "./GestionUsuarios.css";

export const GestionUsuarios = () => {

  const { myWidgetUser , urlImage } = useSendImage();
  const [img_edit, setimg_edit] = useState("");
  const [loader_edit, setloader_edit] = useState(false);

  const [modal_edit, setmodal_edit] = useState(false);
  const [modal_obj_edit, setmodal_obj_edit] = useState({});

  const [loader_desha, setloader_desha] = useState(false);
  const [msj_desha_rqst, setmsj_desha_rqst] = useState("");
  const [action_desh, setaction_desh] = useState("");

  const [modal, setmodal] = useState(false);
  const [modal_obj, setmodal_obj] = useState({});

  const [modal_regist, setmodal_regist ] = useState(false);
  const [modal_objs_regist, setmodal_obj_regist] = useState({});

  const [modal_desha, setmodaldesha] = useState(false);
  const [modal_obj_desha, setmodal_obj_desha] = useState({});

  const [user_data, setuser_data] = useState(JSON.parse(localStorage.getItem("usuario")));
  const [button_comp, setbutton_comp] = useState("home");
  const [getAll, setgetAll] = useState(true);

  const [input_search_usuarios, setinput_search_usuarios] = useState("");
  const [items_usuarios, setitems_usuarios] = useState([]);
  const [val_request_usuarios, setval_request_usuarios] = useState(0);
  const [selectFilterUsuarios, setSelectFilterUsuarios] = useState("1");
  const [loader, setloader] = useState(true);

  const handleKeyPress = ( e ) => {

    if (e.key === "Enter" || e.keyCode === 13) {

      if (!!input_search_usuarios) {

        searchUsus(input_search_usuarios);
        
      }else if (input_search_usuarios == ""){

        refreshRequest();

      }
    }
  }
  const searchByClick = () => { if ( !!input_search_usuarios ) { searchUsus(input_search_usuarios); } }

  const searchUsus = ( e ) => {

    switch ( selectFilterUsuarios ) {
      case "1":
        getItemsUsuariosByName ( e ).then((info) => {
          setitems_usuarios( info.data ); 
        })
      break;

      case "2":
        getItemsUsuariosById( e ).then((info) => {
          setitems_usuarios( info.data ); 
        })
      break;

      case "3":
        getItemsUsuariosByCargo ( e ).then((info) => {
          setitems_usuarios( info.data ); 
        })
      break;
    
      default: break;
    }

  }

  const handleDeshaUsu = () => {

    setloader_desha(true);

    let obj_temp =  modal_obj_desha;

    if ( action_desh === "Habilitar") {

        obj_temp.estado = true;

    }else if ( action_desh === "Deshabilitar" ) {

        obj_temp.estado = false;

    }

    usuariosPut( obj_temp , obj_temp.id ).then((info) => {

      if ( info.status == 202 ) {

        setloader_desha(false);
        setmodaldesha(false);
        setimg_edit("");
        setgetAll(!getAll);

      }else{

        setmsj_desha_rqst("Hubo un error, Intente mas tarde.")
        setloader_desha(false);
        setimg_edit("");
        setTimeout(() => { window.location = "/principal"; }, 3500);

      }
      
    });

    setloader_desha(false);
  }

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

  useEffect(() => {  setimg_edit(urlImage); }, [ urlImage ]);
  
  const refreshRequest = () => { setgetAll(!getAll); }

  return (
    <div className='cont_invent'>

    <HiOutlineRefresh title="Refresh" className="refresh_invent" onClick={refreshRequest} />
    <div className="input_title_cont">
      <h1>Gestion de usuarios</h1>

      <div className="input-container input_inventario">

        <Input type={"text"} txt={"Buscar Usuario"} id={"usuarios_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_usuarios(e.target.value) }}/>
        <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"usuarios_items_search_image"} onClick={ searchByClick }/>

        <select id="select_filter" onChange={ ( e ) => { setSelectFilterUsuarios( e.target.value ) } }>
          <option value="1">Por nombre de usuario</option>
          <option value="2">Por ID de usuario</option>
          <option value="3">Por cargo de usuario</option>
        </select>
      </div>
      <Link className='btn btn_invent create_btn' onClick={() => {setmodal_regist(true);}}>Crear usuario</Link>
    </div>
    <br />
    <div className="usuarios_cont">
      {
        ( !!loader )

          ? 
           
            <>
              <div className="card_usuarios"> <span className="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span className="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span className="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span className="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span className="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span className="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span className="loader_cards_usuarios"></span></div>
              <div className="card_usuarios"> <span className="loader_cards_usuarios"></span></div>
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
                    <h3>Documento:</h3>
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
                    
                    {
                      ( item.rol === 1 ) ? <></> :( item.estado === false ) 
                          ? <><Link className='btn btn_invent' onClick={() => {setmodal_edit(true); setmodal_obj_edit(item); setimg_edit(item.imagen);}}>Editar</Link>
                            <Link className='btn btn_invent' onClick={ () => {setmodal_obj_desha(item); setmodaldesha(true); setaction_desh("Habilitar"); } } >Habilitar</Link></>
                          : <><Link className='btn btn_invent' onClick={() => {setmodal_edit(true); setmodal_obj_edit(item); setimg_edit(item.imagen);}}>Editar</Link>
                            <Link className='btn btn_invent' onClick={ () => {setmodal_obj_desha(item); setmodaldesha(true); setaction_desh("Deshabilitar"); } } >Deshabilitar</Link></>
                    }
                    <Link className='btn btn_view' onClick={ () => {setmodal(true); setmodal_obj(item);}}><IoMdEye/></Link>
                  </div>
                </div>
              </div>
              
              ))
            }
            {
              ( items_usuarios.length === 0 ) && <><h1>No encontrado</h1></>
            }
    
            </div>
            {
              ( modal ) &&
              <Modal close={ setmodal }>
                  <div className='animate__animated animate__fadeInRight modal_details'>
                  <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }} className="row">
                  <h2 className='modal_object_text'>{ modal_obj.cargo }</h2>
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
                            <h4 className='modal_object_text'>Documento</h4>
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
                            {
                              ( !!modal_obj.estado ) 

                              ? <h3 style={{ color:"rgb(38 201 64)" }}>{"Activo"}</h3>

                              : <h3 style={{ color:"rgb(255 95 87)" }}>{"Inactivo"}</h3>
                            }
                          </div>
                      </div>
                      </div>
                    </div>
                    </div>
                    </div>
              </Modal>
            }
            {

              ( !!modal_desha ) &&
              <Modal close={setmodaldesha}>

                <div className="animate__animated animate__fadeInRight cont_decision" style={{ zIndex:"10000" }}>
                  <div>
                      <h1>{ "¿Esta seguro de querer "}{action_desh}{" a " }{ modal_obj_desha.nombre }{ "?" }</h1>
                      <br />
                      {
                        ( !!loader_desha )
                        ?
                          <>
                              <span className="loader"></span>
                          </>
                        : 
                          ( !!msj_desha_rqst )

                          ?
                            <div className="cont_buttons_desha">
                              <h2 style={{ color:"rgb(26 200 252)" }}>{ msj_desha_rqst }</h2>
                            </div> 
                          :
                            <div className="cont_buttons_desha">
                              <Link className='btn btn_invent' onClick={ handleDeshaUsu }>Si</Link>
                              <Link className='btn btn_invent' onClick={ () => { setmodaldesha(false); } }>Cancelar</Link>
                            </div>
                      }
                  </div>
                </div>

              </Modal>

            }
              {
                ( !!modal_edit ) &&

                <Modal close={setmodal_edit}>
                    <div className="animate__animated animate__fadeInRight cont_decision" style={{ zIndex:"10000" }}>
                        
                        <div className="form_cont_edit_users">
                        <h1>Actualizar usuario</h1>
                          
                          {
                            ( !!loader_edit ) && <span className='loader'></span>
                          }
                          <div className="image_edit">
                            <div className="cont_img_details" title='Sube tu imagen' onClick={ () => { myWidgetUser.open(); } }>
                              <img src={ img_edit } className="img_card"/>
                            </div>
                          </div>

                        <br />

                        <Formik

                          initialValues={{
                            id: modal_obj_edit.id,
                            nombre: "",
                            apellido: "",
                            cargo: "",
                            imagen: "",
                            edad: "",
                            rol: 2,
                            password: "",
                            correo: modal_obj_edit.correo,
                            estado: modal_obj_edit.estado
                          }}

                          validate = {(valores) => {

                            let errors = {};

                            if (!valores.nombre.trim()) { errors.nombre = "Nombres erroneos" }
                            else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(valores.nombre)) { errors.nombre = "Nombres erroneos" }

                            else if (!valores.apellido.trim()) { errors.apellido = "Apellidos erroneos" }
                            else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(valores.apellido)) { errors.apellido = "Apellidos erroneos" }

                            else if (!valores.correo.trim()) { errors.correo = "Correo erroneo" }
                            else if (!/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(valores.correo)) { errors.correo = "Correo erroneo" }

                            else if (!valores.cargo.trim()) { errors.cargo = "Cargo erroneo" }
                            else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(valores.cargo)) { errors.cargo = "Cargo erroneo" }

                            else if (!valores.password.trim()) {errors.password = "Contraseña necesaria"}
                            
                            return errors;
                          }}

                          onSubmit={( valores, {resetForm} ) => {
                            
                            setloader_edit(true);
                            valores.imagen = img_edit;

                            usuariosPut( valores, valores.id ).then( (info) => {

                              if (info.status == 202) {
                                
                                setloader_edit(false);
                                setmodal_edit(false);
                                refreshRequest();
                                setimg_edit("");
                                resetForm();

                              }else{

                                setmsj_desha_rqst("Hubo un error, intentalo mas tarde.");
                                setloader_edit(false);
                                setmodal_edit(false);
                                setimg_edit("");
                                refreshRequest();
                                setTimeout(() => { window.location = "/principal"; }, 3500);
                              }

                            } )

                          }}>

                          {({ errors }) => ( 

                              <Form className='form1'>
                                <hr />
                                <br />
                                <p>{ modal_obj_edit.nombre }</p>
                                <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.nombre}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Nuevo nombre' 
                                    name='nombre'
                                    id="nombre"
                                  />
                                </div>
                                <p>{ modal_obj_edit.apellido }</p>
                                <ErrorMessage  name='apellido' component={() => (<p className='warn__password-user'>{errors.apellido}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Nuevo apellido' 
                                    name='apellido'
                                    id="apellido"
                                  />
                                </div>
                               
                                <p>{ modal_obj_edit.cargo }</p>
                                <ErrorMessage  name='cargo' component={() => (<p className='warn__password-user'>{errors.cargo}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Nuevo cargo' 
                                    name='cargo'
                                    id="cargo"
                                  />
                                </div>
            
                                <p>{ modal_obj_edit.edad }</p>
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='number'
                                    max={"99"}
                                    placeholder='Nueva edad' 
                                    name='edad'
                                    id="edad"
                                  />
                                </div>
                                
                                <ErrorMessage  name='password' component={() => (<p className='warn__password-user'>{errors.password}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='password'
                                    placeholder='Nueva contraseña' 
                                    name='password'
                                    id="password"
                                  />
                                </div>

                                <div style={{ width:"100%",display:"flex",justifyContent:"center",gap:"10px" }}>
                                  <Input type={"submit"} txt={"Actualizar"} style={"btn btn_invent"}/>
                                  <Link className='btn btn_invent'  style={{ fontSize:"13px",width:"6vh" }} onClick={ () => { setmodal_edit(false); } } >Cancelar</Link>
                                </div>
                                {
                                  ( !!msj_desha_rqst ) && 
                                  <div className="cont_buttons_desha">
                                    <h2 style={{ color:"rgb(26 200 252)" }}>{ msj_desha_rqst }</h2>
                                  </div>
                                }
                        
                              </Form> 

                          )}

                          </Formik>
                        </div>
                    </div>
                </Modal>

              }
             { 
             ( !!modal_regist ) &&

             <Modal close={setmodal_regist}>
                    <div className="animate__animated animate__fadeInRight cont_decision" style={{ zIndex:"10000" }}>
                        
                        <div className="form_cont_edit_users">
                        <h1>Crear usuario</h1>
                            
                        {
                          ( !!loader_edit ) && <span className='loader'></span>
                        }
                          <div className='form2'>

                          <Formik
                          initialValues={{
                            id: "",
                            nombre: "",
                            apellido: "",
                            cargo: "",
                            imagen: "",
                            edad: "",
                            rol: 2,
                            password: "",
                            correo: "",
                            estado: ""
                          }}

                          validate = {(valores) => {

                            let errors = {};

                            if (!valores.id.trim()) { errors.id = "Id Vacío" }
                            else if ( !/^\d+$/.test( valores.id ) ) { errors.id = "Id solo admite numeros" }

                            else if (!valores.nombre.trim()) { errors.nombre = "Nombres erroneos" }
                            else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(valores.nombre)) { errors.nombre = "Nombres erroneos" }

                            else if (!valores.apellido.trim()) { errors.apellido = "Apellidos erroneos" }
                            else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(valores.apellido)) { errors.apellido = "Apellidos erroneos" }

                            else if (!valores.correo.trim()) { errors.correo = "Correo erroneo" }
                            else if (!/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(valores.correo)) { errors.correo = "Correo erroneo" }

                            else if (!valores.cargo.trim()) { errors.cargo = "Cargo erroneo" }
                            else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(valores.cargo)) { errors.cargo = "Cargo erroneo" }

                            else if (valores.estado === "none" || valores.estado === "") { errors.estado = "Estado invalido" }
                            else if (!valores.password.trim()) {errors.password = "Contraseña necesaria"}
                            
                            return errors;
                          }}

                          onSubmit={( valores, {resetForm} ) => {

                            valores.imagen = img_edit;
                            console.log(valores);
                            setloader_edit(true);

                            usuariosPost( valores ).then( (info) => {
                              if (info.status == 202) {
                                
                                setloader_edit(false);
                                setmodal_regist(false);
                                refreshRequest();
                                setimg_edit("");
                                resetForm();

                              }else{

                                setmsj_desha_rqst("Hubo un error, intentalo mas tarde.");
                                setloader_edit(false);
                                setmodal_regist(false);
                                setimg_edit("");
                                refreshRequest();
                                setTimeout(() => { window.location = "/principal"; }, 3500);
                              }
                            } )

                          }}>

                          {({ errors }) => ( 

                                <Form className='form1'>

                                  {
                                    ( !!img_edit ) 

                                    ?
                                      <div className="img_regist">
                                        <div className="cont_img_details" title='Sube tu imagen' onClick={ () => { myWidgetUser.open(); } }>
                                          <img src={ img_edit } className="img_card"/>
                                        </div>
                                      </div>

                                    :
                                      <div id='img_rsg' title='Subir imagen' onClick={ () => { myWidgetUser.open(); } }>
                                          <FaFileUpload fontSize={"140px"}/>
                                      </div>
                                  }

                                  <hr />
                                  <br />
                                
                                <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.nombre}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Nombre' 
                                    name='nombre'
                                    id="nombre"
                                  />
                                </div>

                                <ErrorMessage  name='apellido' component={() => (<p className='warn__password-user'>{errors.apellido}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Apellido' 
                                    name='apellido'
                                    id="apellido"
                                  />
                                </div>

                                <ErrorMessage  name='id' component={() => (<p className='warn__password-user'>{errors.id}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Numero de documento' 
                                    name='id'
                                    id="id"
                                  />
                                </div>

                                <ErrorMessage  name='cargo' component={() => (<p className='warn__password-user'>{errors.cargo}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Cargo' 
                                    name='cargo'
                                    id="cargo"
                                  />
                                </div>
                                
                                <ErrorMessage  name='password' component={() => (<p className='warn__password-user'>{errors.edad}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='number'
                                    max={"99"}
                                    placeholder='Edad' 
                                    name='edad'
                                    id="edad"
                                  />
                                </div>
                                
                                <ErrorMessage  name='password' component={() => (<p className='warn__password-user'>{errors.password}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='password'
                                    placeholder='Contraseña' 
                                    name='password'
                                    id="password"
                                  />
                                </div>

                                <ErrorMessage  name='correo' component={() => (<p className='warn__password-user'>{errors.correo}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Correo' 
                                    name='correo'
                                    id="correo"
                                  />
                                </div>

                                <ErrorMessage  name='estado' component={() => (<p className='warn__password-user'>{errors.estado}</p>)} />
                                <div className="input-container input_inventario estado_regist">
                                  <h3 style={{ fontWeight:"lighter" }} id='estado'>{ "Estado" }</h3>
                                  <Field as="select" name="estado" id="select_filter" autofocus="true">
                                      <option value="none">Seleccione el estado</option>
                                      <option value="true">Activo</option>
                                      <option value="false">Deshabilitado</option>
                                  </Field>
                                </div>


                                <div style={{ width:"100%",display:"flex",justifyContent:"center",gap:"10px" }}>
                                  <Input type={"submit"} txt={"Actualizar"} style={"btn btn_invent"}/>
                                  <Link className='btn btn_invent'  style={{ fontSize:"13px",width:"6vh" }} onClick={ () => { setmodal_regist(false); } } >Cancelar</Link>
                                </div>

                                {
                                  ( !!msj_desha_rqst ) && 
                                  <div className="cont_buttons_desha">
                                    <h2 style={{ color:"rgb(26 200 252)" }}>{ msj_desha_rqst }</h2>
                                  </div>
                                }

                              </Form> 

                              )}
                          </Formik>
                          </div>
                      </div>
                      </div>
             </Modal>
                }
        </div>
      )
    }
  

  
