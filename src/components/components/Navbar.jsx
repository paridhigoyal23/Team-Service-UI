import { Link } from 'react-router-dom';
import React from 'react'
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <nav>
      <div className='bg-gradient-to-r from-cyan-500 to-blue-800 flex justify-between py-6 px-8 text-lg text-white'>
      <div className="font-bold tracking-widest">LOGO</div>
      <div className='flex gap-5'>
        <ul className='flex gap-5'>
            <li><Link to="">Dashboard</Link></li>
            <li><Link to="teammembers">Team Members</Link></li>
            <li><Link to="wfo">WFo/Leave</Link></li>
            <li><Link to="training">Training</Link></li>
        </ul>
      </div>
      <div className='flex gap-6'>
        <div className='text-lg'>manager@gmail.com</div>
        <div><i className="fa-solid fa-right-from-bracket"></i></div>
      </div>
      </div>
      </nav>
    </header>
    
  );
}

export default Navbar;
