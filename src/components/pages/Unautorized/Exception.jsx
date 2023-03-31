import React from 'react'
import { main_invent_images } from '../../../helpers/ImagesHelp';
import "./../Home/HomeLogin.css";

export const Exception = () => {

    return (

        <div style={{ height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",backgroundColor:"rgb(104, 104, 104)" }}>

            <div style={{ backgroundColor:"#30ac1f",borderRadius:"6px",height:"50vh",width:"70vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>

                <h1 className='forbidden'>

                    403

                </h1>

                <h1 style={{ color:"white",fontSize:"3rem" }}>
                    
                    No Autorizado

                </h1>

            </div>

            <div className="hover_cont" onClick={ () => { window.location = "/" } }>

                <img className='img2' src={ main_invent_images("./images/home/pngegg.png") } />
                <img className='img2' src={ main_invent_images("./images/home/logoSena.png") } />

            </div>

        </div>

    )
}
