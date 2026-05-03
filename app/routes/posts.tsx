import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Route } from "./+types/posts";
import { Search } from "../components/search";
import { Card } from "~/components/post-card";

type PostFrontmatter = {
  title?: string;
  date?: string;
  tags?: string[];
  id?: string;
  description?: string;
  author?: string;
  authorRole?: string;
  authorImg?: string;
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  //TODO maybe use util functions here
  const query = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  const keywords = query.split(/\s+/).filter(Boolean);

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
        date: frontmatter.date ?? "",
        tags: frontmatter.tags ?? [],
        id: frontmatter.id ?? crypto.randomUUID(),
        description: frontmatter.description ?? "",
        author: {
          name: frontmatter.author ?? "",
          role: frontmatter.authorRole ?? "",
          imageUrl: frontmatter.authorImg ?? null,
        },
      };
    }),
  );

  const filteredPosts =
    keywords.length === 0
      ? posts
      : posts.filter((post) => {
          const haystack = `${post.title} ${post.description}`.toLowerCase();
          return keywords.some((keyword) => haystack.includes(keyword));
        });

  return { posts: filteredPosts };
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
            Dev&apos;s Conspectus
          </h2>
          <p className="mt-2 text-lg/8 text-gray-300">
            Refresh your knowledge. Stay on top of it.
          </p>
          <Search formClasses="mt-6" />
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {loaderData?.posts?.map((post) => (
            <Card key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
