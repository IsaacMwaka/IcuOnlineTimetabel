System Architecture 
The ICU Online School Timetable App integrates multiple components to deliver a robust and efficient scheduling solution. The architecture is designed to handle real-time synchronization, offline functionality, and secure access for all users. Below is an outline of the key architectural layers and components:

1. Frontend Layer
This layer focuses on the user interface and interaction, built as a mobile application.

Technologies: React Native, Java.
Key Features:
Timetable views for students and lecturers.
Forms for setting reminders, adding events, or providing feedback.
Notifications display and real-time updates.
Offline access interface powered by local SQLite storage.
2. Backend Layer
The backend handles centralized timetable management, notifications, and authentication services.

Technologies: Node.js,.
Components:
API Gateway: Facilitates secure communication between the frontend and backend.
MySQL Database:
Stores centralized timetable entries, course details, and user profiles.
Handles CRUD operations for timetable data.
Firebase Services:
Authentication: Manages secure user login with Firebase Authentication.
Cloud Messaging: Sends notifications for timetable updates, class cancellations, and reminders.
3. Database Layer
Two databases are employed to support both offline and online functionalities:

SQLite:
Embedded database on the mobile app for offline access to timetable data.
Synchronizes periodically with the MySQL database.
MySQL:
Centralized database hosted on the server.
Stores:
Master timetable entries.
Course details.
User profiles (admin, student, lecturer).
Notifications and logs.
4. Cloud Services Layer
Firebase Cloud Messaging:
Pushes notifications to users about upcoming classes, changes, or cancellations.
Firebase Authentication:
Provides secure and scalable user authentication.
5. Admin Portal
A web-based interface for administrators to manage the timetable and send notifications.

Technologies: React.js/Angular.js for the frontend, Node.js/Django for the backend.
Features:
Add, edit, or delete timetable entries.
Send notifications to specific users or groups.
View logs and analytics.
6. Mobile App Workflow
User Login:

Users authenticate using Firebase Authentication.
Access is restricted based on role (student, lecturer, admin).
Data Synchronization:

Upon successful login, the app syncs timetable data from the MySQL database to SQLite for offline use.
Timetable Access:

Users view personalized timetables based on their role and courses.
Notification Handling:

Firebase Cloud Messaging sends updates to users, which are displayed on the app.
Offline Access:

When offline, the app fetches data from SQLite for viewing.



ICU Online School Timetable App - User Guide
Welcome to the ICU Online School Timetable App! This guide provides detailed instructions on how to use the app's features for students, lecturers, and administrators.

Getting Started
1. Installation
Download the app from the Google Play Store .
Install the app on your mobile device and open it.
2. Login
Enter your username and password provided by the school.
If you are a new user:
Click on the "Sign Up" option (if enabled by the admin).
Fill in your details and create an account.
Forgot your password? Use the "Forgot Password" option to reset it.
Features Overview
1. Personalized Timetable
View your schedule:
Tap on the "Timetable" tab in the main menu.
Your timetable displays your daily and weekly classes, labs, or meetings.
Check class details:
Tap on a specific entry to view details like room, lecturer, or course code.
2. Notifications
Receive updates on:
Upcoming classes.
Room changes or cancellations.
Access notifications:
Tap the "Notifications" bell icon on the app's home screen.
Mark notifications as read after reviewing them.
3. Offline Access
Your timetable is automatically synced to your device.
View it offline:
Go to the "Offline Timetable" section in the app.
4. Reminders
Set reminders for classes or assignments:
Tap the "Reminders" tab.
Click "Add Reminder" and set the time, date, and description.
Edit or delete reminders:
Long-press on a reminder and choose the appropriate action.
5. Admin Portal (For Administrators Only)
Log in with admin credentials to access the portal.
Manage timetables:
Add, update, or delete timetable entries.
Send notifications:
Create announcements for specific classes, lecturers, or students.
Settings
1. Account Management
Update your profile:
Tap "Profile" in the main menu.
Edit your email, phone number, or password.
2. Synchronization
Manually sync your timetable:
Tap the "Sync" button on the home screen.
Ensure you have an internet connection.
Troubleshooting
Common Issues and Solutions:
Cannot Log In:

Ensure your username and password are correct.
Check your internet connection.
Contact the administrator if the issue persists.
Missing Notifications:

Ensure notifications are enabled for the app in your device settings.
Check if your app is updated to the latest version.
Timetable Not Syncing:

Tap the "Sync" button manually.
Ensure you have a stable internet connection.

