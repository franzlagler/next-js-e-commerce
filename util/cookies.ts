import Cookies from 'js-cookie';

export function getCookies(key: string) {
  try {
    return JSON.parse(Cookies.get(key)!);
  } catch {
    return undefined;
  }
}

export function setCookies(
  key: string,
  value: { id: string; amount: number }[],
) {
  return Cookies.set(key, JSON.stringify(value));
}

export function updateCookies(
  key: string,
  value: { id: string; amount: number }[],
) {
  setCookies(key, value);
  return getCookies(key);
}
