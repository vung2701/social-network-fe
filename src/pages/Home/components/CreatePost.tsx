import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, Space, message } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createPost } from '../../../store/slices/postSlice';
import { selectUser } from '../../../store/slices/authSlice';
import type { CreatePostProps } from '../../../types';
import AppTextArea from '../../../components/TextArea/AppTextArea';
import AppButton from '../../../components/Button/AppButton';


const CreatePost: React.FC<CreatePostProps> = React.memo(({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(state => state.posts.isLoading);

  const handleSubmit = useCallback(async () => {
    if (!content.trim()) return;
    
    if (!user) {
      message.warning('Vui lòng đăng nhập để tạo bài viết!');
      return;
    }
    
    try {
      await dispatch(createPost({
        content: content.trim(),
        author: {
          id: user.id,
          name: user.name || 'User',
          avatar: user.avatar,
        },
      })).unwrap();
      
      setContent('');
      message.success('Đăng bài thành công!');
      onPostCreated?.({});
    } catch (error) {
      message.error('Đăng bài thất bại!');
      console.error('Error creating post:', error);
    }
  }, [content, user, dispatch, onPostCreated]);

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
          <Avatar size={40} icon={<UserOutlined />} src={user?.avatar} style={{ backgroundColor: '#87d068' }} />
          <div style={{ flex: 1 }}>
            <AppTextArea
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
          <AppButton
            type="primary"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!content.trim()}
            style={{
              borderRadius: '20px',
              width: '120px'
            }}
          >
            Đăng bài <SendOutlined />
          </AppButton>
        </div>
      </Space>
    </Card>
  );
});

CreatePost.displayName = 'CreatePost';

export default CreatePost;
