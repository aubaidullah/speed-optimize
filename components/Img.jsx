import Image from "next/image";
import * as Constants from "@/components/Constants";
import { tw } from "twind";


const CustomImage = ({img_url,alt,className="",style=""}) =>{
    return img_url?<Image
        className={className}
        style={style}
        src={ img_url }
        alt={alt}
        fill
    />:<img src={`${Constants.assets_api}/public/icons/kiomoi_logo_abstract.png`} className={tw`m-auto h-[99%]`} />
}

export default CustomImage