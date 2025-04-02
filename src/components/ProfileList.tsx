import { Profile } from '../types/Profile';

interface ProfileListProps {
  profiles: Profile[];
  onDelete: (id: string) => void;
}

const ProfileList = ({ profiles, onDelete }: ProfileListProps) => {
  if (profiles.length === 0) {
    return <div className="profile-list empty">No profiles added yet.</div>;
  }

  return (
    <div className="profile-list">
      <h2>Profiles</h2>
      <div className="profiles-grid">
        {profiles.map(profile => (
          <div key={profile.id} className="profile-card">
            <div className="profile-header">
              <h3>{profile.fullName}</h3>
              <button
                onClick={() => onDelete(profile.id)}
                className="delete-button"
              >
                ×
              </button>
            </div>
            <div className="profile-details">
              <p><strong>Birthday:</strong> {new Date(profile.birthday).toLocaleDateString()}</p>
              <p><strong>Relation:</strong> {profile.relation}</p>
              <p><strong>Occupation:</strong> {profile.occupation}</p>
              <p><strong>Favorite Color:</strong> {profile.favoriteColor}</p>
              <p><strong>Favorite Food:</strong> {profile.favoriteFood}</p>
              <p><strong>Hobbies:</strong> {profile.hobbies.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileList; 