import Link from 'next/link';

const Index = () => (
  <div>
    <h1>Welcome to the App</h1>
    <nav>
      <Link href="/signup_page">Sign Up</Link> | <Link href="/login_page">Login</Link> | <Link href="/users_page">Users</Link>
    </nav>
  </div>
);

export default Index;
