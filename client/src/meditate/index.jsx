import React from 'react';
import { render } from 'react-dom';

const Meditate = () => (
  <section className="section">
    <div className="container">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <a href="/profile" className="delete is-large" />
          </div>
        </div>
        <div className="level-right" />
      </div>
    </div>
  </section>
);

render(<Meditate />, document.getElementById('root'));
