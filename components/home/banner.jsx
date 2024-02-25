import { HiOutlineSearch } from "react-icons/hi";
import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import * as Constants from "../Constants";
import axios from "axios";
import {
  createArticleURL,
  createCityListURL,
  createCountryListURL,
  createDetailUrl,
  createStateListURL,
  createTGCityURL,
  createTGCountryURL,
  createTGStateURL,
  jpgToWebp,
  random,
  randomBanner
} from "../fun";
import dynamic from "next/dynamic";
// const MultiCarousel = dynamic(() => import("react-multi-carousel"));
const Banner = ({ data,holiday=false }) => {
  // const Image = dynamic(() => import('next/image').then((mod)=>mod.Image))
  // const Link = dynamic(() => import('next/link').then((mod)=>mod.Link))
  // const FaRupeeSign = dynamic(() => import('react-icons/fa').then((mod)=>mod.FaRupeeSign))
  // const BsDot = dynamic(() => import('react-icons/bs').then((mod)=>mod.BsDot))

  const [searchkey, setSearchkey] = useState({});
  const [result, setResult] = useState({});

  const Search = async () => {
    const result = await axios.post(Constants.api + "/api/v1/home/search/", {
      av: "",
      id: "",
      pt: "",
      text: searchkey,
    });
    setResult(result?.data?.output);
  };

  useEffect(() => {
    setResult({});
  }, []);

  const HandleSearch = (s_key) => {
    if (s_key.length >= 2) {
      setSearchkey(s_key);
      Search();
    } else setResult({});
  };
  // let img = "https://res.cloudinary.com/kmadmin/image/upload/v1552993397/kiomoi/Pelling/Pelling-2.jpg&w=1920&q=75";

    const responsive = {
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024
        },
        items: 1
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0
        },
        items: 1
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464
        },
        items: 1
      }
    };



// const generateRandomSrc = (array) =>  {
//   // source.innerText = `Today's video ${srcArray[random()]}`
// }
  return (
    <>
      <div
        className={`overflow-hidden slider_banner slider_banner_ slider_overlay`}
      >
        <div>
          <div>

              {
                // data.map((e,index)=>{
                //     return <Image key={index}
                //     className={`img-responsive_banner ${!holiday?'lg:rounded-bl-[50%] lg:rounded-br-[50%]':''}`}
                //     alt="kiomoi banner"
                //     src={jpgToWebp({ uri: e?.i??e })}
                //     width={1000}
                //     height={800}
                //     loading="eager"
                //     // fill
                // />
                // })

                // data.map((e,index)=>{
                    // return 
                    
                    <Image
                    className={`img-responsive_banner ${!holiday?'lg:rounded-bl-[50%] lg:rounded-br-[50%]':''}`}
                    alt="kiomoi banner"
                    src={jpgToWebp({ uri: randomBanner(data,holiday?"HOLIDAYS":"HOME")?.i??"" })}
                    width={1000}
                    height={800}
                    loading="eager"
                    // fill
                />
              }

            
            
          </div>
        </div>
      </div>

      <div className="container">
        <div className="search_input">
          <HiOutlineSearch className="m_s_icon" />
          <input
            type="text"
            className={`form-control z-[999]`}
            onChange={(event) => HandleSearch(event.target.value)}
            placeholder={!holiday?"Search Any Destination, Travel Guide, Trip or Stays":"Search Any Tour or Destination"}
          />
          {searchkey.length >= 2 ? (
            <section className="dropdown-content-home">
              <div>
                {result?.packages?.map((e, index) => (
                  <div key={index} onClick={() => setSearchkey("")}>
                    <Link href={createDetailUrl({ name: e?.name, id: e?.id })}>
                      <div className={`hover:bg-[#fde2df] drop_item`}>
                        <div className="d_content">
                          <div className="flt_left">
                            <span className="s_name">{e?.name}</span>
                          </div>
                          <div className="flt_right">
                            <FaRupeeSign className={`d_price inline`} />
                            <span className="d_price">{e?.price / 100}</span>
                            <BsDot className={`inline d_price`} />
                            <span className="n_d">
                              {e?.nights}N & {e?.nights + 1}D
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                
                {result?.st?.map((e, index) => {
                  let url = "";
                  if (e?.type == "COUNTRY") {
                    url = createCountryListURL({ cityname: e?.name, id: e.id });
                  } else if (e?.type == "STATE") {
                    url = createStateListURL({ statename: e?.name, id: e.id });
                    // url = `/holidays/${e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase()}-tour-packages/${e?.id}`
                  } else {
                    url = createCityListURL({ cityname: e?.name, id: e?.id });
                  }
                  // console.log(url)

                  if (url.length > 0) {
                    return (
                      <div key={index} onClick={() => setSearchkey("")}>
                        <Link href={url}>
                          <div className={`hover:bg-[#fde2df] drop_item`}>
                            <div className="s_name d_content">
                              Tours in {e?.name}
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                })}

                {!holiday?result?.hotels?.map((e, index) => (
                  <div key={index} onClick={() => setSearchkey("")}>
                    <Link
                      href={`/hotel-${e?.name
                        ?.replace(/\s+/g, "-")
                        .toLowerCase()}-in-${e?.geotype
                        ?.replace(/\s+/g, "-")
                        .toLowerCase()}-${e?.id}/`}
                    >
                      <div className="drop_item">
                        <div className="s_name d_content">{e?.name}</div>
                      </div>
                    </Link>
                  </div>
                )):""}
                {!holiday?result?.articles?.map((e, index) => (
                  <div key={index} onClick={() => setSearchkey("")}>
                    <Link
                      href={createArticleURL({ heading: e?.name, id: e?.id })}
                      // href={`/travel-stories-${e?.heading?.replace(/\s+/g, "-").toLowerCase()}-${e?.geoName?.replace(/\s+/g, "-").toLowerCase()}/${e?.id}/`}
                    >
                      <div className="drop_item">
                        <div className="s_name d_content">{e?.name}</div>
                      </div>
                    </Link>
                  </div>
                )):""}
                {!holiday?result?.tgs?.map((e, index) => {
                  let url;
                  if (e?.geotype == "CITY") {
                    url = createTGCityURL({ city: e?.name, id: e?.id });
                    // url = "/travel-guide/india/city-" + e?.name?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + "/"
                  } else if (e?.geotype == "STATE") {
                    url = createTGStateURL({ city: e?.name, id: e?.id });
                    // url = "/travel-guide/india/state-" + e?.name?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + "/"
                  } else {
                    url = createTGCountryURL({ country: e?.name, id: e?.id });
                    // url = "/" + e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + "/"
                  }
                  // let statebycity = "/holidays/" + e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase() + "-tour-packages/";
                  return (
                    <div key={index} onClick={() => setSearchkey("")}>
                      {/* {e?.geotype === 'CITY' ? (
                                            <Link href={statebycity}>
                                                <div className="drop_item">
                                                    <div className="s_name d_content">Tours in {e?.name}</div>
                                                </div>
                                            </Link>
                                        ) : null} */}
                      <Link href={url}>
                        <div className="drop_item">
                          <div className="s_name d_content">{e?.name}</div>
                        </div>
                      </Link>
                    </div>
                  );
                }):""}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Banner;
