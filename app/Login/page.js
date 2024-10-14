// app/login/page.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication with a hardcoded user ID
    const mockUserId = 'Poonam Shrivastva'; // Example user ID

    // Simple mock authentication
    if (email === 'test@456.com' && password === 'Test@123') {
      localStorage.setItem('auth', 'true'); // Store login status
      localStorage.setItem('userId', mockUserId); // Store the user ID
      router.push('/'); // Redirect to home page
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
