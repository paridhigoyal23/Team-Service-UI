import React from 'react'
import "../Navbar/Navbar.css"

const Navbar = () => {
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-800 flex justify-between py-6 px-8 text-lg text-white'>
      <div className="font-bold tracking-widest">LOGO</div>
      <div className='flex gap-5'>
        <ul className='flex gap-5'>
            <li>Dashboard</li>
            <li>Team Members</li>
            <li>WFO/Leave</li>
            <li>Training</li>
        </ul>
      </div>
      <div className='flex gap-6'>
        <div className='text-lg'>manager@gmail.com</div>
        <div><i className="fa-solid fa-right-from-bracket"></i></div>
      </div>
    </div>
  )
}

export default Navbar
