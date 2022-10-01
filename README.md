# Nothile's Authentication App

This app is currently deployed to GitHub pages.

View App: https://nothile-moyo-git.github.io/react-auth/

### Welcome, this is my authentication using React, React Router, SCSS, Node.js, Github Pages & Firebase.

### Installation
To install all necessary package dependencies, run "npm install" followed by "npm audit fix".

To start a local server for the app, run "npm run start".

For deployment, run "npm run deploy". It creates an optimized production for you pre-deployment and then proceeds to deploy to Github pages.

### General
This app is called "auth". This app connects to a FireStore database and uses the Firebase RestAPI in order to manage functionality.

We have a custom hook called useHttp which uses reducers and a callback in order to make memoized API calls to our Firestore database.

You can create an account with a username and password, which redirects you to the profile page, upon which you can update your profile information.

It does this by using the Firebase RestAPI for Authentication and stores a token for an hour if a user is logged in. If the user is logged out, or the token expires, or the user logs in as the token is about to expire. Then the user is also logged out. 

These are performed using global state management for the idToken with API calls to our FireBase endpoint.

Here is a picture of the App:

![image](https://user-images.githubusercontent.com/15236959/193313990-91d5c00a-0835-43ed-ae3a-e954380e3a0f.png)


