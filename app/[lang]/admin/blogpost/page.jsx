"use client";

import { createBlogPost, getProduct, updateBlogPost } from "@/api-gateways/post";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function NewPostPage() {
    const searchParams = useSearchParams();
    const editId = searchParams.get("id"); // slug used for editing

    const [postData, setPostData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        focusKeyword: "",
        categories: "",
        tags: "",
        featuredImage: null,
        featuredImagePreview: null,
    });

    // ✅ Prefill form in edit mode
    useEffect(() => {
        if (editId) {
            getProduct(editId).then((post) => {
                setPostData({
                    title: post.title || "",
                    slug: post.slug || "",
                    excerpt: post.excerpt || "",
                    content: post.content || "",
                    metaTitle: post.metaTitle || "",
                    metaDescription: post.metaDescription || "",
                    focusKeyword: post.focusKeyword || "",
                    categories: post.categories?.join(", ") || "",
                    tags: post.tags?.join(", ") || "",
                    featuredImage: null,
                    featuredImagePreview: post.featuredImage || null,
                });
            });
        }
    }, [editId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPostData((prev) => ({
                ...prev,
                featuredImage: file,
                featuredImagePreview: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(postData).forEach(([key, value]) => {
            if (value && key !== "featuredImagePreview") {
                formData.append(key, value);
            }
        });

        if (editId) {
            // 🔹 Update
            await updateBlogPost(
                editId,
                formData,
                (data) => {
                    toast.success(data?.message || "Post updated");
                    setPostData({
                        title: "",
                        slug: "",
                        excerpt: "",
                        content: "",
                        metaTitle: "",
                        metaDescription: "",
                        focusKeyword: "",
                        categories: "",
                        tags: "",
                        featuredImage: null,
                        featuredImagePreview: null,
                    })

                },
                (err) => toast.error(err?.message || "Update failed")
            );
        } else {
            // 🔹 Create
            await createBlogPost(
                formData,
                (data) => {
                    toast.success(data?.message || "Post created")
                    setPostData({
                        title: "",
                        slug: "",
                        excerpt: "",
                        content: "",
                        metaTitle: "",
                        metaDescription: "",
                        focusKeyword: "",
                        categories: "",
                        tags: "",
                        featuredImage: null,
                        featuredImagePreview: null,
                    })
                },
                (err) => toast.error(err?.message || "Create failed")
            );
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
            <h1 className="text-3xl font-bold">
                {editId ? "Edit Post" : "Create New Post"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Core Fields */}
                <section className="space-y-4">
                    <input
                        name="title"
                        value={postData.title}
                        onChange={handleChange}
                        placeholder="Post Title"
                        className="w-full p-2 border rounded bg-white"
                    />
                    <input
                        name="slug"
                        value={postData.slug}
                        onChange={handleChange}
                        placeholder="Slug (e.g. 'my-post')"
                        className="w-full p-2 border rounded bg-white"
                    />
                    <textarea
                        name="excerpt"
                        value={postData.excerpt}
                        onChange={handleChange}
                        placeholder="Short excerpt"
                        className="w-full p-2 border rounded bg-white"
                    />
                    <div>
                        <label className="block text-sm font-medium mb-2">Content</label>
                        <div className="resize-y overflow-auto min-h-[400px] border rounded">
                            <ReactQuill
                                theme="snow"
                                value={postData.content}
                                onChange={(value) => setPostData((prev) => ({ ...prev, content: value }))}
                                placeholder="Write your post content here..."
                                className="h-full"
                                style={{ height: '100%' }}
                                formats={[
                                    'header', 'bold', 'italic', 'underline', 'strike',
                                    'list', 'bullet', 'blockquote', 'code-block',
                                    'link', 'image', 'align', 'color', 'background'
                                ]}
                                modules={{
                                    toolbar: [
                                        [{ header: [1, 2, 3, false] }],
                                        ["bold", "italic", "underline", "strike"],
                                        [{ list: "ordered" }, { list: "bullet" }],
                                        ["blockquote", "code-block"],
                                        ["link", "image"],
                                        [{ align: [] }],
                                        [{ color: [] }, { background: [] }],
                                        ["clean"],
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* SEO */}
                <section className="space-y-2 border-t pt-6">
                    <h2 className="text-xl font-semibold">SEO</h2>
                    <input
                        name="metaTitle"
                        value={postData.metaTitle}
                        onChange={handleChange}
                        placeholder="Meta Title"
                        className="w-full p-2 border rounded bg-white"
                    />
                    <textarea
                        name="metaDescription"
                        value={postData.metaDescription}
                        onChange={handleChange}
                        placeholder="Meta Description"
                        className="w-full p-2 border rounded bg-white"
                    />
                    <input
                        name="focusKeyword"
                        value={postData.focusKeyword}
                        onChange={handleChange}
                        placeholder="Focus Keyword"
                        className="w-full p-2 border rounded bg-white"
                    />
                </section>

                {/* Taxonomies */}
                <section className="space-y-2 border-t pt-6">
                    <h2 className="text-xl font-semibold">Taxonomies</h2>
                    <input
                        name="categories"
                        value={postData.categories}
                        onChange={handleChange}
                        placeholder="Categories (comma-separated)"
                        className="w-full p-2 border rounded bg-white"
                    />
                    <input
                        name="tags"
                        value={postData.tags}
                        onChange={handleChange}
                        placeholder="Tags (comma-separated)"
                        className="w-full p-2 border rounded bg-white"
                    />
                </section>

                {/* Featured Image */}
                <section className="space-y-2 border-t pt-6">
                    <h2 className="text-xl font-semibold">Featured Image</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {postData.featuredImagePreview && (
                        <img
                            src={postData.featuredImagePreview}
                            alt="Preview"
                            className="mt-4 max-h-48 rounded-lg border object-contain shadow"
                        />
                    )}
                </section>

                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    {editId ? "Update Post" : "Publish Post"}
                </button>
            </form>
        </div>
    );
}
