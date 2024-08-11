import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { userEmail, logout, userRole } = useAuth();

  return (
    <header>
      <nav>
        <div className='bg-gradient-to-r from-purple-700 to-orange-500 flex items-center justify-between py-6 px-8 text-xl text-white'>
          <div className="font-bold tracking-wides pl-10">Team Service</div>
          <div className='flex gap-5'>
            <ul className='flex gap-5 text-xl items-center'>
              <li className={styles.li}><NavLink to="" className={({ isActive }) => isActive ? styles.active : undefined} end>Dashboard</NavLink></li>
              <li className={styles.li}><NavLink to="/Team-Service-UI/teammembers" className={({ isActive }) => isActive ? styles.active : undefined}>Team Members</NavLink></li>
              <li className={styles.li}><NavLink to="/Team-Service-UI/wfo" className={({ isActive }) => isActive ? styles.active : undefined}>WFO/Leave</NavLink></li>
              <li className={styles.li}><NavLink to="/Team-Service-UI/training" className={({ isActive }) => isActive ? styles.active : undefined}>Training</NavLink></li>
            </ul>
          </div>
          <div className='flex gap-8'>
            <div className='flex flex-col items-center'>
              <div className='text-lg'>{userEmail}</div>
              <div className='text-sm'>({userRole})</div>
            </div>
            <div onClick={logout} className="scale-110 flex items-center justify-center cursor-pointer hover:text-gray-100 hover:scale-125 transition-colors,transform duration-200">
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;