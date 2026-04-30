import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { Error } from "./components/error";
import { RootLayout } from "./components/layout";

//TODO add favicons
export const links: Route.LinksFunction = () => [];

export function meta() {
  return [{ title: "Dev's Conspectus" }];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <RootLayout>
        <Error is404={error.status === 404} />
      </RootLayout>
    );
  } else {
    return (
      <RootLayout>
        <Error />
      </RootLayout>
    );
  }
}
