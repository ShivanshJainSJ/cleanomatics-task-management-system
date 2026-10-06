import React from 'react';
import Image from 'next/image';
import logoSrc from '../logo/logo.png';

export const CleanomaticsLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      <Image
        src={logoSrc}
        alt="Cleanomatics"
        priority
        className="object-contain w-full h-full"
      />
    </div>
  );
};
