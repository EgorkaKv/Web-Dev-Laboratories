import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import {useNavigate} from "react-router-dom";


const Header = () => {

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleLogin = () => {
        navigate('/login');
    };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li><Link to='/' className="nav-link">Home</Link></li>
          <li><Link to='/catalog' className="nav-link">Catalog</Link></li>
          <li><Link to='/cart' className="nav-link">Cart</Link></li>
            <li>{isAuthenticated ? (
                <button onClick={handleLogout} className="nav-link">Logout</button>
            ) : (
                <button onClick={handleLogin} className="nav-link">Login</button>
            )}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
