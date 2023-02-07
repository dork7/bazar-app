import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <Image
      src="/assets/images/darazLogo.png"
      width={120}
      height={20}
      alt="logo"
    />
  );
};

export default Logo;
