const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const userService = require('./userService');

const deposit = async (userId, amount, newBalance) => {
  console.log(userId);
  console.log(amount);
  console.log(newBalance);

  const user = await userService.getUserById(userId);
  console.log(user);
  if (!user) {
    throw new Error('User not found');
  }

  const transactionId = uuidv4();

  const mutation = `
    mutation deposit($userId: String!, $amount: numeric!, $transactionId: String!, $newBalance: numeric!) {
      update_users_by_pk(pk_columns: {id: $userId}, _set: {balance: $newBalance}) {
        balance
      }
      insert_transactions_one(object: {id: $transactionId, user_id: $userId, amount: $amount, type: "deposit"}) {
        id
      }
    }
  `;

  const response = await axios.post(HASURA_ENDPOINT, {
    query: mutation,
    variables: { userId, amount, transactionId, newBalance }
  }, {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
    }
  });
  console.log(response.data);
  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }

  return { success: true, newBalance };
};

const withdraw = async (userId, amount, newBalance) => {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const transactionId = uuidv4();

  const mutation = `
    mutation withdraw($userId: String!, $amount: numeric!, $transactionId: String!, $newBalance: numeric!) {
      update_users_by_pk(pk_columns: {id: $userId}, _set: {balance: $newBalance}) {
        balance
      }
      insert_transactions_one(object: {id: $transactionId, user_id: $userId, amount: $amount, type: "withdrawal"}) {
        id
      }
    }
  `;

  const response = await axios.post(HASURA_ENDPOINT, {
    query: mutation,
    variables: { userId, amount, transactionId, newBalance }
  }, {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
    }
  });

  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }

  return { success: true, newBalance };
};

const getTransactionHistory = async (userId) => {
  console.log(userId)
  const query = `
    query getTransactions($userId: String!) {
      transactions(where: {user_id: {_eq: $userId}}, order_by: {created_at: desc}) {
        id
        amount
        type
        created_at
      }
    }
  `;

  const response = await axios.post(HASURA_ENDPOINT, {
    query,
    variables: { userId }
  }, {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
    }
  });
  console.log(response.data)

  if (response.data.errors) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.transactions;
};

module.exports = {
  deposit,
  withdraw,
  getTransactionHistory
};
