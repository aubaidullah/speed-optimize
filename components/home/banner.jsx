import { Carousel } from "react-responsive-carousel";
import { HiOutlineSearch } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { BsXLg, BsDot } from 'react-icons/bs'
import { FaRupeeSign } from 'react-icons/fa'
import { tw } from 'twind';
import Link from 'next/link';
import * as Constants from '../Constants';
import axios from 'axios';
import { createCityListURL,createDetailUrl,createStateListURL, createTGCityURL, createTGCountryURL, createTGStateURL } from "../fun";

const Banner = ({ data }) => {

    const [searchkey, setSearchkey] = useState({})
    const [result, setResult] = useState({})

    const Search = async () => {
        const result = await axios.post(Constants.api + '/api/v1/home/search/', { av: '', id: '', pt: '', text: searchkey })
        setResult(result?.data?.output)
    }

    useEffect(() => {
        setResult({})
    }, [])

    const HandleSearch = (s_key) => {
        if (s_key.length >= 2) {
            setSearchkey(s_key)
            Search()
        }
        else setResult({})
    }
    return <>
    <div className={tw`overflow-hidden slider_banner slider_banner_ slider_overlay`}>
        <div>
            {/* scaleX(1.5) */}
                <img src={data[0]?.i} className="img-responsive_banner" />
        </div>
        
    </div>
        {/* <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            autoPlay={true}
            interval={3000}
            infiniteLoop={true}
            className={"slider_banner slider_banner_ slider_overlay"}
        >
            {data.map((e, index) => {
                return <img src={e?.i} key={index} className="img-responsive" />
            })}


        </Carousel> */}


        <div className="container">
            <div className="search_input">
                <HiOutlineSearch
                    className="m_s_icon"
                />
                <input type="text" className={tw`form-control z-[999]`} onChange={event => HandleSearch(event.target.value)} placeholder="Search Any Destination, Travel Guide, Trip or Stays" />
                {searchkey.length >= 2 ? (
                    <section className="dropdown-content-home">
                        <div>
                            {result?.packages?.map((e, index) => (
                                <div key={index} onClick={() => setSearchkey("")}>
                                    <Link href={createDetailUrl({name:e?.name,id:e?.id})}>
                                        <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                            <div className="d_content">
                                                <div className="flt_left">
                                                    <span className="s_name">{e?.name}</span>
                                                </div>
                                                <div className="flt_right">
                                                    <FaRupeeSign className={tw`d_price inline`} />
                                                    <span className="d_price">{e?.price / 100}</span><BsDot className={`inline d_price`} /><span className="n_d">{e?.nights}N & {e?.nights + 1}D</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {result?.st?.map((e, index) => {
                                let url = ""
                                if (e?.type == 'COUNTRY')
                                {
                                    url = `/holidays-international/${e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase()}-tour-packages/${e?.id}`
                                }
                                else  if(e?.type == 'STATE'){
                                    url = createStateListURL({statename:e?.name,id:e.id})
                                    // url = `/holidays/${e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase()}-tour-packages/${e?.id}`
                                }
                                else{
                                    url = createCityListURL({cityname:e?.name,id:e?.id})
                                }
                                // console.log(url)

                                if (url.length>0){
                                    return <div key={index} onClick={() => setSearchkey("")}>
                                    <Link href={url}>
                                        <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                            <div className="s_name d_content">Tours in {e?.name}</div>
                                        </div>
                                    </Link>
                                </div>  
                                }
                            })}
                            {result?.hotels?.map((e, index) => (
                                <div key={index} onClick={() => setSearchkey("")}>
                                    <Link href={`/hotel-${e?.name?.replace(/\s+/g, "-").toLowerCase()}-in-${e?.geotype?.replace(/\s+/g, "-").toLowerCase()}-${e?.id}/`}>
                                        <div className="drop_item">
                                            <div className="s_name d_content">{e?.name}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {result?.articles?.map((e, index) => (
                                <div key={index} onClick={() => setSearchkey("")}>
                                    <Link href={`/travel-stories-${e?.heading?.replace(/\s+/g, "-").toLowerCase()}-${e?.geoName?.replace(/\s+/g, "-").toLowerCase()}/${e?.id}/`}>
                                        <div className="drop_item">
                                            <div className="s_name d_content">{e?.name}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {result?.tgs?.map((e, index) => {
                                let url;
                                if (e?.geotype == "CITY") {
                                    url = createTGCityURL({city:e?.name,id:e?.id})
                                    // url = "/travel-guide/india/city-" + e?.name?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + "/"
                                }
                                else if (e?.geotype == "STATE") {
                                    url = createTGStateURL({city:e?.name,id:e?.id})
                                    // url = "/travel-guide/india/state-" + e?.name?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + "/"
                                }
                                else {
                                    url = createTGCountryURL({city:e?.name,id:e?.id})
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
                                )
                            })}
                        </div>
                    </section>
                ) : null}
            </div>
        </div>
    </>
}

export default Banner