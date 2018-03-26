import React from 'react';

const DailyEntry = () => (
  <div>
    <div className="card">
      <div className="card-content">
        <p className="title">How are you feeling today?</p>
        <div className="field has-addons">
          <p className="control">
            <a className="button is-large is-text has-text-success">Good</a>
          </p>
          <p className="control">
            <a className="button is-large is-text has-text-warning">Okay</a>
          </p>
          <p className="control">
            <a className="button is-large is-text has-text-danger">Bad</a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default DailyEntry;
