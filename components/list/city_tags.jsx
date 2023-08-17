const { createCityListURL } = require("../fun")
import { tw } from "twind"
import Link from "next/link"
const CityTags = ({cities}) =>{
    return <>
        <div className={tw`flex flex-wrap`}>
            {
                cities.map((item,index)=>{
                    return <div key={index} className={tw`py-2 px-1`}>
                                    {
                                    <Link href={createCityListURL({cityname:item.name,id:item.id})} className={tw` font-medium_`} target="_blank">
                                        <div className="px-4 py-2 bg-white _b_active rounded-full border-2 border-gray-300 hover:shadow-lg transition-shadow">
                                            {item.name} tour packages
                                        </div>
                                        
                                    </Link>
                                    // item.Bomdila
                                    }
                            </div>
                })
            }
        </div>
    </>
} 
export default CityTags