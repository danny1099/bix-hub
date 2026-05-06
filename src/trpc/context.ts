export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    ...opts,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
