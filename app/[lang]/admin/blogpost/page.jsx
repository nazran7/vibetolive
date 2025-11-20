"use client";

import { createBlogPost, getProduct, updateBlogPost, uploadImage } from "@/api-gateways/post";
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
        content: "", // Legacy field, kept for backward compatibility
        metaTitle: "",
        metaDescription: "",
        focusKeyword: "",
        categories: "",
        tags: "",
        featuredImage: null,
        featuredImagePreview: null,
    });

    const [sections, setSections] = useState([
        {
            subsectionTitle: "",
            description: "",
            images: [],
            videos: [],
        }
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadingImages, setUploadingImages] = useState({});

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
                        
                        // Load sections if they exist, otherwise use legacy content
                        if (post.sections && post.sections.length > 0) {
                            setSections(post.sections);
                        } else if (post.content) {
                            // Migrate legacy content to first section
                            setSections([{
                                subsectionTitle: "",
                                description: post.content,
                                images: [],
                                videos: [],
                            }]);
                        }
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

    // Section management functions
    const addSection = () => {
        setSections([...sections, {
            subsectionTitle: "",
            description: "",
            images: [],
            videos: [],
        }]);
    };

    const removeSection = (index) => {
        if (sections.length > 1) {
            setSections(sections.filter((_, i) => i !== index));
        } else {
            toast.error("At least one section is required");
        }
    };

    const updateSection = (index, field, value) => {
        const updatedSections = [...sections];
        updatedSections[index] = { ...updatedSections[index], [field]: value };
        setSections(updatedSections);
    };

    // Image upload handlers
    const handleSectionImageUpload = async (sectionIndex, file) => {
        const uploadKey = `${sectionIndex}-${Date.now()}`;
        setUploadingImages(prev => ({ ...prev, [uploadKey]: true }));
        
        try {
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                const updatedSections = [...sections];
                updatedSections[sectionIndex].images = [...updatedSections[sectionIndex].images, imageUrl];
                setSections(updatedSections);
                toast.success("Image uploaded successfully");
            } else {
                toast.error("Image upload failed");
            }
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Image upload failed");
        } finally {
            setUploadingImages(prev => {
                const newState = { ...prev };
                delete newState[uploadKey];
                return newState;
            });
        }
    };

    const removeSectionImage = (sectionIndex, imageIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].images = updatedSections[sectionIndex].images.filter((_, i) => i !== imageIndex);
        setSections(updatedSections);
    };

    // Video URL handlers
    const addVideoUrl = (sectionIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].videos = [...updatedSections[sectionIndex].videos, ""];
        setSections(updatedSections);
    };

    const updateVideoUrl = (sectionIndex, videoIndex, url) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].videos[videoIndex] = url;
        setSections(updatedSections);
    };

    const removeVideoUrl = (sectionIndex, videoIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].videos = updatedSections[sectionIndex].videos.filter((_, i) => i !== videoIndex);
        setSections(updatedSections);
    };

    // Drag and drop handlers for featured image
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
        
        // Add basic fields
        Object.entries(postData).forEach(([key, value]) => {
            if (value && key !== "featuredImagePreview") {
                formData.append(key, value);
            }
        });

        // Add sections as JSON
        formData.append('sections', JSON.stringify(sections));

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

                        {/* Sections */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-base-content">
                                    Content Sections *
                                </label>
                                <button
                                    type="button"
                                    onClick={addSection}
                                    className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition text-sm font-medium"
                                >
                                    + Add Section
                                </button>
                            </div>

                            {sections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="border-2 border-base-300 rounded-xl p-6 space-y-4 bg-base-200/50">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-base-content">
                                            Section {sectionIndex + 1}
                                        </h3>
                                        {sections.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSection(sectionIndex)}
                                                className="px-3 py-1 bg-error text-error-content rounded-lg hover:bg-error/90 transition text-sm"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    {/* Sub Section Title */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-base-content">
                                            Sub Section Title (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={section.subsectionTitle}
                                            onChange={(e) => updateSection(sectionIndex, 'subsectionTitle', e.target.value)}
                                            placeholder="Enter subsection title..."
                                            className="w-full p-3 border-2 border-base-300 rounded-lg bg-base-100 text-base-content focus:border-primary focus:outline-none transition"
                                        />
                                    </div>

                                    {/* Description/Content Editor */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-base-content">
                                            Description/Details *
                                        </label>
                                        <TipTapEditor
                                            value={section.description}
                                            onChange={(value) => updateSection(sectionIndex, 'description', value)}
                                            placeholder="Write section content here..."
                                        />
                                    </div>

                                    {/* Images Upload */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-base-content">
                                            Images (Optional)
                                        </label>
                                        <div className="space-y-3">
                                            {/* Image Upload Input */}
                                            <label className="block cursor-pointer">
                                                <span className="inline-block px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition text-sm font-medium">
                                                    Upload Image
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) {
                                                            handleSectionImageUpload(sectionIndex, e.target.files[0]);
                                                            e.target.value = ''; // Reset input
                                                        }
                                                    }}
                                                    className="hidden"
                                                />
                                            </label>

                                            {/* Image Previews */}
                                            {section.images.length > 0 && (
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                                                    {section.images.map((imageUrl, imageIndex) => (
                                                        <div key={imageIndex} className="relative group">
                                                            <img
                                                                src={imageUrl}
                                                                alt={`Section ${sectionIndex + 1} Image ${imageIndex + 1}`}
                                                                className="w-full h-32 object-cover rounded-lg border-2 border-base-300"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeSectionImage(sectionIndex, imageIndex)}
                                                                className="absolute top-2 right-2 bg-error text-error-content rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* YouTube Videos */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-base-content">
                                            YouTube Videos (Optional)
                                        </label>
                                        <div className="space-y-2">
                                            {section.videos.map((videoUrl, videoIndex) => (
                                                <div key={videoIndex} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={videoUrl}
                                                        onChange={(e) => updateVideoUrl(sectionIndex, videoIndex, e.target.value)}
                                                        placeholder="Paste YouTube iframe URL or embed code..."
                                                        className="flex-1 p-3 border-2 border-base-300 rounded-lg bg-base-100 text-base-content focus:border-primary focus:outline-none transition"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeVideoUrl(sectionIndex, videoIndex)}
                                                        className="px-3 py-2 bg-error text-error-content rounded-lg hover:bg-error/90 transition"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addVideoUrl(sectionIndex)}
                                                className="px-4 py-2 bg-base-300 text-base-content rounded-lg hover:bg-base-300/80 transition text-sm font-medium"
                                            >
                                                + Add Video URL
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
