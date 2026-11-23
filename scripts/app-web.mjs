// Copies the website into www/, the folder the phone app is built from.
// The app is the same single page as https://lunde367.github.io/binder-blueprint/
import { mkdir, copyFile } from 'node:fs/promises';
await mkdir(new URL('../www/', import.meta.url), { recursive: true });
await copyFile(new URL('../index.html', import.meta.url), new URL('../www/index.html', import.meta.url));
console.log('www/index.html ready');
