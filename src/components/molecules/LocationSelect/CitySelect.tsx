'use client';

import { City, type ICity } from 'country-state-city';
import { Select } from '@/src/components/atoms/Select/Select';

interface Props {
  countryCode: string;
  stateCode: string;
  value?: string;
  onChange: (value: string) => void;
}

export function CitySelect({
  countryCode,
  stateCode,
  value,
  onChange
}: Props) {
  const cities: ICity[] =
    countryCode && stateCode
      ? City.getCitiesOfState(countryCode, stateCode)
      : [];

  return (
    <Select
      label="Ciudad"
      name='city'
      value={value}
      disabled={!stateCode}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">Seleccione ciudad</option>
      {cities.map(city => (
        <option key={city.name} value={city.name}>
          {city.name}
        </option>
      ))}
    </Select>
  );
}
