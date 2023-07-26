import githubLink from './../../assets/githublink.png'
import blog from './../../assets/blog.jpeg'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { user } from './../UserSearch/UserSearch'
import { Image } from './../../components/Image';
import { API } from './../../services/services';
import { selectLoginState, useAppDispatch } from './../../store';
import { increaseFollowers, decreaseFollowers } from './../../feature/login/loginSlice';

export interface githubUser extends user {
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

const defaultUser: githubUser = {
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
}

export const UserProfile = () => {
    const { username } = useParams();
    const dispatch = useAppDispatch();
    const [userDetails, setUserDetails] = useState<githubUser>(defaultUser);
    const [isLoader, setLoader] = useState<boolean>(true);
    const { isLogin, token } = selectLoginState();
    const [following, setFollowing] = useState<boolean>(false);

    const getUserDetails = async () => {
        const response = await API.getUserDetails(username);
        if (response.status == 200) {
            setUserDetails(response.data);
        }

        setLoader(false);
    }

    const checkFollowing = async () => {
        setLoader(true);
        const response = await API.isFollowing(username, token);
        if(response.status === 204){
            setFollowing(true);
        }else if(response.status === 404){
            setFollowing(false);
        }

        setLoader(false);
    }

    const followUser = async () => {
        setLoader(true);
        const response = await API.followUser(username, token);
        if(response.status === 204){
            const newState = {...userDetails, followers: userDetails.followers + 1};
            dispatch(increaseFollowers());
            setUserDetails(newState);
            setFollowing(true);
            setLoader(false);
        }
    }

    const unFollowUser = async () => {
        setLoader(true);
        const response = await API.unfollowUser(username, token);
        if(response.status === 204){
            const newState = {...userDetails, followers: userDetails.followers - 1};
            dispatch(decreaseFollowers());
            setUserDetails(newState);
            setFollowing(false);
            setLoader(false);
        }
    }


    useEffect(() => {
        getUserDetails();
        if(isLogin){
            checkFollowing();
        }
    },[]);

    return (
        <>
            {
                isLoader ? (
                    <div className='my-3 bg-light'>
                        <p className='text-center'>...Loading</p>
                    </div>
                ) : (
                    <div className='container d-flex justify-content-center align-items-center my-5'>
                        <div className='border border-dark'>
                            <div className='d-flex justify-content-between'>
                                <div className='mx-2 my-2'>
                                    <Image src={userDetails.avatar_url} height={100} width={100} />
                                </div>
                                <div className='mx-5 mt-2'>
                                    <p>{userDetails.location}</p>
                                    <p>Following: {userDetails.following}</p>
                                    <p>Followers: {userDetails.followers}</p>
                                </div>
                                <div>
                                    <div>
                                        <a href={userDetails.html_url}>
                                            <Image src={githubLink} width={50} height={50} />
                                        </a>
                                    </div>

                                    <div className='my-2'>
                                        <a href={userDetails.blog}>
                                            <Image src={blog} width={50} height={50} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className='text-center my-2'>{userDetails.login}</h4>
                            </div>

                            <div className='my-2'>
                                <p>{userDetails.email}</p>
                            </div>

                            <h5 className='mx-2'>Bio</h5>

                            <div className='border border-sucess'>
                                <p className='mx-2'>{userDetails.bio}</p>
                            </div>
                            {
                                isLogin ? (
                                        <div className='my-3 d-flex justify-content-center align-items-center'>
                                            <button className='btn btn-primary' onClick={following? unFollowUser: followUser}>{following ? 'Unfollow me' : 'Follow me'}</button>
                                        </div>

                                ) : (
                                    null
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}