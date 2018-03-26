import React from 'react';
import { render } from 'react-dom';
import CenteredLogo from '../components/CenteredLogo';
import SignupBox from './SignupBox';

const Signup = () => (
  <div>
    <section className="section">
      <div className="container">
        <CenteredLogo />
        <SignupBox />
      </div>
    </section>
  </div>
);

render(<Signup />, document.getElementById('root'));
