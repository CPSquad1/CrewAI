import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from '@/services/api';


const EditProfileForm = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    skills: '',
    timezone: '',
    start: '',
    end: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Prefill from localStorage (or later from AuthContext)
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        skills: user.skills.join(', '),
        timezone: user.availability?.timezone || '',
        start: user.availability?.workingHours?.start || '',
        end: user.availability?.workingHours?.end || '',
      });
    }
  }, [user]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // NEW submit – uses service + context
const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const payload = {
        name: form.name,
        skills: form.skills.split(',').map((s) => s.trim()),
        availability: {
          timezone: form.timezone,
          workingHours: { start: form.start, end: form.end },
        },
      };
      const { data } = await updateProfile(payload);
      refreshUser(data);          // update AuthContext + localStorage in one place
      setMsg('Profile updated!');
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-background rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold">Edit Profile</h2>

        {msg && (
          <div
            className={cn(
              'text-sm px-3 py-2 rounded',
              msg.includes('updated') ? 'bg-green-600/20 text-green-300' : 'bg-destructive/20 text-destructive'
            )}
          >
            {msg}
          </div>
        )}

        <input
          name="name"
          value={form.name}
          onChange={handle}
          required
          placeholder="Full name"
          className="w-full px-3 py-2 rounded-md bg-muted border border-border"
        />
        <input
          name="skills"
          value={form.skills}
          onChange={handle}
          required
          placeholder="Skills (comma separated)"
          className="w-full px-3 py-2 rounded-md bg-muted border border-border"
        />
        <select
          name="timezone"
          value={form.timezone}
          onChange={handle}
          required
          className="w-full px-3 py-2 rounded-md bg-muted border border-border"
        >
          <option value="">Select timezone</option>
          {Intl.supportedValuesOf('timeZone').map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            type="time"
            name="start"
            value={form.start}
            onChange={handle}
            required
            className="w-full px-3 py-2 rounded-md bg-muted border border-border"
          />
          <input
            type="time"
            name="end"
            value={form.end}
            onChange={handle}
            required
            className="w-full px-3 py-2 rounded-md bg-muted border border-border"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-border hover:bg-accent"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50"
          >
            {loading ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;