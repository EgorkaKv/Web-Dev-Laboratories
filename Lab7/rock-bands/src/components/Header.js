import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><Link to='/' className="nav-link">Home</Link></li>
          <li><Link to='/catalog' className="nav-link">Catalog</Link></li>
          <li><a href="#" className="nav-link">Cart</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
