# Employee Management System

Employee Management System is a web application built with React.js for the frontend and MongoDB for the backend. It provides functionalities for user authentication (signup, login, and logout) and allows authenticated users to manage employee details, including adding, updating, viewing, and deleting records.

## Features

- User authentication:
  - Signup: New users can create an account by providing necessary details.
  - Login: Existing users can log in using their credentials.
  - Logout: Users can log out of their accounts to securely end their sessions.
- Employee management:
  - Add: Authenticated users can add new employee records.
  - View: Authenticated users can view the details of all employees.
  - Update: Users can update employee details such as name, designation, etc.
  - Delete: Users can delete employee records.

## Technologies Used

- Frontend:
  - React.js: A JavaScript library for building user interfaces.
  - HTML/CSS: For structuring and styling the frontend components.
  - React Router: For handling client-side routing.

- Backend:
  - MongoDB: A NoSQL database for storing employee data.
  - Node.js: A JavaScript runtime for building backend applications.
  - Express.js: A web application framework for Node.js.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/swati07010/EmployeeManagementSystem/tree/master
## Navigate to the project directory:
1. cd EmployeeManagementSystem

## Install dependencies for frontend and backend
cd clientside
npm install
npm install react-router-dom bootstrap

cd backend
npm install
npm install nodemon multer jsonwebtoken

## Run the application:
  * Run frontend (in clientside directory)
  npm start
  *  Run backend (in backend directory)
  nodemon
 



