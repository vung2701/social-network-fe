import React, { useCallback } from 'react';
import { Row, Col } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectAllPosts, likePost, addComment } from '../../../store/slices/postSlice';
import { selectUser } from '../../../store/slices/authSlice';
import CreatePost from './CreatePost';
import PostList from './PostList';

const Feed: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const user = useAppSelector(selectUser);

  const handlePostCreated = useCallback((newPost: any) => {
    // Post sẽ được tạo thông qua Redux action trong CreatePost component
    console.log('Post created:', newPost);
  }, []);

  const handleLike = useCallback((postId: string) => {
    dispatch(likePost(postId));
  }, [dispatch]);

  const handleComment = useCallback((postId: string) => {
    if (user) {
      dispatch(addComment({
        postId,
        content: 'Bình luận mới từ Redux!',
        author: {
          id: user.id,
          name: user.name || 'User',
          avatar: user.avatar,
        },
      }));
    }
  }, [dispatch, user]);

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
