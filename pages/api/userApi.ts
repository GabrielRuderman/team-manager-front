import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/users";

export const createUser = async (email: string, name: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/createUser`,
            { email, name, password },
            { headers: { "Content-Type": "application/json" } });
        return response.data;
    } catch (error) {
        console.error("Error fetching createUser:", error);
        throw error;
    }
};

export const validateCredentials = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/validateCredentials`,
            { email, password },
            { headers: { "Content-Type": "application/json" } });
        return response.data;
    } catch (error) {
        console.error("Error fetching validateCredentials:", error);
        throw error;
    }
};

export const validateToken = async () => {
    try {
        const authToken = document.cookie.split("; ").find(row => row.startsWith("authToken="))?.split("=")[1];
        if (!authToken) return;
        
        const response = await axios.post(`${API_BASE_URL}/validateToken`, { },
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${authToken}` } });
        return response.data;
    } catch (error) {
        console.error("Error fetching validateCredentials:", error);
        throw error;
    }
};

export const recoverPassword = async (email: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recoverPassword`,
            { params: { email: email }});
        return response.data;
    } catch (error) {
        console.error("Error fetching recoverPassword:", error);
        throw error;
    }
};