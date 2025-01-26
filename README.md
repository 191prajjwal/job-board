# Job Posting Board

A full-stack MERN application for companies to register, verify accounts, post jobs, and send automated emails to candidates.

## Demo

[Live Demo](https://job-board-git-main-prajjwal-shuklas-projects.vercel.app/)  
Experience the application live and explore its features.

## Features

- **Company Registration:** Secure registration with email and mobile verification.
- **Login & Authentication:** JWT-based authentication for secure access.
- **Job Posting:** Companies can post job details and manage candidates.
- **Email Automation:** Automated emails to candidates with job details.
- **Logout:** Simple logout functionality to clear authentication tokens.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Email Automation:** Nodemailer
- **Authentication:** JSON Web Tokens (JWT)

## Getting Started

Follow these steps to clone the repository and run it locally:

1. **Clone the Repository:**
   ```bash
   git clonehttps://github.com/191prajjwal/job-board
   cd job-board
   ```
2. **Install Dependencies:**
   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd client
     npm install
     ```
**Set Environment Variables:**
   - Backend:
     Create a `.env` file in the `server` directory and add:
     ```env
     PORT=5000
     NODE_ENV=development
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email_user
     EMAIL_PASS=your_email_password
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     FRONTEND_URL=frontend_url
     ```
   - Frontend:
     Create a `.env` file in the `client` directory and add:
     ```env
     API_BASE_URL=backend_url/api
     ```

API_BASE_URL=backend url /api
     ```




4. **Run the Application:**
   - Backend:
     ```bash
     cd server/src
     node index.js
     ```
   - Frontend:
     ```bash
     cd client
     npm run dev
     ```
5. **Access the Application:**
   Open your browser and go to `http://localhost:5173`.

## Contribution
Contributions are welcome! If you have ideas or suggestions, feel free to:
- Fork the repository
- Create a feature branch
- Submit a pull request

Please ensure your code adheres to the project's coding standards.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---
Start using the Job Posting Board to streamline your hiring process!

