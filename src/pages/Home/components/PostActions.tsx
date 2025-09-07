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
    <Space style={{ width: '100%', justifyContent: 'space-around' }}>
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
      >
        Chia sẻ
      </Button>
    </Space>
  );
});

PostActions.displayName = 'PostActions';

export default PostActions;
