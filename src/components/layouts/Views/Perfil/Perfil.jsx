import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSendImage } from '../../../../helpers/image/useSendImage';
import { Modal } from '../../../pages/Modal/Modal';
import { Input } from '../../../ui/Input/Input';
import "./perfil.css"

export const Perfil = () => {
  
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


  return (
<div className='perfil_cont'>
<div className='animate__animated animate__fadeInRight card_perfil'>
<div style={ {display: "flex",justifyContent:"center", alignItems:"center" } }><h1>Bienvenido, {"nombre"}</h1></div>
<div className="img_gest">
  <div className="cont_img_profile">
      <img src={ "https://preview.redd.it/5y3785vky0471.jpg?auto=webp&s=6de732d4cbad67d0eba1387a18f7766858e06008" } className="img_card profile_img"/>
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
        <h3>{"modal_obj.nombre"}</h3>
      </div>
  </div>
<div className="div_text_details">
  <div className="row">
    <div className="name_detail">
        <h4 className='modal_object_text'>Apellido</h4>
      </div>

      <div className="contain_detail">
        <h3>{"modal_obj.apellido"}</h3>
      </div>
  </div>
  <div className="div_text_details">
  <div className="row">
    <div className="name_detail">
        <h4 className='modal_object_text'>Edad</h4>
      </div>

      <div className="contain_detail">
        <h3>{"modal_obj.edad"}</h3>
      </div>
  </div>
  </div>
  <div className="div_text_details">
  <div className="row">
    <div className="name_detail">
        <h4 className='modal_object_text'>Documento</h4>
      </div>

      <div className="contain_detail">
        <h3>{"modal_obj.id"}</h3>
      </div>
  </div>
  </div>
  <div className="div_text_details">
  <div className="row">
    <div className="name_detail">
        <h4 className='modal_object_text'>Correo</h4>
      </div>

      <div className="contain_detail">
        <h3>{"modal_obj.correo"}</h3>
      </div>
  </div>
  </div>
  <div className="div_text_details">
  <div className="row">
    <div className="name_detail">
        <h4 className='modal_object_text'>Cargo</h4>
      </div>

      <div className="contain_detail">
        <h3>{"modal_obj.cargo"}</h3>
      </div>
  </div>
  </div>
  <div className="div_text_details">
  <div className="row">
    <div className="name_detail">
        <h4 className='modal_object_text'>Rol</h4>
      </div>

      <div className="contain_detail">
        <h3>{"modal_obj.rol"}</h3>
      </div>
  </div>
  </div>
  <div className="div_text_details">
  <div className="row">
    <div className="name_detail">
      <h4 className='modal_object_text'>Estado</h4>
    </div>
    <div className="contain_detail">
      {/* {
        ( !!modal_obj.estado ) 

        ? <h3 style={{ color:"rgb(38 201 64)" }}>{"Activo"}</h3>

        : <h3 style={{ color:"rgb(255 95 87)" }}>{"Inactivo"}</h3>
      } */}
    </div>
       </div>
       <div style={ {display: "flex",justifyContent:"center", alignItems:"center"} }>
        <Link className='btn btn_invent' onClick={() => {setmodal_edit(true); setmodal_obj_edit(); setimg_edit("");}}>Editar</Link>
        </div>
       {
                ( !!modal_edit ) &&

                <Modal close={setmodal_edit}>
                    <div className="animate__animated animate__fadeInRight cont_decision" style={{ zIndex:"10000" }}>
                        
                        <div className="form_cont_edit_users">
                        <h1>Editar perfil</h1>
                          
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
                        }}

                        validate = {(valores) => {}}

                        onSubmit={( valores, {resetForm} ) => {
                          

                        }}>

                          {({ errors }) => ( 

                              <Form className='form1'>
                                <hr />
                                <br />
                                <p>{ "modal_obj_edit.nombre" }</p>
                                <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.nombre}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Nuevo nombre' 
                                    name='nombre'
                                    id="nombre"
                                  />
                                </div>
                                <p>{ "modal_obj_edit.apellido" }</p>
                                <ErrorMessage  name='apellido' component={() => (<p className='warn__password-user'>{errors.apellido}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Nuevo apellido' 
                                    name='apellido'
                                    id="apellido"
                                  />
                                </div>
                               
                                <p>{ "modal_obj_edit.cargo" }</p>
                                <ErrorMessage  name='cargo' component={() => (<p className='warn__password-user'>{errors.cargo}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Nuevo cargo' 
                                    name='cargo'
                                    id="cargo"
                                  />
                                </div>
            
                                <p>{ "modal_obj_edit.edad" }</p>
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
</div>
 </div>
 </div>
 </div>
 </div>
  )
}
