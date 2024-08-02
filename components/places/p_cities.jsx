
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import {
  createAttractionsURL,
  createCityListURL,
  createTGCityURL,
  createTGStateURL,
} from "../fun";
import Image from "next/image";
import rightBlock from "../trave-guide/rightBlock";
import ParseHtml from "../parseToHtml";
import { useRouter } from "next/router";

const IMG = ({ e, index, url, type,count=3,button=true }) => {
  const {asPath} = useRouter()
  return (
    <>
      <div className={`w-full lg:w-1/${count} mb-6`} key={index}>
        {/* <img src={e.i} /> */}
        <div className={`p-2`}>
          <div>
            <div
              className={`pl_img_ bg-white rounded-t-lg rounded-b-lg shadow-md`}
            >
              <div className={`p-2`}>
                <div className={`flex justify-between items-center`}>
                  <div
                    className={` text-[18px] font-semibold text-slate-700`}
                  >
                    <span itemProp="position">{index + 1}</span>. <span itemProp="name">{e.name}</span>
                  </div>
                  {e.ratings ? <div className="cir_bg">{e.ratings}/5</div> : ""}
                </div>
              </div>
              <Link href={url}>
              <div className={`pl_img relative`}>
                <Image src={e.images} className={` rounded-lg_ ${type=='CITY'?'rounded-b-lg':''}`} fill />
                <div className=" absolute bottom-2 font-extralight w-full" style={{bottom:'2px',fontSize:'11px'}}>
                  <div className="px-2 drop-shadow-xl w-fit _b_active" 
                  // style={{textShadow:'2px 1px 1px #f06726'}}
                  >
                    {e?.description}
                  </div>
                </div>
              </div>
              </Link>
              <div>
                <div className={`p-2 bg-white rounded-b-2xl ${type != "STATE" ? 'hidden':'' }`}>
                  <div className={`bg-white`}>
                    {type === "STATE" ? (
                      <div>
                        <div className={`flex justify-between`}>
                          <>
                            <div className={`w-full lg:1/2`}>
                              {rightBlock({
                                icon: "calender_multi_clr.png",
                                heading: "Best Session",
                                desc:
                                  type != "CITY" ? e.visitTime : e?.visitTime,
                              })}
                              {type != "CITY"
                                ? rightBlock({
                                    icon: "language.png",
                                    heading: "Ideal Duration",
                                    desc:
                                      type != "CITY"
                                        ? e?.idealTripDuration
                                        : e?.idealTripDuration,
                                  })
                                : rightBlock({
                                    icon: "new_delhi.png",
                                    heading: "Capital",
                                    desc:
                                      type != "CITY"
                                        ? e?.nearbyAirport
                                        : e?.capital,
                                  })}
                              {type != "STATE"
                                ? rightBlock({
                                    icon: "language.png",
                                    heading: "Major Languages",
                                    desc: e?.languages,
                                  })
                                : ""}
                            </div>

                            <div className={`w-full lg:1/2`}>
                              {type != "CITY"
                                ? rightBlock({
                                    icon: "train.png",
                                    heading: "Station:",
                                    desc: e.nearbyRailway,
                                  })
                                : rightBlock({
                                    icon: "plane_icon.png",
                                    heading: "Major Airports",
                                    desc: e?.airports,
                                  })}

                              {type != "CITY"
                                ? rightBlock({
                                    icon: "plane_icon.png",
                                    heading: "Major Airports",
                                    desc:
                                      type != "CITY"
                                        ? e.nearbyAirport
                                        : e?.nearbyAirport,
                                  })
                                : rightBlock({
                                    icon: "calender_multi_clr.png",
                                    heading: "Ideal Duration",
                                    desc: e?.idealTripDuration,
                                  })}

                              {type != "STATE" ? (
                                <div className={`flex`}>
                                  <div>
                                    <IoLocationSharp
                                      className={`inline h-[15.7px]`}
                                      // style={{height:'15.7px'}}
                                    />
                                    {/* <img src={`/icons/${icon}`} alt="" className={`inline`} style={{ height: '15.7px' }} /> */}
                                  </div>
                                  <div className={`ml-2`}>
                                    <div className={`t_12px font-bold`}>
                                      Region
                                    </div>
                                    <div className="t_12px">{e?.region}</div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </>
                        </div>
                        <div className="p-2 h-[80px] overflow-hidden">
                          {ParseHtml({ text: e.ds.slice(0, 100) })}
                          <span className="inline">...</span>
                        </div>
                      </div>
                    ) : (
                      e.description
                    )}
                  </div>
                  <a itemProp="url" href={`https://www.kiomoi.com${asPath}`} />
                  {button?
                  <div className="flex justify-between py-2">
                    
                      <Link className="btn_listing" href={url}>
                        Read more
                      </Link>
                    

                    {
                      e.geoid
                      ?<Link
                      className="btn_listing _btn_clr"
                      href={createCityListURL({ cityname: e.name, id: e.geoid })}
                    >
                      View packages
                    </Link>
                    :""
                    }
                    
                  </div>:""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const P_Cities = ({ data, start = undefined, end = undefined,count=3, button=true }) => {
  // console.log(data.stg)
  // const Grouping = (list) =>{
  //     return list.reduce((groups, item) => {
  //         const group = (groups[item.group] || []);
  //         group.push(item);
  //         groups[item.group] = group;
  //         return groups;
  //       })
  // }

  const groups = data?.stg?.reduce((groups, item) => {
    const group = groups[item.region] || [];
    group.push(item);
    groups[item.region] = group;
    return groups;
  }, {});

  return (
    <>
      <div className={`flex_ flex-wrap_`}>
        {data?.state ? (
          <div className={`flex flex-wrap`}>
            {start === undefined && end == undefined
              ? data.ctg.map((e, index) => {
                  // let url = createAttractionsURL({city:data?.tg?.cityName,attraction:item.name,id:item.id})
                  let url = createTGCityURL({ city: e.name, id: e.tgid });
                  return <IMG button={button} count={count} index={index} e={e} url={url} type={data.tp} />;
                })
              : start != undefined && end != undefined
              ? data.ctg.slice(start, end).map((e, index) => {
                  // let url = createAttractionsURL({city:data?.tg?.cityName,attraction:item.name,id:item.id})
                  let url = createTGCityURL({ city: e.name, id: e.tgid });
                  return <IMG button={button} count={count} index={index} e={e} url={url} type={data.tp} />;
                })
              : data.ctg.slice(start).map((e, index) => {
                  // let url = createAttractionsURL({city:data?.tg?.cityName,attraction:item.name,id:item.id})
                  let url = createTGCityURL({ city: e.name, id: e.tgid });
                  return (
                    <IMG button={button} count={count} index={index + start} e={e} url={url} type={data.tp} />
                  );
                })}
          </div>
        ) : data?.country ? (
          <>
            {Object.keys(groups).map((key, value) => {
              return (
                <>
                  <h3
                    className={`text-xl font-bold mt-8 border-b border-gray-500 _b_active`}
                  >
                    {" "}
                    Popular Destinations In {key} India{" "}
                  </h3>
                  <div className={`flex flex-wrap pt-2`}>
                    {Object(groups)[key].map((e, index) => {
                      let url = createTGStateURL({ city: e.name, id: e.tgid });
                      return (
                        <IMG button={button} count={count} index={index} e={e} url={url} type={data.tp} />
                      );
                    })}
                  </div>
                </>
              );
            })}
            {/* <h2 className={`h text-xl font-bold pb-2 _b_active mt-8`}> Top {data?.ctg?.length} Sightseeing Places in {data?.tg?.cityName}</h2>
                    <div className={`flex flex-wrap`}>
                        {
                            data.ctg.map((e,index)=>{
                                let url = createTGCityURL({city:e.name,id:e.tgid})
                                return <IMG button={button} count={count} index={index} e={e} url={url} type={data.tp}/>
                                
                            })
                        }
                        
                    </div> */}
          </>
        ) : (
          // .map((e,index)=>{
          //     let url = createTGStateURL({city:e.name,id:e.tgid})
          //     return <IMG button={button} index={index} e={e} url={url} type={data.tp}/>

          // })
          <div className={`flex flex-wrap`}>
            {/* {data.attn.map((e, index) => {
              // createAttractionsURL
              let url = createAttractionsURL({
                city: data?.tg?.cityName,
                attraction: e.name,
                id: e.id,
              });
              // let url = createTGCityURL
              return <IMG button={button} count={count} index={index} e={e} url={url} type={data.tp} />;
            })
            
            } */}
            {start === undefined && end == undefined
              ? data.attn.map((e, index) => {
                  let url = createAttractionsURL({city:data?.tg?.cityName,attraction:e.name,id:e.id})
                  // let url = createTGCityURL({ city: e.name, id: e.tgid });
                  return <IMG button={button} count={count} index={index} e={e} url={url} type={data.tp} />;
                })
              : start != undefined && end != undefined
              ? data.attn.slice(start, end).map((e, index) => {
                let url = createAttractionsURL({city:data?.tg?.cityName,attraction:e.name,id:e.id})
                  // let url = createTGCityURL({ city: e.name, id: e.tgid });
                  return <IMG button={button} count={count} index={index} e={e} url={url} type={data.tp} />;
                })
              : data.attn.slice(start).map((e, index) => {
                  let url = createAttractionsURL({city:data?.tg?.cityName,attraction:e.name,id:e.id})
                  // let url = createTGCityURL({ city: e.name, id: e.tgid });
                  return (
                    <IMG button={button} count={count} index={index + start} e={e} url={url} type={data.tp} />
                  );
                })}

            
          </div>
        )}
      </div>
    </>
  );
};
export default P_Cities;
