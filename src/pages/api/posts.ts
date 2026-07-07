import type { NextApiRequest, NextApiResponse } from "next";
import { getPosts } from "../../blogs";

/**
 * API endpoint returning all posts metadata (title, slug, excerpt, image, etc.).
 * Used by the client‑side search bar to filter results.
 */
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Failed to fetch posts", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
