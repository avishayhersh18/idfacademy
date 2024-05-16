import { createTRPCRouter } from "./trpc";

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
export const appRouter = createTRPCRouter({});

export type AppRouter = typeof appRouter;
