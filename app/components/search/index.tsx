import { Form, useSearchParams } from "react-router";
import cx from "classnames";

type SearchProps = {
  action?: string;
  formClasses?: string;
};

export function Search({ action, formClasses }: SearchProps) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <Form
      method="get"
      action={action}
      className={cx("flex max-w-md gap-x-4 w-full", formClasses)}
    >
      <label htmlFor="post" className="sr-only">
        Post name
      </label>
      <input
        id="post"
        name="q"
        required
        defaultValue={query}
        className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <button
        type="submit"
        className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Search
      </button>
    </Form>
  );
}
