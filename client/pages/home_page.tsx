interface User {
  _id: string;
  username: string;
  password: string;
}

const Home = ({ user }: { user: User | null }) => {
  if (!user) {
    return <div>No user logged in</div>;
  }

  return (
    <div>
      <h2>Home Page</h2>
      <h3>User Info</h3>
      <p>Username: {user.username}</p>
      <p>Password: {user.password}</p>
    </div>
  );
};

export default Home;
