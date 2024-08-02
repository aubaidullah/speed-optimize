import Image from "next/image";
import * as Constants from "@/components/Constants";



const CustomImage = ({img_url,alt,className="",style=""}) =>{
    return img_url?<Image
        className={className}
        style={style}
        src={ img_url }
        alt={alt}
        fill
    />:<div className={`bg-[#EFEFEF] w-full h-full flex rounded-xl`} style={{background:'#EFEFEF'}}>
        <img src={`${Constants.assets_api}/public/icons/defaultimage.svg`} className={`m-auto h-[100px]`} style={{height:'100px',width:'auto'}} />
    </div>
}

export default CustomImage