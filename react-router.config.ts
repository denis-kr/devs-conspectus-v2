import type { Config } from "@react-router/dev/config";

export default {
  //TODo maybe actually mix pre-render and server-side rendering?
  async prerender() {
    return ["/", "/posts", "/posts/react", "/posts/tailwindcss"];
  },
} satisfies Config;
