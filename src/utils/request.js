import axios from 'axios'
import authHeader from './auth';

const request = axios.create({
    baseURL: 'https://hiringweb.up.railway.app/'
})

class UserService {
   
    getTopCompany=async(path,options={})=>{
        const response=await request.get(path,options);
        return response.data;
    }
    postLogin=async(path,options={})=>{
        const response=await request.post(path,options);
        return response.data;
    }
    getUser=async(path,options={})=>{
        const headers=authHeader();
        const response=await request.get(path, {headers});
        return response.data;
    }
    searchJob=async(path,options={})=>{
        const response=await request.get(path,options);
        return response.data;
    }

    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();




