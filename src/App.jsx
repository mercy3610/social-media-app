import React, { useState } from 'react';
import './App.css'; // Import your CSS file for styling

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Kirui JK',
      content: 'Guys look at my garden',
      image: null, // To store uploaded image (initially null)
      likes: 10,
      comments: [
        { id: 1, user: 'winnie', comment: 'Great post!' },
        { id: 2, user: 'Onyango', comment: 'Nice one!' },
      ],
      isLiked: false,
      newComment: '',
    },
    // Add more sample posts as needed
  ]);

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleImageUpload = (postId, file) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          image: file,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleImageDelete = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          image: null,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCommentChange = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          newComment: comment,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId && post.newComment.trim() !== '') {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              user: 'User', // Assuming the user is the commenter
              comment: post.newComment,
            },
          ],
          newComment: '',
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <span className="author">{post.author}</span>
          </div>
          <div className="post-content">{post.content}</div>
          <div className="post-image">
            {post.image && (
              <div className="image-container">
                <img src={URL.createObjectURL(post.image)} alt="Uploaded" />
                <button onClick={() => handleImageDelete(post.id)}>Delete</button>
              </div>
            )}
            {!post.image && (
              <div className="upload-container">
                <label htmlFor={`image-upload-${post.id}`} className="upload-button">
                  📷 Upload Image
                </label>
                <input
                  id={`image-upload-${post.id}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(post.id, e.target.files[0])}
                />
              </div>
            )}
          </div>
          <div className="post-interactions">
            <span
              className={post.isLiked ? 'liked' : ''}
              onClick={() => handleLike(post.id)}
            >
              ❤️ {post.likes}
            </span>
            <div className="comment-form">
              <input
                type="text"
                placeholder="Write a comment..."
                value={post.newComment}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
              />
              <button onClick={() => handleCommentSubmit(post.id)}>Post</button>
            </div>
          </div>
          <div className="post-comments">
            {post.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <span className="comment-user">{comment.user}: </span>
                <span className="comment-text">{comment.comment}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
