"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function ReadOnlyQuill({ value }) {
    return (
        <div className="quill-readonly text-base-content">
            <ReactQuill theme="bubble" value={value || ""} readOnly modules={{ toolbar: false }} />
        </div>
    );
}


