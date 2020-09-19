import React, { useRef } from 'react';
import useClickOutside from '../../utils/useClickOutside';

const Modal = ({ setState, children }) => {
  const modal = useRef()

  useClickOutside(modal, () => setState(false))

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

        <div ref={modal} className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-10" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;