import type { Config } from "@react-router/dev/config";

export default {
  async prerender() {
    return ["/", "/posts", "/posts/react", "/posts/tailwindcss"];
  },
} satisfies Config;
