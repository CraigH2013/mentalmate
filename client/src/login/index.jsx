import React from 'react';
import { render } from 'react-dom';
import LoginBox from './LoginBox';
import CenteredLogo from '../components/CenteredLogo';

const Login = () => (
  <div>
    <section className="section">
      <div className="container">
        <CenteredLogo />
        <LoginBox />
      </div>
    </section>
  </div>
);

render(<Login />, document.getElementById('root'));
