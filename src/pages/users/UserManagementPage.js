import React, { useState, useEffect } from 'react';
import * as userService from '../../services/userService';
import Modal from '../../components/ui/Modal';
import Header from '../../components/common/Header';
import { useAuth } from '../../context/AuthContext';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the currently logged-in user to prevent them from deleting themselves
  const { user: loggedInUser } = useAuth();

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch all users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      const usersData = await userService.getUsers();
      setUsers(usersData);
      setIsLoading(false);
    };
    loadUsers();
  }, []);
  
  const refreshUsers = async () => {
      const usersData = await userService.getUsers();
      setUsers(usersData);
  }

  const handleOpenAddModal = () => {
    setIsEditing(false);
    // Add password field only for new users
    setCurrentUser({ name: '', email: '', role: 'Student', password: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setIsEditing(true);
    // Don't expose password when editing
    setCurrentUser({ ...user, password: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleDelete = async (userId) => {
    if (userId === loggedInUser.id) {
        alert("You cannot delete your own account.");
        return;
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
        await userService.deleteUser(userId);
        await refreshUsers();
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!currentUser.name || !currentUser.email || !currentUser.role) {
        alert("Please fill all fields.");
        return;
    }
    
    if (isEditing) {
        await userService.updateUser(currentUser.id, currentUser);
    } else {
        if (!currentUser.password) {
            alert("Password is required for new users.");
            return;
        }
        await userService.addUser(currentUser);
    }
    await refreshUsers();
    handleCloseModal();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <>
      <Header title="User Management" />
      <div className="card">
        <button className="btn btn-primary" onClick={handleOpenAddModal}>Add New User</button>
        
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-small" onClick={() => handleOpenEditModal(user)}>Edit</button>
                  <button 
                    className="btn btn-small btn-danger" 
                    onClick={() => handleDelete(user.id)}
                    disabled={user.id === loggedInUser.id} // Disable delete for self
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isModalOpen} onClose={handleCloseModal} title={isEditing ? 'Edit User' : 'Add User'}>
        <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label>Full Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={currentUser?.name || ''} 
                    onChange={handleFormChange}
                    required 
                />
            </div>
             <div className="form-group">
                <label>Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={currentUser?.email || ''} 
                    onChange={handleFormChange}
                    required 
                />
            </div>
            {!isEditing && (
                 <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={currentUser?.password || ''} 
                        onChange={handleFormChange}
                        required 
                    />
                </div>
            )}
            <div className="form-group">
                <label>Role</label>
                <select 
                    name="role" 
                    value={currentUser?.role || ''} 
                    onChange={handleFormChange}
                    required
                >
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <button type="submit" className="btn">{isEditing ? 'Update User' : 'Save User'}</button>
        </form>
      </Modal>
    </>
  );
};

export default UserManagementPage;