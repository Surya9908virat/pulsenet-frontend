import axios from "axios";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileView from "../components/ProfileView";
  const token = localStorage.getItem("token");
const Friends = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);

  // 1. Fetch Friend Requests
  const getFriendRequests = async () => {
    try {
      const api = "http://localhost:5000/api/friendrequest/getfriendrequests";
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const res = await axios.get(api, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriendRequests(res.data.friendRequests || []);
    } catch (error) {
      console.log("Error fetching friend requests:", error);
    }
  };

  // 2. Fetch All Friends
  const getAllFriends = async () => {
    try {
      const api = "http://localhost:5000/api/friendrequest/getAllFriends";
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(api, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(res.data.friends || []);
    } catch (error) {
      console.log("Error fetching friends:", error);
    }
  };

  // 3. Handle Accept/Reject Actions
const handleRequestAction = async (
    requestId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      if (!token) return;

      await axios.post(
        "http://localhost:5000/api/friendrequest/stauschange",
        { requestId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      getFriendRequests();

      if (status === "accepted") {
        getAllFriends();
      }
    } catch (error) {
      console.log("Error updating friend request", error);
    }
  };

  useEffect(() => {
    getFriendRequests();
    getAllFriends();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "friends":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">My Friends</h2>
            {friends.length === 0 ? (
              <p>No Friends Found</p>
            ) : (
              <ul className="space-y-3">
                {friends.map((friend) => (
                  <li key={friend._id}>
                    <ProfileView
                      name={friend.name}
                      image={friend.profilePic || "https://via.placeholder.com/150"}
                      email={friend.email}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case "pending":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
            {friendRequests.length === 0 ? (
              <p>No pending requests</p>
            ) : (
              <ul className="space-y-3">
                {friendRequests.map((request) => (
                  <li key={request._id}>
                    <ProfileCard
                      name={request.from.name}
                      image={request.from.profilePic || "https://via.placeholder.com/150"}
                      onAccept={() => handleRequestAction(request._id, "accepted")}
                      onReject={() => handleRequestAction(request._id, "rejected")}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case "rejected":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Rejected Requests</h2>
            {/* Note: You need an API/State for rejected requests to make this dynamic. 
                Using static content for now based on your initial code. */}
            <ul className="space-y-3">
              <li className="bg-red-100 p-3 rounded shadow">User X (Example)</li>
              <li className="bg-red-100 p-3 rounded shadow">User Y (Example)</li>
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex">
      {/* LEFT PANEL */}
      <div className="w-1/5 bg-white border-r p-4 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Profile</h2>

        <ul className="space-y-4">
          <li
            className={`cursor-pointer hover:text-blue-600 ${
              activeTab === "friends" ? "font-semibold text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("friends")}
          >
            My Friends
          </li>

          <li
            className={`cursor-pointer hover:text-blue-600 ${
              activeTab === "pending" ? "font-semibold text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Friend Request
          </li>

          <li
            className={`cursor-pointer hover:text-blue-600 ${
              activeTab === "rejected" ? "font-semibold text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("rejected")}
          >
            Rejected Friend Request
          </li>
        </ul>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-4/5 p-8 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Friends;