import { z } from "zod";
import { publicProcedure } from "../procedures/public";
import { mergeRouters, router } from "../trpc";

const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello, ${input.name}!`;
    }),
});

export const appRouter = mergeRouters(exampleRouter);

export type AppRouter = typeof appRouter;
