import { url } from "@/config";
import nookies from "nookies";


export const checkAdminAuth = async(ctx) => {

    const { accessToken } = nookies.get(ctx);

    if (!accessToken) return null;

    try {
        const res = await fetch(`${url}/api/user/get_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!res.ok) return null;

        const user = await res.json();

        return user?.is_admin || user?.is_super_admin ? user : null;
    } catch {
        return null;
    }
}