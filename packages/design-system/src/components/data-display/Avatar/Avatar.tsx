'use client';

import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { UserIcon } from '../../../icons';

interface AvatarProps {
  className?: string;
  imageUrl?: string;
  alt?: string;
}

export function Avatar({ className, imageUrl, alt }: AvatarProps): React.ReactElement {
  const [hasError, setHasError] = useState(false);
  const isFallback = !imageUrl || hasError;

  return (
    <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-gray-300">
      {isFallback ? (
        <UserIcon className={cn('h-5 w-5 text-gray-700', className)} />
      ) : (
        <Image
          src={imageUrl}
          alt={alt || 'User Avatar'}
          width={40}
          height={40}
          className={cn('size-10 object-cover', className)}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
