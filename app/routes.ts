import {
  type RouteConfig,
  index,
  layout,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("components/layout/index.tsx", [
    index("routes/home.tsx"),
    ...prefix("posts", [
      index("routes/posts.tsx"),
      route(":id", "routes/post.tsx"),
    ]),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
