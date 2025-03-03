import { NextApiRequest, NextApiResponse } from "next";

// Define TypeScript type for posts
type Post = {
  id: number;
  title: string;
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    
    const { limit } = req.query;
    const postLimit = typeof limit === "string" ? parseInt(limit, 10) || 5 : 5;

    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${postLimit}`);
    const posts: Post[] = await response.json();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: `Error fetching data - ${error} `});
  }
}
