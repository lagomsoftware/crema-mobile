import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import { getToken } from "./auth";
import type { AppRouter } from "../../crema-api";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      // url: "https://crema-api.onrender.com",
      url: "http://192.168.0.105:1337",
      async headers() {
        const token = await getToken();

        return token
          ? {
              authorization: `Bearer ${token}`,
            }
          : {};
      },
    }),
  ],
});
