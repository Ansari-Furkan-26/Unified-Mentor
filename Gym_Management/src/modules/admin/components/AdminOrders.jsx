import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const notificationsRef = ref(db, 'notifications/Orders');

    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedNotifications = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setNotifications(loadedNotifications.reverse()); // Optional: Latest on top
      } else {
        setNotifications([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4 mt-14 px-4">
      
        <h1 className="text-3xl font-semibold ml-8 md:ml-0">Orders</h1>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white shadow-md p-4 rounded border border-gray-200"
          >
            <h3 className="font-semibold text-lg">🎉Order for {notification.productName} - ₹{notification.price}</h3>
            <p>{notification.message}</p>
            <p className="text-sm text-gray-500">
              Customer Details : {notification.name} - {notification.phoneNumber}
            </p> <p className="text-sm text-gray-500">
              Customer Address : {notification.address}
            </p>
            <p className="text-sm text-gray-500">
              Time: {new Date(notification.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No notifications available.</p>
      )}
    </div>
  );
};

export default AdminNotification;
