import { url } from "@/config";

export const loginUser = async (
    body: Object,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {
    try {
        const response = await fetch(`${url}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        const jsonData = await response.json();

        if (response.status === 200) handleSuccess(jsonData);
        else handleError(jsonData);

    } catch (err) {
        handleError(err);
    }
}


export const getUser = async (handleSuccess: (data?: any) => void, handleError: (err?: any) => void) => {
    await fetch(`${url}/api/user/get_user`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
        .then((res) => {
            if (res.status !== 200) {
                throw new Error('Network request failed');
            } else {
                return res.json();
            }
        })
        .then((data) => {
            handleSuccess(data);
        })
        .catch((error) => {
            handleError(error.message);
        });
}


export const createAdminUser = async (
    body: Object,
    handleSuccess: (data?: any) => void,
    handleError: (err?: any) => void
) => {
    try {
        const response = await fetch(`${url}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(body)
        });

        const jsonData = await response.json();

        if (response.status === 201) handleSuccess(jsonData);
        else handleError(jsonData);

    } catch (err) {
        handleError(err);
    }
}