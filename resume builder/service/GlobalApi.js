import axios from 'axios';

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
// Changed to HTTP since we're in development, and removed 'https'
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

// Add response interceptor for error handling
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error?.response?.data || error.message);
        if (error.code === 'ERR_NETWORK') {
            console.error('Network Error: Please check if Strapi server is running');
        }
        if (error.response?.status === 401) {
            console.error('Unauthorized: Please check your API key');
        }
        return Promise.reject(error);
    }
);

export const CreateNewResume = async (data) => {
    try {
        const response = await axiosClient.post('/user-resumes', { data });
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUserResumes = async (userEmail) => {
    try {
        const response = await axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${encodeURIComponent(userEmail)}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const UpdateResumeDetail = async (id, data) => {
    try {
        const response = await axiosClient.put(`/user-resumes/${id}`, { data });
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetResumeById = async (id) => {
    try {
        const response = await axiosClient.get(`/user-resumes/${id}?populate=*`);
        return response;
    } catch (error) {
        throw error;
    }
};

const GlobalApi = {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById
};

export default GlobalApi;