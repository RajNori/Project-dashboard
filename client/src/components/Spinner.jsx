import React from 'react';
import { FaSpinner } from 'react-icons/fa';

export default function Spinner() {
  return (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border' role='status'>
        <span className='sr-only'>
          <FaSpinner />
        </span>
      </div>
    </div>
  );
}
