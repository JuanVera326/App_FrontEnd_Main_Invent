import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { FaFileUpload } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import { IoMdEye } from 'react-icons/io';
import { VscSearch } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { doc_del, doc_post } from '../../../../../helpers/api/DocsRequest';
import { getItemsModdev, getItemsModdevByGeneralId, getItemsModdevByGeneralName, getItemsModdevByType, getTypesItemsModdev, moddev_del, moddev_post, moddev_put } from '../../../../../helpers/api/ModdevRequest';
import { ubi_get } from '../../../../../helpers/api/UbiRequest';
import { useSendImage } from '../../../../../helpers/image/useSendImage';
import { Modal } from '../../../../pages/Modal/Modal';
import { Button } from '../../../../ui/Buttons/Button';
import { Input } from '../../../../ui/Input/Input';
import "./Components.css";

export const Moddev = ( { mdl , evt } ) => {
  
  const [modal_obj, setmodal_obj] = useState({});
  const [modal_detail, setmodal_detail] = useState(false);

  const [modal_crear, setmodal_crear] = useState(false); 
  const user = JSON.parse(localStorage.getItem("usuario"));

  const [modal_edit, setmodal_edit] = useState(false);
  const [modal_obj_edit, setmodal_obj_edit] = useState({});
  const [loader_edit, setloader_edit] = useState(false);
  const [img_edit, setimg_edit] = useState("");
  const [msj_desha_rqst, setmsj_desha_rqst] = useState("");
  const { myWidgetModdev , urlImage } = useSendImage();

  const [modal, setmodal] = useState(mdl);
  const [selectFilterModdev, setSelectFilterModdev] = useState("1");
  const [input_search_moddev, setinput_search_moddev] = useState("");
  const [loader, setloader] = useState(false);
  const [items_moddev, setitems_moddev] = useState([]);
  const [val_request_moddev, setval_request_moddev] = useState(0);
  const [ubi, setubi] = useState({});
  const [sct, setsct] = useState([]);
  const [bdgs, setbdgs] = useState([]);
  const [racks, setracks] = useState([]);
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

    doc_post( formData,obj_file_toUpadate.nombre_partemoddev,obj_file_toUpadate.id_parte_moddev ).then( info => {

      if (info.status === 202) {

        setloader_edit(true);

        const new_item = {

          cantidad_consumida_moddev
          : 
          obj_file_toUpadate.cantidad_consumida_moddev,

          cantidad_disponible_moddev
          : 
          obj_file_toUpadate.cantidad_disponible_moddev,

          datasheet_parte_moddev
          : 
          info.data.id_doc,

          descripcion_parte_moddev
          : 
          obj_file_toUpadate.descripcion_parte_moddev,

          id_parte_moddev
          : 
          obj_file_toUpadate.id_parte_moddev,

          imagen_partemoddev
          : 
          obj_file_toUpadate.imagen_partemoddev,

          nombre_partemoddev
          : 
          obj_file_toUpadate.nombre_partemoddev,

          tipo_parte_moddev
          : 
          obj_file_toUpadate.tipo_parte_moddev,

          ubicacion_parte_moddev
          : 
          obj_file_toUpadate.ubicacion_parte_moddev,

        };

        moddev_put( new_item,new_item.id_parte_moddev,"{}" ).then((info) => {  
          
          if (info.status === 202) {

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

    doc_del( obj_file_toUpadate.datasheet_parte_moddev ).then(() => { 
          
      setloader_edit(true);

      const new_item = {

        cantidad_consumida_moddev
        : 
        obj_file_toUpadate.cantidad_consumida_moddev,

        cantidad_disponible_moddev
        : 
        obj_file_toUpadate.cantidad_disponible_moddev,

        datasheet_parte_moddev
        : 
        "",

        descripcion_parte_moddev
        : 
        obj_file_toUpadate.descripcion_parte_moddev,

        id_parte_moddev
        : 
        obj_file_toUpadate.id_parte_moddev,

        imagen_partemoddev
        : 
        obj_file_toUpadate.imagen_partemoddev,

        nombre_partemoddev
        : 
        obj_file_toUpadate.nombre_partemoddev,

        tipo_parte_moddev
        : 
        obj_file_toUpadate.tipo_parte_moddev,

        ubicacion_parte_moddev
        : 
        obj_file_toUpadate.ubicacion_parte_moddev,

      };

      moddev_put( new_item,new_item.id_parte_moddev,"{}" ).then((info) => {  
        
        if (info.status === 202) {

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
  
          moddev_del(modal_obj_desha.id_parte_moddev).then((info) => {
  
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

      moddev_del(modal_obj_desha.id_parte_moddev).then((info) => {
  
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

      searchItemModdev( input_search_moddev );

    }else if (e.target.value === "") {
      
      setgetAll(!getAll);

    }

  }

  const searchByClick = () => { searchItemModdev( input_search_moddev ); }

  const searchItemModdev = ( e ) => {

    switch ( selectFilterModdev) {
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

  const refreshRequest = () => { setgetAll(!getAll); }

  useEffect(() => {

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

    getTypesItemsModdev().then((info) => {
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

    ubi_get(user.id).then(info => {

      if (info.status === 202) {

        let arr = [];
        setubi(info.data);

        arr = [];
        for (let index = 1; index <= info.data.racks; index++) { arr.push(index); }
        setracks(arr);

        arr = [];
        for (let index = 1; index <= info.data.sectors; index++) { arr.push(index); }
        setsct(arr);

        arr = [];
        for (let index = 1; index <= info.data.warehouses; index++) { arr.push(index); }
        setbdgs(arr);
        
      }else{

        setubi(["Error al obtener Datos de Inventario"])

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
                            <h1 style={{ color:"rgb(255, 203, 58)" }}>{" Gestion Ítems Modulos de Desarrollo "}</h1>

                            <div className="input-container input_gest_electricos">

                                    <Input type={"text"} txt={"Buscar Elemento Ferre.."} id={"electricos_items_search_image"} eventKeyPress={ handleKeyPress } eventChange={(e) => { setinput_search_moddev(e.target.value) }}/>
                                    <VscSearch style={{color:"rgb(85 85 85)",fontSize:"20px",cursor:"pointer"}} id={"electricos_items_search_image"} onClick={ searchByClick }/>

                                    <select id="select_filter" onChange={ ( e ) => { setSelectFilterModdev( e.target.value ) } }>

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

                                                    items_moddev.map((item) => (

                                                      <div className='animate__animated animate__fadeInRight row_items'>

                                                            <div  style={{  width:"50px", display:"flex", justifyContent:"center", borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"10px",height:"90px", alignItems:"center"}}>
                                                              <h3 style={{ color:"rgb(255, 203, 58)" }}>{ item.id_parte_moddev }</h3>
                                                            </div>

                                                            <div className="cont_img_rows" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px",height:"90px" }}>
                                                              <img src={ item.imagen_partemoddev } className="img_card" alt={ item.tipo_parte_moddev }/>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px" }}>
                                                              <h3>{ item.nombre_partemoddev }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px" }}>
                                                              <h3>{ item.descripcion_parte_moddev }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px"}}>
                                                              <h3>{ item.tipo_parte_moddev }</h3>
                                                            </div>

                                                            <div className="cont_default_row" style={{ borderRight:"solid 5px rgb(255, 203, 58)", paddingRight:"20px", width:"35vh", justifyContent:"space-around "}}>
                                                              <Link className='btn btn_view' onClick={ () => { 

                                                                              setmodal_detail(true); 
                                                                              let obj_item = {

                                                                                nombre : item.nombre_partemoddev,
                                                                                id : item.id_parte_moddev,
                                                                                imagen : item.imagen_partemoddev,
                                                                                descp : item.descripcion_parte_moddev,
                                                                                tipo : item.tipo_parte_moddev,
                                                                                cant_disp : item.cantidad_disponible_moddev,
                                                                                cont_cons : item.cantidad_consumida_moddev, 
                                                                                ubicacion : item.ubicacion_parte_moddev

                                                                              }
                                                                              setmodal_obj(obj_item);


                                                                              }}><IoMdEye/></Link>
                                                              <Link className='btn btn_invent' onClick={() => { setmodal_edit(true); setmodal_obj_edit(item); setimg_edit(item.imagen_partemoddev); }} style={{height:"40px", width:"168px"}}><p>Editar Item</p></Link>
                                                              <Link className='btn btn_invent' onClick={() => { setmodal_obj_desha(item); setmodaldesha(true); }} style={{ backgroundColor:"rgb(234 66 54)",  height:"40px", width:"168px"}}>Eliminar Item</Link>

                                                              {
                                                                ( item.datasheet_parte_moddev === "" ) 
                                                                
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
                                                  ( items_moddev.length === 0 ) && <><h1>Vacio</h1></>
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
                          <div className="contain_detail">
                            <Link className='btn btn_invent'  style={{ fontSize:"13px",width:"20vh" }} onClick={ () => { console.log(modal_obj.data_sht + ""); } } >Ver PDF</Link>
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
                    
                    <div className="form_cont_edit_users cont_edit_electricos">
                    <h4 className='modal_object_text' style={{ color:"rgb(255, 203, 58)" }}>{modal_obj_edit.id_parte_moddev}</h4>
                    <h1>Editar Ítem Modulo de Desarrollo</h1>
                      
                      {
                        ( !!loader_edit ) && <span className="loader_rows"></span>
                      }
                      <div className="image_edit animate__animated animate__fadeInRight">
                        <div className="cont_img_details img_create_item" title='Sube tu imagen' onClick={ () => { myWidgetModdev.open(); } }>
                          <img src={ img_edit } className="img_card"/>
                        </div>
                      </div>

                    <br />

                    <Formik

                      initialValues={{
                        id_parte_moddev : "",
                        nombre_partemoddev: "",
                        imagen_partemoddev: img_edit,
                        tipo_parte_moddev: "",

                        sectors:"",
                        warehouses:"",
                        racks:"",
                        fila:"",
                        columna:"",

                        cantidad_disponible_moddev: "",
                        cantidad_consumida_moddev: "",
                        descripcion_parte_moddev: "",
                        datasheet_parte_moddev: "",
                      }}

                      validate = {(valores) => {

                        let errors = {};

                        if (!valores.nombre_partemoddev.trim()) { errors.nombre_partemoddev = "Nombre erroneo" }

                        else if (!valores.tipo_parte_moddev.trim()) { errors.tipo_parte_moddev = "Tipo erroneo" }

                        else if (!valores.tipo_parte_moddev === "none") { errors.tipo_parte_moddev = "Tipo erroneo" }

                        else if (!valores.tipo_parte_moddev === "Cree un nuevo tipo") { errors.tipo_parte_moddev = "Tipo erroneo" }
                        
                        else if (!valores.cantidad_disponible_moddev.trim()) { errors.cantidad_disponible_moddev = "Cant Disp. erroneos" }

                        else if (!/^\d+$/.test(valores.cantidad_disponible_moddev)) { errors.cantidad_disponible_moddev = "Cant Disp. erroneo" }
                        
                        else if (!valores.cantidad_consumida_moddev.trim()) { errors.cantidad_consumida_moddev = "Cant Cons. erroneo" }

                        else if (!/^\d+$/.test(valores.cantidad_consumida_moddev)) { errors.cantidad_consumida_moddev = "Cant Cons. erroneo" }
                        
                        else if (!valores.sectors.trim() || valores.sectors === "#") { errors.sectors = "Sector erroneo" }

                        else if (!valores.warehouses.trim() || valores.warehouses === "#") { errors.warehouses = "Bodega erronea" }

                        else if (!valores.racks.trim() || valores.racks === "#") { errors.racks = "Armario erroneo" }

                        else if (!valores.fila.trim()) { errors.fila = "Fila erronea" }

                        else if (!valores.columna.trim()) { errors.columna = "Columna erronea" }

                        else if (!valores.descripcion_parte_moddev.trim()) { errors.descripcion_parte_moddev = "Descripción erronea" }
                        
                        return errors;
                      }}

                      onSubmit={( valores, {resetForm} ) => {

                        let obj ={
                          
                          id_parte_moddev : "",
                          nombre_partemoddev: valores.nombre_partemoddev,
                          imagen_partemoddev: valores.imagen_partemoddev,
                          tipo_parte_moddev: valores.tipo_parte_moddev,
                          cantidad_consumida_moddev: valores.cantidad_consumida_moddev,
                          cantidad_disponible_moddev: valores.cantidad_disponible_moddev,
                          descripcion_parte_moddev: valores.descripcion_parte_moddev,
                          datasheet_parte_moddev: valores.datasheet_parte_moddev,
                          ubicacion_parte_moddev :`Sector ${valores.sectors} Bodega ${valores.warehouses} Armario ${valores.racks} Fila ${valores.fila} Columna ${valores.columna}`
                        }

                        obj.id_parte_moddev = modal_obj_edit.id_parte_moddev;
                        obj.imagen_partemoddev = img_edit;
                        setloader_edit(true);

                        moddev_put( obj, obj.id_parte_moddev ).then( (info) => {

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
                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.nombre_partemoddev }</p>
                            <ErrorMessage  name='nombre_partemoddev' component={() => (<p className='warn__password-user'>{errors.nombre_partemoddev}</p>)} />
                            <div className="input-container input_inventario">
                              <Field
                                type='text'
                                placeholder='Nuev@ Nombre' 
                                name='nombre_partemoddev'
                                id="nombre_partemoddev"
                              />
                              </div>
                            <ErrorMessage  name='descripcion_parte_moddev' component={() => (<p className='warn__password-user'>{errors.descripcion_parte_moddev}</p>)} />
                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ "Nueva Descripción" }</p>
                            <div className="input-container input_inventario">
                              <Field 
                                as="textarea"
                                max="180"
                                style={{ resize: "none", backgroundColor: "rgb(104, 104, 104)",borderRadius:"6px",width:"28vh",padding:"1rem", color:"color:rgb(223 222 223 / 1)" }} 
                                placeholder={ modal_obj_edit.descripcion_parte_moddev }
                                name='descripcion_parte_moddev'
                                id="descripcion_parte_moddev"
                              />
                              </div>

                            <br />
                            <hr />
                            <br />

                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ "Tipo anterior: " + modal_obj_edit.tipo_parte_moddev }</p>
                            <br />
                            <ErrorMessage  name='tipo_parte_moddev' component={() => (<p className='warn__password-user'>{errors.tipo_parte_moddev}</p>)} />
                            
                            <div className="type_selector">
                              <p style={{ color:"rgb(255, 203, 58)",width:"12vh" }}>{ (!!type_select) ? "Seleccionar otro tipo:" : "Crear nuevo tipo:" }</p>
                              <input type="checkbox" id="switch" onClick={ () => { settype_select(!type_select) } } /><label for="switch" id='text_type_selector'>Toggle</label>
                            </div>
                            <br />
                            
                            {
                            ( !!type_select )

                            ? <div className="animate__animated animate__fadeInDown" style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                                <ErrorMessage  name='tipo_parte_moddev' component={() => (<p className='warn__password-user'>{errors.tipo_parte_moddev}</p>)} />
                                  <div className="option_cont">
                                    <Field as="select" name="tipo_parte_moddev" id="select_filter" autofocus="true" style={{ width:"400px" }}>

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
                                <ErrorMessage  name='tipo_parte_moddev' component={() => (<p className='warn__password-user'>{errors.tipo_parte_moddev}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Tipo' 
                                    name='tipo_parte_moddev'
                                    id="tipo_parte_moddev"
                                  />
                                </div>
                              </div>

                            } 
                             {/* ----------- */}
                                
                             <div className='cont_ubi'>

                            <h3>Ubicacion:</h3>
                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.ubicacion_parte_moddev }</p>

                            <ErrorMessage  name='sectors' component={() => (<p className='warn__password-user'>{errors.sectors}</p>)} />
                            <ErrorMessage  name='warehouses' component={() => (<p className='warn__password-user'>{errors.warehouses}</p>)} />
                            <ErrorMessage  name='racks' component={() => (<p className='warn__password-user'>{errors.racks}</p>)} />
                            <ErrorMessage  name='fila' component={() => (<p className='warn__password-user'>{errors.fila}</p>)} />
                            <ErrorMessage  name='columna' component={() => (<p className='warn__password-user'>{errors.columna}</p>)} />

                            <div className='responsive_class_ubi'>

                              <div className="row_config">
                                <h2>Sector</h2>
                                <Field as="select" className="input_ubi" name='sectors'id="sectors" autofocus="true">
                                  <option value={"none"}>#</option>
                                    {
                                      sct.map((item) => (
                                        <>
                                          <option value={item}>{item}</option>
                                        </>
                                      ))
                                    }
                                </Field>
                              </div>

                              <div className="row_config">
                                <h2>Bodega</h2>
                                <Field as="select" className="input_ubi" name='warehouses'id="warehouses" autofocus="true">
                                  <option value={"none"}>#</option>
                                    {
                                      bdgs.map((item) => (
                                        <>
                                          <option value={item}>{item}</option>
                                        </>
                                      ))
                                    }
                                </Field>
                              </div>   

                              <div className="row_config">
                                <h2>Armario</h2>
                                <Field as="select" className="input_ubi" name='racks'id="racks" autofocus="true">
                                  <option value={"none"}>#</option>
                                    {
                                      racks.map((item) => (
                                        <>
                                          <option value={item}>{item}</option>
                                        </>
                                      ))
                                    }
                                </Field>
                              </div>

                              <div className="row_config">
                                <h2>Fila</h2>
                                <Field placeholder="" className="input_ubi" type="text" name='fila'id="fila"/>
                              </div>

                            </div> 

                            <div className="row_config">
                              <h2>Columna</h2>
                              <Field placeholder="" className="input_ubi" type="text" name='columna'id="columna"/>
                            </div>

                            </div>

                            {/* ----------- */} 
                            <br />
                            <hr />
                            <br />

                            <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.cantidad_consumida_moddev }</p>
                            <ErrorMessage  name='cantidad_consumida_moddev' component={() => (<p className='warn__password-user'>{errors.cantidad_consumida_moddev }</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Nuev@ Cantidad consumida' 
                                name='cantidad_consumida_moddev'
                                id="cantidad_consumida_moddev"
                              />
                              </div>
                              <p style={{ maxWidth:"30vh", color:"rgb(255, 203, 58)" }}>{ modal_obj_edit.cantidad_disponible_moddev }</p>
                            <ErrorMessage  name='cantidad_disponible_moddev' component={() => (<p className='warn__password-user'>{errors.cantidad_disponible_moddev}</p>)} />
                            <div className="input-container input_inventario">
                              <Field 
                                type='text'
                                placeholder='Nuev@ Cantidad disponible' 
                                name='cantidad_disponible_moddev'
                                id="cantidad_disponible_moddev"
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
                      <h1 style={{ width:"100%",display:"flex",justifyContent:"center",gap:"10px", color:"rgb(255, 203, 58)" }}>Crear item Modulo de Desarrollo</h1>


                          {
                            ( !!loader_edit ) && <span className='loader'></span>
                          }

                <Formik

                  initialValues={{
                    id_parte_moddev : "",
                    nombre_partemoddev: "",
                    imagen_partemoddev: img_edit,
                    tipo_parte_moddev: "",

                    sectors:"",
                    warehouses:"",
                    racks:"",
                    fila:"",
                    columna:"",

                    cantidad_disponible_moddev: "",
                    cantidad_consumida_moddev: "",
                    descripcion_parte_moddev: "",
                    datasheet_parte_moddev: "",
                  }}

                  validate = {(valores) => {

                    let errors = {};

                    if (!valores.nombre_partemoddev.trim()) { errors.nombre_partemoddev = "Nombre erroneo" }

                    else if (!valores.tipo_parte_moddev.trim()) { errors.tipo_parte_moddev = "Tipo erroneo" }

                    else if (!valores.tipo_parte_moddev === "none") { errors.tipo_parte_moddev = "Tipo erroneo" }

                    else if (!valores.tipo_parte_moddev === "Cree un nuevo tipo") { errors.tipo_parte_moddev = "Tipo erroneo" }
                    
                    else if (!valores.cantidad_disponible_moddev.trim()) { errors.cantidad_disponible_moddev = "Cant Disp. erroneos" }

                    else if (!/^\d+$/.test(valores.cantidad_disponible_moddev)) { errors.cantidad_disponible_moddev = "Cant Disp. erroneo" }
                    
                    else if (!valores.cantidad_consumida_moddev.trim()) { errors.cantidad_consumida_moddev = "Cant Cons. erroneo" }

                    else if (!/^\d+$/.test(valores.cantidad_consumida_moddev)) { errors.cantidad_consumida_moddev = "Cant Cons. erroneo" }
                    
                    else if (!valores.sectors.trim() || valores.sectors === "#") { errors.sectors = "Sector erroneo" }

                    else if (!valores.warehouses.trim() || valores.warehouses === "#") { errors.warehouses = "Bodega erronea" }

                    else if (!valores.racks.trim() || valores.racks === "#") { errors.racks = "Armario erroneo" }

                    else if (!valores.fila.trim()) { errors.fila = "Fila erronea" }

                    else if (!valores.columna.trim()) { errors.columna = "Columna erronea" }

                    else if (!valores.descripcion_parte_moddev.trim()) { errors.descripcion_parte_moddev = "Descripción erronea" }
                    
                    return errors;
                  }}

                  onSubmit={( valores, {resetForm} ) => {

                    let obj ={
                          
                      id_parte_moddev : "",
                      nombre_partemoddev: valores.nombre_partemoddev,
                      imagen_partemoddev: valores.imagen_partemoddev,
                      tipo_parte_moddev: valores.tipo_parte_moddev,
                      cantidad_consumida_moddev: valores.cantidad_consumida_moddev,
                      cantidad_disponible_moddev: valores.cantidad_disponible_moddev,
                      descripcion_parte_moddev: valores.descripcion_parte_moddev,
                      datasheet_parte_moddev: valores.datasheet_parte_moddev,
                      ubicacion_parte_moddev :`Sector ${valores.sectors} Bodega ${valores.warehouses} Armario ${valores.racks} Fila ${valores.fila} Columna ${valores.columna}`
                    }
                    
                    setloader_edit(true);

                    if (img_edit === "") {

                      obj.imagen_partemoddev = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Raspberry_Pi_4_Model_B_-_Side.jpg/640px-Raspberry_Pi_4_Model_B_-_Side.jpg";

                    }else{

                      obj.imagen_partemoddev = img_edit;

                    }

                    moddev_post( obj  ).then( (info) => {

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
                                        <div className="cont_img_details img_create_item" title='Sube tu imagen' onClick={ () => { myWidgetModdev.open(); } }>
                                          <img src={ img_edit } className="img_card"/>
                                        </div>
                                      </div>

                                    :
                                      <div id='img_rsg' title='Subir imagen' onClick={ () => { myWidgetModdev.open(); } }>
                                          <FaFileUpload fontSize={"140px"} className='file_image_create'/>
                                      </div>
                                  }
                                  
                                  <br />

                            <ErrorMessage  name='nombre_partemoddev' component={() => (<p className='warn__password-user'>{errors.nombre_partemoddev}</p>)} />
                            <div className="input-container input_inventario">
                            <hr />
                            <br />
                            <br />
                                  <Field 
                                    type='text'
                                    placeholder='Nombre' 
                                    name='nombre_partemoddev'
                                    id="nombre_partemoddev"
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
                                    <ErrorMessage  name='tipo_parte_moddev' component={() => (<p className='warn__password-user'>{errors.tipo_parte_moddev}</p>)} />
                                      <div className="option_cont">
                                        <Field as="select" name="tipo_parte_moddev" id="select_filter" autofocus="true" style={{ width:"400px" }}>

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
                                    <ErrorMessage  name='tipo_parte_moddev' component={() => (<p className='warn__password-user'>{errors.tipo_parte_moddev}</p>)} />
                                    <div className="input-container input_inventario">
                                      <Field 
                                        type='text'
                                        placeholder='Tipo' 
                                        name='tipo_parte_moddev'
                                        id="tipo_parte_moddev"
                                      />
                                    </div>
                                  </div>

                               } 
                               {/* ----------- */}
                                
                               <div className='cont_ubi'>

                              <h3>Ubicacion:</h3>

                              <ErrorMessage  name='sectors' component={() => (<p className='warn__password-user'>{errors.sectors}</p>)} />
                              <ErrorMessage  name='warehouses' component={() => (<p className='warn__password-user'>{errors.warehouses}</p>)} />
                              <ErrorMessage  name='racks' component={() => (<p className='warn__password-user'>{errors.racks}</p>)} />
                              <ErrorMessage  name='fila' component={() => (<p className='warn__password-user'>{errors.fila}</p>)} />
                              <ErrorMessage  name='columna' component={() => (<p className='warn__password-user'>{errors.columna}</p>)} />

                              <div className='responsive_class_ubi'>

                                <div className="row_config">
                                  <h2>Sector</h2>
                                  <Field as="select" className="input_ubi" name='sectors'id="sectors" autofocus="true">
                                    <option value={"none"}>#</option>
                                      {
                                        sct.map((item) => (
                                          <>
                                            <option value={item}>{item}</option>
                                          </>
                                        ))
                                      }
                                  </Field>
                                </div>

                                <div className="row_config">
                                  <h2>Bodega</h2>
                                  <Field as="select" className="input_ubi" name='warehouses'id="warehouses" autofocus="true">
                                    <option value={"none"}>#</option>
                                      {
                                        bdgs.map((item) => (
                                          <>
                                            <option value={item}>{item}</option>
                                          </>
                                        ))
                                      }
                                  </Field>
                                </div>   

                                <div className="row_config">
                                  <h2>Armario</h2>
                                  <Field as="select" className="input_ubi" name='racks'id="racks" autofocus="true">
                                    <option value={"none"}>#</option>
                                      {
                                        racks.map((item) => (
                                          <>
                                            <option value={item}>{item}</option>
                                          </>
                                        ))
                                      }
                                  </Field>
                                </div>

                                <div className="row_config">
                                  <h2>Fila</h2>
                                  <Field placeholder="" className="input_ubi" type="text" name='fila'id="fila"/>
                                </div>

                              </div> 

                              <div className="row_config">
                                <h2>Columna</h2>
                                <Field placeholder="" className="input_ubi" type="text" name='columna'id="columna"/>
                              </div>

                              </div>

                              {/* ----------- */}
                                
                                <ErrorMessage  name='cantidad_disponible_moddev' component={() => (<p className='warn__password-user'>{errors.cantidad_disponible_moddev}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Cantidad disponible' 
                                    name='cantidad_disponible_moddev'
                                    id="cantidad_disponible_moddev"
                                  />
                                </div>
                                
                                <ErrorMessage  name='cantidad_consumida_moddev' component={() => (<p className='warn__password-user'>{errors.cantidad_consumida_moddev}</p>)} />
                                <div className="input-container input_inventario">
                                  <Field 
                                    type='text'
                                    placeholder='Cantidad consumida' 
                                    name='cantidad_consumida_moddev'
                                    id="cantidad_consumida_moddev"
                                  />
                                </div>
                                
                                <ErrorMessage  name='descripcion_parte_moddev' component={() => (<p className='warn__password-user'>{errors.descripcion_parte_moddev}</p>)} />
                                <div className="input-container input_inventario">
                                <Field 
                                  as="textarea"
                                  max="180"
                                  style={{ resize: "none", backgroundColor: "rgb(104, 104, 104)",borderRadius:"6px",width:"28vh",padding:"1rem", color:"color:rgb(223 222 223 / 1)" }} 
                                  placeholder='Descripcion' 
                                  name='descripcion_parte_moddev'
                                  id="descripcion_parte_moddev"
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
                    <h2>{ "Datasheet (Opcional) : " }{ obj_file_toUpadate.nombre_partemoddev }</h2><br />
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
                    <h1>{ "¿Esta seguro de querer Eliminar el Item : " }{ modal_obj_desha.nombre_partemoddev }{ "?" }</h1>
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
