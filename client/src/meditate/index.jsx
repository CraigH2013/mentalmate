import React from 'react';
import { render } from 'react-dom';

const Meditate = () => (
  <section className="section">
    <div className="container">
      <a href="/profile" className="delete is-large" />
    </div>
  </section>
);

render(<Meditate />, document.getElementById('root'));
