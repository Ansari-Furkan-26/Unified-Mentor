# Unified Mentor Internship Projects

This repository showcases the projects I developed during my internship at Unified Mentor.  It includes two web applications: Santoryu (Gym Management) and Beatscape (Music Player).

## Projects Overview

### 1. Santoryu - Gym Management

Santoryu is a comprehensive web application designed to streamline gym operations and improve member experience. It manages memberships, billing, notifications, and other essential gym functions.

*   **Key Features:**
    *   User Authentication (Firebase/Auth0)
    *   Member Management (CRUD operations)
    *   Plan Management & Assignment
    *   Automated Notifications (Renewals, Holidays)
    *   Billing & Payment Tracking
    *   Data Export (Excel)
    *   Supplement Store Management
    *   Diet Plan Management

*   **Technologies Used:**
    *   React.js
    *   Tailwind CSS
    *   Firebase (Authentication, Database, Hosting)
    *   Auth0

*   **Screenshots:**  *(Add screenshots of key features here.  Example below)*
    *   ![Santoryu Member Dashboard]
      ![image](https://github.com/user-attachments/assets/7dbe24b5-0ddb-4529-8593-50fa50586fa1)

    *   ![Santoryu Admin Panel]
      ![image](https://github.com/user-attachments/assets/554263b5-e431-42b5-8024-9e725dfc1bf7)


### 2. Beatscape - Music Player

Beatscape is a web-based music player that allows users to listen to audio tracks and watch music videos.

*   **Key Features:**
    *   Audio Playback (HTML5 `<audio>`)
    *   Interactive Controls (Play/Pause, Volume, Seek)
    *   Playlist Management
    *   Voting System for Favorite Singers
    *   Embedded Music Videos

*   **Technologies Used:**
    *   React.js
    *   tailwind CSS
    *   JavaScript

*   **Screenshots:** *(Add screenshots of key features here. Example below)*
    *   ![Beatscape Main Interface]
      ![image](https://github.com/user-attachments/assets/32b3b191-cc4d-4dcf-9786-e56155ef7622)

    *   ![Beatscape Music Player]
      ![image](https://github.com/user-attachments/assets/3bab56ed-e517-4404-a9b9-bb17f1336561)


## Usage

### Santoryu

1.  **Public Interface:**  Users can explore gym services and register an account.
2.  **Member Interface:**  Registered members can log in to view bills, purchase plans, order supplements, access diet plans, and submit feedback.
3.  **Admin Interface:**  Admins have access to manage members, plans, notifications, supplements, and diet information.

### Beatscape

1.  Users can browse the playlist and select a song to play.
2.  Use the controls to play/pause, adjust volume, and seek within the track.
3.  Vote for your favorite singer.
4.  Enjoy the embedded music videos.

## Developer Guide - Setting up the Projects Locally

This guide provides instructions for developers on how to download and run the projects on their local systems.

### Prerequisites

*   Node.js and npm (or yarn) installed.
*   Firebase CLI installed (for Santoryu).  `npm install -g firebase-tools`
*   A code editor (e.g., VS Code, Sublime Text).
*   A Firebase project set up (for Santoryu - you'll need to configure the Firebase credentials).

### Santoryu - Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Ansari-Furkan-26/Unified-Mentor/tree/main/Gym_Management // Navigate to the Santoryu directory
    ```

2.  **Install Dependencies:**
    ```bash
    npm install 
    ```

3.  **Firebase Configuration:**
    *   Create a `.env` file in the `santoryu` directory.
    *   Add your Firebase configuration details:
        ```
        REACT_APP_FIREBASE_API_KEY=your_api_key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
        REACT_APP_FIREBASE_PROJECT_ID=your_project_id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
        REACT_APP_FIREBASE_APP_ID=your_app_id
        ```

4.  **Run the Development Server:**
    ```bash
    npm start  
    ```

### Beatscape - Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Ansari-Furkan-26/Unified-Mentor/tree/main/Music_Player  // Navigate to the Beatscape directory
    ```

2.  **Install Dependencies:**
    ```bash
    npm install 
    ```

3.  **Run the Development Server:**
    ```bash
    npm start  
    ```


## Contact

Furqan Ansari - https://frontendgenie.netlify.app/
