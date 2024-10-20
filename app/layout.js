// app/layout.js (server-side)
import localFont from "next/font/local";
import "./globals.css";
import Header from './_container/Header';
import AuthenticatedLayout from '../components/AuthenticatedLayout'; // Import the AuthenticatedLayout

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Medicine Reminder",
  description: "Medicine Reminder app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Use AuthenticatedLayout to control access to header and protected content */}
        <AuthenticatedLayout>
          <div className="md:px-20">
            {/* Header will only display if authenticated */}
            {children} {/* Protected content */}
          </div>
        </AuthenticatedLayout>
      </body>
    </html>
  );
}
