import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const goToStudent = () => {
    navigate('/student');
  }
  const goToTeacher = () => {
    navigate('/teacher');
  }
  return (
    <div className='w-1/2 m-auto grid grid-cols-2 gap-4 h-20 place-items-center'>
      <button className='text-white text- bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={goToStudent}>
        I'm a student
      </button>

      <button className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' onClick={goToTeacher}>
        I'm a teacher
      </button>
    </div>
  )
}

export default Home