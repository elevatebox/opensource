function showLoginFields() {
    const role = document.getElementById('role-select').value;
    const loginFields = document.getElementById('login-fields');
    const adminFields = document.getElementById('admin-fields');
    const customerFields = document.getElementById('customer-fields');
  
    // Show login fields container when a role is selected
    loginFields.style.display = role ? 'block' : 'none';
  
    // Hide both role fields by default
    adminFields.style.display = 'none';
    customerFields.style.display = 'none';
  
    // Show respective fields based on selected role
    if (role === 'admin') {
      adminFields.style.display = 'block';
    } else if (role === 'customer') {
      customerFields.style.display = 'block';
    }
  }
  
  function login() {
    const role = document.getElementById('role-select').value;
    let username, password;
  
    if (role === 'admin') {
      username = document.getElementById('admin-username').value;
      password = document.getElementById('admin-password').value;
    } else if (role === 'customer') {
      username = document.getElementById('customer-username').value;
      password = document.getElementById('customer-password').value;
    }
  
    if (username && password) {
      alert(`${role.charAt(0).toUpperCase() + role.slice(1)} Login Successful!`);
    } else {
      alert('Please enter both username and password.');
    }
  }
  
  