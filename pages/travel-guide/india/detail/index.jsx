import Nav from "../../../../components/Nav"
import {IoLocationSharp} from 'react-icons/io5'
import client from "../../../../components/Graphql/service";
import { getTravelGuideDetail,getTravelPackage,getTravelHotel, getarticleQuery, getQnaQuery } from "../../../../components/Graphql/Queries";
import {tw} from 'twind'
import { useState,useEffect } from "react";
import BreadCrumbs from "../../../../components/breadcrumbs";
import { Carousel } from "react-responsive-carousel";
import {BsDot} from 'react-icons/bs'
import axios from "axios";
import {FaRupeeSign} from 'react-icons/fa'
import Link from 'next/link'
import ReactHtmlParser from "react-html-parser";
import HomePackages from "../../../../components/home/packages";
import Hotel from "../../../../components/home/hotel";
import Articles from "../../../../components/home/articles";
import QnaListing from "../../../../components/Qna";
import Content from "../../../../components/trave-guide/content";



const TravelGuideDetail = ({data,weather,packages,hotels,article,qna}) =>{
    // console.log(data)
    const [overviewlimit,setOverviewlimit] = useState(200)
    const [overview,setOverview] = useState()
    const [attlimit,setAttlimit] = useState(4)

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

    // var d = region?.desc

    var d = data.tg?.overviewDesc

    useEffect(()=>{
        if (data.tg?.overviewDesc !== null)
        setOverview(d.substring(0, overviewlimit))  
    },[overviewlimit])



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

            <div className={tw`mt-4 w-full lg:w-2/3`}>
                <div>
                    <h2 className={tw`text-xl font-bold`}>Overview</h2>
                    <div className={tw``}>
                        <div className="Shape_42">
                        {ReactHtmlParser(overview)}
                        {overviewlimit == 150 ||
                            overviewlimit == 200 ? (
                            <a
                            onClick={() =>
                                setOverviewlimit(10000)
                            }
                            className="_plus_more"
                            >
                            +more
                            </a>
                        ) : (
                            <a
                            onClick={()=>setOverviewlimit(200)}
                            className="_plus_more"
                            >
                            -less
                            </a>
                        )}
                        </div>

                    </div>


                    <div>
                        <div className={tw`flex justify-between`}>
                            <h2 className={tw`text-xl font-bold`}>Attractions in {data.tg.cityName}</h2> 

                            <div>
                                <Link href={'/travel-guide'}>
                                    <a href={'/travel-guide/'}>
                                        <div className='btn_view_more'>
                                            View all
                                        </div>
                                        
                                        </a>
                                </Link>
                            </div>
                        </div>
                        <div className={tw``}>
                            <div className="Shape_42">

                                <div className={tw`flex flex-wrap`}>
                                        {
                                                data.attn.slice(0,attlimit).map((item,i)=>{
                                                    
                                                    let url = "/travel-guide/india/attraction"+"-"+item.name.trim().replace(/\s+/g,' ').replace(/-/g,"").replace(/\s+/g, "-").toLowerCase()+"/"+item.id+"/"
                                                    return (
                                                        <div className={tw`w-1/4 p-2`}>
                                                            <Link href={url} key={i}>
                                                                <div>
                                                                    <div class="image-squre__">
                                                                    <img
                                                                        style={{height:'100%',width:'100%'}}
                                                                        src={
                                                                        item.images.length > 0 ? item.images : "/icons/logo-icon.png"
                                                                        }
                                                                        alt=""
                                                                    />
                                                                    
                                                                    </div>
                                                                    <p>{item.name}</p>
                                                                </div>

                                                                
                                                            </Link>
                                                        </div>
                                                        
                                                    )
                                                })
                                        }
                                </div>

                                <div>
                                    <a onClick={()=>attlimit==4?setAttlimit(100):setAttlimit(4)}>
                                        <div className='btn_view_more'>
                                            View 
                                            {attlimit==4?" All ":" Less "}
                                             
                                            
                                            Tourist place in {data.tg.cityName}
                                        </div>    
                                    </a>                                    
                                </div>

                            </div>
                        </div>

                    </div>
                    <Content data={data}/>
                </div>
                
                
            </div>
            <HomePackages data={packages} />
            <Hotel data={hotels}/>
            <Articles data={article}/>
            
            <QnaListing data={qna} travelGuide={true}/>
        </section>
        
    </>
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', 's-maxage=10'); 
    // console.log(context.query)
    let _id = context.query.id
    const res = await client.query({query:getTravelGuideDetail,variables:{input:{id:_id}}})

    let lat = res.data.travelGuide.output.city.lat
    let lng = res.data.travelGuide.output.city.lng

    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=d6429646ecc55c8a9d2856f91d10ff4f&units=metric`)
    // console.log(resp)

    console.log(res.data.travelGuide.output.gid)
    let json_data = {
        'av': '',
        'geoid': res.data.travelGuide.output.gid,
        'id': '',
        'pagenum': 1,
        'pid': 0,
        'pt': 'Website',
        'size': 10,
        'type': 'CITY',
    }
    
    const res1 = await client.query({query:getTravelPackage,variables:{input:json_data}})

    const packages = res1.data.package.output
    // const res_travel = await client.query({query:getTravelGuideHome,variables:{input:{'av':'1.3','pt':'WEBSITE','geoid':0,'id':'0','pagenum':0,'pid':0,'type':0}}})
    // let data = res_travel.data.travelguide.output
    // console.log(res.data)

    let hotel_data = {
        'av': '1.3',
        'name': '',
        'id': res.data.travelGuide.output.gid,
        'pt': 'Website',
        'type': 'City',
    }

    const hotel_res = await client.query({query:getTravelHotel,variables:{input:hotel_data}})
    const hotels = hotel_res.data.hotels.output.hotels


    let article_data = {
        'av': '1.3',
        'pt': 'WEBSITE',
        'geoid': 0,
        'id': 'string',
        'pagenum': 1,
        'pid': 0,
        'size': 20,
        'type': 0,
    }

    // getQnaQuery


    const article_res = await client.query({query:getarticleQuery,variables:{input:article_data}})
    const article = article_res.data.articles.output.articles



    let qna_data = {
        'av': '',
        'tgid': `${_id}`,
        'did': '',
        'pagenum': 1,
        'pt': '',
        'size': 17,
    }

    const qna_res = await client.query({query:getQnaQuery,variables:{input:qna_data}})
    const qna = qna_res.data.qna.output.qna

    // console.log(qna)


    


    return {props:{data:res.data.travelGuide.output,weather:resp.data,packages,hotels,article,qna}}
  }


export default TravelGuideDetail