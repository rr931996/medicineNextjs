// components/AuthenticatedLayout.js
"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // usePathname to get the current path

export default function AuthenticatedLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    const authStatus = localStorage.getItem('auth');
    // If user is not authenticated and not on the login page, redirect to login
    if (!authStatus && pathname !== '/Login') {
      router.push('/Login');
    } else {
      setIsAuthenticated(true); // If authenticated, allow access
    }
  }, [router, pathname]);

  // Do not render protected content until authentication is verified
  if (!isAuthenticated && pathname !== '/Login') return null;

  return <>{children}</>;
}
