'use client';

import { useState } from 'react';

export default function NewPostPage() {
    const [postData, setPostData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        metaTitle: '',
        metaDescription: '',
        focusKeyword: '',
        categories: '',
        tags: '',
        featuredImage: null,
        featuredImagePreview: null,
    });

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
        formData.append('title', postData.title);
        formData.append('slug', postData.slug);
        formData.append('excerpt', postData.excerpt);
        formData.append('content', postData.content);
        formData.append('metaTitle', postData.metaTitle);
        formData.append('metaDescription', postData.metaDescription);
        formData.append('focusKeyword', postData.focusKeyword);
        formData.append('categories', postData.categories);
        formData.append('tags', postData.tags);

        if (postData.featuredImage) {
            formData.append('featuredImage', postData.featuredImage);
        }

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                alert('Post created!');
                setPostData({
                    title: '',
                    slug: '',
                    excerpt: '',
                    content: '',
                    metaTitle: '',
                    metaDescription: '',
                    focusKeyword: '',
                    categories: '',
                    tags: '',
                    featuredImage: null,
                    featuredImagePreview: null,
                });
            } else {
                alert('Failed to create post.');
            }
        } catch (error) {
            console.error(error);
            alert('Error submitting post.');
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
            <h1 className="text-3xl font-bold">Create New Post</h1>

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
                        placeholder="Short excerpt (used as meta description fallback)"
                        className="w-full p-2 border rounded bg-white"
                    />

                    <textarea
                        name="content"
                        value={postData.content}
                        onChange={handleChange}
                        placeholder="Post Content"
                        rows={10}
                        className="w-full p-2 border rounded bg-white"
                    />
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

                {/* Featured Image Upload */}
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
                    Publish Post
                </button>
            </form>
        </div>
    );
}
