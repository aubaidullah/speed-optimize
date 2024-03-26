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
    />:<div className={tw`bg-[#EFEFEF] w-full h-full flex rounded-xl`}>
        <img src={`${Constants.assets_api}/public/icons/defaultimage.svg`} className={tw`m-auto h-[100px]`} style={{height:'100px',width:'auto'}} />
    </div>
}

export default CustomImage