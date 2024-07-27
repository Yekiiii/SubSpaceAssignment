const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // For generating UUIDs
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const JWT_SECRET = process.env.JWT_SECRET;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET; // Add Hasura Admin Secret

const register = async (name, email, password) => {
  try {
    const id = uuidv4(); // Generate a UUID for the new user
    console.log(`Registering user: ${name}, ${email}`); // Log incoming data

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashed password: ${hashedPassword}`); // Log hashed password

    const mutation = `
      mutation register($id: String!, $name: String!, $email: String!, $password: String!) {
        insert_users_one(object: {id: $id, name: $name, email: $email, password: $password}) {
          id
          name
          email
          balance
        }
      }
    `;

    const response = await axios.post(HASURA_ENDPOINT, {
      query: mutation,
      variables: { id, name, email, password: hashedPassword }
    }, {
      headers: {
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET // Include Hasura Admin Secret
      }
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    const user = response.data.data.insert_users_one;
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return { id, user, token }; // Return the generated UUID, user, and token
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Registration failed");
  }
};

const login = async (email, password) => {
  try {
    const query = `
      query login($email: String!) {
        users(where: {email: {_eq: $email}}) {
          id
          name
          email
          password
          balance
        }
      }
    `;

    const response = await axios.post(HASURA_ENDPOINT, {
      query,
      variables: { email }
    }, {
      headers: {
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET // Include Hasura Admin Secret
      }
    });
    console.log(response.data.data.users)

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    const user = response.data.data.users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Login failed");
  }
};

module.exports = {
  register,
  login
};
