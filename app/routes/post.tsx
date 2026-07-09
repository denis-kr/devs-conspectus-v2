import { readFile } from "node:fs/promises";
import type { Route } from "./+types/post";
import Markdown from "react-markdown";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  if (!id) throw new Response("Post not found", { status: 404 });

  let markdown: string;

  try {
    markdown = await readFile(
      //TODO prob change it, might be operating system issues
      new URL(`../../posts/${id}.md`, import.meta.url),
      "utf8",
    );
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      throw new Response("Post not found", { status: 404 });
    }

    throw new Response("Something went wrong", { status: 500 });
  }

  const { content } = matter(markdown);

  return {
    content,
  };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  return (
    <div className="sm:p-20 p-5">
      <article className="prose dark:prose-invert max-w-full">
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {loaderData?.content}
        </Markdown>
      </article>
    </div>
  );
}
