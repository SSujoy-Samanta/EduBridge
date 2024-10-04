"use client";
import { Features } from "./Hero/Feature";
import { HeroContent } from "./Hero/HeroContent";
import { Ping } from "./Hero/Ping";
import { Testimonial } from "./Hero/Testimonial";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full text-white xxs:text-sm sm:text-base  ">
      {/* Hero Section */}
      <section className="relative text-center py-28  min-h-svh xxs:bg-gradient-to-t sm:bg-gradient-to-r from-blue-900 via-black to-cyan-900">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-cover bg-center bg-hero-pattern opacity-30"></div>
        <div className="relative z-10">
          <HeroContent />
          <a
            href="/dashboard"
            className="relative inline-block border-animate rounded-full  transition-transform transform hover:scale-110 mt-12"
          >
            <div className="relative inline-block  px-10 py-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500  rounded-full text-lg shadow-lg cursor-pointer hover:bg-gray-100  text-white ">
              Get Started
            </div>
          </a>
        </div>
        {/* Floating Elements */}
        <Ping />
      </section>

      {/* Features Section */}
      <section className="relative py-20 text-gray-900 xxs:bg-gradient-to-t sm:bg-gradient-to-r from-indigo-950 via-black to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-indigo-600">
              Why Choose EduBridge?
            </h3>
            <p className="text-lg text-gray-400">
              A modern platform for your success journey
            </p>
          </div>
          <div className="flex flex-wrap justify-around gap-x-8 gap-y-4 ">
            <Features />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:bg-gradient-to-r xxs:bg-gradient-to-t from-indigo-900 via-purple-800 to-cyan-800 text-white text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold mb-8  text-stone-900">
            What Our Users Say
          </h3>
          <div className="flex flex-wrap justify-around">
            {/* Testimonial 1 */}
            <Testimonial />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-white text-center xxs:bg-gradient-to-t sm:bg-gradient-to-r from-purple-900 via-pink-700 to-red-900">
        <h3 className="text-4xl font-bold text-gray-900 animate-bounce">
          Join EduBridge Now
        </h3>
        <p className="mt-4 text-xl text-gray-800">
          Become part of a growing community where freshers and alumni create
          success together.
        </p>
        <div className="mt-8">
          <a href="/signup">
            <div className="inline-block px-10 py-4 bg-indigo-600 text-white rounded-full text-lg shadow-lg cursor-pointer hover:bg-indigo-700 transition-transform transform hover:scale-110">
              Sign Up Now
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
