"use client";

import { createBlogPost, getProduct, updateBlogPost } from "@/api-gateways/post";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import TipTapEditor from "@/components/blog/TipTapEditor";
import { url } from "@/config";

export default function NewPostPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const editId = searchParams.get("id");

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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // ✅ Prefill form in edit mode
    useEffect(() => {
        if (editId) {
            getProduct(editId)
                .then((post) => {
                    if (post) {
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
                            featuredImagePreview: post.featuredImage 
                                ? (post.featuredImage.startsWith('http') 
                                    ? post.featuredImage 
                                    : `${url}/uploads/${post.featuredImage}`)
                                : null,
                        });
                    } else {
                        toast.error("Failed to load post data");
                    }
                })
                .catch((error) => {
                    console.error("Error loading post:", error);
                    toast.error("Failed to load post data");
                });
        }
    }, [editId]);

    // Auto-generate slug from title
    const handleTitleChange = (e) => {
        const title = e.target.value;
        setPostData((prev) => ({
            ...prev,
            title,
            slug: prev.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));
    };

    // Drag and drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            setPostData((prev) => ({
                ...prev,
                featuredImage: file,
                featuredImagePreview: URL.createObjectURL(file),
            }));
            toast.success("Image uploaded successfully");
        } else {
            toast.error("Please upload an image file");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        Object.entries(postData).forEach(([key, value]) => {
            if (value && key !== "featuredImagePreview") {
                formData.append(key, value);
            }
        });

        try {
            if (editId) {
                await updateBlogPost(
                    editId,
                    formData,
                    (data) => {
                        toast.success(data?.message || "Post updated successfully");
                        router.push('/en/admin/bloglist');
                    },
                    (err) => toast.error(err?.message || "Update failed")
                );
            } else {
                await createBlogPost(
                    formData,
                    (data) => {
                        toast.success(data?.message || "Post created successfully");
                        router.push('/en/admin/bloglist');
                    },
                    (err) => toast.error(err?.message || "Create failed")
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-base-content mb-2">
                    {editId ? "Edit Post" : "Create New Post"}
                </h1>
                <p className="text-base-content/60">
                    {editId ? "Update your blog post" : "Write and publish a new blog post"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-base-content">
                                Title *
                            </label>
                            <input
                                name="title"
                                value={postData.title}
                                onChange={handleTitleChange}
                                placeholder="Enter post title..."
                                className="w-full p-4 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-primary focus:outline-none transition"
                                required
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-base-content">
                                URL Slug *
                            </label>
                            <input
                                name="slug"
                                value={postData.slug}
                                onChange={handleChange}
                                placeholder="post-url-slug"
                                className="w-full p-4 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-primary focus:outline-none transition"
                                required
                            />
                            <p className="text-xs text-base-content/50 mt-1">
                                Used in the URL: /blog/{postData.slug || 'your-slug'}
                            </p>
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-base-content">
                                Excerpt
                            </label>
                            <textarea
                                name="excerpt"
                                value={postData.excerpt}
                                onChange={handleChange}
                                placeholder="Short description of the post (shown in blog listing)..."
                                rows={3}
                                className="w-full p-4 border-2 border-base-300 rounded-xl bg-base-100 text-base-content focus:border-primary focus:outline-none transition resize-none"
                            />
                        </div>

                        {/* Content Editor */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-base-content">
                                Content *
                            </label>
                            <TipTapEditor
                                value={postData.content}
                                onChange={(value) => setPostData((prev) => ({ ...prev, content: value }))}
                                placeholder="Write your post content here... (Font sizes: 1px-150px available)"
                            />
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Featured Image - Drag & Drop */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-base-content">
                                Featured Image
                            </label>
                            <div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-xl p-6 transition-all ${
                                    dragActive
                                        ? "border-primary bg-primary/10"
                                        : "border-base-300 bg-base-200/50"
                                }`}
                            >
                                {postData.featuredImagePreview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={postData.featuredImagePreview}
                                            alt="Featured"
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <div className="flex gap-2">
                                            <label className="flex-1 cursor-pointer">
                                                <span className="block text-center px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition">
                                                    Change Image
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileInput}
                                                    className="hidden"
                                                />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setPostData((prev) => ({
                                                    ...prev,
                                                    featuredImage: null,
                                                    featuredImagePreview: null,
                                                }))}
                                                className="px-4 py-2 bg-error text-error-content rounded-lg hover:bg-error/90 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="mb-4">
                                            <svg className="mx-auto h-12 w-12 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-base-content/60 mb-2">
                                            Drag & drop an image here, or
                                        </p>
                                        <label className="cursor-pointer">
                                            <span className="text-primary hover:underline">browse to upload</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileInput}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Categories & Tags */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-base-content">
                                    Categories
                                </label>
                                <input
                                    name="categories"
                                    value={postData.categories}
                                    onChange={handleChange}
                                    placeholder="Design, Development, etc."
                                    className="w-full p-3 border-2 border-base-300 rounded-lg bg-base-100 text-base-content focus:border-primary focus:outline-none transition"
                                />
                                <p className="text-xs text-base-content/50 mt-1">Comma-separated</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-base-content">
                                    Tags
                                </label>
                                <input
                                    name="tags"
                                    value={postData.tags}
                                    onChange={handleChange}
                                    placeholder="tag1, tag2, tag3"
                                    className="w-full p-3 border-2 border-base-300 rounded-lg bg-base-100 text-base-content focus:border-primary focus:outline-none transition"
                                />
                                <p className="text-xs text-base-content/50 mt-1">Comma-separated</p>
                            </div>
                        </div>

                        {/* SEO Section - Collapsible */}
                        <details className="border-2 border-base-300 rounded-lg">
                            <summary className="p-3 cursor-pointer font-semibold text-base-content">
                                SEO Settings
                            </summary>
                            <div className="p-4 space-y-4 border-t border-base-300">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-base-content">
                                        Meta Title
                                    </label>
                                    <input
                                        name="metaTitle"
                                        value={postData.metaTitle}
                                        onChange={handleChange}
                                        placeholder="SEO title"
                                        className="w-full p-3 border border-base-300 rounded-lg bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-base-content">
                                        Meta Description
                                    </label>
                                    <textarea
                                        name="metaDescription"
                                        value={postData.metaDescription}
                                        onChange={handleChange}
                                        placeholder="SEO description"
                                        rows={3}
                                        className="w-full p-3 border border-base-300 rounded-lg bg-base-100 text-base-content focus:border-primary focus:outline-none resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-base-content">
                                        Focus Keyword
                                    </label>
                                    <input
                                        name="focusKeyword"
                                        value={postData.focusKeyword}
                                        onChange={handleChange}
                                        placeholder="Main keyword"
                                        className="w-full p-3 border border-base-300 rounded-lg bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>
                        </details>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Publishing..." : editId ? "Update Post" : "Publish Post"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
