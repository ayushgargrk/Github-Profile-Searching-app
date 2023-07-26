import { ImgHTMLAttributes } from "react";

export const Image = ({...rest}:ImgHTMLAttributes<HTMLImageElement>) => {
    return(
        <img {...rest}/>
    )
}