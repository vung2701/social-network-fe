import React, { useState, useCallback } from 'react';
import { Card, Input, Button, Avatar, Space } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks';

const { TextArea } = Input;

interface CreatePostProps {
  onPostCreated?: (post: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = React.memo(({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useAuth();

  const handleSubmit = useCallback(async () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPost = {
        id: Date.now().toString(),
        content: content.trim(),
        author: {
          id: state.user?.id || '1',
          name: state.user?.name || 'User',
          avatar: state.user?.avatar || null,
        },
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        isLiked: false,
      };
      
      onPostCreated?.(newPost);
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [content, state.user, onPostCreated]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <Card 
      style={{ 
        marginBottom: '16px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Avatar 
            size={40} 
            icon={<UserOutlined />} 
            src={state.user?.avatar}
            style={{ backgroundColor: '#87d068' }}
          />
          <div style={{ flex: 1 }}>
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Bạn đang nghĩ gì?"
              autoSize={{ minRows: 2, maxRows: 4 }}
              style={{ 
                border: 'none',
                resize: 'none',
                fontSize: '16px'
              }}
            />
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!content.trim()}
            style={{ borderRadius: '20px' }}
          >
            Đăng bài
          </Button>
        </div>
      </Space>
    </Card>
  );
});

CreatePost.displayName = 'CreatePost';

export default CreatePost;
