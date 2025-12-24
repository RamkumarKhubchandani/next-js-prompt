import { Html, Head, Main, NextScript } from 'next/document';

// This project uses the App Router for UI, but it also has a Pages Router API route
// (`pages/api/socket.js`). In some environments Next may try to resolve a compiled
// `.next/server/pages/_document.js` for source maps; providing an explicit Document
// prevents ENOENT warnings for missing _document output.
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}




