import type { HTMLAttributes } from 'react';

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
}

export default function Icon({ name, className = '', ...rest }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} {...rest}>
      {name}
    </span>
  );
}
