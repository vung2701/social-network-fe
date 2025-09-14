import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { authSlice } from '../../../../store/slices/authSlice';
import { postSlice } from '../../../../store/slices/postSlice';
import { themeSlice } from '../../../../store/slices/themeSlice';
import PostCard from '../PostCard';

// Mock date-fns
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn(() => '2 giờ trước')
}));

// Mock các component con
jest.mock('../PostHeader', () => {
  return function MockPostHeader({ author, timeAgo }: any) {
    return (
      <div data-testid="post-header">
        <span data-testid="author-name">{author.name}</span>
        <span data-testid="time-ago">{timeAgo}</span>
      </div>
    );
  };
});

jest.mock('../PostContent', () => {
  return function MockPostContent({ content }: any) {
    return (
      <div data-testid="post-content">
        <p>{content}</p>
      </div>
    );
  };
});

jest.mock('../PostActions', () => {
  return function MockPostActions({ isLiked, onLike, onComment, onShare, onToggleComments }: any) {
    return (
      <div data-testid="post-actions">
        <button data-testid="like-button" onClick={onLike} aria-pressed={isLiked}>
          {isLiked ? 'Unlike' : 'Like'}
        </button>
        <button data-testid="comment-button" onClick={onComment}>
          Comment
        </button>
        <button data-testid="share-button" onClick={onShare}>
          Share
        </button>
        <button data-testid="toggle-comments-button" onClick={onToggleComments}>
          Toggle Comments
        </button>
      </div>
    );
  };
});

jest.mock('../CommentList', () => {
  return function MockCommentList({ comments }: any) {
    return (
      <div data-testid="comment-list">
        {comments.map((comment: any) => (
          <div key={comment.id} data-testid={`comment-${comment.id}`}>
            {comment.content}
          </div>
        ))}
      </div>
    );
  };
});

// Tạo test store
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      posts: postSlice.reducer,
      theme: themeSlice.reducer
    },
    preloadedState
  });
};

// Wrapper component
const TestWrapper = ({ children, store }: any) => (
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider>{children}</ConfigProvider>
    </BrowserRouter>
  </Provider>
);

describe('PostCard Component - Basic Tests', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    avatar: null
  };

  const mockPost = {
    id: '1',
    content: 'This is a test post',
    author: mockUser,
    createdAt: new Date().toISOString(),
    likes: 5,
    comments: [],
    isLiked: false
  };

  const mockOnLike = jest.fn();
  const mockOnComment = jest.fn();
  const mockOnShare = jest.fn();

  const defaultProps = {
    post: mockPost,
    onLike: mockOnLike,
    onComment: mockOnComment,
    onShare: mockOnShare
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render post card with all elements', () => {
    const store = createTestStore();

    render(
      <TestWrapper store={store}>
        <PostCard {...defaultProps} />
      </TestWrapper>
    );

    // Kiểm tra các element chính
    expect(screen.getByTestId('post-header')).toBeInTheDocument();
    expect(screen.getByTestId('post-content')).toBeInTheDocument();
    expect(screen.getByTestId('post-actions')).toBeInTheDocument();

    // Kiểm tra nội dung post
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText('2 giờ trước')).toBeInTheDocument();
  });

  it('should call onLike when like button is clicked', () => {
    const store = createTestStore();

    render(
      <TestWrapper store={store}>
        <PostCard {...defaultProps} />
      </TestWrapper>
    );

    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);

    expect(mockOnLike).toHaveBeenCalledTimes(1);
    expect(mockOnLike).toHaveBeenCalledWith(mockPost.id);
  });

  it('should call onComment when comment button is clicked', () => {
    const store = createTestStore();

    render(
      <TestWrapper store={store}>
        <PostCard {...defaultProps} />
      </TestWrapper>
    );

    const commentButton = screen.getByTestId('comment-button');
    fireEvent.click(commentButton);

    expect(mockOnComment).toHaveBeenCalledTimes(1);
    expect(mockOnComment).toHaveBeenCalledWith(mockPost.id);
  });

  it('should call onShare when share button is clicked', () => {
    const store = createTestStore();

    render(
      <TestWrapper store={store}>
        <PostCard {...defaultProps} />
      </TestWrapper>
    );

    const shareButton = screen.getByTestId('share-button');
    fireEvent.click(shareButton);

    expect(mockOnShare).toHaveBeenCalledTimes(1);
    expect(mockOnShare).toHaveBeenCalledWith(mockPost.id);
  });

  it('should show correct like button state when post is liked', () => {
    const store = createTestStore();
    const likedPost = {
      ...mockPost,
      isLiked: true
    };

    render(
      <TestWrapper store={store}>
        <PostCard {...defaultProps} post={likedPost} />
      </TestWrapper>
    );

    const likeButton = screen.getByTestId('like-button');
    expect(likeButton).toHaveAttribute('aria-pressed', 'true');
    expect(likeButton).toHaveTextContent('Unlike');
  });

  it('should show correct like button state when post is not liked', () => {
    const store = createTestStore();
    const notLikedPost = {
      ...mockPost,
      isLiked: false
    };

    render(
      <TestWrapper store={store}>
        <PostCard {...defaultProps} post={notLikedPost} />
      </TestWrapper>
    );

    const likeButton = screen.getByTestId('like-button');
    expect(likeButton).toHaveAttribute('aria-pressed', 'false');
    expect(likeButton).toHaveTextContent('Like');
  });
});
