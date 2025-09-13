import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Post, Comment } from '../../types/post.types';

// ===== 1. ĐỊNH NGHĨA TYPES =====
export interface PostState {
  posts: Post[];           // Danh sách posts
  isLoading: boolean;      // Trạng thái loading
  error: string | null;    // Lỗi nếu có
}

// Types cho async thunks
interface CreatePostData {
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string | null;
  };
}

interface AddCommentData {
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string | null;
  };
}

// ===== 2. INITIAL STATE VỚI MOCK DATA =====
const initialState: PostState = {
  posts: [
    {
      id: '1',
      content: 'Chào mừng đến với mạng xã hội! Đây là bài viết đầu tiên.',
      author: {
        id: '1',
        name: 'Admin',
        avatar: null,
      },
      createdAt: new Date().toISOString(),
      likes: 5,
      comments: [
        {
          id: '1',
          content: 'Chào mừng bạn!',
          author: {
            id: '2',
            name: 'User1',
            avatar: null,
          },
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ],
      isLiked: false,
    },
    {
      id: '2',
      content: 'Hôm nay thời tiết thật đẹp! 🌞',
      author: {
        id: '2',
        name: 'User1',
        avatar: null,
      },
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      likes: 12,
      comments: [],
      isLiked: true,
    },
  ],
  isLoading: false,
  error: null,
};

// ===== 3. ASYNC THUNKS =====
// Tạo post mới
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: CreatePostData, { rejectWithValue }) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPost: Post = {
        id: Date.now().toString(),
        content: postData.content,
        author: postData.author,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        isLiked: false,
      };
      
      return newPost;
    } catch (error) {
      return rejectWithValue('Tạo bài viết thất bại');
    }
  }
);

// Like/Unlike post
export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId: string, { rejectWithValue, getState }) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const state = getState() as { posts: PostState };
      const post = state.posts.posts.find(p => p.id === postId);
      
      if (!post) {
        throw new Error('Không tìm thấy bài viết');
      }
      
      return {
        postId,
        isLiked: !post.isLiked,
        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
      };
    } catch (error) {
      return rejectWithValue('Thích bài viết thất bại');
    }
  }
);

// Thêm comment
export const addComment = createAsyncThunk(
  'posts/addComment',
  async (commentData: AddCommentData, { rejectWithValue }) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newComment: Comment = {
        id: Date.now().toString(),
        content: commentData.content,
        author: commentData.author,
        createdAt: new Date().toISOString(),
      };
      
      return {
        postId: commentData.postId,
        comment: newComment,
      };
    } catch (error) {
      return rejectWithValue('Thêm bình luận thất bại');
    }
  }
);

// ===== 4. SLICE CREATION =====
export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // ===== SYNCHRONOUS ACTIONS =====
    clearError: (state) => {
      state.error = null;
    },
    // Toggle like ngay lập tức (optimistic update)
    toggleLike: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
      }
    },
  },
  extraReducers: (builder) => {
    // ===== ASYNC ACTIONS HANDLERS =====
    // Create post cases
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.unshift(action.payload); // Thêm vào đầu danh sách
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Like post cases
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          post.isLiked = action.payload.isLiked;
          post.likes = action.payload.likes;
        }
        state.error = null;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add comment cases
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        const post = state.posts.find(p => p.id === action.payload.postId);
        if (post) {
          post.comments.push(action.payload.comment);
        }
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// ===== 5. EXPORT ACTIONS =====
export const { clearError, toggleLike } = postSlice.actions;

// ===== 6. SELECTORS =====
export const selectPosts = (state: { posts: PostState }) => state.posts;
export const selectAllPosts = (state: { posts: PostState }) => state.posts.posts;
export const selectPostById = (postId: string) => (state: { posts: PostState }) => 
  state.posts.posts.find(post => post.id === postId);
export const selectPostsLoading = (state: { posts: PostState }) => state.posts.isLoading;
export const selectPostsError = (state: { posts: PostState }) => state.posts.error;