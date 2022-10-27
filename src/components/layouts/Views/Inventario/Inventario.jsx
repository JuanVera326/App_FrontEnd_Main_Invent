import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getItemsElectricos } from '../../../../helpers/api/ElectricosRequests';
import { getItemsElectronicos } from '../../../../helpers/api/ElectronicosRequests';
import { getItemsEleferre } from '../../../../helpers/api/ElementosFerreteriaRequest';
import { getItemsModdev } from '../../../../helpers/api/ModdevRequest';
import { getItemsOtros } from '../../../../helpers/api/OtrosRequest';
import "./Inventario.css"

export const Inventario = ( { user } ) => {

  const [items_electricos, setitems_electricos] = useState([]);
  const [items_electronicos, setitems_electronicos] = useState([]);
  const [items_eleferre, setitems_eleferre] = useState([]);
  const [items_moddev, setitems_moddev] = useState([]);
  const [items_otros, setitems_otros] = useState([]);
  const [val_request_electricos, setval_request_electricos] = useState(0);
  const [val_request_electronicos, setval_request_electronicos] = useState(0);
  const [val_request_eleferre, setval_request_eleferre] = useState(0);
  const [val_request_moddev, setval_request_moddev] = useState(0);
  const [val_request_otros, setval_request_otros] = useState(0);
  const [loader, setloader] = useState(false);

  useEffect(() => {

    getItemsElectricos().then((info) => {
      
      if (info.status === 200) {
        setval_request_electricos(info.status);
        setitems_electricos( info.data );
      }else{
        setval_request_electricos(info.status);
      }
        console.log(info.data);
    });

    getItemsElectronicos().then((info) => {
      
      if (info.status === 200) {
        setval_request_electronicos(info.status);
        setitems_electronicos( info.data );
      }else{
        setval_request_electronicos(info.status);
      }
        console.log(info.data);
    });

    getItemsEleferre().then((info) => {
      
      if (info.status === 200) {
        setval_request_eleferre(info.status);
        setitems_eleferre( info.data );
      }else{
        setval_request_eleferre(info.status);
      }
        console.log(info.data);
    });

    getItemsModdev().then((info) => {
      
      if (info.status === 200) {
        setval_request_moddev(info.status);
        setitems_moddev( info.data );
      }else{
        setval_request_moddev(info.status);
      }
        console.log(info.data);
    });

    getItemsOtros().then((info) => {
      
      if (info.status === 200) {
        setval_request_otros(info.status);
        setitems_otros( info.data );
      }else{
        setval_request_otros(info.status);
      }
        console.log(info.data);
    });

  }, [user])

  return (
    <div className='cont_invent'  style={{overflow:"scroll"}}>
        <h1>Ítems Electricos</h1>
        <br />
        <div className="electricos_cont">
           {
            items_electricos.map((item) => (

              <div className='card'>

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
        <h1 style={{color:"white"}}>Ítems Electronicos</h1>
        <br />
        <div className="electronicos_cont">
          {
              items_electronicos.map((item) => (

                <div className='card'>

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
        <h1 style={{color:"white"}}>Ítems Elementos de Ferretería</h1>
        <br />
        <div className="eleferre_cont">
        {
              items_eleferre.map((item) => (

                <div className='card'>

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
        <h1 style={{color:"white"}}>Ítems Módulos de Desarrollo</h1>
        <br />
        <div className="moddev_cont">

        {
              items_moddev.map((item) => (

                <div className='card'>

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
        <h1 style={{color:"white"}}>Otros Ítems</h1>
        <br />
        <div className="otros_cont">

        {
              items_otros.map((item) => (

                <div className='card'>

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
