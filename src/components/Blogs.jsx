import React from "react";
import blogs from "../data/blog";

function Blogs() {
  console.log(blogs[0].date); // should log array with ids

  return (
    <section className="py-10 px-5 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold text-left mb-10 text-gray-600">
        Latest Blogs
      </h1>
      <div className="grid gap-6 md:grid-cols-1  lg:grid-cols-2">
        {blogs.map((blog) => (
          <li key={blog.id} className="list-none">
            <div className="bg-gray-100 shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300">
              <p className="text-sm text-gray-500">{blog.date}</p>
              <h2 className="text-xl font-semibold mt-2 text-gray-800">
                {blog.title}
              </h2>
              <p className="text-gray-600 mt-3">{blog.excerpt}</p>
              <a
                href={blog.link}
                className="inline-block mt-4 text-blue-600 font-medium hover:underline"
              >
                Read More →
              </a>
            </div>
          </li>
        ))}
      </div>
    </section>
  );
}

export default Blogs;
