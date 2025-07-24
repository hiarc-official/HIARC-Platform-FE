'use client';

import { ImageProps } from '@hiarc-platform/ui';
import NextImage from 'next/image';

// Next.js Image를 UI 패키지의 ImageProps에 맞게 Adapter
export const NextImageAdapter: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  className,
  ...props
}) => (
  <NextImage
    src={src}
    alt={alt}
    width={width}
    height={height}
    priority={priority}
    fill={fill}
    sizes={sizes}
    quality={quality}
    placeholder={placeholder}
    blurDataURL={blurDataURL}
    className={className}
    {...props}
  />
);
