---
title: "React-router Data Loading"
id: "rr-data-loading"
description: "Client side rendering, server side rendering, static site generation, every single strategy has its own pros and cons."
date: "May-04-2026"
tags: ["react", "react-router"]
author: "Denis K"
authorRole: "Software Engineer"
authorImg: "https://dummyimage.com/400x400/000/fff"
---

# Data Loading

## Client-side rendering (CSR)

- Great for authenticated pages where SEO is less critical
- Good for highly interactive and dynamic experiences
- Can reduce server rendering workload
- Initial load and layout stability can be worse if JS/data arrives late

## Server-side rendering (SSR)

- Useful for public content pages (blogs, documentation, landing page, product pages)
- Usually better SEO
- Often improves first render UX(better CLS, LCP, etc)
- Higher server load

## Static-site generation (SSG)

- Very good for static or rarely-changing content (blogs, documentation, marketing pages)
- Excellent performance (pre-built HTML/CSS/JS served from CDN)
- Requires rebuild/revalidation strategy when content changes

## React Router v7 - hybrid approach

- Use SSR for public, SEO-sensitive entry pages.
- Use CSR for authenticated app surfaces and highly interactive flows.
- Use SSG for stable public content (docs/blog/marketing).

## Client Data Loading

`clientLoader` is used to fetch data on the client. This is useful for pages or full projects that you'd prefer to fetch data from the browser only.

```js
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.pid}`);
  const product = await res.json();
  return product;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Product({
  loaderData,
}: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

## Server Data Loading

When server rendering, loader is used for both initial page loads and client navigations. Client navigations call the loader through an automatic fetch by React Router from the browser to your server. Note that the loader function is removed from client bundles so you can use server only APIs without worrying about them being included in the browser.

```js
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";
import { fakeDb } from "../db";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fakeDb.getProduct(params.pid);
  return product;
}

export default function Product({
  loaderData,
}: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

## Static Site Generation

When pre-rendering, loaders are used to fetch data during the production build.
The URLs to pre-render are specified in `react-router.config.ts`. Note that when server rendering, any URLs that aren't pre-rendered will be server rendered as usual, allowing you to pre-render some data at a single route while still server rendering the rest.

```js
import type { Config } from "@react-router/dev/config";

export default {
  async prerender() {
    let products = await readProductsFromCSVFile();
    return products.map(
      (product) => `/products/${product.id}`,
    );
  },
} satisfies Config;
```

## Both Loaders

`loader` and `clientLoader` can be used together. The loader will be used on the server for initial SSR (or pre-rendering) and the clientLoader will be used on subsequent client-side navigations.
