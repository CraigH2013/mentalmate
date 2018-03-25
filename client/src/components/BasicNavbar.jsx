import React from 'react';

const BasicNavbar = () => (
  <nav className="navbar is-primary">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        <img
          src="/static/images/logo-full-light.png"
          alt="Mental Mate: An easier way to manage stress"
          width="112"
          height="28"
        />
      </a>
    </div>
  </nav>
);

export default BasicNavbar;
