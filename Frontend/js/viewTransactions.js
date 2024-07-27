document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
  
    // Function to fetch transaction details
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/transactions/transactions/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const data = await response.json();
        if (response.ok) {
          displayTransactions(data.transactions); // Assuming the response has a transactions field
        } else {
          throw new Error(data.error || 'Failed to fetch transactions');
        }
      } catch (error) {
        console.error(error.message);
      }
    };
  
    // Function to display transactions in a table
    const displayTransactions = (transactions) => {
      const tableBody = document.getElementById('transactionsTableBody');
      tableBody.innerHTML = ''; // Clear any existing content
  
      transactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        const idCell = document.createElement('td');
        idCell.textContent = transaction.id;
        row.appendChild(idCell);
  
        const amountCell = document.createElement('td');
        amountCell.textContent = transaction.amount;
        row.appendChild(amountCell);
  
        const typeCell = document.createElement('td');
        typeCell.textContent = transaction.type;
        row.appendChild(typeCell);
  
        const dateCell = document.createElement('td');
        dateCell.textContent = new Date(transaction.created_at).toLocaleString(); // Use toLocaleString for better formatting
        row.appendChild(dateCell);
  
        tableBody.appendChild(row);
      });
    };
  
    // Fetch transactions when the page loads
    fetchTransactions();
  });
  