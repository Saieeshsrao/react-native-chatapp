// export const baseUrl = "http://10.0.2.2:5000/api";
export const baseUrl ="http://192.168.1.4:5000/api" // Ensure this is accessible from the device/emulator

export const postRequest = async (url, body) => {
    try {
        console.log("body", JSON.stringify(body));
        console.log("url", url);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body), // Ensure the body is properly stringified
        });
        console.log("response", response);

        const data = await response.json();
        
        if (!response.ok) {
            let message = data?.message || "An error occurred";
            return { error: true, message };
        }

        return data;
    } catch (error) {
        return { error: true, message: error.message || "Network error occurred" };
    }
};

export const getRequest = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            let message = data?.message || "An error occurred";
            return { error: true, message };
        }

        return data;
    } catch (error) {
        return { error: true, message: error.message || "Network error occurred" };
    }
};
