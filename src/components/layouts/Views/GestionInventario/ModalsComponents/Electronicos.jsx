import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { FaFileUpload } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoMdEye } from 'react-icons/io';
import { VscSearch } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { doc_del, doc_post } from '../../../../../helpers/api/DocsRequest';
import { electronicos_del, electronicos_post, electronicos_put, getItemsElectronicos, getItemsElectronicosByGeneralId, getItemsElectronicosByGeneralName, getItemsElectronicosByType, getTypesItemsElectronicos } from '../../../../../helpers/api/ElectronicosRequests';
import { useSendImage } from '../../../../../helpers/image/useSendImage';
import { Modal } from '../../../../pages/Modal/Modal';
import { Button } from '../../../../ui/Buttons/Button';
import { Input } from '../../../../ui/Input/Input';
import "./Components.css";

export const Electronicos = ( { mdl , evt }  ) => {

  const [modal_obj, setmodal_obj] = useState({});
  const [modal_detail, setmodal_detail] = useState(false);

  const [modal_crear, setmodal_crear] = useState(false);

  const [modal_edit, setmodal_edit] = useState(false);
  const [modal_obj_edit, setmodal_obj_edit] = useState({});
  const [loader_edit, setloader_edit] = useState(false);
  const [msj_desha_rqst, setmsj_desha_rqst] = useState("");

  const { myWidgetElectronicos , urlImage } = useSendImage();
  const [img_esque_edit, setimg_esque_edit] = useState("");
  const [img_pinout_edit, setimg_pinout_edit] = useState("");
  const [img_esque, setimg_esque] = useState("");
  const [img_pinout, setimg_pinout] = useState("");
  const [img_select_item, setimg_select_item] = useState(0);

  const [modal, setmodal] = useState(mdl);
  const [selectFilterElectronicos, setselectFilterElectronicos] = useState("1");
  const [input_search_electronicos, setinput_search_electronicos] = useState("");
  const [loader, setloader] = useState(false);
  const [items_electronicos, setitems_electronicos] = useState([]);
  const [val_request_electronicos, setval_request_electronicos] = useState(0);
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

    doc_post( formData,obj_file_toUpadate.nombre_comp,obj_file_toUpadate.id_Comp ).then( info => {

      if (info.status === 202) {

        setloader_edit(true);

        const new_item = {

          id_Comp
          : 
          obj_file_toUpadate.id_Comp,

          nombre_comp
          : 
          obj_file_toUpadate.nombre_comp,

          datasheet_comp
          : 
          info.data.id_doc,

          numero_partefabricante_comp
          : 
          obj_file_toUpadate.numero_partefabricante_comp,

          pinout_comp
          : 
          obj_file_toUpadate.pinout_comp,

          esquematico_comp
          : 
          obj_file_toUpadate.esquematico_comp,

          descripcion_comp
          : 
          obj_file_toUpadate.descripcion_comp,

          tipo_comp
          : 
          obj_file_toUpadate.tipo_comp,

          encampsulado_comp
          : 
          obj_file_toUpadate.encampsulado_comp,

          cantidad_disponible_comp
          : 
          obj_file_toUpadate.cantidad_disponible_comp,

          cantidad_consumida_comp
          : 
          obj_file_toUpadate.cantidad_consumida_comp,

          ubicacion_comp
          : 
          obj_file_toUpadate.ubicacion_comp
        };

        electronicos_post( new_item,new_item.id_Comp ).then((info) => {  
          
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

    doc_del( obj_file_toUpadate.datasheet_comp ).then(() => { 
          
      setloader_edit(true);

      const new_item = {

          id_Comp
          : 
          obj_file_toUpadate.id_Comp,

          nombre_comp
          : 
          obj_file_toUpadate.nombre_comp,

          datasheet_comp
          : 
          "",

          numero_partefabricante_comp
          : 
          obj_file_toUpadate.numero_partefabricante_comp,

          pinout_comp
          : 
          obj_file_toUpadate.pinout_comp,

          esquematico_comp
          : 
          obj_file_toUpadate.esquematico_comp,

          descripcion_comp
          : 
          obj_file_toUpadate.descripcion_comp,

          tipo_comp
          : 
          obj_file_toUpadate.tipo_comp,

          encampsulado_comp
          : 
          obj_file_toUpadate.encampsulado_comp,

          cantidad_disponible_comp
          : 
          obj_file_toUpadate.cantidad_disponible_comp,

          cantidad_consumida_comp
          : 
          obj_file_toUpadate.cantidad_consumida_comp,

          ubicacion_comp
          : 
          obj_file_toUpadate.ubicacion_comp

      };

      electronicos_put( new_item,new_item.id_Comp ).then((info) => {  
        
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
  
          electronicos_del(modal_obj_desha.id_Comp).then((info) => {
  
            if ( info.status === 202 ) {
      
              setloader_desha(false);
              setmodaldesha(false);
              setgetAll(!getAll);
      
            }else{
      
              setmsj_desha_rqst("Hubo un error, Intente mas tarde.")
              setloader_desha(false);
              // setimg_edit("");
              setTimeout(() => { window.location = "/principal"; }, 3500);
      
            }
            console.log(info);
  
          });
  
        }else{
      
          setmsj_desha_rqst("Hubo un error, Intente mas tarde.")
          setloader_desha(false);
          // setimg_edit("");
          setTimeout(() => { window.location = "/principal"; }, 3500);
  
        }
  
        console.log(info);
  
      });
      
    }else{

      electronicos_del(modal_obj_desha.id_Comp).then((info) => {
  
        if ( info.status === 202 ) {
  
          setloader_desha(false);
          setmodaldesha(false);
          setgetAll(!getAll);
  
        }else{
  
          setmsj_desha_rqst("Hubo un error, Intente mas tarde.")
          setloader_desha(false);
          // setimg_edit("");
          setTimeout(() => { window.location = "/principal"; }, 3500);
  
        }
        console.log(info);

      })

    }

  }

  const handleKeyPress = ( e ) => {

    if (e.key === "Enter" || e.keyCode === 13) {

      searchItemElectronicos( input_search_electronicos );

    }else if (e.target.value === "") {
      
      setgetAll(!getAll);

    }

  }

  const searchByClick = () => { searchItemElectronicos( input_search_electronicos ); }

  const searchItemElectronicos = ( e ) => {

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

  const refreshRequest = () => { setgetAll(!getAll); }

  useEffect(() => {

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

    getTypesItemsElectronicos().then((info) => {
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

  }, [ getAll ]);

  useEffect(() => { setmodal(mdl); }, [mdl]);


  useEffect(() => {  
    
    if ( img_select_item === 1 ) {

      setimg_esque( urlImage );
      setimg_esque_edit( urlImage );
      setimg_select_item( 0 );

    }else if ( img_select_item === 2 ) {
      
      setimg_pinout( urlImage );
      setimg_pinout_edit( urlImage );
      setimg_select_item( 0 );

    }else if ( urlImage === "" ) {
      
      setimg_esque("");
      setimg_pinout("");
      setimg_esque_edit("");
      setimg_pinout_edit("");

    }

  }, [ urlImage ]);


  useEffect(() => { if (file !== null) { setnameFile( "Archivo subido: \n" + file[0].name ); } }, [ file ]);

  useEffect(() => { if (modal_crear === false) { setfile(null); setnameFile(""); 
  // setimg_edit(""); 
} }, [ modal_crear ]);
  
  return (
    <div>

            {

              ( !!modal ) &&

              <Modal close={setmodal} set_event={evt}>


                    <div className="cont_gest_electricos animate__animated animate__fadeInRight" style={{ zIndex:"10000" }}>

                        <HiOutlineRefresh title="Refresh" className="refresh_invent" onClick={ () => { setgetAll(!getAll); } } />
                            <h1 style={{ color:"rgb(255, 203, 58)" }}>{" Gestion Ítems Electronicos "}</h1>

                            <div className="input-container input_gest_electricos">

                                    <Input type={"text"} txt={"Buscar Electronico"} id={"electricos_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_electronicos(e.target.value) }}/>
                                    <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"electricos_items_search_image"} onClick={ searchByClick }/>

                                    <select id="select_filter" onChange={ ( e ) => { setselectFilterElectronicos( e.target.value ) } }>

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

                                                    items_electronicos.map((item) => (

                                                      <div className='animate__animated animate__fadeInRight row_items'>

                                                            <div  style={{  width:"50px", display:"flex", justifyContent:"center", borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"10px",height:"90px", alignItems:"center"}}>
                                                              <h3 style={{ color:"rgb(255, 203, 58)" }}>{ item.id_Comp }</h3>
                                                            </div>

                                                            <div className="cont_img_rows" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px",height:"90px" }}>
                                                              <img src={ item.pinout_comp } className="img_card" alt={ item.tipo_comp }/>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px" }}>
                                                              <h3>{ item.nombre_comp }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px" }}>
                                                              <h3>{ item.descripcion_comp }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px"}}>
                                                              <h3>{ item.tipo_comp }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px", width:"35vh", justifyContent:"space-around "}}>
                                                              <Link className='btn btn_view' onClick={ () => { 

                                                                              setmodal_detail(true);
                                                                              let obj_item = {

                                                                                nombre : item.nombre_comp,
                                                                                id : item.id_Comp,
                                                                                imagen : item.pinout_comp,
                                                                                descp : item.descripcion_comp,
                                                                                tipo : item.tipo_comp,
                                                                                cant_disp : item.cantidad_disponible_comp,
                                                                                cont_cons : item.cantidad_consumida_comp, 
                                                                                ubicacion : item.ubicacion_comp,
                                                                                esquema : item.esquematico_comp,
                                                                                encapsulado : item.encampsulado_comp
                                                                              }
                                                                              setmodal_obj(obj_item);

                                                                              }}><IoMdEye/></Link>
                                                              <Link className='btn btn_invent' onClick={() => { 
                                                                  setmodal_edit(true); setmodal_obj_edit(item);
                                                                  setimg_esque_edit(item.esquematico_comp);
                                                                  setimg_pinout_edit(item.pinout_comp);
                                                                  }} style={{height:"40px", width:"168px"}}><p>Editar Item</p></Link>
                                                              <Link className='btn btn_invent' onClick={() => { 
                                                                  setmodal_obj_desha(item); setmodaldesha(true); 
                                                                }} style={{ backgroundColor:"rgb(234 66 54)",  height:"40px", width:"168px"}}>Eliminar Item</Link>

                                                              {
                                                                ( item.datasheet_comp === "" ) 
                                                                
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
                                                  ( items_electronicos.length === 0 ) && <><h1>Vacio</h1></>
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
                             <h4 className='modal_object_text'>ENCAPSULADO: </h4>
                           </div>
 
                           <div className="contain_detail">
                             <h3>{modal_obj.encapsulado}</h3>
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
                         <div className="name_detail" style={{height:"45px", width:"245px"}}>
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
                    <h4 className='modal_object_text' style={{ color:"rgb(255, 203, 58)" }}>{modal_obj_edit.id_Comp}</h4>
                    <h1>Editar Ítem Electronico</h1>
                      
                      {
                        ( !!loader_edit ) && <span className="loader_rows"></span>
                      }

                      <div className='header_card_details'>

                        <div className='img_edit_cont_1'>
                          <div className="img_regist">
                            <div className="cont_img_details" title='Sube tu imagen Pinout' onClick={ () => { myWidgetElectronicos.open(); setimg_select_item(2); } }>
                              <img src={ img_pinout_edit } className="img_card"/>
                            </div>
                          </div>
                        </div>

                        <div className='img_edit_cont_1'>
                          <div className="img_regist">
                            <div className="cont_img_details" title='Sube tu imagen Esquematico' onClick={ () => { myWidgetElectronicos.open(); setimg_select_item(1); } }>
                              <img src={ img_esque_edit } className="img_card"/>
                            </div>
                          </div>
                        </div>

                      </div>

                    <br />

                    <Formik

                      initialValues={{
                        id_Comp: modal_obj_edit.id_Comp,
                        nombre_comp: "",
                        numero_partefabricante_comp: "",
                        pinout_comp: "",
                        esquematico_comp: "",
                        descripcion_comp: "",
                        tipo_comp : "",
                        encampsulado_comp : "",
                        cantidad_disponible_comp : "",
                        cantidad_consumida_comp : "",
                        ubicacion_comp : "",
                        datasheet_comp : ""
                      }}

                      validate = {(valores) => {

                        let errors = {};

                          
                        if (!valores.nombre_comp.trim()) { errors.nombre_comp = "Nombre erroneo" }

                        else if (!valores.numero_partefabricante_comp.trim()) { errors.numero_partefabricante_comp = "Numero Parte erroneo" }

                        else if (!valores.tipo_comp.trim()) { errors.tipo_comp = "Tipo erroneo" }

                        else if (!valores.tipo_comp === "none") { errors.tipo_comp = "Tipo erroneo" }

                        else if (!valores.tipo_comp === "Cree un nuevo tipo") { errors.tipo_comp = "Tipo erroneo" }

                        else if (!valores.encampsulado_comp.trim()) { errors.encampsulado_comp = "Encapsulado erroneo" }
                        
                        else if (!valores.cantidad_disponible_comp.trim()) { errors.cantidad_disponible_comp = "Cant Disp. erroneos" }

                        else if (!/^\d+$/.test(valores.cantidad_disponible_comp)) { errors.cantidad_disponible_comp = "Cant Disp. erroneo" }
                        
                        else if (!valores.cantidad_consumida_comp.trim()) { errors.cantidad_consumida_comp = "Cant Cons. erroneo" }

                        else if (!/^\d+$/.test(valores.cantidad_consumida_comp)) { errors.cantidad_consumida_comp = "Cant Cons. erroneo" }
                        
                        else if (!valores.ubicacion_comp.trim()) { errors.ubicacion_comp = "Ubicación erronea" }

                        else if (!valores.descripcion_comp.trim()) { errors.descripcion_comp = "Descripción erronea" }
                        
                        return errors;
                      }}

                      onSubmit={( valores, {resetForm} ) => {

                        if (img_pinout_edit === "") {

                          valores.pinout_comp = modal_obj_edit.pinout_comp;
    
                        }else{

                          valores.pinout_comp = img_pinout_edit;

                        }
    
                        if (img_esque_edit === "") {

                          valores.esquematico_comp = modal_obj_edit.esquematico_comp;
    
                        }else{

                          valores.esquematico_comp = img_esque_edit;
                          
                        }

                        console.log(valores);
                        
                        setloader_edit(true);

                        electronicos_put( valores, valores.id_Comp ).then( (info) => {

                          console.log(info);

                          if (info.status === 202) {
                            
                            setloader_edit(false);
                            setmodal_edit(false);
                            refreshRequest();
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
                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.nombre_comp }</p>
                            <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.nombre_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Nuev@ Nombre' 
                                name='nombre_comp'
                                id="nombre_comp"
                              />
                            </div>
                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.numero_partefabricante_comp }</p>
                            <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.numero_partefabricante_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Nuev@ Numero Part. Fabricante' 
                                name='numero_partefabricante_comp'
                                id="numero_partefabricante_comp"
                              />
                            </div>
                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.encampsulado_comp }</p>
                            <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.encampsulado_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Nuev@ Encapsulado' 
                                name='encampsulado_comp'
                                id="encampsulado_comp"
                              />
                            </div>
                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.descripcion_comp }</p>
                            <ErrorMessage  name='nombre_comp' component={() => (<p className='warn__password-user'>{errors.descripcion_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                as="textarea"
                                max="180"
                                style={{ resize: "none", backgroundColor: "rgb(2, 71, 118)",borderRadius:"6px",width:"28vh",padding:"1rem", color:"color:rgb(223 222 223 / 1)" }} 
                                placeholder='Nuev@ Descripcion' 
                                name='descripcion_comp'
                                id="descripcion_comp"
                              />
                              </div>
                              
                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.tipo_comp }</p>
                            <div className="type_selector">
                              <p style={{ color:"rgb(255, 203, 58)",width:"12vh" }}>{ (!!type_select) ? "Seleccionar tipo:" : "Crear nuevo tipo:" }</p>
                            <input type="checkbox" id="switch" onClick={ () => { settype_select(!type_select) } } /><label for="switch" id='text_type_selector'>Toggle</label>
                            </div>
                            <br />
                            
                            {
                            ( !!type_select )

                            ? <div className="animate__animated animate__fadeInDown" style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                                <ErrorMessage  name='tipo_comp' component={() => (<p className='warn__password-user'>{errors.tipo_comp}</p>)} />
                                  <div className="option_cont">
                                    <Field as="select" name="tipo_comp" id="select_filter" autofocus="true" style={{ width:"400px" }}>

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
                                <ErrorMessage  name='tipo_comp' component={() => (<p className='warn__password-user'>{errors.tipo_comp}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Tipo' 
                                    name='tipo_comp'
                                    id="tipo_comp"
                                  />
                                </div>
                              </div>

                            } 

                              <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.cantidad_consumida_comp }</p>
                            <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.cantidad_consumida_comp }</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Nuev@ Cantidad consumida' 
                                name='cantidad_consumida_comp'
                                id="cantidad_consumida_comp"
                              />
                              </div>
                              <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.cantidad_disponible_comp }</p>
                            <ErrorMessage  name='nombre' component={() => (<p className='warn__password-user'>{errors.cantidad_disponible_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Nuev@ Cantidad disponible' 
                                name='cantidad_disponible_comp'
                                id="cantidad_disponible_comp"
                              />
                              </div>
                              <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.ubicacion_comp }</p>
                            <ErrorMessage  name='ubicacion' component={() => (<p className='warn__password-user'>{errors.ubicacion_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                placeholder='Nuev@ Ubicacion'
                                name='ubicacion_comp'
                                id="ubicacion_comp"
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
              ( !!modal_crear ) &&

                <Modal close={ setmodal_crear }>
                    <div className="animate__animated animate__fadeInRight cont_crear_item" style={{ zIndex:"10000" }} >
                      <h1 style={{ width:"100%",display:"flex",justifyContent:"center",gap:"10px", color:"rgb(255, 203, 58)", marginTop:"45px" }}>Crear item Electrico</h1>


                          {
                            ( !!loader_edit ) && <span className='loader'></span>
                          }

                <Formik

                 initialValues={{
                        id_Comp: "",
                        nombre_comp: "",
                        numero_partefabricante_comp: "",
                        pinout_comp: "",
                        esquematico_comp: "",
                        descripcion_comp: "",
                        tipo_comp : "",
                        encampsulado_comp : "",
                        cantidad_disponible_comp : "",
                        cantidad_consumida_comp : "",
                        ubicacion_comp : "",
                        datasheet_comp : ""
                      }}

                      validate = {(valores) => {

                        let errors = {};

                          
                        if (!valores.nombre_comp.trim()) { errors.nombre_comp = "Nombre erroneo" }

                        else if (!valores.numero_partefabricante_comp.trim()) { errors.numero_partefabricante_comp = "Numero Parte erroneo" }

                        else if (!valores.tipo_comp.trim()) { errors.tipo_comp = "Tipo erroneo" }

                        else if (!valores.tipo_comp === "none") { errors.tipo_comp = "Tipo erroneo" }

                        else if (!valores.tipo_comp === "Cree un nuevo tipo") { errors.tipo_comp = "Tipo erroneo" }

                        else if (!valores.encampsulado_comp.trim()) { errors.encampsulado_comp = "Encapsulado erroneo" }
                        
                        else if (!valores.cantidad_disponible_comp.trim()) { errors.cantidad_disponible_comp = "Cant Disp. erroneos" }

                        else if (!/^\d+$/.test(valores.cantidad_disponible_comp)) { errors.cantidad_disponible_comp = "Cant Disp. erroneo" }
                        
                        else if (!valores.cantidad_consumida_comp.trim()) { errors.cantidad_consumida_comp = "Cant Cons. erroneo" }

                        else if (!/^\d+$/.test(valores.cantidad_consumida_comp)) { errors.cantidad_consumida_comp = "Cant Cons. erroneo" }
                        
                        else if (!valores.ubicacion_comp.trim()) { errors.ubicacion_comp = "Ubicación erronea" }

                        else if (!valores.descripcion_comp.trim()) { errors.descripcion_comp = "Descripción erronea" }
                        
                        return errors;
                      }}


                  onSubmit={( valores, {resetForm} ) => {
                    
                    setloader_edit(true);

                    if (img_pinout === "") {

                      valores.pinout_comp = "https://4.bp.blogspot.com/-L2HW4kmUrZs/VgkJY1MyGuI/AAAAAAAAFJ0/9HI1DIcMlUM/s1600/555-pinout.png";

                    }else{

                      valores.pinout_comp = img_pinout;

                    }

                    if (img_esque === "") {

                      valores.esquematico_comp = "https://2.bp.blogspot.com/-0sKu5PzSfQI/U14_qaTxnCI/AAAAAAAAAVw/OkMF8TVsO6s/s1600/555_esquema.png";

                    }else{

                      valores.esquematico_comp = img_esque;

                    }

                    electronicos_post( valores ).then( (info) => {

                      console.log(info);
                        
                        if (info.status === 202) {
                            
                          setloader_edit(false);
                          setmodal_crear(false);
                          refreshRequest();
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

                    })

                  }}>
                      {({errors}) => (
                          <Form className='form2'>
                       
                                  <div style={{ display:"flex", flexDirection:"row", alignItems:"center" }}>
                                    
                                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",width:"100%"  }}>

                                      <p>Pinout</p>
                                      <hr />
                                      {
                                        ( !!img_pinout ) 

                                        ?
                                          <div className="img_regist">
                                            <div className="cont_img_details" title='Sube tu imagen' onClick={ () => { myWidgetElectronicos.open(); setimg_select_item(2); } }>
                                              <img src={ img_pinout } className="img_card"/>
                                            </div>
                                          </div>

                                        :
                                          <div id='img_rsg' title='Subir imagen Pinout' onClick={ () => { myWidgetElectronicos.open(); setimg_select_item(2); } }>
                                              <FaFileUpload fontSize={"140px"}/>
                                          </div>
                                      }
                                    </div>
                                    
                                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",width:"100%" }}>
                                      <p>Esquematico</p>
                                      <hr />
                                      {
                                        ( !!img_esque ) 

                                        ?
                                          <div className="img_regist">
                                            <div className="cont_img_details" title='Sube tu imagen' onClick={ () => { myWidgetElectronicos.open(); setimg_select_item(1); } }>
                                              <img src={ img_esque } className="img_card"/>
                                            </div>
                                          </div>

                                        :
                                          <div id='img_rsg' title='Subir imagen Esquematico' onClick={ () => { myWidgetElectronicos.open(); setimg_select_item(1); } }>
                                              <FaFileUpload fontSize={"140px"}/>
                                          </div>
                                      }
                                    </div>

                                  </div>
                                  
                                  <br />

                            <ErrorMessage  name='nombre_comp' component={() => (<p className='warn__password-user'>{errors.nombre_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <hr />
                              <br />
                              <br />
                                <Field 
                                  type='text'
                                  placeholder='Nombre' 
                                  name='nombre_comp'
                                  id="nombre_comp"
                                />
                            </div>

                            <ErrorMessage  name='numero_partefabricante_comp' component={() => (<p className='warn__password-user'>{errors.numero_partefabricante_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <br />
                                <Field 
                                  type='text'
                                  placeholder='Numero Part. Fabricante' 
                                  name='numero_partefabricante_comp'
                                  id="numero_partefabricante_comp"
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
                                <ErrorMessage  name='tipo_comp' component={() => (<p className='warn__password-user'>{errors.tipo_comp}</p>)} />
                                  <div className="option_cont">
                                    <Field as="select" name="tipo_comp" id="select_filter" autofocus="true" style={{ width:"400px" }}>

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
                                <ErrorMessage  name='tipo_comp' component={() => (<p className='warn__password-user'>{errors.tipo_comp}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Tipo' 
                                    name='tipo_comp'
                                    id="tipo_comp"
                                  />
                                </div>
                              </div>

                            } 

                            <ErrorMessage  name='encampsulado_comp' component={() => (<p className='warn__password-user'>{errors.encampsulado_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Encapsulado' 
                                name='encampsulado_comp'
                                id="encampsulado_comp"
                              />
                            </div>
                            
                            <ErrorMessage  name='cantidad_disponible_comp' component={() => (<p className='warn__password-user'>{errors.cantidad_disponible_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Cantidad disponible' 
                                name='cantidad_disponible_comp'
                                id="cantidad_disponible_comp"
                              />
                            </div>
                            
                            <ErrorMessage  name='cantidad_consumida_comp' component={() => (<p className='warn__password-user'>{errors.cantidad_consumida_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Cantidad consumida' 
                                name='cantidad_consumida_comp'
                                id="cantidad_consumida_comp"
                              />
                            </div>
                            
                            <ErrorMessage  name='ubicacion_comp' component={() => (<p className='warn__password-user'>{errors.ubicacion_comp}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Ubicacion' 
                                name='ubicacion_comp'
                                id="ubicacion_comp"
                              />
                            </div>
                            
                            <ErrorMessage  name='descripcion_comp' component={() => (<p className='warn__password-user'>{errors.descripcion_comp}</p>)} />
                            <div className="input-container input_inventario">
                            <Field 
                              as="textarea"
                              max="180"
                              style={{ resize: "none", backgroundColor: "rgb(2, 71, 118)",borderRadius:"6px",width:"28vh",padding:"1rem", color:"color:rgb(223 222 223 / 1)" }} 
                              placeholder='Descripcion' 
                              name='descripcion_comp'
                              id="descripcion_comp"
                            />
                            </div>

                              <div style={{ width:"100%", display:"flex", justifyContent:"center", gap:"20px" }}>
                                <Button type={"submit"} style={"btn btn_invent"} text={"Enviar"}/>
                                <Button type={"button"} style={"btn btn_invent"} text={"Cancelar"} event={ () => setmodal_crear(false) }/>
                              </div>
                              
                              {
                                ( !!msj_desha_rqst ) && 
                                <div className="cont_buttons_desha" style={{ textAlign:"center" }}>
                                  <h2 style={{ color:"rgb(26 200 252)" }}>{ msj_desha_rqst }</h2>
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
                    <h2>{ "Datasheet (Opcional) : " }{ obj_file_toUpadate.nombre_comp }</h2><br />
                    <Input type="file" id="file" style={"file"} eventChange={ (e) => { setfile(e.target.files); } } name={"file"}></Input>
                    <label for="file">Selecciona archivo</label>
                    <p class="file-name">{ nameFile }</p>
                    <Button type={"button"} style={"btn upload_btn"} text={"Subir Archivo"} event={ getFile }/>
                    {
                      ( typeRequestFile === 2 ) && <div className="btn_cont_val_el"><Link type={"button"} className={"btn btn_invent"} style={{ backgroundColor:"rgb(234 66 54)",  height:"40px", width:"168px"}} onClick={ delFile }>Eliminar Dtsh</Link></div>
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
                    <h1>{ "¿Esta seguro de querer Eliminar el Item : " }{ modal_obj_desha.nombre_comp }{ "?" }</h1>
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