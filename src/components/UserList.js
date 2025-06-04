import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const fetchUsers = async (page = 1) => {
    const res = await axios.get(`http://localhost:5000/api/users?page=${page}&limit=${limit}`);
    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);
    setCurrentPage(res.data.currentPage);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers(currentPage);
  };

  return (
    <div>
      <h2>User List</h2>
      {users.map(user => (
        <div key={user._id}>
          {user.name} - {user.email}
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </div>
      ))}
      
      {/* Pagination Controls */}
      <div>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}