import { useEffect, useState } from 'react';

interface User {
  username: string;
  password: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            Username: {user.username}, Password: {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
