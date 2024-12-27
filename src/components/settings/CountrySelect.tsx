import React from 'react';
import { useData } from '../../lib/hooks/useData';

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { data: countries, loading } = useData('countries', {
    order: { column: 'name', ascending: true }
  });

  if (loading) {
    return (
      <select className="flex-1 h-12 text-lg px-4 rounded-md border-gray-300 shadow-sm focus:border-[#2e436a] focus:ring-[#2e436a]">
        <option>Loading...</option>
      </select>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 h-12 text-lg px-4 rounded-md border-gray-300 shadow-sm focus:border-[#2e436a] focus:ring-[#2e436a]"
    >
      {countries?.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};