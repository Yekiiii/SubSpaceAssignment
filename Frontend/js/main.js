document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const messageDiv = document.getElementById('message');

  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;

      try {
        const result = await registerUser(name, email, password);
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.user.name);
        localStorage.setItem('balance', result.user.balance);
        localStorage.setItem('userId', result.user.id); // Store the user ID in localStorage

        window.location.href = 'home.html';
      } catch (error) {
        messageDiv.innerHTML = `<p>${error.message}</p>`;
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      try {
        const result = await loginUser(email, password);
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.user.name);
        localStorage.setItem('balance', result.user.balance);
        localStorage.setItem('userId', result.user.id); // Store the user ID in localStorage

        window.location.href = 'home.html';
      } catch (error) {
        messageDiv.innerHTML = `<p>${error.message}</p>`;
      }
    });
  }
});
