// Your sign-in component
'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Component() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();


    const signInResponse = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push('/timeline');
    } else {
      console.log('Error: ', signInResponse);
      setError('Your Email or Password is wrong!');
    }
  };

  if (session) {
  router.replace('/photoupload')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <form
        className="w-full max-w-md text-xl font-semibold flex flex-col"
        onSubmit={handleCredentialsSignIn}
      >
        {error && (
          <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-600 rounded-md">
            {error}
          </span>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-4 mb-4 border border-gray-700 bg-gray-800 rounded-md text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-4 mb-4 border border-gray-700 bg-gray-800 rounded-md text-white"
        />

        <button
          type="submit"
          className="w-full h-12 px-6 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-lg transition-colors duration-150 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Log in
        </button>
      </form>
      <hr className="w-full max-w-md my-6" />
      <button
        onClick={() => signIn('github')}
        className="w-full max-w-md h-12 px-6 mt-4 flex items-center justify-center text-lg font-semibold text-white bg-gray-800 rounded-lg transition-colors duration-150 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub Logo" className="w-6 h-6 mr-2" />
        Sign in with GitHub
      </button>
    </div>
  );
}
