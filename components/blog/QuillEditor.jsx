"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function QuillEditor({ value, onChange, placeholder }) {
    const editorContainerRef = useRef(null);
    const quillInstanceRef = useRef(null);
    const setupDoneRef = useRef(false);

    const makeImageResizable = (img, quill) => {
        // Skip if already processed - check more thoroughly
        if (img.dataset.resizable === 'true') {
            // Still check if handle exists, if not, recreate it
            const existingHandleId = img.dataset.imgId;
            if (existingHandleId) {
                const editorRoot = quill.root.closest('.ql-container') || quill.root.parentElement;
                const overlayContainer = editorRoot?.querySelector('.ql-image-overlay-container');
                const existingHandle = overlayContainer?.querySelector(`.ql-image-resize-handle[data-img-id="${existingHandleId}"]`);
                if (existingHandle) {
                    return; // Already has a handle, skip
                }
            }
        }
        img.dataset.resizable = 'true';

        // Prevent image dragging
        img.draggable = false;
        img.style.userSelect = 'none';
        img.style.cursor = 'default';

        // Ensure image has proper initial styling
        if (!img.style.maxWidth) {
            img.style.maxWidth = '100%';
        }

        let isResizing = false;
        let startX, startWidth, startHeight, aspectRatio;
        let handle = null;

        // Create unique ID for this image if not exists
        if (!img.dataset.imgId) {
            img.dataset.imgId = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        }

        // Get or create overlay container (outside Quill's DOM)
        const editorRoot = quill.root.closest('.ql-container') || quill.root.parentElement;
        let overlayContainer = editorRoot.querySelector('.ql-image-overlay-container');
        if (!overlayContainer) {
            overlayContainer = document.createElement('div');
            overlayContainer.className = 'ql-image-overlay-container';
            overlayContainer.style.cssText = `
                position: relative;
                pointer-events: none;
                z-index: 1000;
            `;
            // Insert after the editor
            if (editorRoot.parentElement) {
                editorRoot.parentElement.insertBefore(overlayContainer, editorRoot.nextSibling);
            }
        }

        // Remove ALL existing handles for this image (in case of duplicates)
        const existingHandles = overlayContainer.querySelectorAll(`.ql-image-resize-handle[data-img-id="${img.dataset.imgId}"]`);
        existingHandles.forEach(h => h.remove());
        
        // Create resize handle in overlay (completely outside Quill's DOM)
        handle = document.createElement('div');
        handle.className = 'ql-image-resize-handle';
        handle.setAttribute('data-img-id', img.dataset.imgId);
        handle.innerHTML = '⤢';
        handle.setAttribute('title', 'Drag to resize image');
        handle.style.cssText = `
            position: fixed;
            width: 28px;
            height: 28px;
            background: #3b82f6;
            border: 3px solid white;
            border-radius: 6px;
            cursor: nwse-resize;
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 3px 8px rgba(0,0,0,0.4);
            color: white;
            font-size: 16px;
            font-weight: bold;
            user-select: none;
            pointer-events: auto;
            transition: transform 0.2s, background 0.2s;
        `;
        overlayContainer.appendChild(handle);

        // Position handle using fixed positioning (no DOM modification in Quill)
        const updateHandlePosition = () => {
            if (!handle || !img) return;
            const rect = img.getBoundingClientRect();
            // Only show if image is visible in viewport
            if (rect.width > 0 && rect.height > 0) {
                handle.style.left = `${rect.right - 10}px`;
                handle.style.top = `${rect.bottom - 10}px`;
            }
        };

        let hideTimeout = null;
        let isHovering = false;
        let scrollTimeout = null;

        // Hide handle on scroll
        const handleScroll = () => {
            if (handle && !isResizing) {
                handle.style.display = 'none';
                isHovering = false;
            }
            // Update position if handle is visible
            if (handle && handle.style.display === 'flex') {
                updateHandlePosition();
            }
        };

        // Throttled scroll handler
        const throttledScroll = () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(handleScroll, 50);
        };

        // Add scroll listeners
        window.addEventListener('scroll', throttledScroll, true);
        const editorElement = quill.root.closest('.ql-container') || quill.root.parentElement;
        if (editorElement) {
            editorElement.addEventListener('scroll', throttledScroll, true);
        }

        // Show handle on hover
        const showHandleFn = () => {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
            if (!isResizing && handle) {
                isHovering = true;
                updateHandlePosition();
                handle.style.display = 'flex';
                handle.style.transform = 'scale(1.1)';
                handle.style.background = '#2563eb';
            }
        };

        const hideHandleFn = () => {
            // Delay hiding to allow mouse to move to handle
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            hideTimeout = setTimeout(() => {
                // Check if mouse is over handle before hiding
                if (handle && !isResizing) {
                    const handleRect = handle.getBoundingClientRect();
                    const mouseX = window.event?.clientX || 0;
                    const mouseY = window.event?.clientY || 0;
                    
                    const isOverHandle = mouseX >= handleRect.left && 
                                        mouseX <= handleRect.right &&
                                        mouseY >= handleRect.top && 
                                        mouseY <= handleRect.bottom;
                    
                    if (!isOverHandle && !isHovering) {
                        handle.style.display = 'none';
                        handle.style.transform = 'scale(1)';
                        handle.style.background = '#3b82f6';
                    }
                }
                hideTimeout = null;
            }, 100);
        };

        // Use image and handle for hover detection
        img.addEventListener('mouseenter', showHandleFn);
        img.addEventListener('mouseleave', hideHandleFn);
        
        // Keep handle visible when hovering over it
        if (handle) {
            handle.addEventListener('mouseenter', () => {
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
                isHovering = true;
                if (!isResizing && handle) {
                    updateHandlePosition();
                    handle.style.display = 'flex';
                    handle.style.transform = 'scale(1.1)';
                    handle.style.background = '#2563eb';
                }
            });
            
            handle.addEventListener('mouseleave', () => {
                isHovering = false;
                if (!isResizing && handle) {
                    handle.style.display = 'none';
                    handle.style.transform = 'scale(1)';
                    handle.style.background = '#3b82f6';
                }
            });
        }

        // Cleanup function to remove scroll listeners
        const cleanup = () => {
            window.removeEventListener('scroll', throttledScroll, true);
            if (editorElement) {
                editorElement.removeEventListener('scroll', throttledScroll, true);
            }
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };

        // Store cleanup function on image for later removal
        img.dataset.cleanupResize = 'true';
        if (!img._resizeCleanup) {
            img._resizeCleanup = cleanup;
        }

        // Resize functionality
        const startResize = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            isResizing = true;
            startX = e.clientX;
            startWidth = img.offsetWidth || img.naturalWidth || img.width || 300;
            startHeight = img.offsetHeight || img.naturalHeight || img.height || 200;
            aspectRatio = startWidth / startHeight;

            // Visual feedback
            if (handle) {
                handle.style.background = '#1d4ed8';
                handle.style.transform = 'scale(1.2)';
            }
            document.body.style.cursor = 'nwse-resize';
            document.body.style.userSelect = 'none';

            const onMouseMove = (e) => {
                if (!isResizing) return;
                e.preventDefault();
                e.stopPropagation();
                
                const diffX = e.clientX - startX;
                const editorWidth = quill.root.offsetWidth || 800;
                const maxWidth = Math.min(editorWidth - 40, startWidth * 3);
                const minWidth = 100;
                
                let newWidth = startWidth + diffX;
                newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
                const newHeight = newWidth / aspectRatio;

                // Update image size using requestAnimationFrame to avoid Quill conflicts
                requestAnimationFrame(() => {
                    if (img) {
                        img.style.width = newWidth + 'px';
                        img.style.height = newHeight + 'px';
                        img.style.maxWidth = '100%';
                        img.removeAttribute('width');
                        img.removeAttribute('height');
                        if (handle && isResizing) {
                            updateHandlePosition();
                        }
                    }
                });
            };

            const onMouseUp = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                isResizing = false;
                if (handle) {
                    handle.style.background = '#3b82f6';
                    handle.style.transform = 'scale(1)';
                }
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                
                // Get the final size before updating (extract numeric value)
                const finalWidth = img.offsetWidth || parseInt(img.style.width) || img.naturalWidth;
                const finalHeight = img.offsetHeight || parseInt(img.style.height) || img.naturalHeight;
                
                // Ensure the size is persisted in the image element
                if (img && finalWidth && finalHeight) {
                    // Set both style and attributes
                    img.style.width = finalWidth + 'px';
                    img.style.height = finalHeight + 'px';
                    img.setAttribute('width', finalWidth.toString());
                    img.setAttribute('height', finalHeight.toString());
                }
                
                // Update quill content to persist the size - use longer delay and ensure it happens
                setTimeout(() => {
                    // Double-check the size is still there
                    if (img && finalWidth && finalHeight) {
                        img.style.width = finalWidth;
                        img.style.height = finalHeight;
                    }
                    // Update Quill's content
                    if (onChange) {
                        const content = quill.root.innerHTML;
                        onChange(content);
                    }
                }, 200);
            };

            document.addEventListener('mousemove', onMouseMove, { passive: false });
            document.addEventListener('mouseup', onMouseUp, { passive: false });
        };

        // Attach resize to handle
        if (handle) {
            handle.addEventListener('mousedown', startResize);
        }
    };

    const setupQuillEditor = (quill) => {
        if (setupDoneRef.current) return;
        setupDoneRef.current = true;
        quillInstanceRef.current = quill;

        // Custom image handler with resizing - upload to server instead of base64
        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', async function() {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            
            input.onchange = async () => {
                const file = input.files[0];
                if (file) {
                    const range = quill.getSelection(true);
                    
                    // Show loading indicator
                    const loadingText = 'Uploading image...';
                    quill.insertText(range.index, loadingText);
                    quill.setSelection(range.index + loadingText.length);
                    
                    try {
                        // Import uploadImage function dynamically
                        const { uploadImage } = await import('@/api-gateways/post');
                        const imageUrl = await uploadImage(file);
                        
                        if (imageUrl) {
                            // Remove loading text
                            quill.deleteText(range.index, loadingText.length);
                            
                            // Insert image with server URL
                            quill.insertEmbed(range.index, 'image', imageUrl, 'user');
                            
                            // Make image resizable after Quill finishes updating
                            setTimeout(() => {
                                requestAnimationFrame(() => {
                                    const img = quill.root.querySelector(`img[src="${imageUrl}"]`);
                                    if (img) {
                                        img.style.maxWidth = '100%';
                                        img.style.height = 'auto';
                                        makeImageResizable(img, quill);
                                    }
                                });
                            }, 200);
                        } else {
                            // Remove loading text and show error
                            quill.deleteText(range.index, loadingText.length);
                            quill.insertText(range.index, 'Image upload failed. Please try again.');
                        }
                    } catch (error) {
                        console.error('Image upload error:', error);
                        quill.deleteText(range.index, loadingText.length);
                        quill.insertText(range.index, 'Image upload failed. Please try again.');
                    }
                }
            };
        });

        // Make existing images resizable
        const makeAllImagesResizable = () => {
            // Use requestAnimationFrame to avoid conflicts with Quill's update cycle
            requestAnimationFrame(() => {
                const images = quill.root.querySelectorAll('img');
                images.forEach(img => {
                    // Check if already processed AND has a valid handle
                    const imgId = img.dataset.imgId;
                    if (img.dataset.resizable === 'true' && imgId) {
                        const editorRoot = quill.root.closest('.ql-container') || quill.root.parentElement;
                        const overlayContainer = editorRoot?.querySelector('.ql-image-overlay-container');
                        const existingHandle = overlayContainer?.querySelector(`.ql-image-resize-handle[data-img-id="${imgId}"]`);
                        if (!existingHandle) {
                            // Handle was removed, recreate it
                            img.dataset.resizable = 'false';
                            makeImageResizable(img, quill);
                        }
                    } else if (img.dataset.resizable !== 'true') {
                        makeImageResizable(img, quill);
                    }
                });
            });
        };

        // Check for images on content change - but delay to avoid Quill update conflicts
        const observer = new MutationObserver(() => {
            // Delay to let Quill finish its update cycle
            setTimeout(makeAllImagesResizable, 150);
        });
        
        // Only observe childList changes, not attributes to avoid conflicts
        observer.observe(quill.root, { 
            childList: true, 
            subtree: true 
        });
        
        // Initial check with delay to ensure DOM is ready
        setTimeout(makeAllImagesResizable, 300);
        
        // Also check when content changes - but after Quill finishes
        quill.on('text-change', () => {
            setTimeout(makeAllImagesResizable, 150);
        });
    };

    // Setup editor when component mounts
    useEffect(() => {
        const setupEditor = () => {
            if (editorContainerRef.current) {
                const quillElement = editorContainerRef.current.querySelector('.ql-container');
                if (quillElement) {
                    // Try to get Quill instance from the DOM
                    const quill = quillElement.__quill || (window.Quill && window.Quill.find(quillElement));
                    if (quill && !setupDoneRef.current) {
                        setupQuillEditor(quill);
                    }
                }
            }
        };

        // Try immediately
        setupEditor();

        // Also try after a delay to ensure ReactQuill is fully loaded
        const timeoutId = setTimeout(setupEditor, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    // Also setup when value changes (for existing content)
    useEffect(() => {
        if (quillInstanceRef.current && !setupDoneRef.current) {
            setupQuillEditor(quillInstanceRef.current);
        } else if (editorContainerRef.current) {
            const quillElement = editorContainerRef.current.querySelector('.ql-container');
            if (quillElement) {
                const quill = quillElement.__quill || (window.Quill && window.Quill.find(quillElement));
                if (quill && !setupDoneRef.current) {
                    setupQuillEditor(quill);
                }
            }
        }
    }, [value]);

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                ["link", "image"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ["clean"],
            ],
        }
    };

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'blockquote', 'code-block',
        'link', 'image', 'align', 'color', 'background'
    ];

    return (
        <div className="quill-editor" ref={editorContainerRef}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                modules={modules}
                formats={formats}
                style={{ minHeight: '400px' }}
            />
        </div>
    );
}
