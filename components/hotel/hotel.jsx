import Link from "next/link"
import {FaRupeeSign} from 'react-icons/fa'
import { tw } from "twind";
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
            <a href={hurl}>
                <div className={tw`pl-0 lg:px-2`}>
                <div style={{height:'200px'}}>
                    <img style={{objectFit:'cover',height:'200px',width:'100%',borderRadius:'8px' ,border:'1px solid #e3e3e3'}}
                    className="img-responsive"
                    src={item.images.length > 0 ? item.images : "/logo-icon.png"}
                    alt=""
                />
                </div>
                <div className={tw`mt-2`}>
                    <div className={tw`flex items-center justify-between`}>
                    <h2 className={tw`font-medium`}>{item.name}</h2>
                    {/* <span>{item.ratings}</span> */}
                    </div>
                    <div className={tw`text-sm`}>
                    <div className={tw`c_gray`}>
                        {item.cityname}
                    </div>
                    <div>
                        {item.price === 0?<span className={tw`price_inr text-sm`}>Price on Request</span>:
                        <span className={tw`price_inr text-sm`}>
                        <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'12px',marginBottom:'4px'}} />
                        
                        {item.price} /-
                        </span>
                        
                        
                        }
                    </div>

                    </div>

                </div>
                </div>
            </a>
            </Link>
        </div>
}

export default Hotel_Design