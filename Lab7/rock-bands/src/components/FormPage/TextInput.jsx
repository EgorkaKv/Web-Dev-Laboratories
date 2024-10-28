import React from 'react';
import { useField } from 'formik';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="input-group">
      <label htmlFor={props.name}>{label}</label>
      <input {...field} {...props} className={meta.touched && meta.error ? 'input-error' : ''} />
      {meta.touched && meta.error ? (
        <div className="error-text">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
