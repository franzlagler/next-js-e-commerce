// Check if item already exists in Card
export function checkItemExistence(id, arr) {
  if (arr.find((el) => el.id === id)) return true;
  return false;
}
// Maxium product amount in cart must not be > 9
export function checkAmount(oldAmount, newAmount) {
  if (oldAmount + newAmount > 9) {
    return 9;
  }
  return oldAmount + newAmount;
}

// addItem(id, cart, productAmount)

export function addItem(id, arr, amount) {
  return [...arr, { id: id, amount: amount }];
}
export function updateItem(id, arr, amount) {
  return arr.map((el) => {
    if (el.id === id) {
      const newAmount = checkAmount(el.amount, amount);
      return {
        id: el.id,
        amount: newAmount,
      };
    }
    return el;
  });
}

export function incrementAmountInCart(id, arr) {
  return arr.map((el) => {
    if (el.id === id && el.amount !== 9) {
      return {
        ...el,
        amount: el.amount + 1,
      };
    }
    return el;
  });
}

function decrementAmountInCart(id, arr) {
  return arr.map((el) => {
    if (el.id === id && el.amount !== 1) {
      return {
        ...el,
        amount: el.amount - 1,
      };
    }
    return el;
  });
}

export function updateAmountInCart(button, id, arr) {
  if (button === 'increment') {
    return incrementAmountInCart(id, arr);
  }

  return decrementAmountInCart(id, arr);
}
