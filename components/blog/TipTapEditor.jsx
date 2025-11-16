"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Extension } from "@tiptap/core";
import { useEffect, useState } from "react";

// Custom Font Size Extension
const FontSize = Extension.create({
    name: "fontSize",

    addOptions() {
        return {
            types: ["textStyle"],
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize?.replace("px", "") || null,
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}px`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setFontSize:
                (fontSize) =>
                ({ chain, state, tr }) => {
                    const { schema } = state;
                    if (!schema.marks.textStyle) {
                        console.warn("textStyle mark not found in schema");
                        return false;
                    }
                    return chain()
                        .setMark("textStyle", { fontSize: fontSize })
                        .run();
                },
            unsetFontSize:
                () =>
                ({ chain, state }) => {
                    const { schema } = state;
                    if (!schema.marks.textStyle) {
                        return false;
                    }
                    return chain()
                        .setMark("textStyle", { fontSize: null })
                        .removeEmptyTextStyle()
                        .run();
                },
        };
    },
});

export default function TipTapEditor({ value, onChange, placeholder }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                // Disable link and underline from StarterKit since we're adding them separately
                link: false,
                underline: false,
            }),
            TextStyle,
            FontSize,
            Color,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary hover:underline",
                },
            }),
            Underline,
            Image.configure({
                inline: true,
                allowBase64: false,
                HTMLAttributes: {
                    class: "max-w-full h-auto rounded-lg",
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || "Write your content here...",
            }),
        ],
        content: value || "",
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML());
            }
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[400px] p-4 text-base-content",
            },
            handleDOMEvents: {
                drop: (view, event) => {
                    const hasFiles = event.dataTransfer?.files?.length > 0;
                    if (!hasFiles) {
                        return false;
                    }

                    const images = Array.from(event.dataTransfer.files).filter((file) => /^image\//.test(file.type));

                    if (images.length === 0) {
                        return false;
                    }

                    event.preventDefault();

                    images.forEach(async (image) => {
                        await handleImageUpload(image, editor);
                    });

                    return true;
                },
                paste: (view, event) => {
                    const hasFiles = event.clipboardData?.files?.length > 0;
                    if (!hasFiles) {
                        return false;
                    }

                    const images = Array.from(event.clipboardData.files).filter((file) => /^image\//.test(file.type));

                    if (images.length === 0) {
                        return false;
                    }

                    event.preventDefault();

                    images.forEach(async (image) => {
                        await handleImageUpload(image, editor);
                    });

                    return true;
                },
            },
        },
    });

    // Handle image upload
    const handleImageUpload = async (file, editorInstance) => {
        try {
            const { uploadImage } = await import("@/api-gateways/post");
            const imageUrl = await uploadImage(file);

            if (imageUrl && editorInstance) {
                editorInstance.chain().focus().setImage({ src: imageUrl }).run();
            }
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    // Toolbar button handlers
    const handleImageClick = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (file && editor) {
                await handleImageUpload(file, editor);
            }
        };
    };

    // Update editor content when value prop changes
    useEffect(() => {
        if (editor && value !== undefined) {
            const currentContent = editor.getHTML();
            if (currentContent !== value) {
                editor.commands.setContent(value || "");
            }
        }
    }, [value, editor]);

    // Make images resizable
    useEffect(() => {
        if (!editor) return;

        const makeImagesResizable = () => {
            const images = editor.view.dom.querySelectorAll('img');
            images.forEach((img) => {
                // Check if image already has event listeners attached
                // We'll use a data attribute to track this
                const hasListeners = img.dataset.hasResizeListeners === 'true';
                const isAlreadyResizable = img.dataset.resizable === 'true';
                
                // If already set up, just update handle position
                if (isAlreadyResizable && hasListeners) {
                    // Verify listeners are actually still attached by checking if handlers exist
                    if (img._resizeHandlers && img._resizeHandlers.enter) {
                        // Update handle position for existing images
                        const existingHandle = document.querySelector(`.tiptap-resize-handle[data-img-id="${img.dataset.imgId}"]`);
                        if (existingHandle) {
                            const rect = img.getBoundingClientRect();
                            const handleSize = 28;
                            const offset = 2;
                            existingHandle.style.left = `${rect.right - handleSize + offset}px`;
                            existingHandle.style.top = `${rect.bottom - handleSize + offset}px`;
                        }
                        return;
                    } else {
                        // Listeners were lost (probably due to TipTap re-render), re-setup
                        img.dataset.hasResizeListeners = 'false';
                    }
                }
                
                // Mark as resizable and set up listeners
                img.dataset.resizable = 'true';

                // Prevent image dragging
                img.draggable = false;
                img.style.userSelect = 'none';
                img.style.cursor = 'default';
                img.style.position = 'relative';
                img.style.display = 'inline-block';

                // Ensure image has proper initial styling
                if (!img.style.maxWidth) {
                    img.style.maxWidth = '100%';
                }

                // Use a ref-like object to track resizing state that persists across closures
                // Reuse existing resizeState if it exists (from previous setup)
                let resizeState = img._resizeState;
                if (!resizeState) {
                    resizeState = { isResizing: false };
                    img._resizeState = resizeState; // Store on image element so it persists
                } else {
                    // Ensure it's reset if we're re-setting up
                    resizeState.isResizing = false;
                }
                let startX, startWidth, startHeight, aspectRatio;
                let handle = null;

                // Create unique ID for this image
                if (!img.dataset.imgId) {
                    img.dataset.imgId = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                }

                // Create resize handle
                const createHandle = () => {
                    const existingHandle = document.querySelector(`.tiptap-resize-handle[data-img-id="${img.dataset.imgId}"]`);
                    if (existingHandle) {
                        handle = existingHandle;
                        return;
                    }

                    handle = document.createElement('div');
                    handle.className = 'tiptap-resize-handle';
                    handle.dataset.imgId = img.dataset.imgId;
                    handle.innerHTML = '⤢';
                    handle.setAttribute('title', 'Drag to resize image');
                    handle.style.cssText = `
                        position: fixed;
                        width: 28px;
                        height: 28px;
                        background: #3b82f6;
                        border-radius: 4px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 3px 8px rgba(0,0,0,0.4);
                        color: white;
                        font-size: 18px;
                        font-weight: bold;
                        user-select: none;
                        pointer-events: auto;
                        cursor: nwse-resize;
                        z-index: 10000;
                        opacity: 0;
                        transition: opacity 0.2s;
                        visibility: visible;
                    `;
                    document.body.appendChild(handle);
                    
                    // Initial position update
                    setTimeout(() => {
                        updateHandlePosition();
                    }, 100);

                    const updateHandlePosition = () => {
                        if (!img || !handle) return;
                        const rect = img.getBoundingClientRect();
                        // Use getBoundingClientRect which already accounts for scroll
                        // Position handle at bottom-right corner of image
                        const handleSize = 28;
                        const offset = 2; // Small offset from corner
                        handle.style.left = `${rect.right - handleSize + offset}px`;
                        handle.style.top = `${rect.bottom - handleSize + offset}px`;
                    };

                    const showHandle = () => {
                        if (handle && !resizeState.isResizing) {
                            updateHandlePosition();
                            // Force opacity update by removing and re-adding
                            handle.style.setProperty('opacity', '1', 'important');
                            handle.style.setProperty('pointer-events', 'auto', 'important');
                            handle.style.setProperty('display', 'flex', 'important');
                            handle.style.setProperty('visibility', 'visible', 'important');
                        }
                    };

                    const hideHandle = (e) => {
                        if (handle && !resizeState.isResizing) {
                            // Use the event to get mouse position if available
                            const mouseX = e?.clientX || window.event?.clientX || 0;
                            const mouseY = e?.clientY || window.event?.clientY || 0;
                            
                            // Check if mouse is over handle or image
                            const handleRect = handle.getBoundingClientRect();
                            const imgRect = img.getBoundingClientRect();
                            
                            const overHandle = mouseX >= handleRect.left && mouseX <= handleRect.right &&
                                             mouseY >= handleRect.top && mouseY <= handleRect.bottom;
                            const overImage = mouseX >= imgRect.left && mouseX <= imgRect.right &&
                                            mouseY >= imgRect.top && mouseY <= imgRect.bottom;
                            
                            if (!overHandle && !overImage) {
                                setTimeout(() => {
                                    if (handle && !resizeState.isResizing) {
                                        handle.style.setProperty('opacity', '0', 'important');
                                    }
                                }, 150);
                            }
                        }
                    };

                    // Store event handlers so we can check if they're still attached
                    const imgMouseEnterHandler = () => {
                        if (!resizeState.isResizing && handle) {
                            showHandle();
                        }
                    };
                    
                    const imgMouseLeaveHandler = (e) => {
                        if (!resizeState.isResizing) {
                            hideHandle(e);
                        }
                    };
                    
                    const imgMouseMoveHandler = (e) => {
                        if (handle && !resizeState.isResizing) {
                            updateHandlePosition();
                            // Show handle when mouse is over image
                            const rect = img.getBoundingClientRect();
                            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                                showHandle();
                            }
                        }
                    };
                    
                    const handleMouseEnterHandler = () => {
                        if (handle && !resizeState.isResizing) {
                            handle.style.setProperty('opacity', '1', 'important');
                            handle.style.setProperty('display', 'flex', 'important');
                            handle.style.setProperty('visibility', 'visible', 'important');
                            updateHandlePosition();
                        }
                    };
                    
                    const handleMouseLeaveHandler = (e) => {
                        if (!resizeState.isResizing) {
                            hideHandle(e);
                        }
                    };
                    
                    // Remove any existing listeners first to avoid duplicates
                    if (img._resizeHandlers) {
                        if (img._resizeHandlers.enter) {
                            img.removeEventListener('mouseenter', img._resizeHandlers.enter, true);
                        }
                        if (img._resizeHandlers.leave) {
                            img.removeEventListener('mouseleave', img._resizeHandlers.leave, true);
                        }
                        if (img._resizeHandlers.move) {
                            img.removeEventListener('mousemove', img._resizeHandlers.move, true);
                        }
                    }
                    
                    // Create wrapper functions that reference the current resizeState
                    const imgMouseEnterHandlerWrapper = () => {
                        if (!resizeState.isResizing && handle) {
                            showHandle();
                        }
                    };
                    const imgMouseLeaveHandlerWrapper = (e) => {
                        if (!resizeState.isResizing) {
                            hideHandle(e);
                        }
                    };
                    const imgMouseMoveHandlerWrapper = (e) => {
                        if (handle && !resizeState.isResizing) {
                            updateHandlePosition();
                            const rect = img.getBoundingClientRect();
                            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                                showHandle();
                            }
                        }
                    };
                    const handleMouseEnterHandlerWrapper = () => {
                        if (handle && !resizeState.isResizing) {
                            handle.style.setProperty('opacity', '1', 'important');
                            handle.style.setProperty('display', 'flex', 'important');
                            handle.style.setProperty('visibility', 'visible', 'important');
                            updateHandlePosition();
                        }
                    };
                    const handleMouseLeaveHandlerWrapper = (e) => {
                        if (!resizeState.isResizing) {
                            hideHandle(e);
                        }
                    };
                    
                    // Store handlers on the element so we can remove them later if needed
                    img._resizeHandlers = {
                        enter: imgMouseEnterHandlerWrapper,
                        leave: imgMouseLeaveHandlerWrapper,
                        move: imgMouseMoveHandlerWrapper
                    };
                    
                    // Use capture phase to ensure events fire
                    img.addEventListener('mouseenter', imgMouseEnterHandlerWrapper, true);
                    img.addEventListener('mouseleave', imgMouseLeaveHandlerWrapper, true);
                    img.addEventListener('mousemove', imgMouseMoveHandlerWrapper, true);
                    
                    // Mark that listeners are attached
                    img.dataset.hasResizeListeners = 'true';
                    
                    // Make sure handle is visible when mouse is over it
                    if (handle) {
                        // Remove existing listeners from handle if any
                        if (handle._resizeHandlers) {
                            if (handle._resizeHandlers.enter) {
                                handle.removeEventListener('mouseenter', handle._resizeHandlers.enter, true);
                            }
                            if (handle._resizeHandlers.leave) {
                                handle.removeEventListener('mouseleave', handle._resizeHandlers.leave, true);
                            }
                        }
                        
                        handle._resizeHandlers = {
                            enter: handleMouseEnterHandlerWrapper,
                            leave: handleMouseLeaveHandlerWrapper
                        };
                        handle.addEventListener('mouseenter', handleMouseEnterHandlerWrapper, true);
                        handle.addEventListener('mouseleave', handleMouseLeaveHandlerWrapper, true);
                    }

                    // Resize functionality
                    const startResize = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        resizeState.isResizing = true;
                        startX = e.clientX;
                        startWidth = img.offsetWidth || img.naturalWidth || 300;
                        startHeight = img.offsetHeight || img.naturalHeight || 200;
                        aspectRatio = startWidth / startHeight;

                        if (handle) {
                            handle.style.background = '#1d4ed8';
                            handle.style.transform = 'scale(1.2)';
                        }
                        document.body.style.cursor = 'nwse-resize';
                        document.body.style.userSelect = 'none';

                        const onMouseMove = (e) => {
                            if (!resizeState.isResizing) return;
                            e.preventDefault();
                            
                            const diffX = e.clientX - startX;
                            const editorWidth = editor.view.dom.offsetWidth || 800;
                            const maxWidth = Math.min(editorWidth - 40, startWidth * 3);
                            const minWidth = 100;
                            
                            let newWidth = startWidth + diffX;
                            newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
                            const newHeight = newWidth / aspectRatio;

                            requestAnimationFrame(() => {
                                if (img) {
                                    img.style.width = newWidth + 'px';
                                    img.style.height = newHeight + 'px';
                                    img.style.maxWidth = '100%';
                                    if (handle) updateHandlePosition();
                                }
                            });
                        };

                        const onMouseUp = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // Remove resize event listeners first
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);

                            // Reset resizing flag immediately
                            resizeState.isResizing = false;
                            
                            if (handle) {
                                handle.style.background = '#3b82f6';
                                handle.style.transform = 'scale(1)';
                            }
                            document.body.style.cursor = '';
                            document.body.style.userSelect = '';

                            const finalWidth = img.offsetWidth || parseInt(img.style.width) || img.naturalWidth;
                            const finalHeight = img.offsetHeight || parseInt(img.style.height) || img.naturalHeight;

                            if (img && finalWidth && finalHeight) {
                                img.style.width = finalWidth + 'px';
                                img.style.height = finalHeight + 'px';
                                img.setAttribute('width', finalWidth.toString());
                                img.setAttribute('height', finalHeight.toString());
                            }

                            // Force reset isResizing immediately
                            resizeState.isResizing = false;
                            
                            // Store image ID and current state before potential re-render
                            const imgId = img.dataset.imgId;
                            const currentImg = img;
                            
                            // Update editor content
                            if (onChange) {
                                onChange(editor.getHTML());
                            }
                            
                            // After content update, TipTap might have re-rendered the image
                            // So we need to find the image again and re-setup if needed
                            setTimeout(() => {
                                // Find the image again (it might be a new element after TipTap re-render)
                                let targetImg = currentImg;
                                if (imgId) {
                                    const newImg = editor.view.dom.querySelector(`img[data-img-id="${imgId}"]`);
                                    if (newImg) {
                                        targetImg = newImg;
                                        // Always clear state flags to force re-initialization
                                        // This ensures listeners are re-attached even if TipTap didn't replace the element
                                        targetImg.dataset.hasResizeListeners = 'false';
                                        targetImg.dataset.resizable = 'false';
                                        // Also clear any stored handlers
                                        if (targetImg._resizeHandlers) {
                                            delete targetImg._resizeHandlers;
                                        }
                                    }
                                }
                                
                                // Ensure resizeState exists and is reset
                                if (!targetImg._resizeState) {
                                    targetImg._resizeState = { isResizing: false };
                                } else {
                                    targetImg._resizeState.isResizing = false;
                                }
                                
                                // Force re-initialization by calling makeImagesResizable
                                // This will re-attach all listeners
                                makeImagesResizable();
                                
                                // Wait a bit for setup to complete, then check handle
                                setTimeout(() => {
                                    const currentHandle = document.querySelector(`.tiptap-resize-handle[data-img-id="${imgId}"]`);
                                    if (currentHandle && targetImg) {
                                        // Update handle position
                                        const rect = targetImg.getBoundingClientRect();
                                        const handleSize = 28;
                                        const offset = 2;
                                        currentHandle.style.left = `${rect.right - handleSize + offset}px`;
                                        currentHandle.style.top = `${rect.bottom - handleSize + offset}px`;
                                        
                                        // Ensure handle is ready for hover
                                        currentHandle.style.setProperty('opacity', '0', 'important');
                                        currentHandle.style.setProperty('visibility', 'visible', 'important');
                                        currentHandle.style.setProperty('display', 'flex', 'important');
                                        
                                        // Test if mouse is still over image and show handle if so
                                        const imgRect = targetImg.getBoundingClientRect();
                                        const mouseX = e.clientX;
                                        const mouseY = e.clientY;
                                        
                                        const overImage = mouseX >= imgRect.left && mouseX <= imgRect.right &&
                                                         mouseY >= imgRect.top && mouseY <= imgRect.bottom;
                                        
                                        if (overImage) {
                                            // Show handle if mouse is still over
                                            currentHandle.style.setProperty('opacity', '1', 'important');
                                        }
                                    }
                                }, 50);
                            }, 150);
                        };

                        document.addEventListener('mousemove', onMouseMove, { passive: false });
                        document.addEventListener('mouseup', onMouseUp, { passive: false });
                    };

                    handle.addEventListener('mousedown', startResize);

                    // Update handle position on scroll
                    const handleScroll = () => {
                        if (handle && handle.style.opacity === '1') {
                            updateHandlePosition();
                        }
                    };
                    window.addEventListener('scroll', handleScroll, true);
                };

                createHandle();
            });
        };

        // Make images resizable after editor is ready
        const timeoutId = setTimeout(() => {
            makeImagesResizable();
        }, 300);

        // Also make images resizable when content updates
        editor.on('update', () => {
            setTimeout(() => {
                makeImagesResizable();
            }, 300);
        });

        // Also check on selection change (when clicking on images)
        editor.on('selectionUpdate', () => {
            setTimeout(() => {
                makeImagesResizable();
            }, 100);
        });

        return () => {
            clearTimeout(timeoutId);
            // Clean up resize handles
            document.querySelectorAll('.tiptap-resize-handle').forEach(handle => {
                handle.remove();
            });
        };
    }, [editor, onChange]);

    // Get current font size from selection
    const [currentFontSize, setCurrentFontSize] = useState(16); // Default size
    
    // Update current font size when selection changes
    useEffect(() => {
        if (!editor) return;
        
        const updateFontSize = () => {
            const { from, to } = editor.state.selection;
            let fontSize = null;
            
            // Check if there's a textStyle mark with fontSize
            editor.state.doc.nodesBetween(from, to, (node, pos) => {
                if (node.isText) {
                    const marks = node.marks;
                    marks.forEach(mark => {
                        if (mark.type.name === 'textStyle' && mark.attrs.fontSize) {
                            fontSize = parseInt(mark.attrs.fontSize);
                        }
                    });
                }
            });
            
            // If no fontSize found, check computed style of selected text
            if (!fontSize) {
                // Try to get from the editor's DOM
                const { $anchor } = editor.state.selection;
                try {
                    const dom = editor.view.nodeDOM($anchor.parentOffset);
                    if (dom && dom.parentElement) {
                        const computedStyle = window.getComputedStyle(dom.parentElement);
                        const size = computedStyle.fontSize;
                        if (size) {
                            fontSize = parseInt(size.replace('px', ''));
                        }
                    }
                } catch (e) {
                    // Ignore errors
                }
            }
            
            setCurrentFontSize(fontSize || 16);
        };
        
        editor.on('selectionUpdate', updateFontSize);
        editor.on('update', updateFontSize);
        
        return () => {
            editor.off('selectionUpdate', updateFontSize);
            editor.off('update', updateFontSize);
        };
    }, [editor]);

    // Generate font size options (1px to 150px) for dropdown
    const fontSizeOptions = Array.from({ length: 150 }, (_, i) => i + 1);

    // Font size change handlers
    const increaseFontSize = () => {
        if (!editor) return;
        const newSize = Math.min(currentFontSize + 1, 150);
        editor.chain().focus().setFontSize(newSize).run();
        setCurrentFontSize(newSize);
    };

    const decreaseFontSize = () => {
        if (!editor) return;
        const newSize = Math.max(currentFontSize - 1, 1);
        editor.chain().focus().setFontSize(newSize).run();
        setCurrentFontSize(newSize);
    };

    const setFontSizeFromDropdown = (size) => {
        if (!editor) return;
        editor.chain().focus().setFontSize(size).run();
        setCurrentFontSize(size);
    };

    if (!editor) {
        return <div className="loading loading-spinner loading-lg"></div>;
    }

    return (
        <div className="tiptap-editor border-2 border-base-300 rounded-xl bg-base-100">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-3 border-b border-base-300 bg-base-200 rounded-t-xl">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r border-base-300 pr-2">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`btn btn-sm ${editor.isActive("bold") ? "btn-active" : ""}`}
                        type="button"
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`btn btn-sm ${editor.isActive("italic") ? "btn-active" : ""}`}
                        type="button"
                    >
                        <em>I</em>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`btn btn-sm ${editor.isActive("underline") ? "btn-active" : ""}`}
                        type="button"
                    >
                        <u>U</u>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`btn btn-sm ${editor.isActive("strike") ? "btn-active" : ""}`}
                        type="button"
                    >
                        <s>S</s>
                    </button>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r border-base-300 pr-2">
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`btn btn-sm ${editor.isActive("heading", { level: 1 }) ? "btn-active" : ""}`}
                        type="button"
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`btn btn-sm ${editor.isActive("heading", { level: 2 }) ? "btn-active" : ""}`}
                        type="button"
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`btn btn-sm ${editor.isActive("heading", { level: 3 }) ? "btn-active" : ""}`}
                        type="button"
                    >
                        H3
                    </button>
                </div>

                {/* Font Size Control with Dropdown and Increase/Decrease Buttons */}
                <div className="flex items-center gap-1 border-r border-base-300 pr-2">
                    {/* Decrease Button */}
                    <button
                        onClick={decreaseFontSize}
                        className="btn btn-sm btn-square"
                        type="button"
                        title="Decrease font size"
                        disabled={currentFontSize <= 1}
                    >
                        <span className="text-lg">−</span>
                    </button>
                    
                    {/* Font Size Dropdown */}
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn btn-sm min-w-[60px]">
                            {currentFontSize}px
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 max-h-60 overflow-y-auto p-2 shadow-lg border border-base-300"
                        >
                            {fontSizeOptions.map((size) => (
                                <li key={size}>
                                    <button
                                        type="button"
                                        onClick={() => setFontSizeFromDropdown(size)}
                                        className={`text-sm text-base-content hover:bg-base-200 ${
                                            size === currentFontSize ? 'bg-base-200 font-semibold' : ''
                                        }`}
                                    >
                                        {size}px
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Increase Button */}
                    <button
                        onClick={increaseFontSize}
                        className="btn btn-sm btn-square"
                        type="button"
                        title="Increase font size"
                        disabled={currentFontSize >= 150}
                    >
                        <span className="text-lg">+</span>
                    </button>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r border-base-300 pr-2">
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`btn btn-sm ${editor.isActive("bulletList") ? "btn-active" : ""}`}
                        type="button"
                    >
                        •
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`btn btn-sm ${editor.isActive("orderedList") ? "btn-active" : ""}`}
                        type="button"
                    >
                        1.
                    </button>
                </div>

                {/* Alignment */}
                <div className="flex gap-1 border-r border-base-300 pr-2">
                    <button
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        className={`btn btn-sm ${editor.isActive({ textAlign: "left" }) ? "btn-active" : ""}`}
                        type="button"
                    >
                        ⬅
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        className={`btn btn-sm ${editor.isActive({ textAlign: "center" }) ? "btn-active" : ""}`}
                        type="button"
                    >
                        ⬌
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        className={`btn btn-sm ${editor.isActive({ textAlign: "right" }) ? "btn-active" : ""}`}
                        type="button"
                    >
                        ➡
                    </button>
                </div>

                {/* Link */}
                <button
                    onClick={() => {
                        const url = window.prompt("Enter URL:");
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                    className={`btn btn-sm ${editor.isActive("link") ? "btn-active" : ""}`}
                    type="button"
                >
                    🔗
                </button>

                {/* Image */}
                <button onClick={handleImageClick} className="btn btn-sm" type="button">
                    🖼️
                </button>

                {/* Color Picker */}
                <input
                    type="color"
                    onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                    className="w-10 h-8 rounded border border-base-300 cursor-pointer"
                    title="Text Color"
                />

                {/* Clear Format */}
                <button
                    onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                    className="btn btn-sm"
                    type="button"
                >
                    Clear
                </button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    );
}

