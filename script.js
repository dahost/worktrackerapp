const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Ask for notification permission
if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Add task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const subject = document.getElementById('subject').value;
  const title = document.getElementById('title').value;
  const dueDate = document.getElementById('dueDate').value;

  const newTask = {
    id: Date.now(),
    subject,
    title,
    dueDate,
    completed: false
  };

  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  taskForm.reset();
  notifyUpcoming(newTask);
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed card' : 'card';

    li.innerHTML = `
      <div>
        <h3>${task.subject}</h3>
        <p>${task.title}</p>
        <small>Due: ${task.dueDate}</small>
      </div>
      <div class="actions">
        <button onclick="toggleComplete(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">✖</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Toggle task complete
function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}
// Ask for permission when the page loads
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  });
// Notify if task is due within 1 day
function notifyUpcoming(task) {
  const due = new Date(task.dueDate);
  const now = new Date();
  const diffInMs = due - now;
  const diffInHours = diffInMs / (1000 * 60 * 60);

  if (diffInHours <= 24 && Notification.permission === 'granted') {
    new Notification("Homework Due Soon!", {
      body: `${task.subject} - ${task.title} is due in less than 24 hours.`,
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' // optional
    });
  }
}
const toggleBtn = document.getElementById('themeToggle');
const userTheme = localStorage.getItem('theme');

if (userTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️ Light Mode';
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  toggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Your Firebase config (replace with your own values)
const firebaseConfig = {
    apiKey: "AIzaSyCuoq1rDRqx81MDLvtAkJclQoyw-R_An5A",
    authDomain: "home-work-tracker-1041f.firebaseapp.com",
    projectId: "home-work-tracker-1041f",
    storageBucket: "home-work-tracker-1041f.firebasestorage.app",
    messagingSenderId: "560783598389",
    appId: "1:560783598389:web:f605d8fb612677b672227c",
    measurementId: "G-878SPC0PEF"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const messaging = firebase.messaging();
  
  // Ask for permission to send notifications
  function requestPermission() {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        messaging.getToken({ vapidKey: 'BIN1k-I-CpN9RBYZQQzAZuCh7xCqAtS22eMSlHLEDJhLB0xCNf_ce0DgDT4DJNBodFXLNzlL7AsTKn7OcOjsKsc' }).then(token => {
          console.log("Token:", token);
          // Send this token to your server to send notifications later
        }).catch(err => console.error("Token error", err));
      } else {
        alert("Notifications are blocked.");
      }
    });
  }
  
  requestPermission();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
        messaging.useServiceWorker(registration);
      }).catch(error => {
        console.error('Service Worker Error:', error);
      });
  }