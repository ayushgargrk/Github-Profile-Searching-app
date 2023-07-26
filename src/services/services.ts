import axios, {AxiosResponse } from 'axios';
import {URL} from './urls';

export const getAllUser = async (username: string): Promise<AxiosResponse> => {
    const url = URL.SEARCH_ALL_USER + username;

    try{
        return await axios.get(url);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
        return error.response;
    }
}

export const getUserDetails = async (username: string | undefined): Promise<AxiosResponse> => {
    const url = URL.SINGLE_USER + username;

    try{
        return await axios.get(url);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
        return error.response;
    }
}

export const loginUser = async (username: string, token: string): Promise<AxiosResponse> => {
    const url = URL.LOGIN + 'user';
    const headers = {Authorization: `Bearer ${token}`};

    try{
        return await axios.get(url, {headers});
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
        return error.response;
    }
}

export const isFollowing = async (username: string | undefined, token: string): Promise<AxiosResponse> => {
    const url = URL.CHECK_FOLLOWING + username;
    const headers = {Authorization: `Bearer ${token}`}

    try{
        return await axios.get(url, {headers});
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
        return error.response;
    }
}

export const followUser = async (username: string| undefined, token: string): Promise<AxiosResponse> => {
    const url = URL.FOLLOW_UNFOLLOW_USER + username;
    const headers = {Authorization: `Bearer ${token}`}
    const body = {};

    try{
        return await axios.put(url, body, {headers});
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
        return error.response;
    }
}

export const unfollowUser = async (username: string| undefined, token: string): Promise<AxiosResponse> => {
    const url = URL.FOLLOW_UNFOLLOW_USER + username;
    const headers = {Authorization: `Bearer ${token}`}

    try{
        return await axios.delete(url, {headers});
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
        return error.response;
    }
}

export const API = {
    getAllUser,
    getUserDetails,
    loginUser,
    isFollowing,
    followUser,
    unfollowUser,
}

