import React from 'react';

// Shim for next/image — default export is the Image component itself
const Image = React.forwardRef<HTMLImageElement, any>(
  ({ src, alt, className, style, width, height, quality, priority, fill, sizes, ...props }, ref) => {
    const imgStyle: React.CSSProperties = {
      ...style,
    };
    if (fill) {
      imgStyle.position = 'absolute';
      imgStyle.inset = 0;
      imgStyle.width = '100%';
      imgStyle.height = '100%';
      imgStyle.objectFit = imgStyle.objectFit || 'cover';
    } else {
      if (width) imgStyle.width = typeof width === 'number' ? `${width}px` : width;
      if (height) imgStyle.height = typeof height === 'number' ? `${height}px` : height;
    }
    return (
      <img
        ref={ref}
        src={src}
        alt={alt || ''}
        width={!fill && typeof width === 'number' ? width : undefined}
        height={!fill && typeof height === 'number' ? height : undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={className}
        style={{ maxWidth: '100%', ...imgStyle }}
        {...props}
      />
    );
  }
);

Image.displayName = 'NextImageShim';

export default Image;
