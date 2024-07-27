const axios = require('axios');
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;


const getUserById = async (id) => {
  const query = `
    query getUser($id: String!) {
      users_by_pk(id: $id) {
        id
        name
        email
        balance
      }
    }
  `;
  const response = await axios.post(HASURA_ENDPOINT, {
    query,
    variables: { id }
  }, {
    headers: {
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET // Include the Hasura Admin Secret header
    }
  }
);
  return response.data.data.users_by_pk;
};

module.exports = {
  getUserById
};
