document.addEventListener('DOMContentLoaded', () => {
  const usernameSpan = document.getElementById('username');
  const balanceSpan = document.getElementById('balance');

  const username = localStorage.getItem('username');
  const balance = localStorage.getItem('balance');

  if (username) {
    usernameSpan.textContent = username;
  }

  if (balance) {
    balanceSpan.textContent = balance;
  } else {
    balanceSpan.textContent = 'N/A';
  }
});
