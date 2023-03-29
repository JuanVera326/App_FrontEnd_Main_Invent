import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { FaFileUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getItemsUsuariosByIdSpecify, usuariosPut } from '../../../../helpers/api/UsuariosRequest';
import { useSendImage } from '../../../../helpers/image/useSendImage';
import { Modal } from '../../../pages/Modal/Modal';
import { Input } from '../../../ui/Input/Input';
import "./perfil.css"

export const Perfil = () => {

  const user = JSON.parse(localStorage.getItem("usuario"));
  
  const { myWidgetUser , urlImage } = useSendImage();
  const [img_edit, setimg_edit] = useState("");
  const [loader_edit, setloader_edit] = useState(false);

  const [modal_edit, setmodal_edit] = useState(false);
  const [modal_obj_edit, setmodal_obj_edit] = useState({});

  const [loader_desha, setloader_desha] = useState(false);
  const [msj_desha_rqst, setmsj_desha_rqst] = useState("");
  const [action_desh, setaction_desh] = useState("");

  const [profile_obj, setprofile_obj] = useState({});
  const [getAll, setgetAll] = useState(true);

  useEffect(() => {

    getItemsUsuariosByIdSpecify( user.id ).then( (info) => {
      console.log(info);
      if (info.status == 200) {

        setprofile_obj(info.data);

      }else{

        setTimeout(() => { window.location = "/principal"; }, 1000);

      }

    })

  }, [ getAll ])

  useEffect(() => {  setimg_edit(urlImage); }, [ urlImage ]);

  const refreshRequest = () => { setgetAll(!getAll); }

  return (
  <div className='perfil_cont'>
    <div className='animate__animated animate__fadeInRight card_perfil'>
    <div style={ {display: "flex",justifyContent:"center", alignItems:"center" } }><h1 style={{color:"rgb(255 203 59)"}}>Bienvenido, { profile_obj.nombre }</h1></div>
    <div className="img_gest">
      <div className="cont_img_profile">
          <img src={ profile_obj.imagen } className="img_card profile_img"/>
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
        <div className="name_detail" style={{backgroundColor:"rgb(128, 128, 128)"}}>
            <h4 className='modal_object_text' style={{color:"rgb(255 203 59)"}}>Nombre</h4>
          </div>

          <div className="contain_detail">
            <h3>{profile_obj.nombre}</h3>
          </div>
      </div>
    <div className="div_text_details">
      <div className="row">
        <div className="name_detail" style={{backgroundColor:"rgb(128, 128, 128)"}}>
            <h4 className='modal_object_text' style={{color:"rgb(255 203 59)"}}>Apellido</h4>
          </div>

          <div className="contain_detail">
            <h3>{profile_obj.apellido}</h3>
          </div>
      </div>
      <div className="div_text_details">
      <div className="row">
        <div className="name_detail" style={{backgroundColor:"rgb(128, 128, 128)"}}>
            <h4 className='modal_object_text' style={{color:"rgb(255 203 59)"}}>Edad</h4>
          </div>

          <div className="contain_detail">
            <h3>{profile_obj.edad}</h3>
          </div>
      </div>
      </div>
      <div className="div_text_details">
      <div className="row">
        <div className="name_detail" style={{backgroundColor:"rgb(128, 128, 128)"}}>
            <h4 className='modal_object_text' style={{color:"rgb(255 203 59)"}}>Documento</h4>
          </div>

          <div className="contain_detail">
            <h3>{profile_obj.id}</h3>
          </div>
      </div>
      </div>
      <div className="div_text_details">
      <div className="row">
        <div className="name_detail"  style={{backgroundColor:"rgb(128, 128, 128)"}}>
            <h4 className='modal_object_text' style={{color:"rgb(255 203 59)"}}>Correo</h4>
          </div>

          <div className="contain_detail">
            <h3>{profile_obj.correo}</h3>
          </div>
      </div>
      </div>
      <div className="div_text_details">
      <div className="row">
        <div className="name_detail" style={{backgroundColor:"rgb(128, 128, 128)"}}>
            <h4 className='modal_object_text' style={{color:"rgb(255 203 59)"}}>Cargo</h4>
          </div>

          <div className="contain_detail">
            <h3>{profile_obj.cargo}</h3>
          </div>
      </div>
      </div>
      <div className="div_text_details">
      <div className="row">
        <div className="name_detail" style={{backgroundColor:"rgb(128, 128, 128)"}}>
            <h4 className='modal_object_text' style={{color:"rgb(255 203 59)"}}>Rol</h4>
          </div>

          <div className="contain_detail">
            <h3>{profile_obj.rol}</h3>
          </div>
      </div>
      </div>
      <div className="div_text_details">
      <div className="row">
        <div className="name_detail" style={{backgroundColor:"rgb(128, 128, 128)"}}>
          <h4 className='modal_object_text' style={{color:"rgb(255 203 59)"}}>Estado</h4>
        </div>
        <div className="contain_detail">
          {
            ( !!profile_obj.estado ) 

            ? <h3 style={{ color:"rgb(38 201 64)" }}>{"Activo"}</h3>

            : <h3 style={{ color:"rgb(255 95 87)" }}>{"Inactivo"}</h3>
          }
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

                            <Formik

                            initialValues={{
                                id: profile_obj.id,
                                nombre: "",
                                apellido: "",
                                imagen: "",
                                edad: "",
                                rol: 2,
                                cargo: profile_obj.cargo,
                                password: "",
                                correo: profile_obj.correo,
                                estado: profile_obj.estado
                              }}

                              validate = {(valores) => {
                                let errors = {};

                                if (!valores.nombre.trim()) { errors.nombre = "Nombres erroneos" }
                                else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(valores.nombre)) { errors.nombre = "Nombres erroneos" }

                                else if (!valores.apellido.trim()) { errors.apellido = "Apellidos erroneos" }
                                else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(valores.apellido)) { errors.apellido = "Apellidos erroneos" }

                                else if (!valores.correo.trim()) { errors.correo = "Correo erroneo" }
                                else if (!/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/.test(valores.correo)) { errors.correo = "Correo erroneo" }


                                else if (!valores.password.trim()) {errors.password = "Contraseña necesaria"}
                                
                                return errors;
                              }}

                              onSubmit={( valores, {resetForm} ) => {
                                
                                setloader_edit(true);
                                valores.imagen = img_edit;

                                usuariosPut( valores, valores.id ).then( (info) => {

                                  if (info.status === 202) {
                                    
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
                                    {
                                        ( !!img_edit ) 

                                        ?
                                          <div className="img_regist animate__animated animate__fadeInRight">
                                            <div className="cont_img_details " title='Sube tu imagen' onClick={ () => { myWidgetUser.open(); } }>
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
                                    <p>{ profile_obj.nombre }</p>
                                    <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.nombre}</p>)} />
                                    <div className="input-container input_inventario">
                                      <Field 
                                        type='text'
                                        placeholder='Nuevo nombre' 
                                        name='nombre'
                                        id="nombre"
                                      />
                                    </div>
                                    <p>{ profile_obj.apellido }</p>
                                    <ErrorMessage  name='apellido' component={() => (<p className='warn__password-user'>{errors.apellido}</p>)} />
                                    <div className="input-container input_inventario">
                                      <Field 
                                        type='text'
                                        placeholder='Nuevo apellido' 
                                        name='apellido'
                                        id="apellido"
                                      />
                                    </div>
                                  
                
                                    <p>{ profile_obj.edad }</p>
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
