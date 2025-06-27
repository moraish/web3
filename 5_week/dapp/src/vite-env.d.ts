/// <reference types="vite/client" />

declare global {
    interface Window {
        Buffer: typeof Buffer;
    }
    var Buffer: typeof Buffer;
    var global: typeof globalThis;
}

export { };
