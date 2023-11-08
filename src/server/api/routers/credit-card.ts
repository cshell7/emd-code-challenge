import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { isValidLuhn } from "~/utils/is-valid-luhn";

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
