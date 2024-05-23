// import Nav from "../Nav"
// import Nav from '../Nav'
import { IoLocationSharp } from "react-icons/io5";
// import client from "../Graphql/service";
// import { getTravelGuideDetail, getTravelPackage, getTravelHotel, getarticleQuery, getQnaQuery } from "../Graphql/Queries";

import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { BsDot } from "react-icons/bs";
// import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import Link from "next/link";
// import HomePackages from "../home/packages";
// import Hotel from "../home/hotel";
// import Articles from "../home/articles";
// import QnaListing from "../Qna";
// import Content from "../trave-guide/content";
// import Leaform from '../leadform'
// import State_Attraction from "../trave-guide/attractions";
import Image from "next/image";
import { useRouter } from "next/router";
// import TravelGuide from '../home/travel_guide';
// import Meta from '../meta';
import * as Constants from "../Constants";
import {
  createAttractionsURL,
  createCityListURL,
  createCountryListURL,
  createPlacesToVisitURL,
  createStateListURL,
  createTGCityURL,
  createTGCountryURL,
  createTGStateURL,
  createTravelGuideDetailWithSlug,
  imgNameByUrl,
  jpgToWebp,
  textDecode,
  toTitleCase,
} from "../fun";
// import BreadCrumbs from "../breadcrumbs";
import dynamic from "next/dynamic";
import TopCities from "./top_cities";
import CustomImage from "../Img";
import P_Cities from "../places/p_cities";
// import ParseHtml from '../parseToHtml';

const ParseHtml = dynamic(() => import("../parseToHtml"));
const BreadCrumbs = dynamic(() => import("../breadcrumbs"));
const Nav = dynamic(() => import("../Nav"));
const HomePackages = dynamic(() => import("../home/packages"));
const Hotel = dynamic(() => import("../home/hotel"));
const Articles = dynamic(() => import("../home/articles"));
const QnaListing = dynamic(() => import("../Qna"));
const Content = dynamic(() => import("../trave-guide/content"));
const Leaform = dynamic(() => import("../leadform"));
const State_Attraction = dynamic(() => import("../trave-guide/attractions"));
// const Meta = dynamic(() => import("../meta"));
const TravelGuide = dynamic(() => import("../home/travel_guide"));

const TravelGuideDetailComp = ({
  meta,
  packages_state,
  data,
  weather,
  packages,
  hotels,
  article,
  qna,
  type,
  state_t = undefined,
}) => {
  console.log(data);
  const [overviewlimit, setOverviewlimit] = useState(200);
  const [overview, setOverview] = useState(data.tg?.overviewDesc);
  const [attlimit, setAttlimit] = useState(4);
  const {asPath,query} = useRouter()
  const [sendquery, setSendquery] = useState(false);

  const updateChangeForm = (val) => {
    setSendquery(val);
  };

  const bread = {
    disabled: {
      item: `${data.tg.cityName}`,
    },
    enabled: [
      {
        item: "Home",
        href: "/",
      },
      {
        item: "Travel Guide",
        href: "/travel-guide/",
      },
      // {
      //   item: "India",
      //   href: "/travel-guide/",
      // },
    ],
  };
  const city_bread = {
    disabled: {
      item: `${data.tg.cityName}`,
    },
    enabled: [
      {
        item: "Home",
        href: "/",
      },
      {
        item: "Travel Guide",
        href: "/travel-guide/",
      },
      {
        item: `${data?.city?.sname}`,
        href: createTGStateURL({city:data?.city?.sname,id:data?.stid?.id})
      },
    ],
  };

  const con_bread = {
    disabled: {
      item: `${data.tg.cityName}`,
    },
    enabled: [
      {
        item: "Home",
        href: "/",
      },
      {
        item: "Travel Guide",
        href: "/travel-guide/",
      },
    ],
  };

  const imagesRender = data?.images?.map((img, index) => {
    return (
      <div key={index}>
        <CustomImage 
        img_url={jpgToWebp({ uri: img.i })}
        alt={imgNameByUrl({ url: img.i })}
        className={`img rounded-[8px]`}        
        />
      </div>
    );
  });

  // var d = region?.desc

  var d = data.tg?.overviewDesc;

  useEffect(() => {
    if (data.tg?.overviewDesc !== null)
      setOverview(d.substring(0, overviewlimit));
  }, [overviewlimit]);

  // calender_multi_clr.png
  const rightBlock = ({ icon, heading, desc }) => {
    return (
      <div className={`flex pb-2`}>
        <div>
          <img
            src={`${Constants.assets_api}/public/icons/${icon}`}
            alt="icon"
            className={`inline`}
            style={{height:'15.7px'}}
          />
        </div>
        <div className={`ml-4`}>
          <div className={`t_12px font-bold`}>{heading}</div>
          <div className="t_12px">{desc}</div>
        </div>
      </div>
    );
  };

  // console.log(packages)
  // console.log(packages_state)

  const NearBy = ({e,index}) =>{
    return <>
    
    <div className={`w-1/2`} key={index}>
      <Link href={type==='STATE'?createTGStateURL({city:e.name??e.cityName, id:e.tgid??e.id}):type=="CITY"?createTGCityURL({city:e.name??e.cityName, id:e.tgid??e.id}):createTGCountryURL({country:e.cityName,id:e.id})}>
        {/* <Image /> */}
        <div className="pb-2">
          <div className={`relative h-[100px] mx-2 pb-4`}>
            <CustomImage 
              img_url={e.images }
              // alt={imgNameByUrl({ url: img.i })}
              className={`img rounded-[8px]`}            
            />
          </div>
          <div className={`ml-2`}>
              {e.name??e.cityName}
          </div>
        </div>
      </Link>
    </div>    
    
    </>
  }

  // const getTab = (tab) =>{
  //   {
  //     if(tab == "")
  //   }
  // }

  return (
    <>
      <Nav />
      <BreadCrumbs bread={data.tg.geoType == "COUNTRY" ? con_bread :data.tg.geoType == "CITY"? city_bread:  bread} />
      <section className="container" itemScope itemType="https://schema.org/WebPage">
      <a itemProp="url" href={`https://www.kiomoi.com/${asPath}`}/>
        <meta itemProp="name" content={`${query.slug} in ${data.tg.cityName}`} />
        {/* <h1 className={`text-2xl font-bold`}>{data.tg.cityName}</h1> */}
        <div className="detail_slide_nav pt-2 pb-4">
          <ul>
            {data.priority.map((e,index)=>{
              return <>
                      <li key={index}>
                        <Link 
                        
                        className={`${query?.slug?.replace(/-/g," ") == e.heading.toLowerCase() ? "_c_active":""}`}
                        
                        
                        href={
                          e.heading.toLowerCase() != 'overview'?  
                          createTravelGuideDetailWithSlug({type:type,city:query.city??query.country,slug:e.heading,id:query.id}):
                          `${type=="CITY"?createTGCityURL({city:query.city,id:query.id}):type=="STATE"?createTGStateURL({city:query.city,id:query.id}):createTGCountryURL({country:query.country,id:query.id})}`
                        }>
                          {e.heading}
                        </Link>
                      </li>            
              </>
            })}
          </ul>
          
          <ul style={{display:'none'}}>
            <li>
              <a className={`${query?.slug?"":"_c_active"}`} href={type=="CITY"?createTGCityURL({city:query.city,id:query.id}):type=="STATE"?createTGStateURL({city:query.city,id:query.id}):createTGCountryURL({country:query.country,id:query.id})}>
                Overview
              </a>
            </li>
            {data.tg.howToReachwHeading ? (
              <li>
                <a 
                
                className={`${query?.slug?.replace(/-/g," ") == data.tg.howToReachwHeading.toLowerCase() ? "_c_active":""}`}
                
                href={
                  createTravelGuideDetailWithSlug({type:type,city:query.city??query.country,slug:data.tg.howToReachwHeading,id:query.id})
                  
                }>
                  {data.tg.howToReachwHeading}
                </a>
              </li>
            ) : (
              ""
            )}
            {data.tg.eventsHeading ? (
              <li>
                <a 
                  className={`${query?.slug?.replace(/-/g," ") == data.tg.eventsHeading.toLowerCase() ? "_c_active":""}`}
                  href={
                  createTravelGuideDetailWithSlug({type:type,city:query.city??query.country,slug:data.tg.eventsHeading,id:query.id})
                  } >
                  {data.tg.eventsHeading}
                </a>
              </li>
            ) : (
              ""
            )}
            {data.tg.factsHeading ? (
              <li>
                <a 
                  className={`${query?.slug?.replace(/-/g," ") == data.tg.factsHeading.toLowerCase() ? "_c_active":""}`}
                  href={
                  createTravelGuideDetailWithSlug({type:type,city:query.city??query.country,slug:data.tg.factsHeading,id:query.id})
                  }>{data.tg.factsHeading}</a>
              </li>
            ) : (
              ""
            )}
            {data.tg.foodHeading ? (
              <li>
                <a 
                
                className={`${query?.slug?.replace(/-/g," ") == data.tg.foodHeading.toLowerCase() || query?.slug == "top-sightseeing-places-and-attractions-to-visit" ? "_c_active":""}`}
                
                href={
                  createTravelGuideDetailWithSlug({type:type,city:query.city??query.country,slug:data.tg.foodHeading,id:query.id})
                  } >
                    
                    {data.tg.foodHeading}</a>
              </li>
            ) : (
              ""
            )}
            {data.marketHeading ? (
              <li>
                <a 
                className={`${query?.slug?.replace(/-/g," ") == data.marketHeading.toLowerCase() ? "_c_active":""}`}
                href={
                  createTravelGuideDetailWithSlug({type:type,city:query.city??query.country,slug:data.marketHeading,id:query.id})
                }>{data.marketHeading}</a>
              </li>
            ) : (
              ""
            )}
            {data.tg.marketHeading ? (
              <li>
                <a 
                className={`${query?.slug?.replace(/-/g," ") == data.tg.marketHeading.toLowerCase() ? "_c_active":""}`}
                href={
                  createTravelGuideDetailWithSlug({type:type,city:query.city??query.country,slug:data.tg.marketHeading,id:query.id})
                  
                  }>
                  {data.tg.marketHeading}
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>

        <div className={`flex flex-wrap`}>
          <div className={`w-full lg:w-2/3`}>
            <div className="slider_details">
              <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infinite={true}
                autoPlay={true}
                className="slider_banner slider_overlay"
              >
                {data?.images != null && data?.images.length > 0 ? (
                  imagesRender
                ) : (
                  // <img
                  //   src={`${Constants.assets_api}/public/icons/logo-icon.png`}
                  //   alt="kiomoi logo"
                  // />
                  <CustomImage
                      img_url={""}
                      className=""
                  />
                )}
              </Carousel>
            
              <div className="title_listing_ block lg:hidden">
                {type == "CITY" ? (
                  <h1 className={`text-2xl font-bold my-2`}>
                    
                    {query.slug? 
                    <>{toTitleCase(textDecode({text:query.slug}))} in {data.tg.cityName}</>
                    :<>{data.tg.cityName} Tourism And Travel Guide</>
                    }
                    
                    </h1>
                ) : (
                  <h1 className={`text-2xl font-bold my-2`}>
                    {/* {data.tg.cityName} tourism and travel guide */}
                    {query.slug? 
                    <>{toTitleCase(textDecode({text:query.slug}))} in {data.tg.cityName}</>
                    :<>{ textDecode({text:data.tg.cityName})} Tourism And Travel Guide</>
                    }              
                  </h1>
                )}
              </div>
            </div>
          </div>
          <div className={`w-full lg:w-1/3`}>
            <div className="lg:pl-6 mb-4 hidden lg:block">
            <div className="title_listing_" itemProp="name">
              {type == "CITY" ? (
                <h1 className={`text-2xl font-bold`}>
                  
                  {query.slug? 
                  <>{toTitleCase(textDecode({text:query.slug}))} in {data.tg.cityName}</>
                  :<>{data.tg.cityName} Tourism And Travel Guide</>
                  }
                  
                  </h1>
              ) : (
                <h1 className={`text-2xl font-bold`}>
                  {/* {data.tg.cityName} tourism and travel guide */}
                  {query.slug? 
                  <>{toTitleCase(textDecode({text:query.slug}))} in {data.tg.cityName}</>
                  :<>{ textDecode({text:data.tg.cityName})} Tourism And Travel Guide</>
                  }              
                </h1>
              )}
            </div>
            </div>

            <div className={`pl-0 lg:pl-6 `}>
              <div className="_b_right_list_1">
                <div className="_asia_india">
                  <div className={`flex justify-between`}>
                    <div className={`flex items-center`}>
                      <IoLocationSharp className="inline" />
                      <span className={`pl-1`}>{data.tg.cityName}</span>
                      <BsDot className={`inline`} /> <span>{type=='COUNTRY'?"ASIA":"India"}</span>
                    </div>
                    <div className="cir_bg">
                      {type == "CITY"
                        ? data?.city?.ratings + "/5"
                        : type == "STATE"
                        ? data?.state?.ratings + "/5"
                        : data?.country?.ratings + "/5"}
                    </div>
                  </div>
                </div>

                <div className={`p-2`}>
                  <div className={`bg-white`}>
                    <div className={`flex justify-between`}>
                      {type == "COUNTRY" ? (
                        <>
                          <div className={`w-full lg:1/2`}>
                            {rightBlock({
                              icon: "new_delhi.png",
                              heading: "Capital",
                              desc: data.country.capital,
                            })}
                            {rightBlock({
                              icon: "new_delhi.png",
                              heading: "Continent",
                              desc: data.country.continent,
                            })}
                            {rightBlock({
                              icon: "language.png",
                              heading: "Major Languages",
                              desc: data.country.languages,
                            })}
                          </div>

                          <div className={`w-full lg:1/2`}>
                            {rightBlock({
                              icon: "region.png",
                              heading: "Currency",
                              desc: data.country.currency,
                            })}
                            {rightBlock({
                              icon: "plane_icon.png",
                              heading: "Major Airports",
                              desc:
                                type != "COUNTRY"
                                  ? "Delhi, Mumbai, Chennai, Kolkata"
                                  : "",
                            })}
                            {rightBlock({
                              icon: "language.png",
                              heading: "Ideal Duration",
                              desc: data.country.idealTripDuration,
                            })}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`w-full lg:1/2`}>
                            {rightBlock({
                              icon: "calender_multi_clr.png",
                              heading: "Best Session",
                              desc:
                                type == "CITY"
                                  ? data.city.visitTime
                                  : data?.state?.visitTime,
                            })}
                            {type == "CITY"
                              ? rightBlock({
                                  icon: "language.png",
                                  heading: "Ideal Duration",
                                  desc:
                                    type == "CITY"
                                      ? data.city.idealTripDuration
                                      : data?.state?.idealTripDuration,
                                })
                              : rightBlock({
                                  icon: "new_delhi.png",
                                  heading: "Capital",
                                  desc:
                                    type == "CITY"
                                      ? data.city.nearbyAirport
                                      : data?.state?.capital,
                                })}
                            {type == "STATE"
                              ? rightBlock({
                                  icon: "language.png",
                                  heading: "Major Languages",
                                  desc: data?.state?.languages,
                                })
                              : ""}
                          </div>

                          <div className={`w-full lg:1/2`}>
                            {type == "CITY"
                              ? rightBlock({
                                  icon: "train.png",
                                  heading: "Station:",
                                  desc: data.city.nearbyRailway,
                                })
                              : rightBlock({
                                  icon: "plane_icon.png",
                                  heading: "Major Airports",
                                  desc: data?.state?.airports,
                                })}

                            {type == "CITY"
                              ? rightBlock({
                                  icon: "plane_icon.png",
                                  heading: "Major Airports",
                                  desc:
                                    type == "CITY"
                                      ? data.city.nearbyAirport
                                      : data?.state?.nearbyAirport,
                                })
                              : rightBlock({
                                  icon: "calender_multi_clr.png",
                                  heading: "Ideal Duration",
                                  desc: data?.state?.idealTripDuration,
                                })}

                            {type == "STATE" ? (
                              <div className={`flex`}>
                                <div>
                                  <IoLocationSharp
                                    className={`inline h-[15.7px]`}
                                  />
                                  {/* <img src={`/icons/${icon}`} alt="" className={`inline`} style={{ height: '15.7px' }} /> */}
                                </div>
                                <div className={`ml-2`}>
                                  <div className={`t_12px font-bold`}>
                                    Region
                                  </div>
                                  <div className="t_12px">
                                    {data?.state?.region}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {}

                  {type == "CITY" ? (
                    <div className={`bg-white`}>
                      <div className={`flex justify-between`}>
                        <div className={`w-full lg:1/2`}>
                          {rightBlock({
                            icon: "whether_icon.png",
                            heading: "Weather",
                            desc: `${weather?.main?.temp} ° C`,
                          })}
                        </div>

                        <div className={`w-full lg:1/2`}>
                          {
                            // type=='CITY'?
                            rightBlock({
                              icon: "whether_icon.png",
                              heading: "Weather Type",
                              desc: weather?.weather[0]?.main,
                            })
                            // :rightBlock({ icon: 'plane_icon.png', heading: 'Station', desc: weather?.weather[0]?.main })
                          }
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="_b_right_list_1 p-2">
                <div className={`bg-white`}>
                  <div className={`flex justify-between`}>
                    <div className={`w-full lg:1/2`}>
                      <div className="price_inr">
                        {data.mincost <= 100 ? (
                          "Price On Request"
                        ) : (
                          <>
                            <FaRupeeSign
                              className={`inline rupee mb-[4px]`}
                            />
                            {data.mincost / 100}/-
                          </>
                        )}
                      </div>
                      <div className={`text-[10px] text-slate-700`}>onwards</div>
                    </div>

                    <div className={`w-full lg:1/2`}>
                      <div className={`float-right`}>
                        {data.mincost >= 100 ? (
                          <Link
                            href={
                              type == "CITY"
                                ? createCityListURL({
                                    cityname: data.tg.cityName,
                                    id: data.gid,
                                  })
                                : // type=='CITY'?`/holidays/${data.tg.cityName.replace(/\s+/g, "-").toLowerCase()}-tour-packages/`:

                                type == "STATE"
                                ? createStateListURL({
                                    statename: data.tg.cityName,
                                    id: data.gid,
                                  })
                                : createCountryListURL({
                                    cityname: data.tg.cityName,
                                    id: data.gid,
                                  })
                              // `/holidays/${data.tg.cityName.replace(/\s+/g, "-").toLowerCase()}-tour-packages/${data.gid}`}
                            }
                          >
                            <div>
                              <button className="btn_listing_t _font_big">
                                VIEW PACKAGES
                              </button>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`pt-2`}>
                  <div
                    className={`btn_listing _btn_clr cursor-pointer w-full text-center`}
                    onClick={() => setSendquery(true)}
                  >
                    KNOW MORE & GET CUSTOMIZE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <span itemProp="publisher" itemScope itemType="https://schema.org/Organization" >
          <meta itemProp="name" content="Kiomoi"/>
          <span itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
            <meta itemProp="url" content="https://www.kiomoi.com/icons/kiomoi%20logo.svg"  />
          </span>
        </span>

        <div className={`flex flex-wrap`}>
          <div className={`mt-4 w-full lg:w-2/3`}>            
            <div>
              {query?.slug?
              
              <>
                <Content data={data} />
                {query?.slug?.replace(/-/g," ") == data.tg.foodHeading.toLowerCase() || query?.slug == "top-sightseeing-places-and-attractions-to-visit"?

                // <>
                <>
                <h2 className={"_titles_"}>
                  Attractions in {data?.tg?.cityName}
                </h2>
                <P_Cities data={data} />
                </>
                :""

                
              
              }
               </>
              :<>            
              
              <h2 className={"_titles_"}>Overview</h2>
              <div className={``}>
                <div className="Shape_42">
                  {/* {ReactHtmlParser(overview)} */}
                  {/* {overview} */}
                  <div itemProp="description" dangerouslySetInnerHTML={{__html:overview}} />
                  {/* <ParseHtml text={overview} /> */}
                  {overviewlimit == 150 || overviewlimit == 200 ? (
                    <a
                      onClick={() => setOverviewlimit(10000)}
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
              
              </>
              }


              

              <div>
              {/* {type == "COUNTRY" && data.stg ? <TravelGuide data={data.stg} /> : ""} */}
                <div className={`flex justify-between`}>
                  {/* {type == "CITY" ?  ""
                  : data?.attn?.length > 0? (
                    <div className={`flex_ justify-between_`}>
                      <h2 className={`text-xl font-bold`}>
                        Top Cities in {data?.tg?.cityName}
                      </h2>
                    </div>
                    
                  ) : (
                    ""
                  )} */}
                  

                  {type == "CITY" ? (
                    data?.attn?.length > 0 ? (
                      ""
                      // <div>
                      //   <Link href={`/cities/${data?.tg?.cityName.toLowerCase()}/top-sightseeing-places-and-attractions-to-visit-${data?.tg?.id}`}>
                      //     <div>
                      //       <div className="btn_view_more">View all</div>
                      //     </div>
                      //   </Link>
                      // </div>
                    ) : (
                      ""
                    )
                  ) : (
                    <div>
                      {/* /states/:city/top-places-to-visit-:id */}
                      {/* {
                        type!="COUNTRY"?<Link 
                        // href={`/states/${data?.tg?.cityName.toLowerCase()}/top-places-to-visit-${data?.tg?.id}`}
                        href={createPlacesToVisitURL({cityname:data?.tg?.cityName,id:data?.tg?.id})}
                        >
                        <div>
                          <div className="btn_view_more">View all</div>
                        </div>
                      </Link>:""
                      } */}
                      
                    </div>
                  )}
                </div>
                {data?.attn?.length > 0 || data?.ctg?.length > 0 ? (
                  <div className={``}>
                    <div className="Shape_42_">
                      <div className={`flex flex-wrap`}>
                        {
                          // type == "CITY" ? "" 
                          
                          // : (
                          //   <TopCities data={data} />
                          // )

                          // data.ctg.slice(0, attlimit).map((item, i) => {
                          //     let url = createTGCityURL({city:item.name,id:item.tgid})
                          //     // let url = `/travel-guide/india/city-${item.name.toLowerCase()}/${item.tgid}/`
                          //     // let url = "/travel-guide/india/attraction" + "-" + item.name.trim().replace(/\s+/g, ' ').replace(/-/g, "").replace(/\s+/g, "-").toLowerCase() + "/" + item.id + "/"
                          //     return (
                          //         <div className={`w-1/4 p-2`}>

                          //             <Link href={url} key={i}>
                          //                 <div>
                          //                 <div>
                          //                     <div className="image-squre__">
                          //                         <img
                          //                             className={`w-full h-full`}
                          //                             src={
                          //                                 item.images.length > 0 ? item.images : `${Constants.assets_api}/public/icons/logo-icon.png`
                          //                             }
                          //                             alt="kiomoi logo"
                          //                         />

                          //                     </div>
                          //                     <p>{item.name}</p>
                          //                 </div>
                          //                 </div>
                          //             </Link>

                          //         </div>
                          //     )
                          // })
                        }
                      </div>
                      {/* {data?.ctg?.length > 0 ? (
                        <div>
                          <a
                            onClick={() =>
                              attlimit == 4 ? setAttlimit(100) : setAttlimit(4)
                            }
                          >
                            <div className="btn_view_more">
                              View
                              {attlimit == 4 ? " All " : " Less "}
                              Tourist place in {data.tg.cityName}
                            </div>
                          </a>
                        </div>
                      ) : (
                        ""
                      )} */}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

            </div>
          </div>
          <div className={`mt-4 w-full lg:w-1/3`}>
            
              <div className={`lg:pl-6`}>
                
                {
                  data?.stg || data?.ctg? <>
                    <h2 className="_titles_ pl-2">{data.tg.cityName} Nearby {type==='STATE'?"States":type==="CITY"?"Cities":"Countries"}  </h2>                
                  </>:""
                }
                <div className={`flex flex-wrap pt-2`}>
                  
                  {
                    
                    type === 'STATE'
                    ?data?.stg?.slice(0,6).map((e,index)=>{
                      return <NearBy e={e} index={index} />
                    })
                    :""
                  
                  }
                  {
                        type === 'CITY'
                        ?data.ctg?.slice(0,6).map((e,index)=>{
                          return <NearBy e={e} index={index} />
                        })
                        :""
                  }

                  {
                        type === 'COUNTRY'
                        ?data.countries?.slice(0,6).map((e,index)=>{
                          return <NearBy e={e} index={index} />
                        })
                        :""
                  }

                </div>
              </div>

          </div>
        </div>
        {/* <HomePackages data={packages} /> */}

        {/* {
                packages.length!=0?<HomePackages data={packages} />:""
            }             */}


        {type== "STATE" && query?.slug?.startsWith("places-to-visit")?
          <P_Cities data={data} count={3} />:""
        }

        {type == "COUNTRY" && data.stg && query?.slug?.startsWith("top-destination")?
                
              // <h2>lskdjflksdjlkfjlkds</h2>
              <P_Cities data={data} count={4}/>
              :""
            
          
          }
        {type == "STATE" ? (
          packages_state?.length != 0 && packages_state.packages != null ? (
            <HomePackages data={packages_state} />
          ) : (
            ""
          )
        ) : packages?.packages?.length != 0 ? (
          <HomePackages data={packages} />
        ) : (
          ""
        )}

        {/* {type == "COUNTRY" && data.stg ? <TravelGuide data={data.stg} type={"COUNTRY"} /> : ""} */}
        


        {hotels.length != 0 ? <Hotel data={hotels} /> : ""}

        {type == "CITY" || type == "STATE" ? (
          article.length != 0 ? (
            <Articles data={article} />
          ) : (
            ""
          )
        ) : // :data?.attn
        data?.attn?.length ? (
          <State_Attraction data={data?.attn} />
        ) : (
          ""
        )}
        {/* {qna.length != 0 ? (
          <>
            <QnaListing data={qna} travelGuide={true} />
            <Link href={`/qna/${data.tg.cityName}-${data.tg.id}/`}>
              <div
                className="anchore_coment _w100 _m_"
                href={`/qna/${data.tg.cityName}-${data.tg.id}/`}
              >
                <div>View All QNA</div>
              </div>
            </Link>
          </>
        ) : (
          ""
        )} */}
        {/* <Articles data={article} /> */}

        {/* <QnaListing data={qna} travelGuide={true} /> */}
        {sendquery ? (
          <Leaform
            isshow={sendquery}
            packageid={data.pid}
            packageName={data.tg.cityName}
            changeForm={updateChangeForm}
          />
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default TravelGuideDetailComp;
