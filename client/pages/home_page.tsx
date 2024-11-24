interface User {
  _id: string;
  full_name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
}

const Home = ({ user }: { user: User | null }) => {
  if (!user) {
    return <div>No user logged in</div>;
  }

  return (
    <div>
      <h2>Home Page</h2>
      <h3>User Info</h3>
      <p>Name: {user.full_name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone_number}</p>
    </div>
  );
};

export default Home;
