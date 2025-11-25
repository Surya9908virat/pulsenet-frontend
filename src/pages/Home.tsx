import React from "react";

const Home = () => {
  return (
    <div className="w-full h-screen bg-gray-300 flex">
      {/* Left panel */}
      <div className="w-1/5 bg-gray-100 border-2 p-4">
        <ul className="space-y-4 text-lg">
          <li className="mb-2 p-2 bg-white rounded shadow">Home 🛖</li>
          <li className="mb-2 p-2 bg-white rounded shadow">Profile 👤</li>
          <li className="mb-2 p-2 bg-white rounded shadow">Notification 🔔</li>
          <li className="mb-2 p-2 bg-white rounded shadow">Friends 👥</li>
          <li className="mb-2 p-2 bg-white rounded shadow">Setting ⚙</li>
        </ul>
      </div>
      {/* Middle panel */}

      <div className="w-3/5 p-6 bg-gray-200 overflow-y-auto">
        {/* create post box */}

        <div className="bg-white rounded-3xl p-4 shadow mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full" />
            <input
              type="text"
              placeholder="Start a post..."
              className="w-full border rounded-full px-4 py-2 text-gray-700"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
          
            <div className="flex items-center gap-2">
           <input type="file" accept="image/png, image/jpeg, .png, .jpg, .jpeg"/>

              <button className="text-gray-600 hover:text-gray-800">📷</button>
              <button className="text-gray-600 hover:text-gray-800">🎥</button>
              <button className="text-gray-600 hover:text-gray-800">😊</button>
            </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Post
            </button>

          </div>
        </div>

      </div>
      {/* Right panel */}
      <div className="w-1/5 bg-gray-100 border-2 p-4">
        <h2 className="text-xl font-bold mb-4">Friends</h2>
        <ul className="space-y-4">
          <li className="mb-2 p-2 bg-white rounded shadow">Alice</li>
          <li className="mb-2 p-2 bg-white rounded shadow">Bob</li>
          <li className="mb-2 p-2 bg-white rounded shadow">Charlie</li>
        </ul>
      </div>

    </div>
  );
};

export default Home;
