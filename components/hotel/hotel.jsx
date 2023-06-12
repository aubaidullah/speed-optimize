import Link from "next/link"
import {IoLocationSharp} from 'react-icons/io5'
import {FaRupeeSign} from 'react-icons/fa'
import { tw } from "twind";
import * as Constants from '../Constants'
import { imgNameByUrl, jpgToWebp } from "../fun";
import Image from "next/image";
const Hotel_Design = ({item}) =>{
    const hurl =
          "/hotel-" +
          item.name.replace(/\s+/g, "-").toLowerCase() +
          "-in-" +
          item.cityname.replace(/\s+/g, "-").toLowerCase() +
          "-" +
          item.id + '/';

    return <div>
            <Link href={hurl}>
            <div href={hurl}>
                <div className={tw`pl-0 lg:px-2`}>
                <div className={tw`h-[200px] relative`}>
                {/* <img 
                    className={tw`img-responsive object-cover h-[200px] w-full rounded-[8px] border-1 border-[#e3e3e3]`}
                    src={item.images.length > 0 ? jpgToWebp({uri:item.images}) : `${Constants.assets_api}/public/icons/logo-icon.png`}
                    alt="kiomoi logo"
                /> */}
                <Image 
                    className={tw`img-responsive object-cover h-[200px] w-full rounded-[8px] border-1 border-[#e3e3e3]`}
                    src={item.images.length > 0 ? jpgToWebp({uri:item.images}) : `${Constants.assets_api}/public/icons/logo-icon.png`}
                    alt={imgNameByUrl({url:item.images})}
                    fill
                />


                </div>
                <div className={tw`mt-2`}>
                    <div className={tw`flex items-center justify-between`}>
                    <h2 className={tw`font-medium`}>{item.name}</h2>
                    {/* <span>{item.ratings}</span> */}
                    </div>
                    <div className={tw`text-sm pt-1`}>
                    <div className={tw`flex items-center c_gray`}>
                        <IoLocationSharp />
                        <div className={tw`c_gray pl-1 c_gray`} 
                        // style={{color:'rgb(6, 24, 141)'}}
                        >
                            {item.cityname}
                        </div>                        
                    </div>

                    <div>
                        {item.price === 0?<span className={tw`price_inr text-sm`}>Price on Request</span>:
                        <span className={tw`price_inr text-sm`}>
                        <FaRupeeSign className={tw`inline text-[#f79421] text-[12px] mb-[4px]`} />
                        
                        {item.price} /-
                        </span>
                        
                        
                        }
                    </div>

                    </div>

                </div>
                </div>
            </div>
            </Link>
        </div>
}

export default Hotel_Design