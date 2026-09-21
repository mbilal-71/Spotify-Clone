import api from './api';

export const registerUser = async ({ username, email, password, role }) => {
  const response = await api.post('/api/auth/register', {
    username,
    email,
    password,
    role,
  });
  return response.data;
};

export const loginUser = async ({ identifier, password }) => {
  // Backend accepts either username or email
  const body = {};
  if (identifier.includes('@')) {
    body.email = identifier;
  } else {
    body.username = identifier;
  }
  body.password = password;

  const response = await api.post('/api/auth/login', body);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/api/auth/logout');
  return response.data;
};
