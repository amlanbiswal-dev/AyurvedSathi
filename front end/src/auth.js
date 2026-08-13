export const isAuthenticated = () => {
  return sessionStorage.getItem("ayurvedsathi-auth") === "true";
};

export const loginUser = () => {
  sessionStorage.setItem("ayurvedsathi-auth", "true");
};

export const logoutUser = () => {
  sessionStorage.removeItem("ayurvedsathi-auth");
};