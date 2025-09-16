import React from 'react'

const SearchInputField = ({ type, placeholder, onChange, icon, className }) => {
  return (
    <div className="relative">
        {icon && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-text-accent pl-1 pointer-events-none">
            {icon}
          </div>
        )}
        <input
            onChange={onChange}
          type={
            type
          }
          placeholder={placeholder}
          className={`w-full rounded ${className}  px-5 py-2 ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
  )
}

export default SearchInputField
