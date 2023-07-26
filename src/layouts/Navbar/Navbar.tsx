import { selectLoginState, useAppDispatch } from './../../store';
import homelogo from './../../assets/homelogo.png';
import { Image } from './../../components/Image';
import { logout } from './../../feature/login/loginSlice';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {

    const dispatch = useAppDispatch();
    const { isLogin } = selectLoginState();

    const logOutUser = () => {
        dispatch(logout());
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
            <NavLink to='/ayushgargrk.github.io/Github-Profile-Searching-app/' className={'d-flex text-decoration-none'}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Image src={homelogo} width={100} height={80} className={'mx-2'} />
                    </li>
                    <li className="nav-item">
                        <a className="nav-link my-3 mx-2" href="#">Github Profile Searching</a>
                    </li>
                </ul>
            </NavLink>

            {isLogin ? (
                <ul className='navbar-nav d-flex justify-content-between me-3'>
                    <li className='nav-item active ps-2 pe-2 mx-2'>
                        <NavLink to={'/Github-Profile-Searching-app/profile'}>
                            <span className='btn btn-primary p-2 ps-4 pe-4'>
                                Profile
                            </span>
                        </NavLink>
                    </li>

                    <li className='nav-item active ps-2 pe-2'>
                        <NavLink onClick={logOutUser} to={'/login'}>
                            <span className='btn btn-primary p-2 ps-4 pe-4'>
                                Logout
                            </span>
                        </NavLink>
                    </li>
                </ul>
            ) : (
                <ul className='navbar-nav d-flex justify-content-between me-3'>
                    <li className='nav-item active ps-2 pe-2 mx-2'>
                        <NavLink to={'/ayushgargrk.github.io/Github-Profile-Searching-app/login'}>
                            <span className='btn btn-primary p-2 ps-4 pe-4'>
                                Login
                            </span>
                        </NavLink>
                    </li>
                </ul>
            )
            }
        </nav>
    )
}