import React, { useMemo, useState, useCallback } from 'react';
import { List, Avatar, Input, Button, Space, Typography } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks';

const { TextArea } = Input;
const { Text } = Typography;

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
  postId: string;
}

const CommentList: React.FC<CommentListProps> = React.memo(({ comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useAuth();

  // Sử dụng useMemo để sort comments theo thời gian
  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [comments]);

  const handleSubmitComment = useCallback(async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Adding comment:', { postId, content: newComment });
      
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [newComment, postId]);

  const renderComment = useCallback((comment: Comment) => (
    <List.Item style={{ padding: '8px 0' }}>
      <List.Item.Meta
        avatar={
          <Avatar 
            size={32} 
            icon={<UserOutlined />} 
            src={comment.author.avatar}
            style={{ backgroundColor: '#87d068' }}
          />
        }
        title={
          <Space>
            <Text strong style={{ fontSize: '14px' }}>
              {comment.author.name}
            </Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
            </Text>
          </Space>
        }
        description={
          <Text style={{ fontSize: '14px', lineHeight: '1.4' }}>
            {comment.content}
          </Text>
        }
      />
    </List.Item>
  ), []);

  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="small">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Avatar 
              size={32} 
              icon={<UserOutlined />} 
              src={state.user?.avatar}
              style={{ backgroundColor: '#87d068' }}
            />
            <div style={{ flex: 1 }}>
              <TextArea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Viết bình luận..."
                autoSize={{ minRows: 1, maxRows: 3 }}
                style={{ 
                  border: '1px solid #d9d9d9',
                  borderRadius: '20px',
                  resize: 'none'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSubmitComment}
              loading={isSubmitting}
              disabled={!newComment.trim()}
              size="small"
              style={{ borderRadius: '16px' }}
            >
              Bình luận
            </Button>
          </div>
        </Space>
      </div>

      {sortedComments.length > 0 && (
        <List
          dataSource={sortedComments}
          renderItem={renderComment}
          style={{ 
            backgroundColor: '#fafafa',
            borderRadius: '8px',
            padding: '8px'
          }}
        />
      )}
    </div>
  );
});


export default CommentList;
