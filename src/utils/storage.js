const TokenKey = "token";

export const getToken = () => {
  return localStorage.getItem(TokenKey) ? localStorage.getItem(TokenKey) : "";
};

export const setToken = token => {
  return localStorage.setItem(TokenKey, token);
};

export const removeToken = () => {
  return localStorage.removeItem(TokenKey);
};

export const clearStorage = () => {
  return localStorage.clear();
};
