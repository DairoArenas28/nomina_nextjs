'use client';

import { useState } from 'react';
import { CountrySelect } from '../../molecules/LocationSelect/CountrySelect';
import { StateSelect } from '../../molecules/LocationSelect/StateSelect';
import { CitySelect } from '../../molecules/LocationSelect/CitySelect';

interface LocationValue {
  country: string;
  state: string;
  city: string;
}

interface Props {
  value?: LocationValue;
  onChange?: (value: LocationValue) => void;
}

export function LocationSelector({ value, onChange }: Props) {
  const [country, setCountry] = useState(value?.country ?? '');
  const [state, setState] = useState(value?.state ?? '');
  const [city, setCity] = useState(value?.city ?? '');

  const emitChange = (newValue: Partial<LocationValue>) => {
    const updated = {
      country,
      state,
      city,
      ...newValue
    };

    setCountry(updated.country);
    setState(updated.state);
    setCity(updated.city);

    onChange?.(updated);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CountrySelect
        value={country}
        onChange={(value) =>
          emitChange({ country: value, state: '', city: '' })
        }
      />

      <StateSelect
        countryCode={country}
        value={state}
        onChange={(value) =>
          emitChange({ state: value, city: '' })
        }
      />

      <CitySelect
        countryCode={country}
        stateCode={state}
        value={city}
        onChange={(value) =>
          emitChange({ city: value })
        }
      />
    </div>
  );
}
