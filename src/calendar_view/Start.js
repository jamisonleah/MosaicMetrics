import React from 'react';
import Calendar from './Calendar'; // Import the Calendar component
import SignIn from './SignIn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = (props) => {
  const navigate = useNavigate();

  if (props.bearerToken) {
      navigate('/calendar');
  
  }
  else {
      navigate('/signin');
  }
};

export default Start;
