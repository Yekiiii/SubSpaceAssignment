document.addEventListener('DOMContentLoaded', () => {
    fetch('../public/navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar').innerHTML = data;
        
        // Add event listener for the logout button after the navbar content is loaded
        document.getElementById('logoutButton').addEventListener('click', () => {
          // Clear user data from local storage
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('username');

          localStorage.removeItem('balance');
          // Redirect to the login page
          window.location.href = 'login.html';
        });
      })
      .catch(error => console.error('Error loading navbar:', error));
  });
  