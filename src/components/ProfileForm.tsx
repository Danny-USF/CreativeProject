import { useState } from 'react';
import { Profile } from '../types/Profile';

interface ProfileFormProps {
  onSubmit: (profile: Omit<Profile, 'id'>) => void;
}

const ProfileForm = ({ onSubmit }: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthday: '',
    relation: '',
    occupation: '',
    favoriteColor: '',
    favoriteFood: '',
    hobbies: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      hobbies: formData.hobbies.split(',').map(hobby => hobby.trim()),
    });
    setFormData({
      fullName: '',
      birthday: '',
      relation: '',
      occupation: '',
      favoriteColor: '',
      favoriteFood: '',
      hobbies: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Add New Profile</h2>
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
          value={formData.hobbies}
          onChange={handleChange}
          placeholder="e.g., reading, hiking, cooking"
          required
        />
      </div>
      <button type="submit">Add Profile</button>
    </form>
  );
};

export default ProfileForm; 