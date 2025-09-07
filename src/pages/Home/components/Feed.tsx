import React, { useState, useCallback, useMemo } from 'react';
import { Row, Col } from 'antd';
import CreatePost from './CreatePost';
import PostList from './PostList';
import type { Post } from '../../../types';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: 'Chào mừng bạn đến với Social App! 🎉 Đây là bài viết đầu tiên để test giao diện.',
      author: {
        id: '1',
        name: 'Admin',
        email: 'admin@gmail.com',
        avatar: null,
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 phút trước
      likes: 5,
      comments: [
        {
          id: 'c1',
          content: 'Chào mừng! 👋',
          author: { id: '2', name: 'User 1', avatar: null },
          createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        },
        {
          id: 'c2',
          content: 'App trông rất đẹp! 😍',
          author: { id: '3', name: 'User 2', avatar: null },
          createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        }
      ],
      isLiked: false,
    },
    {
      id: '2',
      content: 'Hôm nay là một ngày tuyệt vời để code! 💻 React + TypeScript + Ant Design = Perfect combination!',
      author: {
        id: '2',
        name: 'Developer',
        email: 'developer@gmail.com',
        avatar: null,
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 giờ trước
      likes: 12,
      comments: [
        {
          id: 'c3',
          content: 'Tôi cũng thích stack này! 🚀',
          author: { id: '1', name: 'Admin', avatar: null },
          createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        }
      ],
      isLiked: true,
    },
    {
      id: '3',
      content: 'Just finished building this amazing social media app! The UI is so clean and modern. What do you think? 🤔',
      author: {
        id: '3',
        name: 'Designer',
        email: 'designer@gmail.com',
        avatar: null,
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 giờ trước
      likes: 8,
      comments: [],
      isLiked: false,
    }
  ]);

  const handlePostCreated = useCallback((newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);

  const handleLike = useCallback((postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  }, []);

  const handleComment = useCallback((postId: string) => {
    // Logic xử lý comment sẽ được implement sau
    console.log('Comment on post:', postId);
  }, []);

  const handleShare = useCallback((postId: string) => {
    // Logic xử lý share sẽ được implement sau
    console.log('Share post:', postId);
  }, []);

  return (
    <Row justify="center">
      <Col xs={24} sm={22} md={20} lg={18} xl={16}>
        <div style={{ padding: '20px 0' }}>
          {/* Create Post */}
          <CreatePost onPostCreated={handlePostCreated} />
          
          {/* Posts List */}
          <PostList
            posts={posts}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Feed;
