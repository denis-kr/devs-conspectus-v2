import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Route } from "./+types/posts";

type PostFrontmatter = {
  title?: string;
  date?: string;
  tags?: string[];
};

export async function loader() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = await readdir(postsDir, { withFileTypes: true });

  const postFiles = files
    .filter((file) => file.isFile() && file.name.endsWith(".md"))
    .map((file) => file.name);

  const posts = await Promise.all(
    postFiles.map(async (filename) => {
      const content = await readFile(path.join(postsDir, filename), "utf8");
      const { data } = matter(content);
      const frontmatter = data as PostFrontmatter;

      return {
        filename,
        slug: filename.replace(/\.md$/, ""),
        title: frontmatter.title ?? filename,
        date: frontmatter.date ?? null,
        tags: frontmatter.tags ?? [],
      };
    }),
  );

  return posts;
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      {loaderData.map((post) => (
        <article key={post.filename}>
          <h2>{post.title}</h2>
          <p>{post.slug}</p>
          {post.date ? <p>{post.date}</p> : null}
        </article>
      ))}
    </div>
  );
}
