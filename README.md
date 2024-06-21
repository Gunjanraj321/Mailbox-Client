# Mailbox Client Project

## Overview
This project is a full-stack mailbox client application that allows users to authenticate, send, and receive emails in real-time with other users registered on the same application. Built with modern web technologies including Express, Sequelize, Node.js, React, and Redux, the application also leverages libraries like bcrypt for password hashing, jsonwebtoken for authentication tokens, Nodemailer for email handling, and Socket.IO for real-time communication.

## Features

### User Authentication
- **Registration:** Users can sign up with a unique email and password.
- **Login:** Registered users can log in using their credentials.
- **Password Encryption:** Passwords are securely stored using bcrypt.
- **Forgot Password:** Users can reset their password using an email link sent via Nodemailer.

### Mail Functionalities
- **Compose Mail:** Users can compose and send emails to other registered users.
- **Inbox:** Users can view received emails.
- **Sent Mail:** Users can view the emails they have sent.

### Real-Time Communication
- **Socket Implementation:** Real-time updates for sending and receiving emails using WebSockets.

## Technology Stack

### Backend
- **Node.js:** JavaScript runtime for the server-side application.
- **Express.js:** Web framework for building the RESTful APIs.
- **Sequelize:** ORM for interacting with the database.
- **bcrypt:** Library for hashing passwords.
- **jsonwebtoken:** Library for creating and verifying authentication tokens.
- **Nodemailer:** Module for sending emails.
- **Socket.IO:** Library for real-time, bidirectional communication.

## Installation and Setup

### Prerequisites
- Node.js and npm installed on your machine.
- A relational database (e.g., PostgreSQL, MySQL) configured and running.

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/Gunjanraj321/Mailbox-Client.git
    cd backend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Set up the environment variables:
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
      ```env
      DB_HOST=<database-host>
      DB_USER=<database-username>
      DB_PASS=<database-password>
      DB_NAME=<database-name>
      JWT_SECRET=<your-jwt-secret>
      EMAIL_SERVICE=<your-email-service>
      EMAIL_USER=<your-email-username>
      EMAIL_PASS=<your-email-password>
      ```

4. Start the server:
    ```bash
    npm start
    ```

## Backend

### Authentication (Registration and Login)

- **Registration:** The user submits a form with an email and password. The password is hashed using bcrypt before storing it in the database.
- **Login:** The user submits a form with an email and password. The server compares the hashed password stored in the database with the password provided by the user using bcrypt. If they match, a JWT token is generated and sent to the user.
- **JWT:** Used for securing routes. The token is verified on each request to ensure the user is authenticated.

### Email Handling

- **Compose Mail:** The user provides recipient, subject, and body of the email. The email is stored in the database with sender and receiver information.
- **Inbox:** Emails where the user is the recipient are fetched from the database.
- **Sent Mail:** Emails where the user is the sender are fetched from the database.

### Real-Time Updates

- **Socket.IO:** Establishes a WebSocket connection between the client and server. When a new email is sent, the server emits an event to the recipient's socket, prompting the client to update the inbox in real-time.

### Forgot Password

- **Nodemailer:** When the user requests a password reset, an email with a reset link is sent to the user's registered email address. The link contains a JWT token that allows the user to reset their password securely.

### REST API Endpoints
The backend uses RESTful APIs for communication between the client and server. Below are the main endpoints:

- **POST /sign/signup:** Registers a new user.
- **POST /sign/login:** Authenticates a user and returns a JWT.
- **POST /pass/forgotpassword:** Sends a password reset link to the user's email.
- **POST /pass/resetpassword/:uuid** Resets the user's password.
- **POST /mail/send:** Sends an email to another registered user.
- **GET /mail/fetch:** Retrieves the emails received by the user.
- **GET /mail/sent:** Retrieves the emails sent by the user.
- **DELETE /mail/:mailId** Delete the email received by user.
- **PATCH /mail/read/:mailId** Update mail when user read the mail.

## Frontend

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the React application:
    ```bash
    npm start
    ```

### Frontend
- **React:** Library for building the user interface.
- **Redux:** State management library for managing the application state.
- **Socket.IO-client:** Library for enabling real-time communication on the client side.
- **Webpack:** Module bundler for JavaScript applications.


## Usage

### Register
Create a new account using the registration form.

### Login
Authenticate using your email and password.

### Compose Mail
Write a new email and send it to any registered user.

### Inbox
View your received emails.

### Sent Mail
View the emails you have sent.

### Forgot Password
Request a password reset link if you forget your password.

## Real-Time Mail Notifications
The application uses WebSockets to provide real-time notifications for incoming and outgoing emails. When a user sends an email, the recipient receives it immediately without needing to refresh the page.


### React Components

- **Authentication Pages:** Registration, login, and password reset pages.
- **Mail Pages:** Components for composing emails, viewing inbox, and sent mail.
  
### Custom Hooks
- **useSocket:** A custom hook for managing Socket.IO connections and handling real-time updates.
- **useFetchMails:** A custom hook for fetching emails from the server, both for the inbox and sent mail.

### Redux Store

- **State Management:** Manages the application state including user authentication status, list of emails, and real-time updates.
- **Actions and Reducers:** Actions for user authentication, sending emails, and receiving real-time updates. Reducers update the state based on these actions.

### Socket.IO-client

- **Real-Time Communication:** Establishes a WebSocket connection to listen for real-time updates from the server. When an email is received, the client updates the inbox without requiring a page refresh.

Feel free to reach out for any questions or support regarding this project. Enjoy using the Mailbox Client!
