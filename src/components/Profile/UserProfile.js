import ProfileForm from './ProfileForm';
import './UserProfile.scss';

const UserProfile = () => {
  return (
    <section className="profile">
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
