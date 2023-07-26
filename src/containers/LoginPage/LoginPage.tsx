import { selectLoginState, useAppDispatch } from './../../store'
import { InputBox } from './../../components/InputBox'
import { loginUser, resetError } from './../../feature/login/loginSlice'
import { ChangeEvent, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export const LoginPage = () => {

    const [userName, setUserName] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const dispatch = useAppDispatch();
    const {error} = selectLoginState();

    const setUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }
    
    const settoken = (e: ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value);
    }

    const logInUser =(event: { preventDefault: () => void }) => {
        event.preventDefault(); 
        dispatch(loginUser({username: userName, token}));
    }

    useEffect(() => {
        dispatch(resetError());
    }, [userName, token]);

    return (
        <div className="d-flex justify-content-center align-items-center my-5">
            <div className="d-flex justify-content-between border border border-1 w-50">
                <div className='w-50'>
                    <div>
                        <h2 className="text-center text-primary my-2">Profile Searching</h2>
                        <h6 className="mt-4 mb-3 mx-2 text-center">Sign in to the app</h6>
                    </div>

                    <div>
                        <form onSubmit={logInUser}>
                            <div>
                                <span className='mx-2'>Enter your username</span>
                                <div className="input-group mb-3 my-3 w-75 mx-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">@</span>
                                    </div>
                                    <InputBox type={'text'} className={'form-control'} onChange={setUsername} required/>
                                </div>
                            </div>
                            <div>
                                <span className='mx-2'>Enter the token</span>
                                <div className="input-group mb-3 my-3 w-75 mx-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">#</span>
                                    </div>
                                    <InputBox type={'text'} className={'form-control'} onChange={settoken} required/>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <button type='submit' className='btn btn-primary px-4 mb-4'>Login</button>
                            </div>
                            {
                                error != ''?(
                                    <p className='text-center text-danger'>{error}</p>
                                ):(
                                    null
                                )
                            }
                        </form>
                    </div>
                </div>
                <div className='bg-dark w-50'>
                    <p className='text-center text-light mt-5'>Dont have a token?</p>
                    <p className='text-center text-light mt-2'>Click on the below button to create a token</p>
                    
                    <div className='d-flex justify-content-center align-items-center'>
                        <NavLink className='btn btn-primary px-4 mb-4' to = {'https://github.com/settings/tokens'}>Token</NavLink>
                    </div>

                </div>
            </div>
        </div>
    )
}