/// <reference types="vite/client" />

declare module '*.(png|jpg|jpeg|svg|gif|webp)' {
  const value: string
  export default value
}
