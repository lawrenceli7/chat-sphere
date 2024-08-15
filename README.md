# ChatSphere

ChatSphere is a full-stack, real-time communication messaging app built with the PERN stack (PostgreSQL, Express.js, React.js, Node.js).

## Installation Guide

### Server
Run `npm install` to install all dependencies.

Create a `.env` file and add the following lines:

```
DATABASE_URL"your-postgre-url"
JWT_SECRET="your-jwt-key"
NODE_ENV=development
PORT=5000
```

Now run `npx prisma generate` and `npx prisma db push` to generate prisma and apply the schemas.

Then, run `npm run dev` to start the Express backend server.

### Client
In another new terminal window, navigate to the `client` folder, and run `npm install` to install all dependencies. Then, run `npm run dev` to start the development server.

## Features

1. **Real-time Messaging:** Engage in an instant, real-time conversations with online users, ensuring a fluid and responsive communication experience.
   
2. **Robust User Authentication:**  A secure authentication system powered by JSON Web Tokens (JWT) for token management, combined with bcrypt.js for reliable password hashing and protection.
   
3. **Intuitive User Interface:**  A minimalist and user-friendly design, promoting an uncluttered environment that enhances focus and productivity during interactions.
   
4. **Persistent Chat History:**   Conversation histories are securely stored in the database and automatically retrieved, enabling seamless conversation continuity.

## Technologies & Frameworks Used
- **Frontend:** React.js, Typescript, TailwindCSS, Vite, DaisyUI, Flowbite React
- **Backend:** Express.js, Typescript, Node.js, Prisma
- **Authentication:** JSON Web Token (JWT) and bcrypt for password encryption.
- **Database:** PostgreSQL
- **Hosting:** Frontend and Backend deployed on Render

## Directory Structure

- `/client`: Holds all client-side code
- `/server`: Contains all server-side code

## Deployed on Render
- https://chat-sphere-xky9.onrender.com
