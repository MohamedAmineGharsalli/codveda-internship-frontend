import React from 'react';
import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';

function App() {
  return (
    <div>
      <h1>Codveda Internship User Management</h1>
      <AddUserForm />
      <UserList />
    </div>
  );
}

export default App;