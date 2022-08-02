import React from "react";
import notfound from '../components/assets/not-found.svg'
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className='d-flex flex-column justify-content align-items-center mt-5'>
      <img src={notfound} alt='logo' className='mr-2' />
      <p className='lead ' >This page does not exist!</p>
      <Link to='/' className='btn btn-primary'>
        Go Home
      </Link>
    </div>
  );
}