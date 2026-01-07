'use client';

import { Country, type ICountry } from 'country-state-city';
import { Select } from '@/src/components/atoms/Select/Select';

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

export function CountrySelect({ value, onChange }: Props) {
  const countries: ICountry[] = Country.getAllCountries();

  return (
    <Select
      label="País"
      name='country'
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">Seleccione país</option>
      {countries.map(country => (
        <option key={country.isoCode} value={country.isoCode}>
          {country.name}
        </option>
      ))}
    </Select>
  );
}
