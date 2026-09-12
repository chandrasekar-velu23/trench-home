/// <reference types="vite/client" />

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

// next/image, next/link and next/navigation are aliased to the shims in
// src/compat by vite.config.ts. These stubs type those imports; `next` itself
// is not a dependency.
declare module "next/image" {
  import * as React from "react";
  const Image: React.ForwardRefExoticComponent<any>;
  export default Image;
}

declare module "next/link" {
  import * as React from "react";
  const Link: React.ForwardRefExoticComponent<any>;
  export default Link;
}

declare module "next/navigation" {
  export const useRouter: () => {
    push: (href: string) => void;
    replace: (href: string) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
    prefetch: () => void;
  };
  export const usePathname: () => string;
  export const useSearchParams: () => URLSearchParams;
  export const notFound: () => void;
  export const redirect: (url: string) => void;
}

// Aliased to src/compat in vite.config.ts.
declare module "@/components/BrandBanner" {
  import * as React from "react";
  const BrandBanner: React.FC<any>;
  export default BrandBanner;
}

declare module "@/components/sections/CTASection" {
  import * as React from "react";
  const CTASection: React.FC<any>;
  export default CTASection;
}

declare module "@/components/HeadlessSecOpsModes" {
  import * as React from "react";
  const HeadlessSecOpsModes: React.FC<any>;
  export default HeadlessSecOpsModes;
}

declare module "@/components/Section3Visual" {
  import * as React from "react";
  const Section3Visual: React.FC<any>;
  export default Section3Visual;
}

declare module "@/components/ui/Button" {
  import * as React from "react";
  const Button: React.FC<any>;
  export default Button;
}
