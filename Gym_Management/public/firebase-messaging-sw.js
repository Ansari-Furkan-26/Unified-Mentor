importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCZEMHSDUHIoAqfwt2mAhHzn66_n70SNd8",
    authDomain: "gym-management-1999b.firebaseapp.com",
    databaseURL: 'https://gym-management-1999b-default-rtdb.firebaseio.com/', // Realtime Database URL
    projectId: "gym-management-1999b",
    storageBucket: "gym-management-1999b.firebasestorage.com", // Corrected storageBucket URL
    messagingSenderId: "467895408110",
    appId: "1:467895408110:web:cdf703c90ce5c34ab1aaff",
    measurementId: "G-RGBKYZN2R1",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background Message Received:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
