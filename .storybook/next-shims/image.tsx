import * as React from 'react';

// Storybook(react-vite)에는 Next 런타임이 없으므로 next/image 를 평범한 <img> 로 대체한다.
// next/image 의 fill/priority/loader 등 비표준 prop 은 DOM 으로 새어나가지 않게 걸러낸다.
type NextImageProps = {
  src: string | { src: string };
  alt?: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  loader?: unknown;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
  style?: React.CSSProperties;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'>;

export default function Image({
  src,
  alt = '',
  fill,
  priority: _priority,
  quality: _quality,
  loader: _loader,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  unoptimized: _unoptimized,
  style,
  ...rest
}: NextImageProps): React.ReactElement {
  const resolvedSrc = typeof src === 'string' ? src : src?.src;
  const fillStyle: React.CSSProperties = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
    : {};
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={resolvedSrc} alt={alt} style={{ ...fillStyle, ...style }} {...rest} />;
}
