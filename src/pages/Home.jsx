import React from "react";
import Blogs from "../components/Blogs";
import FeatureCard from "../components/FeatureCard";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className=" flex-1 flex flex-col gap-3">
        {/* ✅ Feature Section */}
        <section className="py-12 px-6 bg-gray-100">
          <h1 className="text-2xl font-bold md:text-left my-5 sm:text-center">
            Home
          </h1>
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Get Started"
              description="Kick off your journey with our tools and guides."
              link="#"
            />
            <FeatureCard
              title="Community"
              description="Join a vibrant community and collaborate with others."
              link="#"
            />
            <FeatureCard
              title="Visit Website"
              description="Explore our official site for more resources."
              link="#"
            />
          </div>
        </section>
        <Blogs />
      </div>
    </Layout>
  );
}
