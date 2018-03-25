import React from 'react';
import { render } from 'react-dom';
import LoginBox from './LoginBox';

const Login = () => (
  <div>
    <section className="section">
      <div className="container">
        <div className="level">
          <a className="level-item has-text-centered" href="/">
            <figure className="image is-96x96">
              <img
                src="/static/images/logo-square-primary-bold.png"
                alt="Mental Mate: An easier way to manage stress"
              />
            </figure>
          </a>
        </div>
        <LoginBox />
      </div>
    </section>
  </div>
);

render(<Login />, document.getElementById('root'));
