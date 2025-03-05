import { useSelector } from "react-redux";
import PageLayout from "../components/PageLayout";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <PageLayout>
      <h1>Profil Sayfası</h1>
    </PageLayout>
  );
};

export default Profile;
