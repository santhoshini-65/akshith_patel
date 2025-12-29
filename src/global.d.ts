// Global asset typings for images and other static files
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";
declare module "*.webp";
declare module "*.gif";
declare module "*.avif";

declare module "*.mp3";
declare module "*.wav";

// Provide a minimal module declaration for `tailwind-merge` to help
// TypeScript (and editors with older TS servers) find the module and
// its commonly used exports.
declare module "tailwind-merge" {
  export function twMerge(...classLists: any[]): string;
  export function twJoin(...classLists: any[]): string;
  export function createTailwindMerge(...args: any[]): (...classLists: any[]) => string;
  export function extendTailwindMerge(...args: any[]): any;
  export default twMerge;
}

// Minimal d3 module stubs to satisfy TypeScript when @types packages are missing
declare module "d3-array";
declare module "d3-color";
declare module "d3-ease";
declare module "d3-shape";
declare module "d3-timer";

