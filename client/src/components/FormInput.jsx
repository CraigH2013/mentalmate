import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  label, type, name, placeholder, required,
}) => (
  <div className="field">
    {label !== '' && <label className="label">{label}</label>}
    <div className="control">
      <input
        className="input"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'url'])
    .isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

FormInput.defaultProps = {
  label: '',
  placeholder: '',
  required: false,
};

export default FormInput;
