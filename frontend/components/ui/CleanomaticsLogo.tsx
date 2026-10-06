import React from 'react';

export const CleanomaticsLogo: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 3.5C16 3.5 7 14.8 7 21C7 25.97 11.03 30 16 30C20.97 30 25 25.97 25 21C25 14.8 16 3.5 16 3.5Z"
        fill="#0284C7"
      />
      <path
        d="M16 6.8C16 6.8 9.5 16.2 9.5 21C9.5 24.59 12.41 27.5 16 27.5C17.3 27.5 18.5 27.12 19.5 26.46C17.5 25.8 16.2 23.6 16.2 21C16.2 17.5 19.5 13 19.5 13C18 10.5 16 6.8 16 6.8Z"
        fill="#38BDF8"
      />
      <circle cx="19" cy="18" r="2.2" fill="#E0F2FE" fillOpacity="0.85" />
    </svg>
  );
};
