import { z } from "zod";
import { createContext } from "../context";
import { publicProcedure } from "../procedures/public";
import { createCallerFactory, mergeRouters, router } from "../trpc";

const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello, ${input.name}!`;
    }),
});

export const appRouter = mergeRouters(exampleRouter);

export const createCaller = createCallerFactory(appRouter);
export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
