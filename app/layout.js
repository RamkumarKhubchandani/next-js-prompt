import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './Providers';
import { ThemeProvider } from "./components/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import XPNotification from "./components/public/XPNotification";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JSPrompt | #1 Free Coding Mentorship - For Kids, Juniors & Seniors",
  description: "The ultimate platform for 1-on-1 coding mentorship and group training. Master React, Next.js, and Node.js with our free workshops. Suitable for all ages: Kids, University Students, and Senior Professionals. Join our 5-person agile squads today.",
  keywords: "react workshop, learn javascript, coding for kids, senior developer training, 1 on 1 coding mentorship, free coding bootcamp, corporate group training, job support",
  icons: {
    icon: `/favicon.svg?v=${new Date().getTime()}`,
  },
  openGraph: {
    title: "JSPrompt | Free Coding Mentorship - 1-on-1 & Group Training",
    description: "Master React, Next.js & Node.js. Join our 5-person squads. For Kids, Juniors & Seniors.",
    url: 'https://jsprompt.com',
    siteName: 'JSPrompt',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider session={session}>
          <ThemeProvider>
            {children}
            <XPNotification />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
