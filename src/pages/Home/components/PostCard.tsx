import React, { useState, useCallback, useMemo } from 'react';
import { Card, Space, Typography, Divider } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import CommentList from './CommentList';
import type { PostCardProps } from '../../../types';

const { Text } = Typography;


const PostCard: React.FC<PostCardProps> = React.memo(({ 
  post, 
  onLike, 
  onComment, 
  onShare 
}) => {
  const [showComments, setShowComments] = useState(false);

  const timeAgo = useMemo(() => {
    try {
      return formatDistanceToNow(new Date(post.createdAt), { 
        addSuffix: true, 
        locale: vi 
      });
    } catch {
      return 'Vừa xong';
    }
  }, [post.createdAt]);

  const handleToggleComments = useCallback(() => {
    setShowComments(prev => !prev);
  }, []);

  const handleLike = useCallback(() => {
    onLike?.(post.id);
  }, [post.id, onLike]);

  const handleComment = useCallback(() => {
    onComment?.(post.id);
  }, [post.id, onComment]);

  const handleShare = useCallback(() => {
    onShare?.(post.id);
  }, [post.id, onShare]);

  return (
    <Card 
      style={{ 
        marginBottom: '16px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {/* Post Header */}
        <PostHeader 
          author={post.author}
          timeAgo={timeAgo}
        />

        {/* Post Content */}
        <PostContent 
          content={post.content}
          image={post.image}
        />

        {/* Post Stats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            {post.likes > 0 && `${post.likes} lượt thích`}
            {post.comments.length > 0 && post.likes > 0 && ' • '}
            {post.comments.length > 0 && `${post.comments.length} bình luận`}
          </Text>
        </div>

        <Divider style={{ margin: '8px 0' }} />

        {/* Post Actions */}
        <PostActions
          postId={post.id}
          isLiked={post.isLiked}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onToggleComments={handleToggleComments}
        />

        {/* Comments Section */}
        {showComments && (
          <CommentList 
            comments={post.comments}
            postId={post.id}
          />
        )}
      </Space>
    </Card>
  );
});

export default PostCard;
