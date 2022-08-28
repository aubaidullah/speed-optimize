import Nav from "../../../../components/Nav"
import {IoLocationSharp} from 'react-icons/io5'
import client from "../../../../components/Graphql/service";
import { getTravelGuideDetail } from "../../../../components/Graphql/Queries";
import {tw} from 'twind'
import BreadCrumbs from "../../../../components/breadcrumbs";
import { Carousel } from "react-responsive-carousel";
import {BsDot} from 'react-icons/bs'
import axios from "axios";
import {FaRupeeSign} from 'react-icons/fa'
import Link from 'next/link'
const TravelGuideDetail = ({data,weather}) =>{
    // console.log(data)
    const bread = {
        disabled:{
            item: `${data.tg.cityName}`
        },
        enabled :[
            {
                item:"Kiomoi",
                href:"/"
            },
            {
                item:"Travel Guide",
                href:"/travel-guide/"
            },
            {
                item:"India",
                href:"/travel-guide/"
            }                        
        ]
    }    
    const imagesRender = data.images.map((img,index)=>{
        return <div key={index}>
            <img src={img.i} className="img" />
        </div>
    })

// calender_multi_clr.png
    const rightBlock = ({icon,heading,desc}) =>{
        return <div className={tw`flex`}>
            <div>
                <img src={`/icons/${icon}`} alt="" className={tw`inline`} style={{height:'15.7px'}}/>
            </div>
            <div className={tw`ml-2`}>
                <div className={ tw`t_12px font-bold`}>{heading}</div>
                <div className="t_12px">{desc}</div>
            </div>
        </div>
    }



    
    return <>
    <Nav />
    <BreadCrumbs bread={bread}/>
        <section className="container">
            <h1 className={tw`text-2xl font-bold`}>{data.tg.cityName}</h1>
            <div className="detail_slide_nav _30px">
                <ul>
                    <li>
                    <a href="#photos" className="_c_default">
                        Photos
                    </a>
                    </li>
                    <li>
                    <a href="#overview">Overview</a>
                    </li>
                    <li>
                    <a href="#itinery">Fair, Festivals & Activities</a>
                    </li>
                    <li>
                    <a href="#hotels">How to Reach</a>
                    </li>
                    <li>
                    <a href="#inclusions">Weather & Useful Facts</a>
                    </li>
                    <li>
                    <a href="#tnc">Food, Eat & Dine</a>
                    </li>
                    <li>
                    <a href="#tnc">Shopping & Market</a>
                    </li>                    
                </ul>
            </div>

            <div className={tw`flex flex-wrap`}>
                <div className={tw`w-full lg:w-2/3`}>
                    <div>

                        <Carousel
                        showArrows={true}
                        showStatus={false}
                        showThumbs={false}
                        infinite={true}
                        autoPlay={true}
                        class=""
                        >
                        {imagesRender.length > 0 ? (
                            imagesRender
                        ) : (
                            <img src="/logo-icon.png" />
                        )}
                        </Carousel>

                    </div>
                </div>
                <div className={tw`w-full lg:w-1/3`}>
                    <div className={tw`pl-6`}>
                        <div className="_b_right_list_1">
                            <div className="_asia_india">
                                <div className={tw`flex justify-between`}>
                                    <div>
                                        <IoLocationSharp className='inline'/>
                                        {data.tg.cityName}
                                        <BsDot className={tw`inline`}/> India
                                    </div>
                                    <div className="cir_bg">
                                        {data.city.ratings}/5
                                    </div>
                                </div>
                            </div>

                            
                            <div className={tw`p-2`}>
                                <div className={tw`bg-white pb-2`}>
                                    <div className={tw`flex justify-between`}>
                                        <div className={tw`w-full lg:1/2`}>
                                            {
                                                rightBlock({icon:'calender_multi_clr.png', heading:'Best Session' ,desc:data.city.visitTime})
                                            }

                                            {
                                                rightBlock({icon:'language.png', heading:'Ideal Duration' ,desc:data.city.idealTripDuration})
                                            }
                                        </div>

                                        <div className={tw`w-full lg:1/2`}>
                                            {
                                                rightBlock({icon:'train.png', heading:'Station:' ,desc:data.city.nearbyRailway})
                                            }

                                            {
                                                rightBlock({icon:'plane_icon.png', heading:'Major Airports' ,desc:data.city.nearbyAirport})
                                            }
                                        </div>

                                    </div>
                                </div>

                                <div className={tw`bg-white border-t-1 py-2`}>
                                    <div className={tw`flex justify-between`}>
                                        <div className={tw`w-full lg:1/2`}>
                                            {
                                                rightBlock({icon:'whether_icon.png', heading:'Weather' ,desc:`${weather?.main?.temp} ° C`})
                                            }

                                        </div>

                                        <div className={tw`w-full lg:1/2`}>

                                            {
                                                rightBlock({icon:'plane_icon.png', heading:'Weather Type' ,desc:weather?.weather[0]?.main})
                                            }
                                        </div>

                                    </div>
                                </div>


                                <div className={tw`bg-white border-t-1 pt-2`}>
                                    <div className={tw`flex justify-between`}>
                                        <div className={tw`w-full lg:1/2`}>
                                            <div className="price_inr">
                                                <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                                                {data.mincost/100}/-
                                            </div>
                                            <div className="price_inr" style={{fontSize:'9px'}}>
                                                onwards
                                            </div>

                                        </div>

                                        <div className={tw`w-full lg:1/2`}>
                                            <div style={{float:'right'}}>
                                                <Link href={`/holidays/${data.tg.cityName.replace(/\s+/g, "-").toLowerCase()}-tour-packages/`}>
                                                <a>
                                                    <button className="btn_listing_t _font_big">VIEW PACKAGES</button>
                                                </a>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className={tw`pt-2`}>
                                    <div className="btn_listing _btn_clr" style={{width:'100%',textAlign:'center',padding:'8px 15px',fontSize:'12px'}}>KNOW MORE & GET CUSTOMIZE</div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>                 

            </div>
        </section>
        
    </>
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', 's-maxage=10'); 
    console.log(context.query)
    let _id = context.query.id
    const res = await client.query({query:getTravelGuideDetail,variables:{input:{id:_id}}})

    let lat = res.data.travelGuide.output.city.lat
    let lng = res.data.travelGuide.output.city.lng

    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=d6429646ecc55c8a9d2856f91d10ff4f&units=metric`)
    
    console.log(resp)

    // const res_travel = await client.query({query:getTravelGuideHome,variables:{input:{'av':'1.3','pt':'WEBSITE','geoid':0,'id':'0','pagenum':0,'pid':0,'type':0}}})
    // let data = res_travel.data.travelguide.output
    // console.log(res.data)
    return {props:{data:res.data.travelGuide.output,weather:resp.data}}
  }


export default TravelGuideDetail