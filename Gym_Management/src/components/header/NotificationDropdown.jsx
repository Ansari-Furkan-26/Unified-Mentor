import React, { useEffect, useRef, useState } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { FaBell } from 'react-icons/fa';

const NotificationDropdown = ({ currentUser }) => {
  const [subscriptionNotifications, setSubscriptionNotifications] = useState([]);
  const [orderNotifications, setOrderNotifications] = useState([]);
  const [broadcastNotifications, setBroadcastNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const db = getDatabase();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;

    const userId = currentUser.uid;

    const subscriptionRef = ref(db, 'notifications/subscription');
    const ordersRef = ref(db, 'notifications/Orders');
    const broadcastRef = ref(db, 'notifications/broadcast');

    // Fetch Subscription Notifications
    onValue(subscriptionRef, (snapshot) => {
      const data = snapshot.val();
      const notifications = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      setSubscriptionNotifications(notifications);
    });

    // Fetch Order Notifications
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      const notifications = data
        ? Object.entries(data)
            .filter(([_, value]) => value.userId === userId)
            .map(([key, value]) => ({ id: key, ...value }))
        : [];
      setOrderNotifications(notifications);
    });

    // Fetch Broadcast Notifications (Visible to All Users)
    onValue(broadcastRef, (snapshot) => {
      const data = snapshot.val();
      const notifications = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      setBroadcastNotifications(notifications);
    });

    return () => {
      off(subscriptionRef);
      off(ordersRef);
      off(broadcastRef);
    };
  }, [currentUser, db]);

  useEffect(() => {
    const totalNotifications = subscriptionNotifications.length + orderNotifications.length + broadcastNotifications.length;
    setUnreadCount(totalNotifications);
  }, [subscriptionNotifications, orderNotifications, broadcastNotifications]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
    if (!dropdownOpen) {
      setUnreadCount(0);
    }
  };

  const sortedNotifications = [
    ...subscriptionNotifications.map((n) => ({ ...n, type: 'subscription' })),
    ...orderNotifications.map((n) => ({ ...n, type: 'order' })),
    ...broadcastNotifications.map((n) => ({ ...n, type: 'broadcast' })),
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleDropdownToggle} className="relative">
        <FaBell size={24} className="text-blue-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-60 max-h-96 overflow-y-auto z-50">
          <p className="px-4 py-2 text-gray-800 font-semibold border-b">Notifications</p>
          {sortedNotifications.length > 0 ? (
            <ul className="text-sm text-gray-700">
              {sortedNotifications.map((notification) => (
                <li key={notification.id} className="px-4 py-3 border-b hover:bg-gray-50">
                  {notification.type === 'subscription' ? (
                    <>
                      <p className="font-semibold">{notification.title}</p>
                      <p className="text-gray-600">{notification.message}</p>
                    </>
                  ) : notification.type === 'order' ? (
                    <>
                      <h1 className='font-bold'>Your Order Has Been Placed 📦</h1>
                      <p className="font-semibold">{notification.productName}</p>
                      <p>Price: ₹{notification.price}</p>
                    </>
                  ) : (
                    // Broadcast Message (For All Users)
                    <>
                      <h1 className="font-bold">📢 Announcement</h1>
                      <p className="text-gray-600">{notification.message}</p>
                    </>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-center text-gray-500">No notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
