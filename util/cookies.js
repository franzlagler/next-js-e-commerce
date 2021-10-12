import Cookies from 'js-cookie';

export function getCookies(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch {
    return undefined;
  }
}

export function setCookies(key, value) {
  return Cookies.set(key, JSON.stringify(value));
}

export function updateCookies(key, value) {
  setCookies(key, value);
  return getCookies(key);
}
