import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {githubUser} from './../../containers/UserProfile/UserProfile'
import {API} from './../../services/services'

interface userProps extends githubUser{
    isLogin: boolean;
    isLoading: boolean;
    error: string;
    token: string;
}

const initialState: userProps = {
    avatar_url: '',
    events_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    gravatar_id: '',
    html_url: '',
    id: 0,
    login: '',
    node_id: '',
    organizations_url: '',
    received_events_url: '',
    repos_url: '',
    score: 0,
    site_admin: false,
    starred_url: '',
    subscriptions_url: '',
    type: '',
    url: '',
    name: '',
    company: '',
    blog: '',
    location: '',
    email: '',
    hireable: false,
    bio: '',
    twitter_username: '',
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '',
    updated_at: '',
    isLogin: false,
    isLoading: false,
    error: '',
    token: '',
}


export const loginUser = createAsyncThunk(
    'login/loginUser',
    async ({username, token}: {username: string, token: string}) => {
        const response = await API.loginUser(username, token);
        if(response.status == 200){
            return {
                ...response.data,
                token : token,
            }
        }else{
            throw new Error('Authentication failed');
        }
    }
)


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        resetError: (state) => {
            state.error = '';
        },
        increaseFollowers: (state) => {
            state.following+=1;
        },
        decreaseFollowers: (state) => {
            state.following-=1;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(loginUser.fulfilled, (state, action)=>{
            return{
                ...action.payload,
                isLoading: false,
                isLogin: true,
                error: '',
            }
        })

        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLogin = false;
            state.isLoading = false;
            state.error = action.error.message || 'Authentication failed';
        })
    },
});

export const {
    logout, resetError, increaseFollowers, decreaseFollowers
} = loginSlice.actions;

export default loginSlice.reducer;