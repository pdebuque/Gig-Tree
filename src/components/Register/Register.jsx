import React from 'react';

import { useNavigate } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;