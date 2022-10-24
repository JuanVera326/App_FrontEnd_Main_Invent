import React from 'react'
import { main_invent_images } from '../../../helpers/ImagesHelp'
import "./Header.css";

export const Header = () => {
  return (
    <div className='header'>
        <img className='logo' src={main_invent_images("./images/home/pngegg.png")}></img> 
        <div className="cont_text_header">
            <h1 className='logotexto'>Main invent</h1> 
            <p className='texto'>"Mas orden, mas control"</p>
        </div>
    </div>
  )
}
