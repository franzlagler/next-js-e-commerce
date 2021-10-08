import Cookies from 'js-cookie';

export async function getPrice() {
  try {
    return await JSON.parse(Cookies.get('order'));
  } catch {
    return undefined;
  }
}
