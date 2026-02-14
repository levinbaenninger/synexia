"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { useState } from "react";
import superjson from "superjson";
import { env } from "@/env";
import { makeQueryClient } from "@/lib/query-client";
import type { AppRouter } from "@/server/routers/_app";

const { TRPCProvider: BaseTRPCProvider, useTRPC } =
  createTRPCContext<AppRouter>();

export { useTRPC };

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};

let browserQueryClient: ReturnType<typeof makeQueryClient> | undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
};

export const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BaseTRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
        {children}
      </BaseTRPCProvider>
    </QueryClientProvider>
  );
};
