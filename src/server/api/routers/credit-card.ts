import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { isValidLuhn } from "~/utils/is-valid-luhn";

export const creditCardRouter = createTRPCRouter({
  checkCreditCardNumber: publicProcedure
    .input(z.object({ creditCardNumber: z.string() }))
    .mutation(({ input }) => {
      const isValid = isValidLuhn(input.creditCardNumber);
      return {
        isValid,
      };
    }),
  checkManyCreditCardNumbers: publicProcedure
    .input(z.object({ creditCardNumbers: z.string().array() }))
    .mutation(({ input }) => {
      const results = input.creditCardNumbers.map((creditCardNumber) => {
        const isValid = isValidLuhn(creditCardNumber);
        return {
          lastFour: creditCardNumber.slice(-4),
          isValid,
        };
      });
      return {
        results,
      };
    }),
});
