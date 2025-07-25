import { mockUsers } from './_mockData';

// Simulates fetching all users
export const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockUsers]);
    }, 500);
  });
};

// Simulates fetching all users who are teachers
export const getTeachers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const teachers = mockUsers.filter(user => user.role === 'Teacher');
      resolve(teachers);
    }, 500);
  });
};

// Simulates fetching all users who are students
export const getStudents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const students = mockUsers.filter(user => user.role === 'Student');
            resolve(students);
        }, 500);
    });
};

// Add a new user
export const addUser = (userData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newUser = {
                id: `user${Date.now()}`,
                ...userData
            };
            mockUsers.push(newUser);
            resolve(newUser);
        }, 500);
    });
};

// Update an existing user
export const updateUser = (userId, updatedData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const userIndex = mockUsers.findIndex(u => u.id === userId);
            if (userIndex !== -1) {
                mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
                resolve(mockUsers[userIndex]);
            }
        }, 500);
    });
};

// Delete a user
export const deleteUser = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockUsers.findIndex(u => u.id === userId);
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
      resolve({ success: true });
    }, 500);
  });
};