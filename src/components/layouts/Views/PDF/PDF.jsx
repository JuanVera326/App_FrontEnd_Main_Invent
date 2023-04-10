import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

export const PDF = () => {

    const { doc } = useParams();

    useEffect(() => {
      console.log(doc);
    }, [doc])
    
  return (
    <div>
        <object data={doc} type="application/pdf"></object>
    </div>
  )
}
