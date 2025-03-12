import React, { useState } from 'react';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <button
        onClick={toggleMenu}
        className='p-2 rounded-md border focus:outline-none focus:ring focus:ring-orange-400'
      >
        <div className='space-y-1'>
          <div className='w-6 h-0.5 bg-black' />
          <div className='w-6 h-0.5 bg-black' />
          <div className='w-6 h-0.5 bg-black' />
        </div>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-4 z-10'>
          <ul className='space-y-2'>
            <li className='hover:text-orange-500 cursor-pointer'>Home</li>
            <li className='hover:text-orange-500 cursor-pointer'>About</li>
            <li className='hover:text-orange-500 cursor-pointer'>Contact</li>
          </ul>
        </div>
      )}
    </div>
  );
}
