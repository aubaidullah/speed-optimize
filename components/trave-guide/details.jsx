// import Nav from "../Nav"
import Nav from '../Nav'
import { IoLocationSharp } from 'react-icons/io5'
// import client from "../Graphql/service";
// import { getTravelGuideDetail, getTravelPackage, getTravelHotel, getarticleQuery, getQnaQuery } from "../Graphql/Queries";
import { tw } from 'twind'
import { useState, useEffect } from "react";
import BreadCrumbs from "../breadcrumbs";
import { Carousel } from "react-responsive-carousel";
import { BsDot } from 'react-icons/bs'
// import axios from "axios";
import { FaRupeeSign } from 'react-icons/fa'
import Link from 'next/link'
import ReactHtmlParser from "react-html-parser";
import HomePackages from "../home/packages";
import Hotel from "../home/hotel";
import Articles from "../home/articles";
import QnaListing from "../Qna";
import Content from "../trave-guide/content";
import Leaform from '../leadform'
import State_Attraction from "../trave-guide/attractions";
import Image from 'next/image'
import TravelGuide from '../home/travel_guide';
import Meta from '../meta';
import * as Constants from '../Constants'
import { createCityListURL,createStateListURL, createTGCityURL } from '../fun';

const TravelGuideDetailComp = ({ meta,packages_state,data, weather, packages, hotels, article, qna,type ,state_t=undefined}) => {
    console.log(data)
    const [overviewlimit, setOverviewlimit] = useState(200)
    const [overview, setOverview] = useState()
    const [attlimit, setAttlimit] = useState(4)
    const [sendquery,setSendquery] = useState(false)
    
    
    
    const updateChangeForm=(val)=>{
        setSendquery(val)
      }    

    const bread = {
        disabled: {
            item: `${data.tg.cityName}`
        },
        enabled: [
            {
                item: "Kiomoi",
                href: "/"
            },
            {
                item: "Travel Guide",
                href: "/travel-guide/"
            },
            {
                item: "India",
                href: "/travel-guide/"
            },
        ]
    }
    const city_bread = {
        disabled: {
            item: `${data.tg.cityName}`
        },
        enabled: [
            {
                item: "Kiomoi",
                href: "/"
            },
            {
                item: "Travel Guide",
                href: "/travel-guide/"
            },
            {
                item: "India",
                href: "/travel-guide/"
            },
            {
                item: `${data?.city?.sname}`,
                href: `/travel-guide/states/${data?.city?.sname.toLowerCase()}-${data?.city?.sid}`
            },            
        ]
    }    

    const con_bread = {
        disabled: {
            item: `${data.tg.cityName}`
        },
        enabled: [
            {
                item: "Kiomoi",
                href: "/"
            },
            {
                item: "Travel Guide",
                href: "/travel-guide/"
            },
        ]
    }

    const imagesRender = data.images.map((img, index) => {
        return <div key={index}>
            <Image src={img.i} className="img" layout="fill" style={{borderRadius:'8px'}}/>
        </div>
    })

    // var d = region?.desc

    var d = data.tg?.overviewDesc

    useEffect(() => {
        if (data.tg?.overviewDesc !== null)
            setOverview(d.substring(0, overviewlimit))
    }, [overviewlimit])


    
    // calender_multi_clr.png
    const rightBlock = ({ icon, heading, desc }) => {
        return <div className={tw`flex pb-2`}>
            <div>
                <img src={`${Constants.assets_api}/public/icons/${icon}`} alt="" className={tw`inline`} style={{ height: '15.7px' }} />
            </div>
            <div className={tw`ml-4`}>
                <div className={tw`t_12px font-bold`}>{heading}</div>
                <div className="t_12px">{desc}</div>
            </div>
        </div>
    }



    // console.log(packages)
    // console.log(packages_state)
    return <>
        <Meta meta={meta} />
        <Nav />
        <BreadCrumbs bread={data.tg.geoType == 'COUNTRY'?con_bread:bread} />
        <section className="container">
            <div className="title_listing_">
            {
                type=='CITY'?<h1 className={tw`text-2xl font-bold`}>{data.tg.cityName}</h1>:                
                <h1 className={tw`text-2xl font-bold`}>Places To Visit in {data.tg.cityName}</h1>
            }
            </div>
            {/* <h1 className={tw`text-2xl font-bold`}>{data.tg.cityName}</h1> */}
            <div className="detail_slide_nav _30px">
                <ul>
                    <li>
                        <a className="_c_active" href="#overview">Overview</a>
                    </li>
                    {data.tg.howToReachwHeading
                    ?<li>
                        <a href={`#${data.tg.howToReachwHeading}`}>{data.tg.howToReachwHeading}</a>
                    </li>
                    :""}
                    {data.tg.eventsHeading
                    ?<li>
                        <a href={`#${data.tg.eventsHeading}`}>{data.tg.eventsHeading}</a>
                    </li>
                    :""}
                    {data.tg.factsHeading
                    ?<li>
                        <a href={`#${data.tg.factsHeading}`}>{data.tg.factsHeading}</a>
                    </li>
                    :""}
                    {data.tg.foodHeading?
                        <li><a href={`#${data.tg.foodHeading}`}>{data.tg.foodHeading}</a></li>
                        :""
                    }
                    {data.marketHeading?
                        <li>
                        <a href={`#${data.marketHeading}</}`}>{data.marketHeading}</a>
                    </li>
                    :""}
                    {/* {data.tg.foodHeading
                    ?<li>
                        <a href={`#${data.tg.foodHeading}`}>{data.tg.foodHeading}</a>
                    </li>
                    :""} */}
                    {data.tg.marketHeading
                    ?<li>
                        <a href={`#${data.tg.marketHeading}`}>{data.tg.marketHeading}</a>
                    </li>
                    :""}
                </ul>
            </div>

            <div className={tw`flex flex-wrap`}>
                <div className={tw`w-full lg:w-2/3`}>
                    <div className="slider_details">
                        <Carousel
                            showArrows={true}
                            showStatus={false}
                            showThumbs={false}
                            infinite={true}
                            autoPlay={true}
                            className="slider_banner slider_overlay"
                        >
                            {imagesRender.length > 0 ? (
                                imagesRender
                            ) : (
                                <img src={`${Constants.assets_api}/public/icons/logo-icon.png`} />
                            )}
                        </Carousel>
                    </div>
                </div>
                <div className={tw`w-full lg:w-1/3`}>
                    <div className={tw`pl-0 lg:pl-6 `}>
                        <div className="_b_right_list_1">
                            <div className="_asia_india">
                                <div className={tw`flex justify-between`}>
                                    <div className={tw`flex items-center`}>
                                        <IoLocationSharp className='inline' />
                                        <span className={tw`pl-1`}>
                                            {data.tg.cityName}
                                        </span>
                                        <BsDot className={tw`inline`} /> <span>India</span>
                                    </div>
                                    <div className="cir_bg">
                                        {
                                            type=='CITY'?data.city.ratings+'/5':type=='STATE'?data.state.ratings+'/5':data.country.ratings+'/5'
                                        }
                                    </div>
                                </div>
                            </div>


                            <div className={tw`p-2`}>
                                <div className={tw`bg-white`}>
                                    <div className={tw`flex justify-between`}>
                                        {
                                            type=='COUNTRY'
                                            ?<>
                                                <div className={tw`w-full lg:1/2`}>
                                                    {rightBlock({icon:'new_delhi.png',heading:'Capital',desc:data.country.capital})}
                                                    {rightBlock({icon:'new_delhi.png',heading:'Continent',desc:data.country.continent})}
                                                    {rightBlock({icon:'language.png',heading:'Major Languages',desc:data.country.languages})}
                                                </div>

                                                <div className={tw`w-full lg:1/2`}>
                                                    {rightBlock({ icon: 'region.png', heading: 'Currency', desc: data.country.currency})   }
                                                    {rightBlock({ icon: 'plane_icon.png', heading: 'Major Airports', desc: type!='COUNTRY'?'Delhi, Mumbai, Chennai, Kolkata':""})}
                                                    {rightBlock({ icon: 'language.png', heading: 'Ideal Duration', desc:data.country.idealTripDuration})}
                                                </div>                                                
                                            </>
                                            
                                            :<>
                                                <div className={tw`w-full lg:1/2`}>
                                                    {
                                                        rightBlock({ icon: 'calender_multi_clr.png', heading: 'Best Session', desc: type=='CITY'?data.city.visitTime:data.state.visitTime })
                                                    }
                                                    {
                                                        type=='CITY'?
                                                        rightBlock({ icon: 'language.png', heading: 'Ideal Duration', desc: type=='CITY'?data.city.idealTripDuration:data.state.idealTripDuration })
                                                        :rightBlock({ icon: 'new_delhi.png', heading: 'Capital', desc: type=='CITY'?data.city.nearbyAirport:data.state.capital })
                                                    }
                                                    {
                                                        type=='STATE'?
                                                        rightBlock({ icon: 'language.png', heading: 'Major Languages', desc:data.state.languages })
                                                        :""
                                                    }
                                                </div>

                                                <div className={tw`w-full lg:1/2`}>
                                                    {
                                                        type=='CITY'?
                                                        rightBlock({ icon: 'train.png', heading: 'Station:', desc: data.city.nearbyRailway})
                                                        :rightBlock({ icon: 'plane_icon.png', heading: 'Major Airports', desc: data.state.airports})
                                                    }

                                                    {   type=='CITY'?
                                                        rightBlock({ icon: 'plane_icon.png', heading: 'Major Airports', desc: type=='CITY'?data.city.nearbyAirport:data.state.nearbyAirport }):
                                                        rightBlock({ icon: 'calender_multi_clr.png', heading: 'Ideal Duration', desc: data.state.idealTripDuration })
                                                    }

                                                    {
                                                        type=='STATE'?
                                                        <div className={tw`flex`}>
                                                            <div>
                                                                <IoLocationSharp className={tw`inline`} style={{ height: '15.7px' }}/>
                                                                {/* <img src={`/icons/${icon}`} alt="" className={tw`inline`} style={{ height: '15.7px' }} /> */}
                                                            </div>
                                                            <div className={tw`ml-2`}>
                                                                <div className={tw`t_12px font-bold`}>Region</div>
                                                                <div className="t_12px">{data.state.region}</div>
                                                            </div>
                                                        </div>
                                                        
                                                        :""
                                                    }                                            
                                                </div>
                                        
                                        </>
                                        }
                                        

                                    </div>
                                </div>
                                

                                {

                                }

                            {
                                type=='CITY'?
                            
                                <div className={tw`bg-white`}>
                                    <div className={tw`flex justify-between`}>
                                        <div className={tw`w-full lg:1/2`}>
                                            {
                                                rightBlock({ icon: 'whether_icon.png', heading: 'Weather', desc: `${weather?.main?.temp} ° C` })
                                            }

                                        </div>

                                        <div className={tw`w-full lg:1/2`}>

                                            {
                                                // type=='CITY'?
                                                rightBlock({ icon: 'whether_icon.png', heading: 'Weather Type', desc: weather?.weather[0]?.main })
                                                // :rightBlock({ icon: 'plane_icon.png', heading: 'Station', desc: weather?.weather[0]?.main })
                                            }
                                        </div>
                                    </div>
                                </div>
                                :""
                            }

                            </div>
                        </div>
                        <div className="_b_right_list_1 p-2">
                        <div className={tw`bg-white`}>
                            <div className={tw`flex justify-between`}>
                                <div className={tw`w-full lg:1/2`}>
                                    <div className="price_inr">
                                        {
                                            data.mincost<=100
                                            ?"Price On Request"
                                            :
                                            <>
                                            <FaRupeeSign className='inline' style={{ color: "#f79421", fontSize: '15px', marginBottom: '4px' }} />
                                            {data.mincost / 100}/-                                                    
                                            </>

                                        }

                                    </div>
                                    <div className="price_inr" style={{ fontSize: '9px' }}>
                                        onwards
                                    </div>

                                </div>

                                <div className={tw`w-full lg:1/2`}>
                                    <div style={{ float: 'right' }}>
                                        
                                        {data.mincost>=100?
                                        
                                        <Link href={
                                            type == 'CITY'?createCityListURL({cityname:data.tg.cityName,id:data.gid}):
                                            // type=='CITY'?`/holidays/${data.tg.cityName.replace(/\s+/g, "-").toLowerCase()}-tour-packages/`:
                                            createStateListURL({statename:data.tg.cityName,id:data.gid})
                                            // `/holidays/${data.tg.cityName.replace(/\s+/g, "-").toLowerCase()}-tour-packages/${data.gid}`}
                                        }>
                                            <a>
                                                <button className="btn_listing_t _font_big">VIEW PACKAGES</button>
                                            </a>
                                        </Link>
                                        
                                        :""                                        
                                        }

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={tw`pt-2`}>
                            <div className="btn_listing _btn_clr" style={{cursor:'pointer', width: '100%', textAlign: 'center', padding: '8px 15px', fontSize: '12px' }}
                            
                            onClick={()=>setSendquery(true)}
                            
                            >KNOW MORE & GET CUSTOMIZE</div>
                        </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className={tw`mt-4 w-full lg:w-2/3`}>
                <div>
                    <h2 className={'_titles_'}>Overview</h2>
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
                                    onClick={() => setOverviewlimit(200)}
                                    className="_plus_more"
                                >
                                    -less
                                </a>
                            )}
                        </div>

                    </div>


                    <div>
                        <div className={tw`flex justify-between`}>
                            {
                                type=='CITY'?data.attn.length>0?<h2 className={'_titles_'}>Attractions in {data.tg.cityName}</h2>:""
                                :data.attn.length>0?<h2 className={tw`text-xl font-bold`}>Top Cities in {data.tg.cityName}</h2>:""
                            }
                            
                            

                            {
                                type=='CITY'?
                                    data.attn.length>0?
                                        <div>
                                            <Link href={'/travel-guide/'}>
                                                <a href={'/travel-guide/'}>
                                                    <div className='btn_view_more'>
                                                        View all
                                                    </div>

                                                </a>
                                            </Link>
                                        </div>:""
                                :""
                            }
                            

                        </div>
                        {data?.attn?.length>0 ||data?.ctg?.length>0?
                        <div className={tw``}>

                            <div className="Shape_42">
                                <div className={tw`flex flex-wrap`}>
                                    {
                                        type=='CITY'?
                                        data.attn.slice(0, attlimit).map((item, i) => {
                                            let url = "/travel-guide/india/attraction" + "-" + item.name.trim().replace(/\s+/g, ' ').replace(/-/g, "").replace(/\s+/g, "-").toLowerCase() + "/" + item.id + "/"
                                            return (
                                                <div className={tw`w-1/2 lg:w-1/4 p-2`}>
                                                    <Link href={url} key={i}>
                                                        <div>
                                                            <div className="image-squre__">
                                                                <img
                                                                    style={{ height: '100%', width: '100%' }}
                                                                    src={
                                                                        item.images.length > 0 ? item.images : `${Constants.assets_api}/public/icons/logo-icon.png`
                                                                    }
                                                                    alt=""
                                                                />

                                                            </div>
                                                            <p>{item.name}</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        }):
                                        data.ctg.slice(0, attlimit).map((item, i) => {
                                            let url = createTGCityURL({city:item.name,id:item.tgid})
                                            // let url = `/travel-guide/india/city-${item.name.toLowerCase()}/${item.tgid}/`
                                            // let url = "/travel-guide/india/attraction" + "-" + item.name.trim().replace(/\s+/g, ' ').replace(/-/g, "").replace(/\s+/g, "-").toLowerCase() + "/" + item.id + "/"
                                            return (
                                                <div className={tw`w-1/4 p-2`}>
                                                    
                                                    <Link href={url} key={i}>
                                                        <a>
                                                        <div>
                                                            <div className="image-squre__">
                                                                <img
                                                                    style={{ height: '100%', width: '100%' }}
                                                                    src={
                                                                        item.images.length > 0 ? item.images : `${Constants.assets_api}/public/icons/logo-icon.png`
                                                                    }
                                                                    alt=""
                                                                />

                                                            </div>
                                                            <p>{item.name}</p>
                                                        </div>
                                                        </a>
                                                    </Link>
                                                    
                                                </div>
                                            )
                                        })


                                    }
                                </div>
                                {data?.attn?.length>0 ||data?.ctg?.length>0?
                                <div>
                                    <a onClick={() => attlimit == 4 ? setAttlimit(100) : setAttlimit(4)}>
                                        <div className='btn_view_more'>
                                            View
                                            {attlimit == 4 ? " All " : " Less "}


                                            Tourist place in {data.tg.cityName}
                                        </div>
                                    </a>
                                </div>:""}

                            </div>
                        </div>:""}

                    </div>
                    <Content data={data} />
                </div>


            </div>
            {/* <HomePackages data={packages} /> */}

            {/* {
                packages.length!=0?<HomePackages data={packages} />:""
            }             */}
            {
                type=='STATE'
                ?packages_state.length!=0?<HomePackages data={packages_state} />:""
                :packages.packages.length!=0?<HomePackages data={packages} />:""
            }


            {
                type=='COUNTRY' && data.stg ?
                <TravelGuide data={data.stg}/>
                :""
            }



            {
                hotels.length!=0?<Hotel data={hotels} />:""
            }
            
            {
                type=='CITY'?
                article.length!=0?<Articles data={article} />:""
                // :data.attn
                :data.attn.length?<State_Attraction data={data.attn}/>:""
            }
            {
                qna.length!=0?
                <>
                    <QnaListing data={qna} travelGuide={true} />
                    <Link href={`/qna/${data.tg.cityName}-${data.tg.id}/`}>
                        <a className="anchore_coment _w100 _m_" href={`/qna/${data.tg.cityName}-${data.tg.id}/`}>
                            <div>
                                View All QNA
                            </div>

                        </a>
                    </Link>                
                </>
                
                
                :""
            }            
            {/* <Articles data={article} /> */}

            {/* <QnaListing data={qna} travelGuide={true} /> */}

            <Leaform 
                isshow = {sendquery}
                packageid={data.tg.id}
                packageName={data.tg.cityName}
                changeForm = {updateChangeForm}            
            />
        </section>

    </>
}

export default TravelGuideDetailComp