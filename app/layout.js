import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './Providers';
import { ThemeProvider } from "./components/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JSPrompt - Master Modern JavaScript",
  description: "Interactive, AI-powered lessons in React, Next.js, and Node.js",
  icons: {
    icon: `/favicon.svg?v=${new Date().getTime()}`,
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
