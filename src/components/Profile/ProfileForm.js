import './ProfileForm.scss';

const ProfileForm = () => {
  return (
    <form className="form">
      <div className="control">
        <label htmlFor='new-password'>New Password</label>
        <input 
          type='password' 
          id='new-password'
          autoComplete='on' 
        />
      </div>
      <div className="action">
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
