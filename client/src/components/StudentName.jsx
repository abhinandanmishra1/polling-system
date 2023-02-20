import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentWelcomePage = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  
  const viewPoll = () => {
    if(!inputRef.current.value) return;
    localStorage.setItem('student', inputRef.current.value);
    navigate('view-poll');
  };

  return (
    <div className='grid grid-columns-2 gap-4'>
      <input className='p-3 outline-none rounded-lg text-black' ref={inputRef} type="text" placeholder='Enter your name' />
      <button className='cursor-pointer text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={viewPoll}>Continue</button>
    </div>
  )
}

export default StudentWelcomePage