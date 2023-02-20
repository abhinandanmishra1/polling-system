import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Poll from './Poll';

const ViewPoll = () => {
  const socket = useSelector(store => store.socket);
  console.log(socket);
  const navigate = useNavigate();
  const student = localStorage.getItem('student');
  console.log(student);

  useEffect(() => {
    if(!student) {
      navigate('/student');
    }
  }, [navigate, student]);

  return (
    <div className='w-1/2 border min-h-1/2 max-h-1/3 p-4 rounded-lg shadow hover:shadow-2xl'>
      <h1 className='text-white'><span className='text-[#8A006B] font-bold text-xl'>Student:  </span><span className=' text-lg'>{student}</span></h1>
      <Poll />
    </div>
  )
}

export default ViewPoll;