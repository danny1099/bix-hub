"use client";
import SuperJSON from "superjson";
import { useState } from "react";
import { httpBatchStreamLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { trpc, createQueryClient } from "@/trpc/client";
import { type AppRouter } from "@/trpc/router";
import { absoluteUrl } from "@/shared/utils";

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return createQueryClient();
  }
  return (clientQueryClientSingleton ??= createQueryClient());
};

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const TrpcProvider = ({ children }: Children) => {
  const queryClient = getQueryClient();
  const baseUrl = absoluteUrl("/api/trpc");

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: baseUrl as string,
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  );
};
