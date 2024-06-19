import { AppProps } from 'next/app';
import { useState } from 'react';
import Link from 'next/link';

interface User {
  _id: string;
  username: string;
  password: string;
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div>
      <nav>
        <Link href="/">Home</Link> | <Link href="/signup_page">Sign Up</Link> | <Link href="/login_page">Login</Link> | <Link href="/users_page">Users</Link>
      </nav>
      <Component {...pageProps} setUser={setUser} user={user} />
    </div>
  );
};

export default MyApp;
