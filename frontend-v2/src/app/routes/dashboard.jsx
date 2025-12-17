import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/StacksAuthContext';
import DashboardLayout from '@components/dashboard/DashboardLayout';

export default function DashboardRouter() {
  const { isAuthenticated, isLoading, userType } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <div className="p-12 text-center">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Please connect your wallet</h2>
        <p className="text-gray-600">You need to sign in to access your dashboard.</p>
      </div>
    );
  }

  // Redirect to role-specific dashboard automatically
  React.useEffect(() => {
    if (userType && isAuthenticated) {
      if (userType === 'filmmaker') navigate('/dashboard/filmmaker');
      else if (userType === 'endorser') navigate('/dashboard/endorser');
      else navigate('/dashboard/public');
    }
  }, [userType, isAuthenticated, navigate]);

  // Styled dashboard entry with role cards
  return (
    <DashboardLayout>
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your Dashboard</h1>
              <p className="text-gray-400">Detected role: <strong className="text-yellow-400">{userType || 'public'}</strong></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/dashboard/public" className="p-6 bg-black border border-gray-800 rounded-2xl text-white hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Public Dashboard</h3>
                  <p className="text-gray-400 text-sm mt-2">Overview and discover public projects and pools.</p>
                </div>
                <div className="text-yellow-400 text-3xl">🌐</div>
              </div>
            </Link>

            <Link to="/dashboard/filmmaker" className="p-6 bg-black border border-gray-800 rounded-2xl text-white hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Filmmaker Dashboard</h3>
                  <p className="text-gray-400 text-sm mt-2">Create and manage campaigns, private pools and submissions.</p>
                </div>
                <div className="text-yellow-400 text-3xl">🎬</div>
              </div>
            </Link>

            <Link to="/dashboard/endorser" className="p-6 bg-black border border-gray-800 rounded-2xl text-white hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Endorser Dashboard</h3>
                  <p className="text-gray-400 text-sm mt-2">Tasks, reviews and endorsement history.</p>
                </div>
                <div className="text-yellow-400 text-3xl">✅</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
