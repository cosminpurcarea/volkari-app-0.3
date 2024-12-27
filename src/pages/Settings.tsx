import React, { useState } from 'react';
import { SettingsTabs } from '../components/settings/SettingsTabs';
import { UserDataForm } from '../components/settings/UserDataForm';
import { AppSettingsForm } from '../components/settings/AppSettingsForm';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('user-data');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'user-data' ? <UserDataForm /> : <AppSettingsForm />}
    </div>
  );
};

export default Settings;