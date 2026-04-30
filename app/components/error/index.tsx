import { Link } from "react-router";

/**
 *
 * @param props.is404 - When true, shows 404-specific title, description, and code. Otherwise shows generic error content.
 * @returns A styled error page component.
 */
export function Error({ is404 = false }: { is404?: boolean }) {
  const title = is404 ? "Page not found" : "Something went wrong";
  const description = is404
    ? "Sorry, we couldn’t find the page you’re looking for."
    : "Sorry about that, maybe try another page)";
  return (
    <div className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {is404 ? (
          <p className="text-base font-semibold text-indigo-400">404</p>
        ) : null}
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
          {description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
