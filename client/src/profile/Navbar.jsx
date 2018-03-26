import React from 'react';
import '../utils/navbar-toggle';

const Navbar = () => (
  <nav className="navbar is-light">
    <div className="navbar-brand">
      <a className="navbar-item" href="/profile">
        <img
          src="/static/images/logo-full-primary.png"
          alt="Mental Mate: An easier way to manage stress"
          width="112"
          height="28"
        />
      </a>

      <div className="navbar-burger" data-target="navMenu">
        <span />
        <span />
        <span />
      </div>
    </div>

    <div className="navbar-menu is-pulled-right" id="navMenu">
      <div className="navbar-start" />
      <div className="navbar-end">
        <div className="navbar-item">
          <a className="button is-primary is-rounded" href="/logout">
            Logout
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
