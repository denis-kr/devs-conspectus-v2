import { readFile } from "node:fs/promises";
import type { Route } from "./+types/post";
import Markdown from "react-markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const id = params.id;
  if (!id) throw new Response("Post not found", { status: 404 });

  let markdown: string;

  try {
    markdown = await readFile(
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

  return markdown;
}

export default function Post({ loaderData }: Route.ComponentProps) {
  return (
    <article className="prose dark:prose-invert">
      <Markdown>{loaderData}</Markdown>
    </article>
  );
}
