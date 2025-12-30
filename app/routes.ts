import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
  // Redirect root to default locale
  index("routes/redirect.tsx"),
  
  // Language routes
  route(":lang", "routes/$lang/layout.tsx", [
    index("routes/$lang/home.tsx"),
  ]),
  
  // API routes
  ...prefix("api", [
    route("ping", "routes/api/ping.ts"),
    route("download", "routes/api/download.ts"),
    route("upload", "routes/api/upload.ts"),
    route("location", "routes/api/location.ts"),
    route("server-info", "routes/api/server-info.ts"),
  ]),
] satisfies RouteConfig;

