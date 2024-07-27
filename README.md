# SubSpaceAssignment

Setup Instructions

Backend Setup

  Clone the Repository:
    git clone https://github.com/Yekiiii/SubSpaceAssignment.git
    cd fintech-platform
  Navigate to Backend Directory:

    cd backend
  Install Dependencies:
  Make sure you have Node.js installed. Install the required npm packages:

    npm install
  Configure Environment Variables:
  Create a .env file in the backend directory with the following content:

    HASURA_ENDPOINT=http://your-hasura-endpoint
    HASURA_ADMIN_SECRET=your-admin-secret
    JWT_SECRET=your-jwt-secret
  Start the Server:

    npm start
  The backend server should now be running on http://localhost:3000.
  
Make sure you have connected Hasura to a PostgreSQL table with 2 tables.
1) users 
a) name - string
b) id - string (PK)
c) email - string
d) balance - numeric
e) password

2) transactions
a) id - string (PK)
b) user_id - string (FK, id in users table)
c) amount - numeric
d) type - string
e) created_at


Frontend Setup
Directly open index.html which is inside public folder inside the frontend folder




Make sure to replace placeholder values such as yourusername, your-hasura-endpoint, and your-admin-secret with actual values relevant to your setup. Adjust the sections as needed to match your specific project requirements and configurations.
