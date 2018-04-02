import React from 'react';
import { render } from 'react-dom';

const NewStressor = () => (
  <div className="box">
    <input className="input" type="text" name="text" placeholder="Title" />
  </div>
);

render(<NewStressor />, document.getElementById('root'));
