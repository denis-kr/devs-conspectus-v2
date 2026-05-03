import { Link } from "react-router";

type CardProps = {
  description: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
  author?: { name: string; role: string; imageUrl: string | null };
};

export function Card({
  date,
  description,
  title,
  slug,
  tags,
  author,
}: CardProps) {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={date} className="text-gray-400">
          {date}
        </time>

        {tags?.map((tag) => (
          <p
            key={tag}
            className="relative z-10 rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300 hover:bg-gray-800"
          >
            {tag}
          </p>
        ))}
      </div>
      <div className="group relative grow">
        <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300">
          <Link to={slug}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-400">
          {description}
        </p>
      </div>
      {author ? (
        <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
          {author?.imageUrl ? (
            <img
              alt="author pciture"
              src={author.imageUrl}
              className="size-10 rounded-full bg-gray-800"
            />
          ) : null}
          <div className="text-sm/6">
            <p className="font-semibold text-white">
              <span className="absolute inset-0" />
              {author?.name}
            </p>
            <p className="text-gray-400">{author?.role}</p>
          </div>
        </div>
      ) : null}
    </article>
  );
}
