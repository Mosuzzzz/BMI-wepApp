import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="max-w-2xl space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-5xl font-bold text-blue-600">BMI Tracker</h1>
        <p className="text-xl text-gray-600">
          Monitor your health, track your Body Mass Index (BMI) trends, and stay fit with our easy-to-use application.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link 
            href="/auth/signin" 
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </Link>
          <Link 
            href="/auth/register" 
            className="px-8 py-3 bg-white text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
      
      <footer className="mt-16 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BMI Tracker App. All rights reserved.
      </footer>
    </div>
  );
}
