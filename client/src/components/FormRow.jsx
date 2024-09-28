// components/FormRow.js
import React from 'react';
import styled from 'styled-components';

const FormRow = ({ type, name, labelText, defaultValue }) => {
  return (
    <Wrapper>
      {labelText && <label htmlFor={name} className='form-label'>{labelText}</label>}
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue}
        required
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-primary-color);
  }
  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    color: var(--text-color);
    background-color: var(--background-color);
  }
`;

export default FormRow;
