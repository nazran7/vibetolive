import { url } from "../config";

export const getProduct = async (id: string | null): Promise<any> => {
    try {
        const response = await fetch(`${url}/api/post?id=${id}`, {
            method: 'GET',
            cache: 'no-store',
        });

        const jsonData = await response.json();

        if (response.status === 200) {
            // When getting a single post, data is the post object
            // When getting all posts, data is an array
            return jsonData.data;
        } else {
            console.error("API error:", jsonData);
            return null;
        }
    } catch (err) {
        console.error("Fetch failed:", err);
        return null;
    }
};


export const createBlogPost = async (body: any, handleSuccess: (data?: any) => void, handleError: (err?: any) => void) => {
    try {
        const response = await fetch(`${url}/api/post`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body,
        })

        const jsonData = await response.json();

        if (response.status === 201) handleSuccess(jsonData);
        else handleError(jsonData);
    } catch (err) {
        handleError(err);
    }
}


// ---------------- GET PAGINATED ----------------
export const getPaginatedPosts = async (page = 1, limit = 10): Promise<any> => {
    try {
        const response = await fetch(`${url}/api/post/paginated?page=${page}&limit=${limit}`, {
            method: "GET",
            cache: "no-store",
        });

        const jsonData = await response.json();

        if (response.status === 200) {
            return jsonData.data; // { posts, total, page, pages }
        } else {
            console.error("API error:", jsonData);
            return null;
        }
    } catch (err) {
        console.error("Fetch failed:", err);
        return null;
    }
};

// ---------------- UPDATE ----------------
export const updateBlogPost = async (
    id: string,
    body: any,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {
    try {
        const response = await fetch(`${url}/api/post/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body, // must be FormData if uploading featuredImage
        });

        const jsonData = await response.json();

        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);
    } catch (err) {
        handleError(err);
    }
};

// ---------------- DELETE ----------------
export const deleteBlogPost = async (
    id: string,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {
    try {
        const response = await fetch(`${url}/api/post/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        const jsonData = await response.json();

        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);
    } catch (err) {
        handleError(err);
    }
};

// ---------------- UPLOAD IMAGE ----------------
export const uploadImage = async (file: File): Promise<string | null> => {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${url}/api/post/upload-image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: formData,
        });

        const jsonData = await response.json();

        if (response.status === 200 && jsonData.data?.url) {
            // Return full URL
            return `${url}${jsonData.data.url}`;
        } else {
            console.error("Image upload error:", jsonData);
            return null;
        }
    } catch (err) {
        console.error("Image upload failed:", err);
        return null;
    }
};