import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  validateUsername,
  validatePassword,
  validateEmail,
  validateFullName,
  validatePhoneNumber,
} from './api/validation';

const EMPTY = '';

const SignUp = () => {
  const [username, setUsername] = useState(EMPTY);
  const [password, setPassword] = useState(EMPTY);
  const [email, setEmail] = useState(EMPTY);
  const [phoneNumber, setPhoneNumber] = useState(EMPTY);
  const [userType, setUserType] = useState('diner');
  const [message, setMessage] = useState(EMPTY);
  const [validationErrors, setValidationErrors] = useState({
    username: EMPTY,
    password: EMPTY,
    email: EMPTY,
    phoneNumber: EMPTY,
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [usernameValid, usernameError] = validateUsername(username);
    const [passwordValid, passwordError] = validatePassword(password);
    const [emailValid, emailError] = validateEmail(email);
    const [phoneNumberValid, phoneNumberError] = validatePhoneNumber(phoneNumber);


    const response = await fetch('http://localhost:8080/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email, phoneNumber, userType }),
    });

    const data = await response.json();

    if (response.ok) {
      setValidationErrors({
        username: EMPTY,
        password: EMPTY,
        email: EMPTY,
        phoneNumber: EMPTY,
      });
      router.push('/login_page');
    } else {
      setValidationErrors({
        username: data.usernameError || EMPTY,
        password: data.passwordError || EMPTY,
        email: data.emailError || EMPTY,
        phoneNumber: data.phoneNumberError || EMPTY,
      });
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {validationErrors.username && (
            <span style={{ color: 'red' }}>{validationErrors.username}</span>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {validationErrors.password && (
            <span style={{ color: 'red' }}>{validationErrors.password}</span>
          )}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationErrors.email && (
            <span style={{ color: 'red' }}>{validationErrors.email}</span>
          )}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {validationErrors.phoneNumber && (
            <span style={{ color: 'red' }}>{validationErrors.phoneNumber}</span>
          )}
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
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
      <p>Already have an account? <Link href="/login_page">Login</Link></p>
    </div>
  );
};

export default SignUp;