import { createTGCityURL } from "../fun"
import Link from "next/link"
import * as Constants from '../Constants'
import { tw } from "twind"
import Image from "next/image"

const TopCities = ({data,attlimit=5,_package=false}) =>{
    return <>
    {
        data.ctg.slice(0, attlimit).map((item, i) => {
            let url = createTGCityURL({city:item.name,id:item.tgid})
            // let url = `/travel-guide/india/city-${item.name.toLowerCase()}/${item.tgid}/`
            // let url = "/travel-guide/india/attraction" + "-" + item.name.trim().replace(/\s+/g, ' ').replace(/-/g, "").replace(/\s+/g, "-").toLowerCase() + "/" + item.id + "/"
            return (
                <div className={`w-1/3 lg:w-1/4 p-2`}>
                    
                    <Link href={url} key={i}>
                        <div>
                        <div>
                            <div className={tw`image-squre__ relative lg:${_package?'h-44':''}`}>
                                <Image
                                    className={`w-full h-full rounded-lg`}
                                    src={
                                        item.images.length > 0 ? item.images : `${Constants.assets_api}/public/icons/logo-icon.png`
                                    }
                                    alt="kiomoi logo"
                                    objectFit="fill"
                                    layout="fill"
                                />

                            </div>
                            <div className={tw`${_package?'text-sm font-semibold lg:text-lg text-slate-700':''}`}>{item.name}</div>
                        </div>
                        </div>
                    </Link>
                    
                </div>
            )
        })
    }    
    
    
    </>
} 

export default TopCities