import { Link } from "react-router-dom";
import {Image} from './../../components/Image'
import githubLink from './../../assets/githublink.png'

interface UserCardProps{
    username: string;
    avatar_url: string;
}

export const UserCard = ({username, avatar_url}: UserCardProps) => {
    return(
        <Link to={`/Github-Profile-Searching-app/${username}`} className={'link-secondary link-underline-opacity-0'}>
            <div className="d-flex justify-content-between">
                <div>
                    <Image src={avatar_url} width={150} height={100}/>
                </div>
                <div className="mx-2">
                    <Image src={githubLink} width={50} height={50} className={'mx-2 my-2'}/>
                </div>
            </div>

            <div className="my-2">
                <p className="text-center">{username}</p>
            </div>
        </Link>
    )    
}