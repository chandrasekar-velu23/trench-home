// Shim for next/navigation — exports hooks that sub-pages use

export const useRouter = () => ({
  push: (href: string) => {
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  },
  replace: (href: string) => {
    window.history.replaceState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
  },
  back: () => window.history.back(),
  forward: () => window.history.forward(),
  refresh: () => window.location.reload(),
  prefetch: () => {},
});

export const usePathname = () => {
  return window.location.pathname || '/';
};

export const useSearchParams = () => new URLSearchParams();

export const notFound = () => {
  console.warn('Vite routing shim: 404 – page not found');
};

export const redirect = (url: string) => {
  window.history.replaceState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
};
