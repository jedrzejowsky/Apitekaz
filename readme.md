# Apitekaz

Apitekaz is a React application with Firebase and Leaflet. Search and select your favorite pharmacy!

## Requirements

- Node.js
- npm

## Installation

1. Clone the repository to your local environment using the `git clone` command.
2. Navigate to the project directory using the `cd Apitekaz` command.
3. Install dependencies using the `npm install` command.

## Firebase Configuration

To configure Firebase:

1. Create a new project in the Firebase Console.
2. Add a new app to your Firebase project.
3. Copy the Firebase configuration into a `.env` file in the root directory of the project. The `.env` file should look like this:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```
