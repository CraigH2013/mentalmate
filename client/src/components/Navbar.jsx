import React from 'react';
import '../utils/navbar-toggle';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          alt="Bulma: a modern CSS framework based on Flexbox"
          width="112"
          height="28"
        />
      </a>

      <div className="navbar-menu" id="navMenu">
        <div className="navbar-start" />
        <div className="navbar-end" />
      </div>

      <div className="navbar-burger" data-target="navMenu">
        <span />
        <span />
        <span />
      </div>
    </div>
  </nav>
);

export default Navbar;
