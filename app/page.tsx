// pages/index.js or app/page.js (depending on your setup)
import Head from 'next/head';
import Link from 'next/link'; // For navigation

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI-Content Generator</title>
        <meta name="description" content="Generate high-quality content effortlessly with AI-powered tools." />
      </Head>

      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-5xl font-extrabold text-gray-900">
            Welcome to <span className="text-blue-600">AI-Content Generator</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Generate high-quality content effortlessly using advanced AI tools.
          </p>
          <div className="mt-8">
            {/* Link to Sign Up */}
            <Link href="/dashboard">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                Go to dashboard
              </button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 w-full py-8 text-center text-white">
        <p>&copy; 2024 AI-Content Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}
