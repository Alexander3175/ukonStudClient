import { useAuth } from "../../hooks/useAuth";
import UserProfile from "../../routers/UserProfile";

const CheckProfile = () => {
  const { user } = useAuth();

  if (!user) return <div>Завантаження...</div>;

  return <UserProfile user={user} />;
};

export default CheckProfile;
