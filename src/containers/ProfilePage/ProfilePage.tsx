import githubLink from './../../assets/githublink.png'
import Blog from './../../assets/blog.jpeg'
import { Image } from './../../components/Image';
import { selectLoginState } from './../../store';


export const ProfilePage = () => {
    const { avatar_url, html_url, location, login, blog, bio, followers, following, email } = selectLoginState();

    return (
        <>
            <div className='container d-flex justify-content-center align-items-center my-5'>
                <div className='border border-dark'>
                    <div className='d-flex justify-content-between'>
                        <div className='mx-2 my-2'>
                            <Image src={avatar_url} height={100} width={100} />
                        </div>
                        <div className='mx-5 mt-2'>
                            <p>{location}</p>
                            <p>Following: {following}</p>
                            <p>Followers: {followers}</p>
                        </div>
                        <div>
                            <div>
                                <a href={html_url}>
                                    <Image src={githubLink} width={50} height={50} />
                                </a>
                            </div>

                            <div className='my-2'>
                                <a href={blog}>
                                    <Image src={Blog} width={50} height={50} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className='text-center my-2'>{login}</h4>
                    </div>

                    <div className='my-2'>
                        <p>{email}</p>
                    </div>

                    <h5 className='mx-2'>Bio</h5>

                    <div className='border border-sucess'>
                        <p className='mx-2'>{bio}</p>
                    </div>
                </div>
            </div>

        </>
    )
}