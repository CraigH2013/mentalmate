import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const SubmitButton = ({ text, className }) => (
  <div className="field">
    <p className="control">
      <button
        className={classNames('button is-centered', className)}
        type="submit"
      >
        {text}
      </button>
    </p>
  </div>
);

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SubmitButton.defaultProps = {
  className: '',
};

export default SubmitButton;
