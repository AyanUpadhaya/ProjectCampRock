import React, { useState } from 'react';
import { MdModeNight,MdOutlineModeNight,MdOutlineNightlight } from 'react-icons/md';
function DarkModeToggler() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    document.body.dataset.theme = darkMode ? 'light' : 'dark';
  };

  return (
      <button
        className={`${
          darkMode ? 'bg-gray-800 text-white btn' : 'bg-white text-gray-800 btn'
        }` }
        onClick={handleDarkModeToggle}
      >
        {darkMode ? <MdModeNight className='text-3xl'/> : <MdOutlineNightlight className='text-3xl'/>}
      </button>

  );
}

export default DarkModeToggler;
