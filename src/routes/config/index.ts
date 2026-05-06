export const routes = {
  public: {
    prefix: "/",
    routes: {
      home: "",
      auth: {
        prefix: "auth",
        routes: {
          sign_in: "/sign-in",
          get_started: "/get-started",
          forgot_password: "/forgot-password",
        },
      },
    },
  },

  private: {
    prefix: "/",
    routes: {
      tenant: {
        prefix: "[organization]",
        routes: {
          main: {
            prefix: "/m",
            routes: {
              overview: "/overview",
            },
          },
        },
      },
    },
  },
} as const;
