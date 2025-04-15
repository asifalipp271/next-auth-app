import { getUserFromToken } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getUserFromToken();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-4">Welcome {user.name}!</h1>
      <p className="text-gray-600 mb-4">You are logged in as a <strong>{user.role}</strong>.</p>

      {user.role === 'doctor' && (
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Doctor Dashboard</h2>
          <p>Here you can view and manage patient appointments.</p>
        </div>
      )}

      {user.role === 'patient' && (
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Patient Dashboard</h2>
          <p>Here you can book and view your appointments.</p>
        </div>
      )}

      {/* Add more role-based UI here as the app scales */}
    </main>
  );
}
