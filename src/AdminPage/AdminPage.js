import React, { useState, useEffect, useRef } from 'react'; 
import { Link } from "react-router-dom"; 
import './AdminPage.css';

const AdminPage = () => {
  const [accounts, setAccounts] = useState([
    // Mock data
    {
      id: 1,
      seqNumber: 1,
      username: "JohnRamos",
      password: "password123",
      firstName: "John",
      lastName: "Ramos",
      profilePicture: "https://via.placeholder.com/50",
      email: "johnramos.hs@gmail.com",
    },
    // Other accounts...
  ]);

  const [editingAccount, setEditingAccount] = useState(null);
  const [newAccount, setNewAccount] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
    email: '',
  });
  const [previewImage, setPreviewImage] = useState(''); // Preview the uploaded image
  const fileInputRef = useRef(null); // Ref for the file input

  useEffect(() => {
    if (editingAccount) {
      setNewAccount({
        username: editingAccount.username,
        password: editingAccount.password,
        firstName: editingAccount.firstName,
        lastName: editingAccount.lastName,
        profilePicture: editingAccount.profilePicture,
        email: editingAccount.email,
      });
      setPreviewImage(editingAccount.profilePicture); // Show existing profile picture for editing
      // Clear the file input when editing
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input value
      }
    }
  }, [editingAccount]);

  // Handle file selection and create a preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Base64 string for preview
        setNewAccount({ ...newAccount, profilePicture: reader.result }); // Store base64 string in state
      };
      reader.readAsDataURL(file); // Read the file as a Data URL (base64)
    }
  };

  // Delete account function
  const deleteAccount = (id) => {
    const filteredAccounts = accounts.filter(account => account.id !== id);
    setAccounts(filteredAccounts);
    alert(`Account with ID ${id} has been deleted.`);
  };

  // Update account function
  const updateAccount = (id) => {
    const updatedAccounts = accounts.map(account =>
      account.id === id ? { ...account, ...newAccount } : account
    );
    setAccounts(updatedAccounts);
    setEditingAccount(null);
    resetForm();
    alert(`Account with ID ${id} has been updated.`);
  };

  // Add new account function
  const addAccount = () => {
    const newId = accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1;
    const seqNumber = accounts.length > 0 ? accounts[accounts.length - 1].seqNumber + 1 : 1;
    const newEntry = { id: newId, seqNumber, ...newAccount };

    setAccounts([...accounts, newEntry]);
    resetForm();
    alert('New account has been added.');
  };

  // Reset the form fields
  const resetForm = () => {
    setNewAccount({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      profilePicture: '',
      email: '',
    });
    setPreviewImage(''); // Reset image preview
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input value
    }
  };

  return (
    <div className="whole">
      {/* Header */}
      <header className="admin-header">
        <nav className="admin-navbar">
          <a href="/" className="admin-nav-logo">
            WELCOME TO CARAXES
          </a>
          <ul className="admin-nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <Link to = "/"><li><a href="/contact">Logout</a></li></Link>
          </ul>
        </nav>
      </header>
      <div className="admin-page-container">
        {/* Admin Page Content inside a container */}
        <div className="admin-page-content">
          <h2>Admin Dashboard</h2>

          {/* Account List */}
          <table className="admin-account-table">
            <thead>
              <tr>
                <th>Seq #</th>
                <th>Profile Picture</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.id}>
                  <td>{account.seqNumber}</td>
                  <td>
                    <img 
                      src={account.profilePicture || 'https://via.placeholder.com/50'} 
                      alt="Profile" 
                      className="admin-profile-picture"
                    />
                  </td>
                  <td>{account.username}</td>
                  <td>{account.firstName}</td>
                  <td>{account.lastName}</td>
                  <td>{account.email}</td>
                  <td>
                    <button onClick={() => setEditingAccount(account)}>Edit</button>
                    <button onClick={() => deleteAccount(account.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add/Edit Form */}
          <div className="admin-edit-form">
            <h3>{editingAccount ? 'Edit Account' : 'Add Account'}</h3>
            <input
              type="text"
              value={newAccount.username}
              onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
              placeholder="Username"
            />
            <input
              type="password"
              value={newAccount.password}
              onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
              placeholder="Password"
            />
            <input
              type="text"
              value={newAccount.firstName}
              onChange={(e) => setNewAccount({ ...newAccount, firstName: e.target.value })}
              placeholder="First Name"
            />
            <input
              type="text"
              value={newAccount.lastName}
              onChange={(e) => setNewAccount({ ...newAccount, lastName: e.target.value })}
              placeholder="Last Name"
            />
            <input
              type="email"
              value={newAccount.email}
              onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
              placeholder="Email"
            />

            <div style={{ marginTop: '10px' , marginLeft: '10px'}}>
              <img 
                src={previewImage || 'https://via.placeholder.com/50'} 
                alt="Profile Preview" 
                className="admin-profile-preview"
              />
            </div>

            {/* File input for profile picture */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef} // Attach ref to the file input
            />

            {/* Preview the uploaded profile picture */}


            <div>
              {editingAccount ? (
                <button onClick={() => updateAccount(editingAccount.id)}>Save Changes</button>
              ) : (
                <button onClick={addAccount}>Add Account</button>
              )}
              <button onClick={resetForm}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
