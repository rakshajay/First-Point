import React from 'react';
import './Footer.scss'; 
import mailIcon from "../../assets/Icons/mail.png";
import linkedinIcon from "../../assets/Icons/linkedin.png";
import github from "../../assets/Icons/github.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="mailto:rakshashettyhs@gmail.com" className="footer-link">
          <img src={mailIcon} alt="Mail Icon" className="footer-icon" />
        </a>
        <a href="https://github.com/rakshajay" className="footer-link">
          <img src={github} alt="Mail Icon" className="footer-icon" />
        </a>
        <a href="https://www.linkedin.com/in/raksha-shett/" target="_blank" rel="noopener noreferrer" className="footer-link">
          <img src={linkedinIcon} alt="LinkedIn Icon" className="footer-icon" />
        </a>
        <p className="footer-location">@Vancouver, BC, Canada</p>
      </div>
    </footer>
  );
}

export default Footer;
