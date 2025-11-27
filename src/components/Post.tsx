import React from "react";

interface PostCardProps {
  profilePhoto: string;
  userName: string;
  caption: string;
  likes: number;
  comments: number;
  postImage: string;
}

const PostCard: React.FC<PostCardProps> = ({
  profilePhoto,
  userName,
  caption,
  likes,
  comments,
  postImage,
}) => {
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
        <button className="text-xl hover:scale-110 transition">👍</button>
        <button className="text-xl hover:scale-110 transition">💬</button>
        <button className="text-xl hover:scale-110 transition">↗️</button>
      </div>
    </div>
  );
};

export default PostCard;
