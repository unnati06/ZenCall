// components/SubmitBtn.js
import React from 'react';
import styled from 'styled-components';

const SubmitBtn = ({ formBtn }) => {
  return (
    <Wrapper>
      <button type='submit' className={`submit-btn ${formBtn && 'form-btn'}`}>
        Submit
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .submit-btn {
    background-color: #572649;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #4a1f2b;
    }
  }
`;

export default SubmitBtn;
