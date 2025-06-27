import { Buffer } from 'buffer';

// Polyfill Buffer and other Node.js globals for browser environment
if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
    (window as any).global = window;
    (window as any).process = { env: {} };
}

if (typeof global !== 'undefined') {
    global.Buffer = Buffer;
}

if (typeof globalThis !== 'undefined') {
    (globalThis as any).Buffer = Buffer;
    (globalThis as any).global = globalThis;
    (globalThis as any).process = { env: {} };
}

// Ensure process is available for libraries that expect it
if (typeof process === 'undefined') {
    (globalThis as any).process = { env: {} };
} 