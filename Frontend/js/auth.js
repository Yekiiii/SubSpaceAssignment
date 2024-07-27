const API_ENDPOINT = 'http://localhost:3000'; // Your backend endpoint

const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Registration failed');
    }
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Login failed');
    }
  } catch (error) {
    throw error;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const allowedPaths = ['index.html', 'register.html', 'login.html'];
  const currentPath = window.location.pathname.split('/').pop();

  if (!token && !allowedPaths.includes(currentPath)) {
    // Redirect to index.html if not logged in and trying to access a restricted page
    window.location.href = 'index.html';
  }
});
