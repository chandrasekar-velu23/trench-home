import React from 'react';

// Shim for next/link — default export is the Link component itself
const Link = React.forwardRef<HTMLAnchorElement, any>(
  ({ href, children, onClick, className, style, prefetch, replace, scroll, shallow, passHref, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) onClick(e);
      const destination = typeof href === 'string' ? href : '';
      if (destination && destination.startsWith('/') && !destination.startsWith('//')) {
        e.preventDefault();
        if (replace) {
          window.history.replaceState({}, '', destination);
        } else {
          window.history.pushState({}, '', destination);
        }
        window.dispatchEvent(new PopStateEvent('popstate'));
        if (scroll !== false) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'NextLinkShim';

export default Link;

