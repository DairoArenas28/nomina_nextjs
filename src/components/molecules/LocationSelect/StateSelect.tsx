'use client';

import { State, type IState } from 'country-state-city';
import { Select } from '@/src/components/atoms/Select/Select';

interface Props {
  countryCode: string;
  value?: string;
  onChange: (value: string) => void;
}

export function StateSelect({ countryCode, value, onChange }: Props) {
  const states: IState[] = countryCode
    ? State.getStatesOfCountry(countryCode)
    : [];

  return (
    <Select
      label="Departamento"
      name='state'
      value={value}
      disabled={!countryCode}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">Seleccione departamento</option>
      {states.map(state => (
        <option key={state.isoCode} value={state.isoCode}>
          {state.name}
        </option>
      ))}
    </Select>
  );
}
