import { getTravelGuideDetail, getTravelPackage, getarticleQuery } from "@/components/Graphql/Queries";
import client from "@/components/Graphql/service";
import Nav from "@/components/Nav"
import axios from "axios";
import { tw } from "twind";
import Image from "next/image";
import BreadCrumbs from "@/components/breadcrumbs";
import Link from "next/link";
import { createCityListURL, createCountryListURL, createStateListURL, createTGCityURL, createTGStateURL, imgNameByUrl, jpgToWebp } from "@/components/fun";
import P_Cities from "@/components/places/p_cities";
import { FaRupeeSign } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import HomePackages from "@/components/home/packages";
import { Carousel } from "react-responsive-carousel";
import rightBlock from "@/components/trave-guide/rightBlock";

const Places = ({data,packages_state,packages,article,weather}) => {
    // console.log(data)
    const state_bread = {
        disabled: {
          item: `Place to visit in ${data.tg.cityName}`,
        },
        enabled: [
          {
            item: "Kiomoi",
            href: "/",
          },
          {
            item: "Travel Guide",
            href: "/travel-guide/",
          },
          {
            item: data.tg.cityName,
            href: data?.city?createTGCityURL({city:data.tg.cityName,id:data.tg.id}):createTGStateURL({city:data.tg.cityName,id:data.tg.id}),
          },
        ],
      };

      const imagesRender = data?.images?.map((img, index) => {
        return (
          <div key={index}>
            <Image
              src={jpgToWebp({ uri: img.i })}
              alt={imgNameByUrl({ url: img.i })}
              className={`img rounded-[8px]`}
              layout="fill"
            />
          </div>
        );
      });      
    const type = data.tp
    return <>
        <Nav />
        <BreadCrumbs bread={state_bread}/>
        <div className="container">
          <div className="title_listing_">
            {/* Sightseeing Places & Attractions in */}
            <h1 className={`h pb-2`}>
              
            {data?.tp =='STATE' || data?.tp =='COUNTRY' ?"Places to visit in":"Sightseeing Places & Attractions in"} {data?.tg?.cityName}
              
              </h1>
          </div>
            
            
            <div className="flex flex-wrap">
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
                    {data?.images != null && data?.images.length > 0 ? (
                      imagesRender
                    ) : (
                      <img
                        src={`${Constants.assets_api}/public/icons/logo-icon.png`}
                        alt="kiomoi logo"
                      />
                    )}
                  </Carousel>
                </div>
              </div>

              <div className={tw`w-full lg:w-1/3`}>
            <div className={tw`pl-0 lg:pl-6 `}>
              <div className="_b_right_list_1">
                <div className="_asia_india">
                  <div className={`flex justify-between`}>
                    <div className={`flex items-center`}>
                      <IoLocationSharp className="inline" />
                      <span className={`pl-1`}>{data.tg.cityName}</span>
                      <BsDot className={`inline`} /> <span>India</span>
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
                              className={`inline text-[#f79421] text-[15px] mb-[4px]`}
                            />
                            {data.mincost / 100}/-
                          </>
                        )}
                      </div>
                      <div className={`price_inr text-[9px]`}>onwards</div>
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
                    className={`btn_listing _btn_clr cursor-pointer w-full text-center text-[12px]`}
                    // onClick={() => setSendquery(true)}
                  >
                    KNOW MORE & GET CUSTOMIZE
                  </div>
                </div>
              </div>
            </div>
          </div>


            </div>
            <div className="mt-6 ">
                <h2 className={`h text-xl font-bold pb-2 _b_active`}> Top {data?.ctg?.length??data?.attn?.length} {data?.tp =='STATE' || data?.tp =='COUNTRY' ?"Places to visit in" :"Sightseeing Places in"} {data?.tg?.cityName}</h2>
                <P_Cities data={data}/>
            </div>
            
            <div>

            {/* <HomePackages data={packages_state} /> */}

            {data?.state ? (
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

            </div>
        </div>

    </>
}

export async function getServerSideProps(context) {
    let _id = context.query.id;
    const res = await client.query({
        query: getTravelGuideDetail,
        variables: { input: { id: _id } },
    })

    var resp = null;
    if (res.data.travelGuide.output.tp == "CITY") {
      // type = "CITY";
      let lat = res.data.travelGuide.output.city.lat;
      let lng = res.data.travelGuide.output.city.lng;
  
      resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=d6429646ecc55c8a9d2856f91d10ff4f&units=metric`,
      );
      // console.log(resp)
    }    



    let json_data = {
        av: "",
        geoid: res.data.travelGuide.output.gid,
        id: "",
        pagenum: 1,
        pid: 0,
        pt: "Website",
        size: 10,
        type: "CITY",
      };
    
      // console.log(json_data)
      const res1 = await client.query({
        query: getTravelPackage,
        variables: { input: json_data },
      });
      const packages = res1.data.package.output;
    
      // console.log(res.data.travelGuide.output.gid)
      let json_data_ = {
        av: "",
        geoid: res.data.travelGuide.output.gid,
        id: "",
        pagenum: 1,
        pid: 0,
        pt: "Website",
        size: 10,
        type: "STATE",
      };
      // console.log(json_data_)
    
      // console.log(json_data)
      const res_ = await client.query({
        query: getTravelPackage,
        variables: { input: json_data_ },
      });
    
      // console.log(res_)
      const packages_state = res_.data.package.output ?? [];


      let article_data = {
        av: "1.3",
        pt: "WEBSITE",
        geoid: 0,
        id: "string",
        pagenum: 1,
        pid: 0,
        size: 20,
        type: 0,
      };
    
      // getQnaQuery
    
      const article_res = await client.query({
        query: getarticleQuery,
        variables: { input: article_data },
      });
      const article = article_res.data.articles.output.articles;
    
      console.log(packages_state)


    return {
        props: {
            data: res.data.travelGuide.output,
            packages_state: packages_state,
            packages,
            article,
            weather: resp ? resp.data : {},
        }
    }
}

export default Places