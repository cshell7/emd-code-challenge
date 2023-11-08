export const isValidLuhn = (creditCardNumber: string | number) => {
  const cleanedString = `${creditCardNumber}`.replace(/\D/g, "");

  if (!cleanedString.length) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false; // start with the rightmost digit and double every second digit

  // Loop over the number from right to left
  for (let i = cleanedString.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedString.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      // If the result of this doubling is greater than 9, then subtract 9 from it
      if (digit > 9) {
        digit -= 9;
      }
    }

    // Add this digit to the total sum
    sum += digit;

    // Flip the value of shouldDouble for next iteration
    shouldDouble = !shouldDouble;
  }

  // The number is valid if the sum modulo 10 equals 0
  return sum % 10 === 0;
};
