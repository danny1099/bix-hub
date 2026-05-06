export const tryCatch = async <T>(promise: Promise<T>): Promise<Partial<APIResult<T>>> => {
  try {
    const data = await promise;
    return { data, status: "success", error: null };
  } catch (error) {
    return { data: null, status: "error", error: error as Error };
  }
};
