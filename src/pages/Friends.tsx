import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";

const Friends = () => {
  const [activeTab, setActiveTab] = useState<"friends" | "pending" | "rejected">("pending");
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  const getFriendRequests = async () => {
    try {
      if (!token) return;

      const res = await axios.get(
        "http://localhost:5000/api/friendrequest/getfriendrequests",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const allRequests = res.data.friendRequests || [];

      const pending = allRequests.filter(
        (req: any) => req.status === "pending"
      );

      const rejected = allRequests.filter(
        (req: any) => req.status === "rejected"
      );

      setFriendRequests(pending);
      setRejectedRequests(rejected);
    } catch (error) {
      console.log("Error fetching friend requests", error);
    }
  };

  const getAllFriends = async () => {
    try {
      if (!token) return;

      const res = await axios.get(
        "http://localhost:5000/api/friendrequest/getAllFriends",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFriends(res.data.friends || []);
    } catch (error) {
      console.log("Error fetching friends", error);
    }
  };

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

  return (
    <div className="w-full h-screen bg-gray-300 flex">
      <div className="w-1/5 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-6">Friends</h2>

        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${
              activeTab === "friends" ? "text-blue-600 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("friends")}
          >
            My Friends
          </li>

          <li
            className={`cursor-pointer ${
              activeTab === "pending" ? "text-blue-600 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Friend Requests
          </li>

          <li
            className={`cursor-pointer ${
              activeTab === "rejected" ? "text-blue-600 font-semibold" : ""
            }`}
            onClick={() => setActiveTab("rejected")}
          >
            Rejected Friend Requests
          </li>
        </ul>
      </div>

      <div className="w-4/5 p-6 overflow-y-auto">
        {activeTab === "friends" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">My Friends</h2>

            {friends.length === 0 ? (
              <p>No friends found</p>
            ) : (
              <ul className="space-y-3">
                {friends.map((friend) => (
                  <li
                    key={friend._id}
                    className="bg-white p-4 rounded shadow flex items-center gap-4"
                  >
                    <img
                      src={friend.profilePic || "https://via.placeholder.com/150"}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{friend.name}</p>
                      <p className="text-sm text-gray-500">{friend.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {activeTab === "pending" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>

            {friendRequests.length === 0 ? (
              <p>No pending requests</p>
            ) : (
              <ul className="space-y-4">
                {friendRequests.map((request) => (
                  <li key={request._id}>
                    <ProfileCard
                      name={request.from.name}
                      image={
                        request.from.profilePic ||
                        "https://via.placeholder.com/150"
                      }
                      onAccept={() =>
                        handleRequestAction(request._id, "accepted")
                      }
                      onReject={() =>
                        handleRequestAction(request._id, "rejected")
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {activeTab === "rejected" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Rejected Requests</h2>

            {rejectedRequests.length === 0 ? (
              <p>No rejected requests</p>
            ) : (
              <ul className="space-y-3">
                {rejectedRequests.map((req) => (
                  <li
                    key={req._id}
                    className="bg-red-100 p-4 rounded shadow"
                  >
                    <p className="font-semibold">{req.from.name}</p>
                    <p className="text-sm text-gray-600">{req.from.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Friends;
