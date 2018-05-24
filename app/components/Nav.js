import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  window.scrollTo(0,0)
  const academy = document.body.clientWidth > 670  ? 'Margaret Hamilton Interplanetary Academy' : 'MHI';
  return (
    <nav id='nav' className='navbar justify-content-between'>
      <a className="navbar-brand" href="/">
        <i className="fas fa-space-shuttle"></i> {academy}
      </a>
      <ul className='nav'>
        <li className='navLi nav-item'>
          <Link to='/students' className='nav-link'>Students</Link>
        </li>
        <li className='navLi nav-item'>
          <Link to='/campuses' className='nav-link'>Campuses</Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
