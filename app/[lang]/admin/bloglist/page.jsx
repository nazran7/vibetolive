"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPaginatedPosts, deleteBlogPost } from "@/api-gateways/post";
import { toast } from "react-toastify";
import { url } from "@/config";

export default function BlogListPage() {
  const [data, setData] = useState({ posts: [], page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);

  const fetchData = async (page = 1) => {
    setLoading(true);
    const res = await getPaginatedPosts(page, 12);
    if (res) setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    // Store current page before deletion
    const currentPage = data.page;
    
    await deleteBlogPost(
      id,
      async () => {
        toast.success("Post deleted");
        
        // Fetch the current page again to refresh the list
        setLoading(true);
        const res = await getPaginatedPosts(currentPage, 12);
        
        if (res) {
          // If current page is empty and not on page 1, go to previous page
          if (res.posts.length === 0 && res.page > 1) {
            await fetchData(res.page - 1);
          } else {
            // Update state with the refreshed data
            setData(res);
            setLoading(false);
          }
        } else {
          // If fetch failed, try to refresh current page
          await fetchData(currentPage);
        }
      },
      (err) => {
        toast.error(err?.message || "Delete failed");
        setLoading(false);
      }
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Blog Posts</h1>
          <p className="text-base-content/60 mt-1">
            Manage your blog posts ({data.posts.length} total)
          </p>
        </div>
        <Link
          href="/en/admin/blogpost"
          className="px-6 py-3 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary/90 transition"
        >
          + New Post
        </Link>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.posts.map((post) => (
          <div
            key={post._id}
            className="bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-all border border-base-300 overflow-hidden"
          >
            {/* Thumbnail */}
            {post.featuredImage && (
              <div className="relative h-48 w-full overflow-hidden bg-base-200">
                <img
                  src={post.featuredImage.startsWith('http') ? post.featuredImage : `${url}/uploads/${post.featuredImage}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-5 space-y-4">
              <h3 className="font-bold text-lg text-base-content line-clamp-2">
                {post.title}
              </h3>
              
              {post.excerpt && (
                <p className="text-sm text-base-content/70 line-clamp-2">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-base-content/50">
                <span>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="px-2 py-1 bg-base-200 rounded">
                  {post.slug}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-base-300">
                <Link
                  href={`/en/admin/blogpost?id=${post.slug}`}
                  className="flex-1 text-center px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id, post.title)}
                  className="flex-1 px-4 py-2 bg-error text-error-content rounded-lg hover:bg-error/90 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {data.pages > 1 && (
        <div className="flex justify-center gap-2 pt-6">
          {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => fetchData(p)}
              className={`px-4 py-2 rounded-lg transition ${
                data.page === p
                  ? "bg-primary text-primary-content font-semibold"
                  : "bg-base-200 text-base-content hover:bg-base-300"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
