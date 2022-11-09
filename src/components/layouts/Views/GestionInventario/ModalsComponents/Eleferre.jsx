import React, { useEffect, useState } from 'react'
import { Modal } from '../../../../pages/Modal/Modal';

export const Eleferre = ( { mdl , evt }  ) => {

  const [modal, setmodal] = useState();

  useEffect(() => { setmodal(mdl); }, [mdl])
  
  return (
    <div>

            {

              ( !!modal ) &&

              <Modal close={setmodal} set_event={evt}>

                    <h1>Elementos Ferreteria</h1>

              </Modal>
              
            }

    </div>
  )
}
