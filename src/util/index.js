export function getTokenFromLocalStorage() {
  return localStorage.getItem("st_token");
}

export function setTokenNull() {
  localStorage.removeItem("st_token");
}

export function setTokenOnLocalStorage(token) {
  localStorage.setItem("st_token", token);
}
