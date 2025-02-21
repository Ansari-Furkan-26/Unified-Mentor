import React, { useEffect, useState } from "react";
import { ref, get, set } from "firebase/database";
import { database } from "../../../firebase/firebase";
import { Users, ShoppingBag, Package, Bell, Send, X } from "lucide-react";
import CountUp from "react-countup";

const NotificationSender = () => {
  const [counts, setCounts] = useState({ orders: 0, subscriptions: 0, products: 0, users: 0 });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const ordersSnap = await get(ref(database, "notifications/Orders"));
        const subsSnap = await get(ref(database, "notifications/subscription"));
        const productsSnap = await get(ref(database, "products"));
        const usersSnap = await get(ref(database, "users"));

        setCounts({
          orders: ordersSnap.exists() ? Object.keys(ordersSnap.val()).length : 0,
          subscriptions: subsSnap.exists() ? Object.keys(subsSnap.val()).length : 0,
          products: productsSnap.exists() ? Object.keys(productsSnap.val()).length : 0,
          users: usersSnap.exists() ? Object.keys(usersSnap.val()).length : 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCounts();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) {
      showPopup("Message cannot be empty!", "error");
      return;
    }

    setLoading(true);
    try {
      const msgRef = ref(database, "notifications/broadcast");
      await set(msgRef, { message, timestamp: Date.now() });
      showPopup("Message sent successfully!", "success");
      setMessage("");
    } catch (error) {
      console.error("Error saving message:", error);
      showPopup("Failed to send message.", "error");
    }
    setLoading(false);
  };

  const showPopup = (text, type) => {
    setPopup({ text, type });
    setTimeout(() => setPopup(null), 3000);
  };

  const stats = [
    { title: "Orders", icon: <ShoppingBag className="w-6 h-6 text-blue-500" />, count: counts.orders, text: "Keep delivering excellence!" },
    { title: "Subscriptions", icon: <Bell className="w-6 h-6 text-green-500" />, count: counts.subscriptions, text: "Loyalty is your strength!" },
    { title: "Products", icon: <Package className="w-6 h-6 text-yellow-500" />, count: counts.products, text: "Expand your inventory!" },
    { title: "Users", icon: <Users className="w-6 h-6 text-red-500" />, count: counts.users, text: "Your community is growing!" },
  ];

  return (
    <div className="pt-10 bg-gray-50 mx-auto">
      <h1 className="text-2xl font-bold mb-4 ml-6 md:ml-0">📊 Dashboard Overview</h1>
      
      {/* Main Container: Stats + Notification Sender */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        
        {/* Stats Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 flex-1 w-full">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border-2 border-gray-200 relative">
              <div className="absolute top-2 right-2">{stat.icon}</div>
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                <CountUp start={0} end={stat.count} duration={2} />
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.text}</p>
            </div>
          ))}
        </div>

        {/* Notification Sender */}
        <div className="bg-white p-6 rounded-lg border-2 border-gray-200 flex-1 w-full">
          <h2 className="text-xl font-semibold mb-2">Send Notification</h2>
          
          {/* Guidance Text */}
          <p className="text-sm text-gray-600 mb-3">
          ✨ Easily send messages with just one click. Simply type your message and press "Send"! 🚀
          </p>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter notification message..."
          />
          
          <button
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600 transition disabled:opacity-50"
            onClick={sendMessage}
            disabled={loading}
          >
            <Send className="w-4 h-4" /> {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>

      {/* Popup Notification */}
      {popup && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white shadow-lg flex items-center gap-2 ${
            popup.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {popup.text}
          <button onClick={() => setPopup(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationSender;
