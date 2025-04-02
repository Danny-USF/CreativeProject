import { useState, useEffect } from 'react';
import { Profile } from '../types/Profile';

interface EditProfileModalProps {
  profile: Profile | null;
  onClose: () => void;
  onSave: (profile: Omit<Profile, 'id'>) => void;
}

const EditProfileModal = ({ profile, onClose, onSave }: EditProfileModalProps) => {
  const [formData, setFormData] = useState<Omit<Profile, 'id'>>({
    fullName: '',
    birthday: '',
    relation: '',
    occupation: '',
    favoriteColor: '',
    favoriteFood: '',
    hobbies: [],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName,
        birthday: profile.birthday,
        relation: profile.relation,
        occupation: profile.occupation,
        favoriteColor: profile.favoriteColor,
        favoriteFood: profile.favoriteFood,
        hobbies: profile.hobbies,
      });
    } else {
      // Reset form for new profile
      setFormData({
        fullName: '',
        birthday: '',
        relation: '',
        occupation: '',
        favoriteColor: '',
        favoriteFood: '',
        hobbies: [],
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{profile ? 'Edit Profile' : 'Add New Profile'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday:</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="relation">Relation:</label>
            <input
              type="text"
              id="relation"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="occupation">Occupation:</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="favoriteColor">Favorite Color:</label>
            <input
              type="text"
              id="favoriteColor"
              name="favoriteColor"
              value={formData.favoriteColor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="favoriteFood">Favorite Food:</label>
            <input
              type="text"
              id="favoriteFood"
              name="favoriteFood"
              value={formData.favoriteFood}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hobbies">Hobbies (comma-separated):</label>
            <input
              type="text"
              id="hobbies"
              name="hobbies"
              value={formData.hobbies.join(', ')}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  hobbies: e.target.value.split(',').map(hobby => hobby.trim()),
                }));
              }}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit">{profile ? 'Save Changes' : 'Add Profile'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal; 