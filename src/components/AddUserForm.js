import { useState } from 'react';
import axios from 'axios';

export default function AddUserForm() {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', form);
      setForm({ name: '', email: '' });
      alert('User added!');
    } catch (err) {
      console.error(err.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
}
