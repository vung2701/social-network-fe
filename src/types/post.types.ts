import type { User } from "./auth.types";

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
  image?: string;
}

export interface CreatePostProps {
  onPostCreated?: (post: any) => void;
}

export interface PostListProps {
  posts: Post[];
  loading?: boolean;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export interface PostActionsProps {
  postId: string;
  isLiked?: boolean;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onToggleComments: () => void;
}