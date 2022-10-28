import React from 'react'

export const Input = ( { name, type, style, txt, id, eventChange, eventBlur, value, ref, eventKeyPress } ) => {
    return (
      <input 
        type={type} 
        className={style}
        placeholder={txt}
        onChange={eventChange}
        onBlur={eventBlur}
        id={id}
        value={value}
        name={name}
        ref={ref}
        onKeyDown={eventKeyPress}
      />
    )
}
