import Cookies from 'js-cookie';

function Cart() {
  const order = JSON.parse(Cookies.get('order'));
  console.log(order);
  return <div></div>;
}

export default Cart;
