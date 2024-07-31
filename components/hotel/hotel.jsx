import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";

import * as Constants from "../Constants";
import { imgNameByUrl, jpgToWebp } from "../fun";
import Image from "next/image";
import CustomImage from "../Img";
const Hotel_Design = ({ item }) => {
  const hurl =
    "/hotel-" +
    item.name.replace(/\s+/g, "-").toLowerCase() +
    "-in-" +
    item.cityname.replace(/\s+/g, "-").toLowerCase() +
    "-" +
    item.id +
    "/";

  return (
    <div>
      <Link href={hurl}>
        <div className={`px-4`} href={hurl}>
          <div className={`_st_box _tr_box h-auto bg-white radius-12 mb-3`}>
            <div className={`h-[200px] relative`}>
              {/* <img 
                    className={`img-responsive object-cover h-[200px] w-full rounded-[8px] border-1 border-[#e3e3e3]`}
                    src={item.images.length > 0 ? jpgToWebp({uri:item.images}) : `${Constants.assets_api}/public/icons/logo-icon.png`}
                    alt="kiomoi logo"
                /> */}
              {/* <Image
                className={`img-responsive object-cover h-[200px] w-full rounded-[8px] border-1 border-[#e3e3e3]`}
                src={
                  item.images.length > 0
                    ? jpgToWebp({ uri: item.images })
                    : `${Constants.assets_api}/public/icons/logo-icon.png`
                }
                alt={imgNameByUrl({ url: item.images })}
                fill
              /> */}
              <CustomImage 
                img_url={jpgToWebp({ uri: item.images })} 
                className={`img-responsive object-cover h-[200px] w-full rounded-[8px] border-1 border-[#e3e3e3]`} 
                alt={imgNameByUrl({ url: item.images })}
                />
            </div>
            <div className={`mt-4 price_List pb-4`}>
              <div className={`flex items-center justify-between`}>
                <h2 className={`font-medium`}>{item.name}</h2>
                {/* <span>{item.ratings}</span> */}
              </div>
              <div className={`text-sm pt-1`}>
                <div className={`flex items-center c_gray`}>
                  <IoLocationSharp />
                  <div
                    className={`c_gray pl-1 c_gray`}
                    // style={{color:'rgb(6, 24, 141)'}}
                  >
                    {item.cityname}
                  </div>
                </div>

                <div>
                  {item.price === 0 ? (
                    <span className={`price_inr text-sm`}>
                      Price on Request
                    </span>
                  ) : (
                    <span className={`price_inr text-sm`}>
                      <FaRupeeSign
                        className={`inline text-[#f79421] text-[12px] mb-[4px]`}
                      />
                      {item.price} /-
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Hotel_Design;
