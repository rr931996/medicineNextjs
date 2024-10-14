// app/page.js
"use client"; // Ensure this is a client-side component
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use the app router's "next/navigation"
import Medicine from "./_container/index";
import Header from './_container/Header';
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      router.push('/login'); // Use the app router's router
    }
  }, [router]);

  return (
    <div>
      <Header/>
      <Medicine />
    </div>
  );
}
