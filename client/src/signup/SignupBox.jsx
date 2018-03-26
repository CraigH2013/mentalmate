import React from 'react';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';

const SignupBox = () => (
  <div className="columns is-centered">
    <div className="column is-half is-narrow">
      <div className="box">
        <form action="/signup" method="post">
          <h4 className="title is-4 has-text-centered">Sign Up</h4>
          <FormInput label="Full Name" type="text" name="name" required />
          <FormInput label="Email" type="email" name="email" required />
          <FormInput
            label="Password"
            type="password"
            name="password"
            required
          />
          <br />
          <div className="content">
            <blockquote>
              By creating an account, you agree to our terms and conditions
            </blockquote>
          </div>
          <SubmitButton
            text="Create an account"
            className="is-success is-fullwidth"
          />
          <div className="field has-text-centered">
            <a href="/login" className="button is-text">
              or, Login
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default SignupBox;
