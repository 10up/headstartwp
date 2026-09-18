/**
 * Side-effect CSS imports. The consuming bundler (Vite, Next, webpack) is what
 * actually processes these; TypeScript only needs to know the import is valid.
 */
declare module '*.css';
