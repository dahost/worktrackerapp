// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCuoq1rDRqx81MDLvtAkJclQoyw-R_An5A",
  authDomain: "home-work-tracker-1041f.firebaseapp.com",
  projectId: "home-work-tracker-1041f",
  messagingSenderId: "560783598389",
  appId: "1:560783598389:web:f605d8fb612677b672227c",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});