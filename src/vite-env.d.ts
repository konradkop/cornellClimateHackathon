/// <reference types="vite/client" />

declare module "*.csv" {
  const content: unknown[];
  export default content;
}
