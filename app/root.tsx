import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// import "./tailwind.css";
import styles from "~/styles/main.css";
import MainNavigation from "./components/MainNavigation";

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
        <header>
          <MainNavigation />
        </header>
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

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function ErrorBoundary({ children, error }: { children: React.ReactNode, error: any }) {
  
  const errorMessage = error?.message || "An unexpected error occurred.";
  const errorStack = error?.stack || "No stack trace available.";
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <main className="error">
          <h1>An error occurred!</h1>
          <p>{errorMessage}</p>
          <pre>{errorStack}</pre>
          <p>
            Back to <Link to="/">Safety!</Link>
          </p>
        </main>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
