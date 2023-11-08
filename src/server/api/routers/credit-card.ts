import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const isValidLuhn = (creditCardNumber: string) => {
  let sum = 0;
  let shouldDouble = false; // start with the rightmost digit and double every second digit

  // Loop over the number from right to left
  for (let i = creditCardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(creditCardNumber.charAt(i), 10);

    if (shouldDouble) {
      // If shouldDouble is true, then double the digit
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

export const creditCardRouter = createTRPCRouter({
  checkCreditCardNumber: publicProcedure
    .input(z.object({ ccNumber: z.string() }))
    .mutation(({ input }) => {
      const isValid = isValidLuhn(input.ccNumber);
      return {
        isValid,
      };
    }),
  checkManyCreditCardNumbers: publicProcedure
    .input(z.object({ ccNumbers: z.string().array() }))
    .mutation(({ input }) => {
      const results = input.ccNumbers.map((ccNumber) => {
        const isValid = isValidLuhn(ccNumber);
        return {
          lastFour: ccNumber.slice(-4),
          isValid,
        };
      });
      return {
        results,
      };
    }),
});
