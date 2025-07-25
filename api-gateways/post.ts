import { url } from "../config";

export const getProduct = async (id: string | null): Promise<any[]> => {
    try {
        const response = await fetch(`${url}/api/post?id=${id}`, {
            method: 'GET',
            cache: 'no-store',
        });

        const jsonData = await response.json();

        if (response.status === 200) {
            return jsonData.data;
        } else {
            console.error("API error:", jsonData);
            return [];
        }
    } catch (err) {
        console.error("Fetch failed:", err);
        return [];
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