"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Extension } from "@tiptap/core";
import { useEffect } from "react";

// Custom Font Size Extension (same as in TipTapEditor)
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
                        parseHTML: (element) => {
                            const fontSize = element.style.fontSize;
                            if (!fontSize) return null;
                            return fontSize.replace("px", "");
                        },
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
});

export default function ReadOnlyTipTap({ value }) {
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
                openOnClick: true,
                HTMLAttributes: {
                    class: "text-primary hover:underline",
                    target: "_blank",
                    rel: "noopener noreferrer",
                },
            }),
            Underline,
            Image.extend({
                addAttributes() {
                    return {
                        ...this.parent?.(),
                        width: {
                            default: null,
                            parseHTML: element => element.getAttribute('width'),
                            renderHTML: attributes => {
                                if (!attributes.width) {
                                    return {};
                                }
                                return {
                                    width: attributes.width,
                                    style: `width: ${attributes.width}px;`,
                                };
                            },
                        },
                        height: {
                            default: null,
                            parseHTML: element => element.getAttribute('height'),
                            renderHTML: attributes => {
                                if (!attributes.height) {
                                    return {};
                                }
                                return {
                                    height: attributes.height,
                                    style: `height: ${attributes.height}px;`,
                                };
                            },
                        },
                    };
                },
            }).configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    class: "max-w-full h-auto rounded-lg my-4",
                },
            }),
        ],
        content: value || "",
        editable: false,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-base-content",
            },
        },
    });

    useEffect(() => {
        if (editor && value !== undefined) {
            editor.commands.setContent(value || "");
        }
    }, [value, editor]);

    if (!editor) {
        return <div className="loading loading-spinner loading-lg"></div>;
    }

    return (
        <div className="tiptap-readonly text-base-content">
            <EditorContent editor={editor} />
        </div>
    );
}

