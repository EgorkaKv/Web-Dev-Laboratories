import React from 'react';
import logo from '../images/logo.svg';
import socialIcon from '../images/social.svg';

const Footer = () => {
  return (
    <footer>
      <div className="footer_top">
        <div className="branding">
          <h2>Branding stuff</h2>
          <p>Lorem ipsum dolor sit amet, consectetur<br />adipiscing elit.</p>
        </div>
        <img src={logo} alt="Logo" />
        <div className="social-icons">
          <a href="#"><img src={socialIcon} alt="Facebook" /></a>
          <a href="#"><img src={socialIcon} alt="Twitter" /></a>
          <a href="#"><img src={socialIcon} alt="LinkedIn" /></a>
          <a href="#"><img src={socialIcon} alt="Google" /></a>
        </div>
      </div>
      <p>&copy; 2024 IoT. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
