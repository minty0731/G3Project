import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface User {
  _id: string;
  username: string;
  password: string;
}

// Protected API request
async function getProtectedData() {
  
}

const Login = ({ setUser }: { setUser: (user: User | null) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('diner');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, userType }),
    });

    const token_fetch  = await response.json();
    if (response.ok) {
      // Store the token in the client-side (e.g., in localStorage)
      localStorage.setItem('authToken', token_fetch.token);
      const tokenLocal = localStorage.getItem('authToken');
      const responseData = await fetch('http://localhost:8080/api/protected', {
        headers: {
          'Authorization': `${tokenLocal}`,
        },
      });
      const data = await responseData.json();
      if (responseData.ok) {
        setUser(data.user)
        router.push('/home_page');
      }
      else {
        setError(data.error);
      }
    } 
    else {
      setError(token_fetch.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>User Type:</label>
          <input
            type="radio"
            name="userType"
            value="diner"
            checked={userType === 'diner'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Diner
          <input
            type="radio"
            name="userType"
            value="owner"
            checked={userType === 'owner'}
            onChange={(e) => setUserType(e.target.value)}
          />
          Owner
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link href="/signup_page">Sign Up</Link></p>
    </div>
  );
};

export default Login;
