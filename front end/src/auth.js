export const isAuthenticated = () => {
  return localStorage.getItem('ayurvedsathi-auth') === 'true';
};

export const loginUser = () => {
  localStorage.setItem('ayurvedsathi-auth', 'true');
};

export const logoutUser = () => {
  localStorage.removeItem('ayurvedsathi-auth');
};
