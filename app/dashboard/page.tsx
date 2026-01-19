"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BmiRecord {
  id: string;
  weight: number;
  height: number;
  bmi: number;
  category: string;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [records, setRecords] = useState<BmiRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchRecords();
    }
  }, [status, router]);

  const fetchRecords = async () => {
    try {
      const res = await fetch("/api/bmi");
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (error) {
      console.error("Failed to fetch records", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/bmi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, height }),
      });

      if (res.ok) {
        setWeight("");
        setHeight("");
        fetchRecords();
      }
    } catch (error) {
      console.error("Failed to add record", error);
    }
  };

  const chartData = [...records].reverse().map(record => ({
    date: new Date(record.createdAt).toLocaleDateString(),
    bmi: record.bmi,
    weight: record.weight
  }));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Underweight": return "text-blue-500 bg-blue-50 border-blue-200";
      case "Normal": return "text-green-500 bg-green-50 border-green-200";
      case "Overweight": return "text-yellow-500 bg-yellow-50 border-yellow-200";
      case "Obese": return "text-red-500 bg-red-50 border-red-200";
      default: return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading Dashboard...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">BMI Tracker</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Hello, <span className="font-semibold text-gray-900">{session?.user?.name}</span>
              </div>
              {session?.user?.role === "ADMIN" && (
                <Link
                  href="/admin/dashboard"
                  className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-900 transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Section: Calculator & Latest Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Calculator Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">Calculate BMI</h2>
              <p className="text-sm text-gray-500">Enter your current weight and height</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                    placeholder="70"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
                    placeholder="175"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
              >
                Calculate & Save
              </button>
            </form>
          </div>

          {/* Latest Status Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
            {records.length > 0 ? (
              <>
                <h3 className="text-lg font-medium text-gray-500 mb-2">Latest BMI</h3>
                <div className="text-5xl font-extrabold text-gray-900 mb-4">{records[0].bmi.toFixed(1)}</div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getCategoryColor(records[0].category)}`}>
                  {records[0].category}
                </span>
                <p className="mt-6 text-sm text-gray-400">Recorded on {new Date(records[0].createdAt).toLocaleDateString()}</p>
              </>
            ) : (
              <div className="text-gray-400">
                <p className="text-lg">No records yet</p>
                <p className="text-sm">Add your first measurement to see your stats</p>
              </div>
            )}
          </div>
        </div>

        {/* Charts Section */}
        {records.length > 1 && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Progress History</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Line type="monotone" dataKey="bmi" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} name="BMI" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* History Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Recent Measurements</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-semibold">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Weight (kg)</th>
                  <th className="px-6 py-4">Height (cm)</th>
                  <th className="px-6 py-4">BMI</th>
                  <th className="px-6 py-4">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{new Date(record.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium">{record.weight}</td>
                    <td className="px-6 py-4 font-medium">{record.height}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{record.bmi.toFixed(1)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(record.category)}`}>
                        {record.category}
                      </span>
                    </td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
