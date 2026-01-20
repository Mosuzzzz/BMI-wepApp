"use client";

import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else {
      const session = await getSession();
      if (session?.user?.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to access your BMI dashboard</p>
        </div>
        
        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-none text-gray-900 placeholder-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-none text-gray-900 placeholder-gray-400"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white bg-blue-600 rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p className="font-semibold text-gray-800 mb-2">Demo Account:</p>
            <div className="space-y-1">
              <p><span className="font-medium">Email:</span> user@domain.com</p>
              <p><span className="font-medium">Password:</span> user1234</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p className="font-semibold text-gray-800 mb-2">Admin Account:</p>
            <div className="space-y-1">
              <p><span className="font-medium">Email:</span> admin@example.com</p>
              <p><span className="font-medium">Password:</span> adminpassword</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
