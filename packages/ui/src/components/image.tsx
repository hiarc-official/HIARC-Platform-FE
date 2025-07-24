'use client';

import React, { createContext, useContext } from 'react';
import { cn } from '../lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

type ImageProviderType = React.ComponentType<ImageProps>;

const ImageContext = createContext<ImageProviderType | null>(null);

interface ImageProviderProps {
  children: React.ReactNode;
  imageComponent?: ImageProviderType;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children, imageComponent }) => (
  <ImageContext.Provider value={imageComponent || null}>{children}</ImageContext.Provider>
);

const DefaultImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  ...props
}) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={cn(className)}
    loading={priority ? 'eager' : 'lazy'}
    {...props}
  />
);

const Image: React.FC<ImageProps> = (props) => {
  const ImageComponent = useContext(ImageContext);
  const ComponentToRender = ImageComponent || DefaultImage;

  return <ComponentToRender {...props} />;
};

export { DefaultImage, Image };
export type { ImageProps, ImageProviderType };
