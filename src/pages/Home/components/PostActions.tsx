import React, { useCallback } from 'react';
import { Button, Space } from 'antd';
import { 
  HeartOutlined, 
  HeartFilled, 
  MessageOutlined, 
  ShareAltOutlined 
} from '@ant-design/icons';
import type { PostActionsProps } from '../../../types';

const PostActions: React.FC<PostActionsProps> = React.memo(({
  postId,
  isLiked,
  onLike,
  onComment,
  onShare,
  onToggleComments
}) => {
  const handleLike = useCallback(() => {
    onLike(postId);
  }, [postId, onLike]);

  const handleComment = useCallback(() => {
    onComment(postId);
    onToggleComments();
  }, [postId, onComment, onToggleComments]);

  const handleShare = useCallback(() => {
    onShare(postId);
  }, [postId, onShare]);

  return (
    <Space 
      style={{ width: '100%', justifyContent: 'space-around' }}
      role="toolbar"
      aria-label="Bài viết actions"
    >
      <Button
        type="text"
        icon={isLiked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
        onClick={handleLike}
        style={{
          height: '40px',
          borderRadius: '20px',
          color: isLiked ? '#ff4d4f' : '#8c8c8c',
          fontWeight: isLiked ? '600' : '400'
        }}
        aria-label={isLiked ? 'Bỏ thích bài viết này' : 'Thích bài viết này'}
        aria-pressed={isLiked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleLike();
          }
        }}
      >
        {isLiked ? 'Đã thích' : 'Thích'}
      </Button>

      <Button
        type="text"
        icon={<MessageOutlined />}
        onClick={handleComment}
        style={{
          height: '40px',
          borderRadius: '20px',
          color: '#8c8c8c'
        }}
        aria-label="Bình luận bài viết này"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleComment();
          }
        }}
      >
        Bình luận
      </Button>

      <Button
        type="text"
        icon={<ShareAltOutlined />}
        onClick={handleShare}
        style={{
          height: '40px',
          borderRadius: '20px',
          color: '#8c8c8c'
        }}
        aria-label="Chia sẻ bài viết này"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleShare();
          }
        }}
      >
        Chia sẻ
      </Button>
    </Space>
  );
});

// Thêm displayName để dễ debug trong React DevTools
PostActions.displayName = 'PostActions';

export default PostActions;
