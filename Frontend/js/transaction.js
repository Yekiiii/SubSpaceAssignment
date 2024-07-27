document.addEventListener('DOMContentLoaded', () => {
  const depositForm = document.getElementById('depositForm');
  const withdrawForm = document.getElementById('withdrawForm');
  const modal = document.getElementById('modal');
  const closeButton = document.getElementById('closeButton');
  const confirmButton = document.getElementById('confirmButton');
  const confirmAmount = document.getElementById('confirmAmount');
  const confirmPassword = document.getElementById('confirmPassword');

  const showModal = (amount) => {
    confirmAmount.textContent = amount;
    modal.style.display = 'block';
  };

  const hideModal = () => {
    modal.style.display = 'none';
    confirmPassword.value = '';
  };

  if (depositForm) {
    depositForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const amount = parseFloat(document.getElementById('depositAmount').value);
      showModal(amount);
      confirmButton.onclick = () => handleTransaction('deposit', amount);
    });
  }

  if (withdrawForm) {
    withdrawForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const amount = parseFloat(document.getElementById('withdrawAmount').value);
      showModal(amount);
      confirmButton.onclick = () => handleTransaction('withdraw', amount);
    });
  }

  closeButton.addEventListener('click', hideModal);

  window.onclick = (event) => {
    if (event.target === modal) {
      hideModal();
    }
  };

  const handleTransaction = async (type, amount) => {
    const password = confirmPassword.value;
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    let currentBalance = parseFloat(localStorage.getItem('balance')); // Get current balance from local storage

    let newBalance;
    if (type === 'deposit') {
      newBalance = currentBalance + amount;
    } else if (type === 'withdraw') {
      if (currentBalance < amount) {
        alert('Insufficient balance');
        return;
      }
      newBalance = currentBalance - amount;
    }

    try {
      const response = await fetch(`http://localhost:3000/transactions/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, amount, password, newBalance }) // Include newBalance in the request body
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('balance', data.newBalance); // Update balance in local storage
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);
        hideModal();
      } else {
        throw new Error(data.error || 'Transaction failed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  

  
});
