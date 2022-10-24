import React from 'react'

export const Button = ( {text, style, event, id, type} ) => {
  return (
    <button
        className={style}
        onClick={event}
        id={id}
        type={type}
    >
        { text }
    </button>
  )
}
