import { url } from "../config";

export const getProduct = async (id: string | null): Promise<any[]> => {
    try {
        const response = await fetch(`${url}/api/post?id=${id}`, {
            method: 'GET',
            cache: 'no-store',
            next: { revalidate: 60 },
        });

        const jsonData = await response.json();

        if (response.status === 200) {
            return jsonData.data.data;
        } else {
            console.error("API error:", jsonData);
            return [];
        }
    } catch (err) {
        console.error("Fetch failed:", err);
        return [];
    }
};
