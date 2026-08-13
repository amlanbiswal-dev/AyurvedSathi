import { useState } from 'react';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Ayush Sharma',
    email: 'ayush@example.com',
    bio: 'Ayurveda practitioner & wellness enthusiast',
    age: '24',
  });

  // Temporary state while user is typing in the form
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData); // Save to state (or send API request here)
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...profile }); // Reset form to current saved profile
    setIsEditing(false);
  };

  return (
    <div className="profile-card relative z-10 max-w-xl mx-auto p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-zinc-300">
          <div>
            <span className="text-xs text-zinc-500 uppercase font-semibold">Name</span>
            <p className="text-lg font-medium text-white">{profile.name}</p>
          </div>
          <div>
            <span className="text-xs text-zinc-500 uppercase font-semibold">Email</span>
            <p className="text-lg font-medium text-white">{profile.email}</p>
          </div>
          <div>
            <span className="text-xs text-zinc-500 uppercase font-semibold">Bio</span>
            <p className="text-sm text-zinc-400">{profile.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;