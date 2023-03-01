import React, { useEffect, useState } from 'react'
import { doc_del, doc_post } from '../../../../../helpers/api/DocsRequest';
import { getItemsOtros, getItemsOtrosByGeneralId, getItemsOtrosByGeneralName, getItemsOtrosByType, getTypesItemsOtros, otros_del, otros_post, otros_put } from '../../../../../helpers/api/OtrosRequest';
import { Modal } from '../../../../pages/Modal/Modal';
import { FaFileUpload } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoMdEye } from 'react-icons/io';
import { VscSearch } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useSendImage } from '../../../../../helpers/image/useSendImage';
import { Button } from '../../../../ui/Buttons/Button';
import { Input } from '../../../../ui/Input/Input';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import "./Components.css";

export const Otros = ( { mdl , evt } ) => {
  
  const [modal_obj, setmodal_obj] = useState({});
  const [modal_detail, setmodal_detail] = useState(false);

  const [modal_crear, setmodal_crear] = useState(false);

  const [modal_edit, setmodal_edit] = useState(false);
  const [modal_obj_edit, setmodal_obj_edit] = useState({});
  const [loader_edit, setloader_edit] = useState(false);
  const [img_edit, setimg_edit] = useState("");
  const [msj_desha_rqst, setmsj_desha_rqst] = useState("");
  const { myWidgetOtros , urlImage } = useSendImage();

  const [modal, setmodal] = useState(mdl);
  const [selectFilterOtros, setSelectFilterOtros] = useState("1");
  const [input_search_otros, setinput_search_otros] = useState("");
  const [loader, setloader] = useState(false);
  const [items_otros, setitems_otros] = useState([]);
  const [val_request_otros, setval_request_otros] = useState(0);
  const [getAll, setgetAll] = useState(true);

  const [file, setfile] = useState(null);
  const [nameFile, setnameFile] = useState("");
  const [obj_file_toUpadate, setobj_file_toUpadate] = useState({});
  const [modal_file, setmodal_file] = useState(false);
  const [typeRequestFile, setTypeRequestFile] = useState(0);

  const [type_select, settype_select] = useState(false);
  const [types, settypes] = useState([]);

  const [modal_desha, setmodaldesha] = useState(false);
  const [modal_obj_desha, setmodal_obj_desha] = useState({});
  const [loader_desha, setloader_desha] = useState(false);

  
  const getFile = () => {
    
    const formData = new FormData();
    formData.set("file" , file[0]);

    doc_post( formData,obj_file_toUpadate.nombre_parte_otros,obj_file_toUpadate.id_parte_otros ).then( info => {

      if (info.status === 202) {

        setloader_edit(true);

        const new_item = {

          cantidad_consumida_otros
          : 
          obj_file_toUpadate.cantidad_consumida_otros,

          cantidad_disponible_otros
          : 
          obj_file_toUpadate.cantidad_disponible_otros,

          datasheet_parte_otros
          : 
          info.data.id_doc,

          descripcion_parte_otros
          : 
          obj_file_toUpadate.descripcion_parte_otros,

          id_parte_otros
          : 
          obj_file_toUpadate.id_parte_otros,

          imagen_parte_otros
          : 
          obj_file_toUpadate.imagen_parte_otros,

          nombre_parte_otros
          : 
          obj_file_toUpadate.nombre_parte_otros,

          tipo_parte_otros
          : 
          obj_file_toUpadate.tipo_parte_otros,

          ubicacion_parte_otros
          : 
          obj_file_toUpadate.ubicacion_parte_otros,

        };

        otros_put( new_item,new_item.id_parte_otros ).then((info) => {  
          
          if (info.status === 202) {

            console.log(info);
            setloader_edit(false); 
            setmodal_file(false);
            setgetAll(!getAll);

          }else{

            setloader_edit(false);
            setnameFile("Hubo un error, por favor intente mas tarde.")
            setTimeout(() => { window.location = "/principal"; }, 3500);

       }})
      }

    })

  }

  const delFile = () => {

    doc_del( obj_file_toUpadate.datasheet_parte_otros ).then(() => { 
          
      setloader_edit(true);

      const new_item = {

        
        cantidad_consumida_otros
        : 
        obj_file_toUpadate.cantidad_consumida_otros,

        cantidad_disponible_otros
        : 
        obj_file_toUpadate.cantidad_disponible_otros,

        datasheet_parte_otros
        : 
        "",

        descripcion_parte_otros
        : 
        obj_file_toUpadate.descripcion_parte_otros,

        id_parte_otros
        : 
        obj_file_toUpadate.id_parte_otros,

        imagen_parte_otros
        : 
        obj_file_toUpadate.imagen_parte_otros,

        nombre_parte_otros
        : 
        obj_file_toUpadate.nombre_parte_otros,

        tipo_parte_otros
        : 
        obj_file_toUpadate.tipo_parte_otros,

        ubicacion_parte_otros
        : 
        obj_file_toUpadate.ubicacion_parte_otros,

      };

      otros_put( new_item,new_item.id_parte_otros ).then((info) => {  
        
        if (info.status === 202) {

          console.log(info);
          setloader_edit(false); 
          setmodal_file(false);
          setgetAll(!getAll);
          setfile(null);

        }else{

          setloader_edit(false);
          setnameFile("Hubo un error, por favor intente mas tarde.")
          setTimeout(() => { window.location = "/principal"; }, 3500);

     }})
    })

  }

  const handleDelItem = () => {

    setloader_desha(true);

    if ( !!modal_obj_desha.id_doc ) {

      doc_del( modal_obj_desha.id_doc ).then(info => {

        if (info === 202) {
  
          otros_del(modal_obj_desha.id_parte_otros).then((info) => {
  
            if ( info.status === 202 ) {
      
              setloader_desha(false);
              setmodaldesha(false);
              setgetAll(!getAll);
      
            }else{
      
              setmsj_desha_rqst("Hubo un error, Intente mas tarde.")
              setloader_desha(false);
              setimg_edit("");
              setTimeout(() => { window.location = "/principal"; }, 3500);
      
            }
            console.log(info);
  
          });
  
        }else{
      
          setmsj_desha_rqst("Hubo un error, Intente mas tarde.")
          setloader_desha(false);
          setimg_edit("");
          setTimeout(() => { window.location = "/principal"; }, 3500);
  
        }
  
        console.log(info);
  
      });
      
    }else{

      otros_del(modal_obj_desha.id_parte_otros).then((info) => {
  
        if ( info.status === 202 ) {
  
          setloader_desha(false);
          setmodaldesha(false);
          setgetAll(!getAll);
  
        }else{
  
          setmsj_desha_rqst("Hubo un error, Intente mas tarde.")
          setloader_desha(false);
          setimg_edit("");
          setTimeout(() => { window.location = "/principal"; }, 3500);
  
        }
        console.log(info);

      })

    }

  }

  const handleKeyPress = ( e ) => {

    if (e.key === "Enter" || e.keyCode === 13) {

      searchItemOtros( input_search_otros );

    }else if (e.target.value === "") {
      
      setgetAll(!getAll);

    }

  }

  const searchByClick = () => { searchItemOtros( input_search_otros ); }

  const searchItemOtros = ( e ) => {

    switch ( selectFilterOtros) {
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

  const refreshRequest = () => { setgetAll(!getAll); }

  useEffect(() => {

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

    getTypesItemsOtros().then((info) => {
      if (info.status === 200) {

        if (info.data.length === 0) {

          settypes(["Cree un nuevo tipo"])

        }else{

          settypes(info.data);

        }

      }else{

        settypes(["Error al obtener tipos"])

      }
    });

  }, [ getAll ])

  useEffect(() => { setmodal(mdl); }, [mdl]);

  useEffect(() => {  setimg_edit(urlImage); }, [ urlImage ]);

  useEffect(() => { if (file !== null) { setnameFile( "Archivo subido: \n" + file[0].name ); } }, [ file ]);

  useEffect(() => { if (modal_crear === false) { setfile(null); setnameFile(""); setimg_edit(""); } }, [ modal_crear ]);

  
  return (
    <div>

            {

              ( !!modal ) &&

              <Modal close={setmodal} set_event={evt}>


                    <div className="cont_gest_electricos animate__animated animate__fadeInRight" style={{ zIndex:"10000" }}>

                        <HiOutlineRefresh title="Refresh" className="refresh_invent" onClick={ () => { setgetAll(!getAll); } } />
                            <h1 style={{ color:"rgb(255, 203, 58)" }}>{" Gestion Ítems Varios "}</h1>

                            <div className="input-container input_gest_electricos">

                                    <Input type={"text"} txt={"Buscar Elemento Varios.."} id={"electricos_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_otros(e.target.value) }}/>
                                    <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"electricos_items_search_image"} onClick={ searchByClick }/>

                                    <select id="select_filter" onChange={ ( e ) => { setSelectFilterOtros( e.target.value ) } }>

                                            <option value="1">Por Nombre Item</option>
                                            <option value="2">Por ID Item</option>
                                            <option value="3">Por Tipo Item</option>

                                    </select>

                            </div>

                            <div className="buttons_gest_electric">

                                    <Link className='btn btn_invent create_btn' onClick={() => { setmodal_crear(true); }}>Crear Item</Link>
                                    
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

                                                    items_otros.map((item) => (

                                                      <div className='animate__animated animate__fadeInRight row_items'>

                                                            <div style={{  width:"50px", display:"flex", justifyContent:"center", borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"10px",height:"90px", alignItems:"center"}}>
                                                              <h3 style={{ color:"rgb(255, 203, 58)" }}>{ item.id_parte_otros }</h3>
                                                            </div>

                                                            <div className="cont_img_rows" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px",height:"90px" }}>
                                                              <img src={ item.imagen_parte_otros } className="img_card" alt={ item.tipo_parte_otros }/>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px" }}>
                                                              <h3>{ item.nombre_parte_otros }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px" }}>
                                                              <h3>{ item.descripcion_parte_otros }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px"}}>
                                                              <h3>{ item.tipo_parte_otros }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px", width:"35vh", justifyContent:"space-around "}}>
                                                              <Link className='btn btn_view' onClick={ () => { 

                                                                              setmodal_detail(true); 
                                                                              let obj_item = {

                                                                                nombre : item.nombre_parte_otros,
                                                                                id : item.id_parte_otros,
                                                                                imagen : item.imagen_parteotros,
                                                                                descp : item.descripcion_parte_otros,
                                                                                tipo : item.tipo_parte_otros,
                                                                                cant_disp : item.cantidad_disponible_otros,
                                                                                cont_cons : item.cantidad_consumida_otros, 
                                                                                ubicacion : item.ubicacion_parte_otros

                                                                              }
                                                                              setmodal_obj(obj_item);


                                                                              }}><IoMdEye/></Link>
                                                              <Link className='btn btn_invent' onClick={() => { setmodal_edit(true); setmodal_obj_edit(item); setimg_edit(item.imagen_parte_otros); }} style={{height:"40px", width:"168px"}}><p>Editar Item</p></Link>
                                                              <Link className='btn btn_invent' onClick={() => { setmodal_obj_desha(item); setmodaldesha(true); }} style={{ backgroundColor:"rgb(234 66 54)",  height:"40px", width:"168px"}}>Eliminar Item</Link>

                                                              {
                                                                ( item.datasheet_parte_otros === "" ) 
                                                                
                                                                  ?
                                                                    <Link className='btn btn_invent' onClick={() => { setmodal_file(true); setobj_file_toUpadate(item); setTypeRequestFile(1); }} style={{ backgroundColor:"rgb(255, 203, 58)",color:"rgba(0, 0, 0, 0.5)", height:"40px", width:"130px",fontSize:"13px",textAlign:"center"}}>Agregar Dtsh.</Link>
                                                                  
                                                                  :
                                                                    <Link className='btn btn_invent' onClick={() => { setmodal_file(true); setobj_file_toUpadate(item); setTypeRequestFile(2); }} style={{ backgroundColor:"#55da5e",color:"rgba(0, 0, 0, 0.5)",fontSize:"13px", textAlign:"center" }}>Actualizar Dtsh.</Link>

                                                              }
                                                            </div>

                                                      </div>
                                                    ))
                                                }
                                                {
                                                  ( items_otros.length === 0 ) && <><h1>Vacio</h1></>
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
                         <div className="name_detail" style={{height:"45px", width:"245px", color:"rgb(104, 104, 104)"}}>
                             <h2 className='modal_object_text' style={{fontSize:"16px"}}>DESCRIPCION: </h2>
                           </div>
                           <div className="contain_detail">
                             <h3 style={{ padding:"10px",textAlign:"center" }}>{modal_obj.descp}</h3>
                           </div>
                       </div>
                       <div className="row">
                         <div className="name_detail">
                             <h4 className='modal_object_text'>DT-SHEET: </h4>
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
                    <h4 className='modal_object_text' style={{ color:"rgb(255, 203, 58)" }}>{modal_obj_edit.id_parte_otros}</h4>
                    <h1>Editar Ítem Varios</h1>
                      
                      {
                        ( !!loader_edit ) && <span className="loader_rows"></span>
                      }
                      <div className="image_edit animate__animated animate__fadeInRight">
                        <div className="cont_img_details" title='Sube tu imagen' onClick={ () => { myWidgetOtros.open(); } }>
                          <img src={ img_edit } className="img_card"/>
                        </div>
                      </div>

                    <br />

                    <Formik

                      initialValues={{
                        id_parte_otros : "",
                        nombre_parte_otros: "",
                        imagen_parte_otros: img_edit,
                        tipo_parte_otros: "",
                        cantidad_disponible_otros: "",
                        cantidad_consumida_otros: "",
                        ubicacion_parte_otros: "",
                        descripcion_parte_otros: "",
                        datasheet_parte_otros: "",
                      }}

                      validate = {(valores) => {

                        let errors = {};

                        if (!valores.nombre_parte_otros.trim()) { errors.nombre_parte_otros = "Nombre erroneo" }

                        else if (!valores.tipo_parte_otros.trim()) { errors.tipo_parte_otros = "Tipo erroneo" }

                        else if (!valores.tipo_parte_otros === "none") { errors.tipo_parte_otros = "Tipo erroneo" }

                        else if (!valores.tipo_parte_otros === "Cree un nuevo tipo") { errors.tipo_parte_otros = "Tipo erroneo" }
                        
                        else if (!valores.cantidad_disponible_otros.trim()) { errors.cantidad_disponible_otros = "Cant Disp. erroneos" }

                        else if (!/^\d+$/.test(valores.cantidad_disponible_otros)) { errors.cantidad_disponible_otros = "Cant Disp. erroneo" }
                        
                        else if (!valores.cantidad_consumida_otros.trim()) { errors.cantidad_consumida_otros = "Cant Cons. erroneo" }

                        else if (!/^\d+$/.test(valores.cantidad_consumida_otros)) { errors.cantidad_consumida_otros = "Cant Cons. erroneo" }
                        
                        else if (!valores.ubicacion_parte_otros.trim()) { errors.ubicacion_parte_otros = "Ubicación erronea" }

                        else if (!valores.descripcion_parte_otros.trim()) { errors.descripcion_parte_otros = "Descripción erronea" }
                        
                        return errors;
                      }}

                      onSubmit={( valores, {resetForm} ) => {

                        valores.id_parte_otros = <modal_obj_edit className="id"></modal_obj_edit>;
                        valores.imagen_parteotros = img_edit;
                        setloader_edit(true);

                        otros_put( valores, valores.id_parte_otros ).then( (info) => {

                          if (info.status === 202) {
                            
                            setloader_edit(false);
                            setmodal_edit(false);
                            refreshRequest();
                            setimg_edit("");
                            resetForm();

                          }else if (info.status === 403){

                            setmsj_desha_rqst(info.data);
                            setloader_edit(false);
                            setTimeout(() => { setmsj_desha_rqst("") }, 3500);
    
                          }else{

                            setmsj_desha_rqst("Hubo un error, intentalo mas tarde.");
                            setloader_edit(false);
                            refreshRequest();
                            setTimeout(() => { setmsj_desha_rqst("") }, 5000);
                            resetForm();
                          }

                        } )

                      }}>

                      {({ errors }) => ( 

                          <Form className='form1'>
                            <hr />
                            <br />
                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.nombre_parte_otros }</p>
                            <ErrorMessage  name='nombre_parte_otros' component={() => (<p className='warn__password-user'>{errors.nombre_parte_otros}</p>)} />
                            <div className="input-container input_inventario">
                              <Field
                                type='text'
                                placeholder='Nuev@ Nombre' 
                                name='nombre_parte_otros'
                                id="nombre_parte_otros"
                              />
                              </div>
                            <ErrorMessage  name='descripcion_parte_otros' component={() => (<p className='warn__password-user'>{errors.descripcion_parte_otros}</p>)} />
                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ "Nueva Descripción" }</p>
                            <div className="input-container input_inventario">
                              <Field 
                                as="textarea"
                                max="180"
                                style={{ resize: "none", backgroundColor: "rgb(104, 104, 104)",borderRadius:"6px",width:"28vh",padding:"1rem", color:"color:rgb(223 222 223 / 1)" }} 
                                placeholder={ modal_obj_edit.descripcion_parte_otros }
                                name='descripcion_parte_otros'
                                id="descripcion_parte_otros"
                              />
                              </div>

                            <br />
                            <hr />
                            <br />

                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ "Tipo anterior: " + modal_obj_edit.tipo_parte_otros }</p>
                            <br />
                            <ErrorMessage  name='tipo_parte_otros' component={() => (<p className='warn__password-user'>{errors.tipo_parte_otros}</p>)} />
                            
                            <div className="type_selector">
                              <p style={{ color:"rgb(255, 203, 58)",width:"12vh" }}>{ (!!type_select) ? "Seleccionar otro tipo:" : "Crear nuevo tipo:" }</p>
                              <input type="checkbox" id="switch" onClick={ () => { settype_select(!type_select) } } /><label for="switch" id='text_type_selector'>Toggle</label>
                            </div>
                            <br />
                            
                            {
                            ( !!type_select )

                            ? <div className="animate__animated animate__fadeInDown" style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                                <ErrorMessage  name='tipo_parte_otros' component={() => (<p className='warn__password-user'>{errors.tipo_parte_otros}</p>)} />
                                  <div className="option_cont">
                                    <Field as="select" name="tipo_parte_otros" id="select_filter" autofocus="true" style={{ width:"400px" }}>

                                      <option value={"none"}>{" Selecciona un tipo "}</option>

                                      {
                                        types.map((item) => (
                                          <>
                                            <option value={item}>{item}</option>
                                          </>
                                        ))
                                      }

                                    </Field>
                                  </div>
                              </div>

                            :
                              <div className="animate__animated animate__fadeInDown" style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                                <ErrorMessage  name='tipo_parte_otros' component={() => (<p className='warn__password-user'>{errors.tipo_parte_otros}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Tipo' 
                                    name='tipo_parte_otros'
                                    id="tipo_parte_otros"
                                  />
                                </div>
                              </div>

                            } 
                            <br />
                            <hr />
                            <br />

                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.cantidad_consumida_otros }</p>
                            <ErrorMessage  name='cantidad_consumida_otros' component={() => (<p className='warn__password-user'>{errors.cantidad_consumida_otros }</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Nuev@ Cantidad consumida' 
                                name='cantidad_consumida_otros'
                                id="cantidad_consumida_otros"
                              />
                              </div>
                              <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.cantidad_disponible_otros }</p>
                            <ErrorMessage  name='cantidad_disponible_otros' component={() => (<p className='warn__password-user'>{errors.cantidad_disponible_otros}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Nuev@ Cantidad disponible' 
                                name='cantidad_disponible_otros'
                                id="cantidad_disponible_otros"
                              />
                              </div>
                              <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.ubicacion_parte_otros }</p>
                            <ErrorMessage  name='ubicacion_parte_otros' component={() => (<p className='warn__password-user'>{errors.ubicacion_parte_otros}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                placeholder='Nuev@ Ubicacion'
                                name='ubicacion_parte_otros'
                                id="ubicacion_parte_otros"
                              />
                            </div>
                              
                            <div style={{ width:"100%",display:"flex",justifyContent:"center",gap:"10px" }}>
                              <Input type={"submit"} txt={"Actualizar"} style={"btn btn_invent"}/>
                              <Link className='btn btn_invent'  style={{ fontSize:"13px",width:"6vh" }} onClick={ () => { setmodal_edit(false); } } >Cancelar</Link>
                            </div>

                          </Form> 

                      )}

                      </Formik>
                      
                    </div>

                      {
                        ( !!msj_desha_rqst ) && 
                        <div style={{ width: "100%", display:"flex", justifyContent: "center" }}>
                            <div className="cont_buttons_desha" style={{ textAlign:"center", width:"25vh" }}>
                                <h2 style={{ color:"rgb(26 200 252)" }}>{ msj_desha_rqst }</h2>
                            </div>
                        </div>
                      }

                </div>
            </Modal>
            }

            {
              ( !!modal_crear ) &&

                <Modal close={ setmodal_crear }>
                    <div className="animate__animated animate__fadeInRight cont_crear_item" style={{ zIndex:"10000" }} >
                      <h1 style={{ width:"100%",display:"flex",justifyContent:"center",gap:"10px", color:"rgb(255, 203, 58)", marginTop:"45px" }}>Crear item Varios</h1>


                          {
                            ( !!loader_edit ) && <span className='loader'></span>
                          }

                <Formik

                    initialValues={{
                      id_parte_otros : "",
                      nombre_parte_otros: "",
                      imagen_parte_otros: img_edit,
                      tipo_parte_otros: "",
                      cantidad_disponible_otros: "",
                      cantidad_consumida_otros: "",
                      ubicacion_parte_otros: "",
                      descripcion_parte_otros: "",
                      datasheet_parte_otros: "",
                    }}

                    validate = {(valores) => {

                      let errors = {};

                      if (!valores.nombre_parte_otros.trim()) { errors.nombre_parte_otros = "Nombre erroneo" }

                      else if (!valores.tipo_parte_otros.trim()) { errors.tipo_parte_otros = "Tipo erroneo" }

                      else if (!valores.tipo_parte_otros === "none") { errors.tipo_parte_otros = "Tipo erroneo" }

                      else if (!valores.tipo_parte_otros === "Cree un nuevo tipo") { errors.tipo_parte_otros = "Tipo erroneo" }
                      
                      else if (!valores.cantidad_disponible_otros.trim()) { errors.cantidad_disponible_otros = "Cant Disp. erroneos" }

                      else if (!/^\d+$/.test(valores.cantidad_disponible_otros)) { errors.cantidad_disponible_otros = "Cant Disp. erroneo" }
                      
                      else if (!valores.cantidad_consumida_otros.trim()) { errors.cantidad_consumida_otros = "Cant Cons. erroneo" }

                      else if (!/^\d+$/.test(valores.cantidad_consumida_otros)) { errors.cantidad_consumida_otros = "Cant Cons. erroneo" }
                      
                      else if (!valores.ubicacion_parte_otros.trim()) { errors.ubicacion_parte_otros = "Ubicación erronea" }

                      else if (!valores.descripcion_parte_otros.trim()) { errors.descripcion_parte_otros = "Descripción erronea" }
                      
                      return errors;
                    }}

                  onSubmit={( valores, {resetForm} ) => {
                    
                    setloader_edit(true);

                    if (img_edit === "") {

                      valores.imagen_parte_otros = "https://www.controlpack.com/wp-content/uploads/2020/05/caja_de_carton_30x30x30cm_9.1-1.jpg";

                    }else{

                      valores.imagen_parte_otros = img_edit;

                    }

                    otros_post( valores  ).then( (info) => {

                      if (info.status === 202) {
                        
                        setloader_edit(false);

                        setmodal_crear(false);
                        refreshRequest();
                        setimg_edit("");
                        resetForm();

                      }else if (info.status === 403){

                        setmsj_desha_rqst(info.data);
                        setloader_edit(false);
                        setTimeout(() => { setmsj_desha_rqst("") }, 3500);

                      }else{

                        setmsj_desha_rqst("Hubo un error, intentalo mas tarde.");
                        setloader_edit(false);
                        setmodal_crear(false);
                        setimg_edit("");
                        refreshRequest();
                        console.log(info);
                        setTimeout(() => { window.location = "/principal"; }, 5000);
                      }

                    } )

                  }}>
                      {({errors}) => (
                          <Form className='form2'>
                       
                                  {
                                    ( !!img_edit ) 

                                    ?
                                      <div className="img_regist">
                                        <div className="cont_img_details" title='Sube tu imagen' onClick={ () => { myWidgetOtros.open(); } }>
                                          <img src={ img_edit } className="img_card"/>
                                        </div>
                                      </div>

                                    :
                                      <div id='img_rsg' title='Subir imagen' onClick={ () => { myWidgetOtros.open(); } }>
                                          <FaFileUpload fontSize={"140px"}/>
                                      </div>
                                  }
                                  
                                  <br />

                            <ErrorMessage  name='nombre_parte_otros' component={() => (<p className='warn__password-user'>{errors.nombre_parte_otros}</p>)} />
                            <div className="input-container input_inventario">
                            <hr />
                            <br />
                            <br />
                                  <Field 
                                    type='text'
                                    placeholder='Nombre' 
                                    name='nombre_parte_otros'
                                    id="nombre_parte_otros"
                                  />
                                </div>

                                <div className="type_selector">
                                  <p style={{ color:"rgb(255, 203, 58)",width:"12vh" }}>{ (!!type_select) ? "Seleccionar tipo:" : "Crear nuevo tipo:" }</p>
                                  <input type="checkbox" id="switch" onClick={ () => { settype_select(!type_select) } } /><label for="switch" id='text_type_selector'>Toggle</label>
                                </div>
                                <br />
                                
                               {
                                ( !!type_select )

                                ? <div className="animate__animated animate__fadeInDown" style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                                    <ErrorMessage  name='tipo_parte_otros' component={() => (<p className='warn__password-user'>{errors.tipo_parte_otros}</p>)} />
                                      <div className="option_cont">
                                        <Field as="select" name="tipo_parte_otros" id="select_filter" autofocus="true" style={{ width:"400px" }}>

                                          <option value={"none"}>{" Selecciona un tipo "}</option>

                                          {
                                            types.map((item) => (
                                              <>
                                                <option value={item}>{item}</option>
                                              </>
                                            ))
                                          }

                                        </Field>
                                      </div>
                                  </div>

                                :
                                  <div className="animate__animated animate__fadeInDown" style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                                    <ErrorMessage  name='tipo_parte_otros' component={() => (<p className='warn__password-user'>{errors.tipo_parte_otros}</p>)} />
                                    <div className="input-container input_inventario">
                                      <Field 
                                        type='text'
                                        placeholder='Tipo' 
                                        name='tipo_parte_otros'
                                        id="tipo_parte_otros"
                                      />
                                    </div>
                                  </div>

                               } 
                                
                                <ErrorMessage  name='cantidad_disponible_otros' component={() => (<p className='warn__password-user'>{errors.cantidad_disponible_otros}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Cantidad disponible' 
                                    name='cantidad_disponible_otros'
                                    id="cantidad_disponible_otros"
                                  />
                                </div>
                                
                                <ErrorMessage  name='cantidad_consumida_otros' component={() => (<p className='warn__password-user'>{errors.cantidad_consumida_otros}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Cantidad consumida' 
                                    name='cantidad_consumida_otros'
                                    id="cantidad_consumida_otros"
                                  />
                                </div>
                                
                                <ErrorMessage  name='ubicacion_parte_otros' component={() => (<p className='warn__password-user'>{errors.ubicacion_parte_otros}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Ubicacion' 
                                    name='ubicacion_parte_otros'
                                    id="ubicacion_parte_otros"
                                  />
                                </div>
                                
                                <ErrorMessage  name='descripcion_parte_otros' component={() => (<p className='warn__password-user'>{errors.descripcion_parte_otros}</p>)} />
                                <div className="input-container input_inventario">
                                <Field 
                                  as="textarea"
                                  max="180"
                                  style={{ resize: "none", backgroundColor: "rgb(104, 104, 104)",borderRadius:"6px",width:"28vh",padding:"1rem", color:"color:rgb(223 222 223 / 1)" }} 
                                  placeholder='Descripcion' 
                                  name='descripcion_parte_otros'
                                  id="descripcion_parte_otros"
                                />
                                </div>

                                  <div style={{ width:"100%", display:"flex", justifyContent:"center", gap:"20px" }}>
                                    <Button type={"submit"} style={"btn btn_invent"} text={"Enviar"}/>
                                    <Button type={"button"} style={"btn btn_invent"} text={"Cancelar"} event={ () => setmodal_crear(false) }/>
                                  </div>
                                  
                                  {
                                      ( !!msj_desha_rqst ) && 
                                      <div style={{ width: "100%", display:"flex", justifyContent: "center" }}>
                                          <div className="cont_buttons_desha" style={{ textAlign:"center", width:"25vh" }}>
                                              <h2 style={{ color:"rgb(26 200 252)" }}>{ msj_desha_rqst }</h2>
                                          </div>
                                      </div>
                                  }

                          </Form>
                        )}
                      </Formik>


                    </div>
                </Modal>
            }
            {
              (!!modal_file) &&

                <Modal close={ setmodal_file }>
                  <div className='animate__animated animate__fadeInRight file-input' style={{ zIndex:"10000" }}>
                    <h2>{ "Datasheet (Opcional) : " }{ obj_file_toUpadate.nombre_parte_otros }</h2><br />
                    <Input type="file" id="file" style={"file"} eventChange={ (e) => { setfile(e.target.files); } } name={"file"}></Input>
                    <label for="file">Selecciona archivo</label>
                    <p class="file-name">{ nameFile }</p>
                    <Button type={"button"} style={"btn upload_btn"} text={"Subir Archivo"} event={ getFile }/>
                    {
                      ( typeRequestFile == 2 ) && <div className="btn_cont_val_el"><Link type={"button"} className={"btn btn_invent"} style={{ backgroundColor:"rgb(234 66 54)",  height:"40px", width:"168px"}} onClick={ delFile }>Eliminar Dtsh</Link></div>
                    }
                    {
                      ( !!loader_edit ) && <span className="loader_rows"></span>
                    }
                  </div>
                </Modal>
            }
            {

            ( !!modal_desha ) &&
            <Modal close={setmodaldesha}>

              <div className="animate__animated animate__fadeInRight cont_decision" style={{ zIndex:"10000" }}>
                <div>
                    <h1>{ "¿Esta seguro de querer Eliminar el Item : " }{ modal_obj_desha.nombre_parte_otros }{ "?" }</h1>
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
                            <Link className='btn btn_invent' onClick={ handleDelItem }>Si</Link>
                            <Link className='btn btn_invent' onClick={ () => { setmodaldesha(false); } }>Cancelar</Link>
                          </div>
                    }
                </div>
              </div>

            </Modal>

            }
    </div>
  )
}
