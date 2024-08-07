import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { userEmail, logout } = useAuth();

  return (
    <header>
      <nav>
        <div className='bg-gradient-to-r from-purple-500 to-orange-500 flex justify-between py-6 px-8 text-lg text-white'>
          <div className="font-bold tracking-widest">Team Service</div>
          <div className='flex gap-5'>
            <ul className='flex gap-5'>
              <li className={styles.li}><NavLink to="" className={({ isActive }) => isActive ? styles.active : undefined} end>Dashboard</NavLink></li>
              <li className={styles.li}><NavLink to="/Team-Service-UI/teammembers" className={({ isActive }) => isActive ? styles.active : undefined}>Team Members</NavLink></li>
              <li className={styles.li}><NavLink to="/Team-Service-UI/wfo" className={({ isActive }) => isActive ? styles.active : undefined}>WFO/Leave</NavLink></li>
              <li className={styles.li}><NavLink to="/Team-Service-UI/training" className={({ isActive }) => isActive ? styles.active : undefined}>Training</NavLink></li>
            </ul>
          </div>
          <div className='flex gap-6'>
            <div className='text-lg'>{userEmail}</div>
            <div onClick={logout} style={{ cursor: 'pointer' }}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;