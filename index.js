// pages/index.js
import Head from 'next/head';

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
            <a
              href="#"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Why Use Our AI-Content Generator?</h2>
              <p className="mt-4 text-lg text-gray-600">
                Experience seamless content creation powered by AI technology.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900">Fast & Efficient</h3>
                <p className="mt-4 text-gray-600">
                  Generate content in seconds, saving you time and effort.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900">High Quality</h3>
                <p className="mt-4 text-gray-600">
                  Our AI creates content that's relevant, informative, and well-structured.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold text-gray-900">Customizable</h3>
                <p className="mt-4 text-gray-600">
                  Tailor the content to match your specific needs with easy-to-use tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl font-bold">Start Generating Content Today!</h2>
            <p className="mt-4 text-lg">
              Sign up now and take your content creation to the next level with AI.
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Sign Up for Free
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 w-full py-8 text-center text-white">
        <p>&copy; 2024 AI-Content Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}
