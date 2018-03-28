import React from 'react';
import PropTypes from 'prop-types';
import Identicon from 'identicon.js';
import '../utils/navbar-toggle';

const Navbar = ({ user }) => {
  let image = '';

  if (user.hash) {
    const data = new Identicon(user.hash, {
      size: 32,
      background: [0, 0, 0, 15],
    });
    image = `data:image/png;base64,${data}`;
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="/profile">
          <img
            src="/static/images/logo-long@2x.png"
            alt="Mental Mate: An easier way to manage stress"
            height="28"
          />
        </a>

        <div className="navbar-burger" data-target="navMenu">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="navbar-menu" id="navMenu">
        <div className="navbar-start" />
        <div className="navbar-end">
          <div className="navbar-item">
            <a href="/meditate" className="button is-inverted is-primary">
              <span className="icon">
                <i className="far fa-hand-peace" />
              </span>
              <span>Meditate</span>
            </a>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link is-hidden-touch">
              <figure className="image is-32x32">
                <img
                  alt=""
                  src={image}
                  style={{
                    maxHeight: 32,
                    borderRadius: 3,
                  }}
                />
              </figure>
            </a>

            <div className="navbar-dropdown is-right">
              <p className="navbar-item has-text-weight-semibold">
                {user.name}
              </p>
              <hr className="navbar-divider" />
              <a href="#" className="navbar-item">
                Account
              </a>
              <a href="/logout" className="navbar-item">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    hash: PropTypes.string,
  }),
};

Navbar.defaultProps = {
  user: {
    name: 'User',
    hash: null,
  },
};

export default Navbar;
