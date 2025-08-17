import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JSPrompt - Master Modern JavaScript",
  description: "Interactive, AI-powered lessons in React, Next.js, and Node.js",
  icons: {
    icon: `/favicon.svg?v=${new Date().getTime()}`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-900 text-light-100`}>
        {children}
      </body>
    </html>
  );
}
