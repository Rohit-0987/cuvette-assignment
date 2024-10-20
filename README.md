# MERN Job Posting Board

A **Job Posting Board** web application built using the MERN (MongoDB, Express, React, Node.js) stack. This application allows users to post and manage job listings, authenticate via JWT, and send email notifications via SMTP. The backend is connected to MongoDB, and the frontend is built using React.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [License](#license)

## Features

- User Authentication (JWT-based)
- Post, Update, and Delete Job Listings
- Email Notifications via SMTP
- Twilio Integration for SMS
- RESTful API

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Email**: SMTP (Gmail)
- **SMS**: Twilio API

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v12.x or above)
- [MongoDB](https://www.mongodb.com/try/download/community)
- A Twilio account for SMS integration
- A Gmail account for SMTP integration

### Cloning the Repository

```bash
git clone https://github.com/Rohit-0987/cuvette-assignment.git
cd cuvette_assignment


##Backend Setup
cd backend
npm install
npm start

## Backend Env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_job_posting_board
JWT_SECRET=mySuperSecretKeyForJWT
JWT_EXPIRE=30d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=rohitbharshe@gmail.com
SMTP_PASSWORD=padb pnkt yhby jfyn
TWILIO_SID=AC9c46a089d96f6e69cdc0e71ecdb1ea09
TWILIO_AUTH_TOKEN=a2855482cb7e43b7e3df93b297adb47e
TWILIO_PHONE=+1(864)902-5389


##Frontend Setup
cd ../frontend
npm install
npm start



### Key Points to Note:
1. The `.env` file contains **sensitive information**. Make sure that this file is not pushed to any public repository. You can include it in your `.gitignore` file.
2. Replace `your-username` with your actual GitHub username in the repository URL.
3. Your `MONGO_URI` currently points to a local MongoDB instance. If deploying to production (e.g., on Render), you may want to use a cloud-hosted MongoDB (like MongoDB Atlas).


