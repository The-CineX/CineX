import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/StacksAuthContext';
import DashboardLayout from '@components/dashboard/DashboardLayout';

export default function FilmmakerDashboard() {
  const { userData, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <div className="p-12 text-center">Loading...</div>;
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

    return (
      <DashboardLayout>
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-4">Filmmaker Dashboard</h2>
          <p className="text-gray-600 mb-6">Create public campaigns or private funding pools, and manage submissions.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2">Create New Campaign</h3>
              <p className="text-sm text-gray-700">Start a public campaign to raise funds from the community.</p>
              <div className="mt-4">
                <button className="px-4 py-2 bg-yellow-400 rounded text-black font-bold">Create Campaign</button>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-semibold mb-2">Private Pools</h3>
              <p className="text-sm text-gray-700">Set up private pools for selected investors.</p>
              <div className="mt-4">
                <button className="px-4 py-2 bg-yellow-400 rounded text-black font-bold">Create Private Pool</button>
              </div>
            </div>
          </div>
        </section>
      </DashboardLayout>
    );
}
