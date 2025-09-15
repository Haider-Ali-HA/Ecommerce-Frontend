import React from 'react'

const PrimaryButton = ({ children, className, onClick }) => {
  return (
    <button onClick={onClick} className={`  rounded inline-flex font-semibold items-center justify-center gap-2 transition-all duration-100 ${className}`}>
      {children}
    </button>
  )
}

export default PrimaryButton
