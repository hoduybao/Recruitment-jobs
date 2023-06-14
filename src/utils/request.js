import axios from 'axios';
import { authHeader, authPost } from './auth';
const request = axios.create({
    baseURL: 'https://hiringweb.up.railway.app/',
});

class UserService {
    getTopCompany = async (path, options = {}) => {
        const response = await request.get(path, options);
        return response.data;
    };
    postLogin = async (path, options = {}) => {
        const response = await request.post(path, options);
        return response.data;
    };
    getUser = async (path, options = {}) => {
        const headers = authHeader();
        const response = await request.get(path, { headers });
        return response.data;
    };
    searchJob = async (path, options = {}) => {
        const response = await request.get(path, options);
        return response.data;
    };
    postJob = async (path, options = {}) => {
        const headers = authHeader();
        const response = await request.post(path, options, { headers });
        return response.data;
    };

    GetCompany = async (path, options = {}) => {
        const response = await request.get(path, options);
        return response.data;
    };

    getJobPosting = async (path, options = {}) => {
        const response = await request.get(path, options);
        return response.data;
    };

    myInfoEmployer = async (path, options = {}) => {
        const response = await request.get(path, options);
        return response.data;
    };
    applyJob = async (path, options = {}) => {
        const headers = authPost();
        const response = await request.post(path, options, { headers });
        return response.data;
    };
    reportJob= async (path, options = {}) => {
        const headers = authHeader();
        const response = await request.post(path, options, { headers });
        return response.data;
    };
    changePassword= async (path, options = {}) => {
        const headers = authHeader();
        const response = await request.post(path, options, { headers });
        return response.data;
    };
    forgetPassword= async (path, options = {}) => {
        const response = await request.post(path, options);
        return response.data;
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
