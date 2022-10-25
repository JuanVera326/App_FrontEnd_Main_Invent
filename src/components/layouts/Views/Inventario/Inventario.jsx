import React, { useEffect, useState } from 'react'
import { getItemsElectricos } from '../../../../helpers/api/ElectricosRequests';
import "./Inventario.css"

export const Inventario = ( { user } ) => {

  const [items_electricos, setitems_electricos] = useState([]);
  const [val_request, setval_request] = useState(0);
  const [loader, setloader] = useState(false);

  useEffect(() => {

    getItemsElectricos().then((info) => {
      
      if (info.status === 200) {
        setval_request(info.status);
        setitems_electricos( info.data );
      }else{
        setval_request(info.status);
      }
        console.log(info.data);
    });

  }, [user])

  return (
    <div className='cont_invent'>
        <div className="cont1_electricos">
          <h2 style={{color:"white"}}>Electricos</h2>
          <div className="electricos_cont">
            {
              items_electricos.map((item) => (
                <div className='card'>
                  <img className='img5' src={ item.imagen_parte_electricos } />
                  <div className="cont_left_card">
                  <h4 style={{color:"white"}}>{ item.nombre_parte_electricos }</h4>
                    <p style={{color:"white"}}>{ item.tipo_parte_electricos }</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {/* <span className="loader_inv"></span> */}
        <div className="electronicos cont"></div>
        <div className="eleferre_cont"></div>
        <div className="moddev_cont"></div>
        <div className="otros_cont"></div>
    </div>

  )
}
