const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function updateProfile(payload) {
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Update failed');
  return json; // { success: true, data: user }
}