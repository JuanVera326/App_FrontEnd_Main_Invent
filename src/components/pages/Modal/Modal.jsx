import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css';

export function Modal ( {children, close , click} )  {

    const handleClose= () => {
        close( false );
    }

    return ReactDOM.createPortal(
        <div className="ModalBackground" onClick={click} id='modal'>
            
            {children}

            <div title='Click para salir' onClick={handleClose} className='cierre'></div>
        </div>,
        document.getElementById('modal')
    );
}