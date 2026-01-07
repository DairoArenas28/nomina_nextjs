'use client';

import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, children, ...props }: SelectProps) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && <span>{label}</span>}
      <select {...props}>
        {children}
      </select>
    </label>
  );
}
