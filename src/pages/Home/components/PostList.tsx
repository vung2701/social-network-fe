import React, { useMemo, useCallback } from 'react';
import { Empty, Spin } from 'antd';
import PostCard from './PostCard';
import type { PostListProps } from '../../../types';

const PostList: React.FC<PostListProps> = React.memo(({ 
  posts, 
  loading = false,
  onLike,
  onComment,
  onShare
}) => {
  // Sử dụng useMemo để sort posts theo thời gian (mới nhất lên đầu)
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [posts]);

  // Sử dụng useCallback để tạo handlers
  const handleLike = useCallback((postId: string) => {
    onLike?.(postId);
  }, [onLike]);

  const handleComment = useCallback((postId: string) => {
    onComment?.(postId);
  }, [onComment]);

  const handleShare = useCallback((postId: string) => {
    onShare?.(postId);
  }, [onShare]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (sortedPosts.length === 0) {
    return (
      <Empty
        description="Chưa có bài viết nào"
        style={{ 
          margin: '40px 0',
          padding: '40px'
        }}
      />
    );
  }

  return (
    <div>
      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      ))}
    </div>
  );
});

// Thêm displayName để dễ debug trong React DevTools
PostList.displayName = 'PostList';

export default PostList;
