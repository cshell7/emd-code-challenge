import { createTRPCRouter } from "~/server/api/trpc";
import { creditCardRouter } from "~/server/api/routers/credit-card";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  creditCard: creditCardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
