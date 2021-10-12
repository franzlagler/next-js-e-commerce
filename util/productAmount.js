export function incrementAmount(index, arr) {
  let currentAmount = arr[index];
  if (currentAmount === 9) {
    return currentAmount;
  }
  currentAmount += 1;
  return currentAmount;
}

export function decrementAmount(index, arr) {
  let currentAmount = arr[index];
  if (currentAmount === 1) {
    return currentAmount;
  }

  currentAmount -= 1;
  return currentAmount;
}
