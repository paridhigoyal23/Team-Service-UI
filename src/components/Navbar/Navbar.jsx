import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <header>
      <nav>
      <div className='bg-gradient-to-r from-purple-500 to-orange-500 flex justify-between py-6 px-8 text-lg text-white'>
      <div className="font-bold tracking-widest">Team Service</div>
      <div className='flex gap-5'>
        <ul className='flex gap-5'>
            <li className={styles.li} ><NavLink to="" className={({isActive})=>isActive?styles.active:undefined} end >Dashboard</NavLink></li>
            <li className={styles.li}><NavLink to="teammembers" className={({isActive})=>isActive?styles.active:undefined} >Team Members</NavLink></li>
            <li className={styles.li}><NavLink to="wfo" className={({isActive})=>isActive?styles.active:undefined} >WFO/Leave</NavLink></li>
            <li className={styles.li}><NavLink to="training" className={({isActive})=>isActive?styles.active:undefined} >Training</NavLink></li>
        </ul>
      </div>
      <div className='flex gap-6'>
        <div className='text-lg'>admin@gmail.com</div>
        <div><i className="fa-solid fa-right-from-bracket"></i></div>
      </div>
      </div>
      </nav>
    </header>
    
  );
}

export default Navbar;
