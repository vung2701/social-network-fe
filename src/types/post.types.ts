import type { User } from "./auth.types";

export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  comments: any[];
  isLiked?: boolean;
  image?: string;
}