import React, { useState, useEffect } from 'react';
import { User, Mail, Globe } from 'lucide-react';
import { CountrySelect } from './CountrySelect';
import { useUserProfile } from '../../hooks/useUserProfile';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const UserDataForm: React.FC = () => {
  const { profile, loading, error: profileError, updateProfile } = useUserProfile();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    country_code: 'DE'
  });
  const [saveStatus, setSaveStatus] = useState<{
    saving: boolean;
    error: string | null;
    success: boolean;
  }>({
    saving: false,
    error: null,
    success: false
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        country_code: profile.country_code || 'DE'
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus({ saving: true, error: null, success: false });

    try {
      await updateProfile({
        ...formData,
        updated_at: new Date().toISOString()
      });
      setSaveStatus({ saving: false, error: null, success: true });
      
      setTimeout(() => {
        setSaveStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (err) {
      setSaveStatus({
        saving: false,
        error: err instanceof Error ? err.message : 'Failed to save changes',
        success: false
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (profileError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
        {profileError}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {saveStatus.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
          {saveStatus.error}
        </div>
      )}
      
      {saveStatus.success && (
        <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-md">
          Changes saved successfully!
        </div>
      )}

      <div>
        <h3 className="flex items-center text-lg font-medium mb-4 text-[#19233b]">
          <User className="h-5 w-5 mr-2" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#19233b]">
              First Name
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
              className="mt-1 block w-full h-12 text-lg px-4 rounded-md border-gray-300 shadow-sm focus:border-[#2e436a] focus:ring-[#2e436a]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#19233b]">
              Last Name
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
              className="mt-1 block w-full h-12 text-lg px-4 rounded-md border-gray-300 shadow-sm focus:border-[#2e436a] focus:ring-[#2e436a]"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="flex items-center text-lg font-medium mb-4 text-[#19233b]">
          <Globe className="h-5 w-5 mr-2" />
          Location & Contact
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <label className="block text-sm font-medium text-[#19233b] whitespace-nowrap">
                Country
              </label>
              <CountrySelect
                value={formData.country_code}
                onChange={(code) => setFormData(prev => ({ ...prev, country_code: code }))}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="block text-sm font-medium text-[#19233b] whitespace-nowrap">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="flex-1 h-12 text-lg px-4 rounded-md border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={saveStatus.saving}
        className="w-full h-12 text-lg flex justify-center items-center px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-[#19233b] hover:bg-[#2e436a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2e436a] disabled:opacity-50"
      >
        {saveStatus.saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};