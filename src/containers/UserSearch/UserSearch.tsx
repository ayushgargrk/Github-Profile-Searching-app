import { ChangeEvent, useEffect, useState } from 'react'
import { InputBox } from './../../components/InputBox'
import { useSearchParams } from 'react-router-dom/'
import { UserCard } from './../UserCard'
import {API} from './../../services/services'

export interface user {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    score: number;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}

export const UserSearch = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const [userName, setUserName] = useState<string>('');
    const [userArray, setUserArray] = useState<Array<user>>([]);
    const [isLoader, setLoader] = useState<boolean>(false);

    const urlUserName = searchParam.get('username');

    const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setTimeout(()=>{
            setUserName(e.target.value);
            setSearchParam({ 'username': e.target.value });
        }, 2000);
    }

    const getAllUsers = async (name: string) => {
        setLoader(true);
        const response = await API.getAllUser(name);
        if(response.status == 200){
            setUserArray(response.data.items);
        }
        setLoader(false);
    }

    useEffect(() => {
        if (urlUserName !== null) {
            getAllUsers(urlUserName);
        }
    }, [userName]);

    return (
        <>
            {
                isLoader ? (
                    <div className='bg-light my-3'>
                        <p className='text-center'>...Loading</p>
                    </div>
                ) : (
                    <div>
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="input-group mb-3 my-3 w-25">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon3">@</span>
                                </div>
                                <InputBox type={'text'} className={'form-control'} defaultValue={userName} onChange={onChangeUserName} />
                            </div>
                        </div>

                        {
                            userArray.length != 0 ? (
                                <ul className='nav nav-list my-5'>
                                    {userArray.map((user) => (
                                        <li key={user.id} className={'mx-2 bg-light'}>
                                            <UserCard username={user.login} avatar_url={user.avatar_url} />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className='my-2'>
                                    <p className='text-center'>Enter the Username you want to search</p>
                                </div>
                            )
                        }

                    </div>
                )
            }
        </>
    )
}