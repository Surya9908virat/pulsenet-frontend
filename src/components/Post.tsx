import axios from "axios";
import React from "react";
import { deletePost } from "../api/postApi";

interface PostCardProps {
  profilePhoto: string;
  userName: string;
  caption: string;
  likes: number;
  comments: number;
  postImage: string;
  id?: string;
  showDeleteButton?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  profilePhoto,
  userName,
  caption,
  likes,
  comments,
  postImage,
  id,
  showDeleteButton = false,
}) => {
  const handleLikedPosts = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You are not logged in');
      return;
    }

    const res = await axios.post(
      `http://localhost:5000/api/post/like/${id}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert('Post liked successfully!');
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await deletePost(id!);
      alert('Post deleted successfully!');
      window.location.reload(); // Refresh to update the posts list
    } catch (error: any) {
      alert(error.message || 'Failed to delete post');
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={profilePhoto}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-semibold text-lg">{userName}</span>
        </div>

        {/* menu icon */}
        <div className="flex flex-col gap-1">
          <span className="w-5 h-[3px] bg-gray-700 rounded"></span>
          <span className="w-5 h-[3px] bg-gray-700 rounded"></span>
          <span className="w-5 h-[3px] bg-gray-700 rounded"></span>
        </div>
      </div>

      {/* Caption */}
      <p className="mt-3 text-gray-700">{caption}</p>

      {/* Post Image */}
      <div className="mt-3">
        <img
          src={postImage}
          alt="post"
          className="w-full h-72 object-cover rounded-lg"
        />
      </div>

      {/* Like + Comment Count */}
      <div className="flex justify-between mt-3 text-gray-600 text-sm">
        <span>{likes} Likes</span>
        <span>{comments} Comments</span>
      </div>

      {/* Buttons */}
      <div className="flex justify-around mt-4">
        <button
          className="text-xl hover:scale-110 transition"
          onClick={handleLikedPosts}
        >
          👍
        </button>
        <button className="text-xl hover:scale-110 transition">💬</button>
        <button className="text-xl hover:scale-110 transition">↗️</button>
        {showDeleteButton && (
          <button
            className="text-xl hover:scale-110 transition text-red-500"
            onClick={handleDeletePost}
            title="Delete Post"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
