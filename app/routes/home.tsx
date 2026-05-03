import { Link } from "react-router";
import { Search } from "../components/search";

export default function Home() {
  return (
    <div className="sm:p-20 p-5">
      <div className="text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          Dev&apos;s Conspectus
        </h1>
        <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
          Dev’s Conspectus is a personal knowledge base of software engineering
          topics—concise, well‑structured summaries of key ideas from books,
          tutorials, articles, and hands‑on experience. It’s built as a
          practical reference for engineers who value clarity, fundamentals, and
          reusable understanding over noise.
        </p>
        <div className="flex justify-center">
          <Search action="/posts" formClasses="mt-10" />
        </div>
        <div className="mt-10 flex justify-center">
          <Link to="/posts" className="text-sm/6 font-semibold text-white">
            View all posts <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
