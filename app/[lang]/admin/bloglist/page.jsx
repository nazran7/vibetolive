"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPaginatedPosts, deleteBlogPost } from "@/api-gateways/post";
import { toast } from "react-toastify";

export default function BlogListPage() {
  const [data, setData] = useState({ posts: [], page: 1, pages: 1 });

  const fetchData = async (page = 1) => {
    const res = await getPaginatedPosts(page, 10);
    if (res) setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await deleteBlogPost(
      id,
      () => {
        toast.success("Post deleted");
        fetchData(data.page);
      },
      (err) => toast.error(err?.message || "Delete failed")
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>

      <table className="w-full border-collapse border rounded-lg overflow-hidden bg-white shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Slug</th>
            <th className="p-3 border">Created</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.posts.map((post) => (
            <tr key={post._id} className="hover:bg-gray-50">
              <td className="p-3 border">{post.title}</td>
              <td className="p-3 border">{post.slug}</td>
              <td className="p-3 border">
                {new Date(post.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3 border space-x-2 flex justify-items-center gap-2">
                <Link
                  href={`/en/admin/blogpost?id=${post.slug}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => fetchData(p)}
            className={`px-3 py-1 rounded border ${data.page === p ? "bg-blue-600 text-white" : "bg-white"
              }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
