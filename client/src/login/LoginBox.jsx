import React from 'react';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';

const LoginBox = () => (
  <div className="columns is-centered">
    <div className="column is-two-fifths is-narrow">
      <div className="box">
        <form action="/login" method="post">
          <h4 className="title is-4 has-text-centered">Login</h4>
          <FormInput label="Email" type="email" name="email" />
          <FormInput label="Password" type="password" name="password" />
          <br />
          <SubmitButton text="Login" className="is-primary is-fullwidth" />
        </form>
      </div>
    </div>
  </div>
);

export default LoginBox;
