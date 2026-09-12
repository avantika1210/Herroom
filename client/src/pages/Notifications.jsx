import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { formatDistanceToNow } from "date-fns";
import {
  Trash2,
  Bell,
  User,
  Lock,
  Package,
  Building2,
} from "lucide-react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch notifications");
    }

    setLoading(false);
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, read: true }
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);

      setNotifications((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "profile":
        return <User size={22} className="text-blue-600" />;

      case "security":
        return <Lock size={22} className="text-red-600" />;

      case "business":
        return <Building2 size={22} className="text-green-600" />;

      case "product":
        return <Package size={22} className="text-purple-600" />;

      default:
        return <Bell size={22} className="text-yellow-600" />;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-2xl font-semibold">
          Loading...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-[#3E2F2F] mb-8">
          Notifications 🔔
        </h1>

        {notifications.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-md p-10 text-center">

            <Bell
              size={50}
              className="mx-auto text-gray-400 mb-4"
            />

            <h2 className="text-2xl font-semibold">
              No Notifications Yet
            </h2>

            <p className="text-gray-500 mt-2">
              You're all caught up 🎉
            </p>

          </div>

        ) : (

          notifications.map((notification) => (

            <div
              key={notification._id}
              onClick={() => {
                if (!notification.read) {
                  markAsRead(notification._id);
                }
              }}
              className={`relative bg-white rounded-2xl shadow-md border p-6 mb-5 cursor-pointer transition hover:shadow-xl

              ${
                notification.read
                  ? "border-gray-200"
                  : "border-yellow-300 bg-yellow-50"
              }`}
            >

              {!notification.read && (
                <div className="absolute top-5 right-5 h-3 w-3 rounded-full bg-red-500"></div>
              )}

              <div className="flex justify-between">

                <div className="flex gap-4">

                  <div className="mt-1">
                    {getIcon(notification.type)}
                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-[#3E2F2F]">
                      {notification.title}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {notification.message}
                    </p>

                    <p className="text-sm text-gray-400 mt-3">
                      {formatDistanceToNow(
                        new Date(notification.createdAt),
                        {
                          addSuffix: true,
                        }
                      )}
                    </p>

                  </div>

                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification._id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>

              </div>

            </div>

          ))

        )}

      </div>
    </Layout>
  );
}

export default Notifications;