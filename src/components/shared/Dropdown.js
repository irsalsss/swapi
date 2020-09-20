import React, { useState, useRef } from 'react'
import useOnClickOutside from '../../utils/useClickOutside'

const Dropdown = ({ onChange, listValue}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownValue, setDropdownValue] = useState(listValue[0].title)
  const dropdownRef = useRef()
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false))

  const _onClick = (val) => {
    setIsDropdownOpen(false)
    onChange(val)
    setDropdownValue(val.title)
  }

  return (
    <div className="relative">
      <div
        id="dropdown-button"
        className="py-1 px-2 w-56 flex-between-center border border-blue-500 text-blue-700 rounded cursor-pointer"
        onClick={() => setIsDropdownOpen(true)}
      >
        <span>{dropdownValue}</span>
        <i className="fa fa-caret-down"></i>
      </div>

      {isDropdownOpen && (
        <div
          id="list-dropdown-value"
          ref={dropdownRef}
          className="absolute bg-white left-0 h-56 w-56 border border-gray-500 rounded overflow-y-scroll cursor-pointer">
          {listValue.map((val, idx) => (
            <div
              key={idx}
              className="flex-between-center p-1 hover:text-blue-700"
              onClick={() => _onClick(val, idx + 1)}
            >
              {val.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown