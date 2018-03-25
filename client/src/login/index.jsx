import React from 'react';
import { render } from 'react-dom';

const Login = () => (
  <div className="container">
    <div className="columns is-centered">
      <div className="column is-two-fifths is-narrow">
        <div className="box">
          <form action="/login" method="post">
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" name="username" />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" type="password" name="password" />
              </div>
            </div>
            <div className="control">
              <button className="button is-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

render(<Login />, document.getElementById('root'));
