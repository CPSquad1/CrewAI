import { useState } from 'react';
import EditProfileForm from '../components/Auth/EditProfileForm';

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-4">
      <h1>Dashboard Page</h1>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Edit Profile
      </button>
      {open && <EditProfileForm onClose={() => setOpen(false)} />}
    </div>
  );
};
export default Dashboard;