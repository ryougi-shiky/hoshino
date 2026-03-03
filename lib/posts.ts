import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  author?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), "content", "posts");

export function getAllPostSlugs(): string[] {
  // Returns empty array on initial setup before any posts are created.
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getSortedPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      ...(data as PostFrontmatter),
    };
  });
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    ...(data as PostFrontmatter),
    contentHtml,
  };
}
