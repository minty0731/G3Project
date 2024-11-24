import { list } from 'postcss';
import { useEffect, useState } from 'react';

interface DinerData {
  email: string;
  phone_number: string;
  full_name: string;
  profile_image_link: string;
  address: string;
  favorite_restaurants: any;
  // Add other diner data fields
}

interface DinerAuth {
  username: string;
  password: string;
  authentication_type: string;
  authentication_identifier: string;
  user_id: string;
  // Add other diner auth fields
}

interface OwnerData {
  email: string;
  phone_number: string;
  full_name: string;
  profile_image_link: string;
  restaurant_id: string;
  // Add other owner data fields
}

interface OwnerAuth {
  username: string;
  password: string;
  authentication_type: string;
  authentication_identifier: string;
  user_id: string;
  // Add other owner auth fields
}

const UsersPage = () => {
  const [diners, setDiners] = useState<DinerData[]>([]);
  const [dinerAuth, setDinerAuth] = useState<DinerAuth[]>([]);
  const [owners, setOwners] = useState<OwnerData[]>([]);
  const [ownerAuth, setOwnerAuth] = useState<OwnerAuth[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDiners(data.diner_data);
        setDinerAuth(data.diner_auth);
        setOwners(data.owner_data);
        setOwnerAuth(data.owner_auth);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Diners</h2>
      <ul>
        {diners.map((diner, index) => (
          <li key={index}>
            Phone: {diner.phone_number}, Email: {diner.email}, Full Name: {diner.full_name}, Address: {diner.address}
          </li>
        ))}
      </ul>

      <h2>Diner Authentication</h2>
      <ul>
        {dinerAuth.map((auth, index) => (
          <li key={index}>
            Username: {auth.username}, Password: {auth.password}, UserId: {auth.user_id}
          </li>
        ))}
      </ul>

      <h2>Owners</h2>
      <ul>
        {owners.map((owner, index) => (
          <li key={index}>
            Phone: {owner.phone_number}, Email: {owner.email}, Full Name: {owner.full_name}, Address: {owner.restaurant_id}
          </li>
        ))}
      </ul>

      <h2>Owner Authentication</h2>
      <ul>
        {ownerAuth.map((auth, index) => (
          <li key={index}>
            Username: {auth.username}, Password: {auth.password}, UserId: {auth.user_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;