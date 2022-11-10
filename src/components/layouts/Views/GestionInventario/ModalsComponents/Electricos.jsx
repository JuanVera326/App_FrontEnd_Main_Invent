import React, { useEffect, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoMdEye } from 'react-icons/io';
import { VscSearch } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { getItemsElectricos, getItemsElectricosByGeneralId, getItemsElectricosByGeneralName, getItemsElectricosByType } from '../../../../../helpers/api/ElectricosRequests';
import { Modal } from '../../../../pages/Modal/Modal';
import { Input } from '../../../../ui/Input/Input';
import "./Components.css";

export const Electricos = ( { mdl , evt } ) => {

  const [modal_obj, setmodal_obj] = useState({});
  const [modal_detail, setmodal_detail] = useState(false);

  const [modal_edit, setmodal_edit] = useState(false);
  const [modal_obj_edit, setmodal_obj_edit] = useState({});
  const [img_edit, setimg_edit] = useState("");

  const [modal, setmodal] = useState(mdl);
  const [selectFilterElectricos, setSelectFilterElectricos] = useState("1");
  const [input_search_electricos, setinput_search_electricos] = useState("");
  const [loader, setloader] = useState(false);
  const [items_electricos, setitems_electricos] = useState([]);
  const [val_request_electricos, setval_request_electricos] = useState(0);
  const [getAll, setgetAll] = useState(true);

  const handleKeyPress = ( e ) => {

    if (e.key === "Enter" || e.keyCode === 13) {

      searchItemElectricos( input_search_electricos );

    }else if (e.target.value === "") {
      
      setgetAll(!getAll);

    }

  }

  const searchByClick = () => { searchItemElectricos( input_search_electricos ); }

  const searchItemElectricos = ( e ) => {

    switch ( selectFilterElectricos ) {
      case "1":
        getItemsElectricosByGeneralName( e ).then((info) => {
          setitems_electricos( info.data ); 
        })
      break;

      case "2":
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

  useEffect(() => {

    getItemsElectricos().then((info) => {
      setloader(true);
      if (info.status === 200) {
        console.log(info.data);
        setval_request_electricos(info.status);
        setitems_electricos( info.data );
        setloader(false);
      }else{
        setval_request_electricos(info.status);
      }
    });

  }, [ getAll ])

  useEffect(() => { setmodal(mdl); }, [mdl])
  
  return (
    <div>

            {

              ( !!modal ) &&

              <Modal close={setmodal} set_event={evt}>


                    <div className="cont_gest_electricos animate__animated animate__fadeInRight" style={{ zIndex:"10000" }}>

                        <HiOutlineRefresh title="Refresh" className="refresh_invent" onClick={ () => { setgetAll(!getAll); } } />
                            <h1 style={{ color:"rgb(255, 203, 58)" }}>{" Gestion Ítems Electricos "}</h1>

                            <div className="input-container input_gest_electricos">

                                    <Input type={"text"} txt={"Buscar Electrico"} id={"electricos_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_electricos(e.target.value) }}/>
                                    <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"electricos_items_search_image"} onClick={ searchByClick }/>

                                    <select id="select_filter" onChange={ ( e ) => { setSelectFilterElectricos( e.target.value ) } }>

                                            <option value="1">Por Nombre Item</option>
                                            <option value="2">Por ID Item</option>
                                            <option value="3">Por Tipo Item</option>

                                    </select>

                            </div>

                            <div className="buttons_gest_electric">

                                    <Link className='btn btn_invent create_btn' onClick={() => {}}>Crear Item</Link>
                                    
                                    <Link className='btn btn_invent create_btn' onClick={() => { setmodal(!mdl); evt(!mdl); }}>Cerrar</Link>

                            </div>


                            <div className="cont_table_electricos_items animate__animated animate__fadeInRight">

                                    {

                                      ( !!loader )

                                      ? 
                                          <div className="loader_cont">

                                                  <span className="loader_rows"></span>

                                          </div>

                                      :
                                          <div className="items_rows">
                                            <br />

                                            <div className="names_rows">

                                                  <h2 style={{ width:"25vh", textAlign:"center", color:"rgb(255, 203, 58)" }}>{" Elemento "}</h2>
                                                  <h2 style={{ width:"25vh", textAlign:"center", color:"rgb(255, 203, 58)" }}>{" Descripcion "}</h2>
                                                  <h2 style={{ width:"25vh", textAlign:"center", color:"rgb(255, 203, 58)" }}>{" Tipo "}</h2>
                                                  <h2 style={{ width:"25vh", textAlign:"center", color:"rgb(255, 203, 58)" }}>{" Acciones "}</h2>

                                            </div>

                                                {

                                                    items_electricos.map((item) => (

                                                      <div className='animate__animated animate__fadeInRight row_items'>

                                                            <div style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px",height:"90px",display:"flex", alignItems:"center"}}>
                                                              <h3 style={{ color:"rgb(255, 203, 58)" }}>{ item.id_parte_electricos }</h3>
                                                            </div>

                                                            <div className="cont_img_rows" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px",height:"90px" }}>
                                                              <img src={ item.imagen_parte_electricos } className="img_card" alt={ item.tipo_parte_electricos }/>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px" }}>
                                                              <h3>{ item.nombre_parte_electricos }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px" }}>
                                                              <h3>{ item.descripcion_parte_electricos }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px"}}>
                                                              <h3>{ item.tipo_parte_electricos }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px", width:"35vh", justifyContent:"space-around "}}>
                                                              <Link className='btn btn_invent create_btn' onClick={() => { setmodal_edit(true); }}>Editar Item</Link>
                                                              <Link className='btn btn_view' onClick={ () => { 

                                                                              setmodal_detail(true); 
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


                                                                              }}><IoMdEye/></Link>
                                                              <Link className='btn btn_invent create_btn' onClick={() => {}} style={{ backgroundColor:"rgb(234 66 54)" }}>Eliminar Item</Link>
                                                            </div>

                                                      </div>
                                                    ))
                                                }
                                                {
                                                  ( items_electricos.length === 0 ) && <><h1>No encontrado</h1></>
                                                }

                                          </div>

                                    }

                            </div>

                    </div>

              </Modal>

            }

            {
             ( !!modal_detail ) &&
             <Modal close={ setmodal_detail }>
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
                             <h3>{modal_obj.data_sht}</h3>
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
            {
              ( !!modal_edit ) &&

                <Modal close={setmodal_edit}>
                <div className="animate__animated animate__fadeInRight cont_decision" style={{ zIndex:"10000" }}>
                    
                    <div className="form_cont_edit_users">
                    <h1>Editar electrico</h1>
                      
                      {
                        ( !!loader_edit ) && <span className='loader'></span>
                      }
                      <div className="image_edit animate__animated animate__fadeInRight">
                        <div className="cont_img_details" title='Sube tu imagen' onClick={ () => { myWidgetUser.open(); } }>
                          <img src={ img_edit } className="img_card"/>
                        </div>
                      </div>

                    <br />

                    <Formik

                      initialValues={{
                        imagen : "",
                        id: modal_obj_edit.id,
                        nombre: "",
                        descp: "",
                        tipo: "",
                        cant_disp: "",
                        cont_cons: "",
                        rol: 2,
                        ubicacion : "",
                        data_sht: ""
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

                        // usuariosPut( valores, valores.id ).then( (info) => {

                        //   if (info.status == 202) {
                            
                        //     setloader_edit(false);
                        //     setmodal_edit(false);
                        //     refreshRequest();
                        //     setimg_edit("");
                        //     resetForm();

                        //   }else{

                        //     setmsj_desha_rqst("Hubo un error, intentalo mas tarde.");
                        //     setloader_edit(false);
                        //     setmodal_edit(false);
                        //     setimg_edit("");
                        //     refreshRequest();
                        //     setTimeout(() => { window.location = "/principal"; }, 3500);
                        //   }

                        // } )

                      }}>

                      {({ errors }) => ( 

                          <Form className='form1'>
                            <hr />
                            <br />
                            <p>{ modal_obj_edit.nombre_parte_electricos }</p>
                            <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.nombre_parte_electricos}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Nombre' 
                                name='nombre'
                                id="nombre"
                              />
                              </div>
                              <p>{ modal_obj_edit.descripcion_parte_electricos }</p>
                            <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.descripcion_parte_electricos}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Descripcion' 
                                name='descripcion'
                                id="descripcion"
                              />
                              </div>
                              <p>{ modal_obj_edit.tipo_parte_electricos }</p>
                            <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.tipo_parte_electricos}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Tipo' 
                                name='tipo'
                                id="tipo"
                              />
                              </div>
                              <p>{ modal_obj_edit.cantidad_consumida_electricos }</p>
                            <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.cantidad_consumida_electricos }</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Cantidad consumida' 
                                name='cant_cons'
                                id="cant_cons"
                              />
                              </div>
                              <p>{ modal_obj_edit.cantidad_disponible_electricos }</p>
                            <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.cantidad_disponible_electricos}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Cantidad disponible' 
                                name='cant_disp'
                                id="cant_disp"
                              />
                              </div>
                              <p>{ modal_obj_edit.ubicacion_parte_electricos }</p>
                            <ErrorMessage  name='ubicacion' component={() => (<p className='warn__password-user'>{errors.ubicacion}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Ubicacion' 
                                name='ubicacion'
                                id="ubicacion"
                              />
                              </div>
                              <p>{ modal_obj_edit.datasheet_parte_electricos }</p>
                            <ErrorMessage  name='data_sheet' component={() => (<p className='warn__password-user'>{errors.data_sht}</p>)} />
                            <div className="input-container input_inventario">
                              
                              <Link className='btn btn_invent'  style={{ fontSize:"13px",width:"6vh" }} onClick={ () => {  } }></Link> 
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
  )
}
