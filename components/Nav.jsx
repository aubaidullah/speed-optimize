import { useEffect, useState,useCallback } from "react"
import { HiOutlineSearch } from 'react-icons/hi'
import { AiOutlineLogout, AiOutlineSearch,AiOutlineMenu,AiOutlineClose } from 'react-icons/ai';
import { FaRegUser, FaSearch } from 'react-icons/fa';
import {ImSpinner} from 'react-icons/im'
import { BsXLg, BsDot } from 'react-icons/bs'
// import { Spinner } from 'react-bootstrap'
import * as Constants from './Constants'
import axios from 'axios'
import { FaRupeeSign } from 'react-icons/fa'
import dynamic from "next/dynamic";
import Link from 'next/link'
import { tw } from 'twind'
import {useRouter} from 'next/router'
import { createCityListURL, createStateListURL,createDetailUrl, createTGCityURL, createTGStateURL, createTGCountryURL, createCountryListURL } from "./fun";


const Login = dynamic(() => import('../components/login'));

const Nav = () => {
    const [tripover, setTripover] = useState(false);
    const [exploreover, setExploreover] = useState(false);
    const [stayover, setStayover] = useState(false);
    const [showSearch, SetshowSearch] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchkey, setSearchkey] = useState({})
    const [showLogin, setShowLogin] = useState(false);
    const [collapse, setCollapse] = useState(false);    
    const [result, setResult] = useState({})
    const [addnavClass,setAddnavClass] = useState("")
    const [cls,setCls] = useState('navbar navbar-default normal')

    const router = useRouter()
    const Search = async () => {
        setLoading(true)
        const result = await axios.post(Constants.api + '/api/v1/home/search/', { av: '', id: '', pt: '', text: searchkey })
        setResult(result?.data?.output)
        setLoading(false)
    }
    

    useEffect(() => {
        setResult({})
    }, [])

    const HandleSearch = (s_key) => {
        if (s_key.length >= 2) {
            setSearchkey(s_key)
            Search()
        }
        else {
            setResult({})
        }

    }

    const listenScrollEvent = (e) => {
        console.log(window.scrollY)
        if (window.scrollY > 200) {
            setAddnavClass('sticky shrink')
        } else {
          if (document.location.pathname === "/") {
            setAddnavClass('')
            setAddnavClass('sticky shrink')
        }
      };    
    }

    const onScroll = useCallback(event => {
        const { pageYOffset, scrollY } = window;
        console.log("yOffset", pageYOffset, "scrollY", scrollY);
        // setScrollY(window.pageYOffset);
    }, []);

    // useEffect(()=>{
    //     // console.log('kkks')
    //     // document.querySelector("body").addEventListener("scroll", listenScrollEvent);
    //     window.addEventListener("scroll", onScroll, { passive: true });
    //     setCls(cls+' '+addnavClass)
    // })

    // useEffect(()=>{
    //     const cl =
    //     "navbar navbar-default " +
    //     "normal" +
    //     " " +{addnavClass};        
    // })
    // const cl =
    // "navbar navbar-default " +
    // "normal" +
    // " " +{addnavClass}; 
    // console.log(router.pathname)
    

    return <>
    
        <nav data-aos="fade-down" id="navbar" className={tw`shadow-sm_ navbar-dflt`}>
            {showLogin ? <Login show={showLogin} setShowLogin={setShowLogin} /> : null}
            {!showSearch ?
                <div className={tw`container`}>
                    <div className={tw`flex item_group flt_left items-center pt-2 lg:pt-0`}>
                        <div className={tw`logo_item flt_left flex items-center`}>
                            <Link href={'/'}>

                                {/* <img className="brand-logo" src={`${router.pathname=='/'? `${Constants.assets_api}/public/icons/download.png`:`${Constants.assets_api}/public/icons/kiomoi.png`}`}/> */}
                                <img className="brand-logo" alt="kiomoi" src="/icons/kiomoi logo.svg"/>
                            </Link>
                        </div>
                        <div className={tw`item_group flt_right ml-6 hidden lg:block`}>
                            <div className="item flt_left">
                                <Link href={"/holidays"}>
                                    <div className="c_it"
                                        onMouseOver={() => setTripover(true)}
                                        onMouseOut={() => setTripover(false)}
                                    >
                                        <img alt="trips" src={tripover ? `${Constants.assets_api}/public/icons/icons/ICO-TRIPS-orange.png` : `${Constants.assets_api}/public/icons/icons/ICO TRIPS.png`} />
                                        <span className="nav-text">Trips</span>
                                    </div>
                                </Link>

                            </div>
                            <div className="item flt_left">
                                <Link href={"/travel-guide"}>
                                    <div className="c_it"
                                        onMouseOver={() => setExploreover(true)}
                                        onMouseOut={() => setExploreover(false)}
                                    >
                                        <img alt="explore" src={exploreover ? `${Constants.assets_api}/public/icons/icons/ICO-EXPLORE-orange.png` : `${Constants.assets_api}/public/icons/icons/ICO EXPLORE.png`} />
                                        <span className="nav-text">Explore</span>
                                    </div>
                                </Link>

                            </div>
                            <div className="item flt_left">
                            <Link href={"/hotels"}>
                                <div className="c_it"
                                    onMouseOver={() => setStayover(true)}
                                    onMouseOut={() => setStayover(false)}
                                >
                                    <img alt="stays" src={stayover ? `${Constants.assets_api}/public/icons/icons/ICO-STAYS-orange.png` : `${Constants.assets_api}/public/icons/icons/ICO STAYS.png`} />
                                    <span className="nav-text">Stays</span>
                                </div>
                            </Link>
                            </div>
                        </div>
                    </div>
                    <div className="item_group flt_right right_icons">
                        <div className="item flt_left" onClick={() => SetshowSearch(true)}>
                            <HiOutlineSearch
                                // color={"#a7a7a7"}
                                className="c_it"
                                size={"20px"}
                            />
                        </div>
                        <div className="item flt_left">
                            <FaRegUser
                                className="c_it"
                                onClick={() => setShowLogin(!showLogin)}
                                size={"20px"}
                            />
                        </div>
                        <div className={tw`item flt_left block lg:hidden`}>
                            {
                                collapse?<AiOutlineClose 
                                className="c_it"
                                // onClick={()}
                                onClick={()=>setCollapse(!collapse)}
                                size={"20px"}                                
                                />:<AiOutlineMenu
                                className="c_it"
                                // onClick={()}
                                onClick={()=>setCollapse(!collapse)}
                                size={"20px"}
                                />
                            }
                            

                        </div>
                    </div>
                    <div className={tw`drop_down ${collapse?'block':'hidden'}`} style={{top:"49px"}}>
                        <Link href={'/holidays'}>
                            <div className={tw`flex drop_item items-center`}>
                                <img alt="trips" src={tripover ? `${Constants.assets_api}/public/icons/icons/ICO-TRIPS-orange.png` : `${Constants.assets_api}/public/icons/icons/ICO TRIPS.png`} />
                                <div className="s_name d_content pl-4">Trips</div>
                            </div>
                        </Link>
                        <Link href={'/travel-guide'}>
                            <div className={tw`flex drop_item items-center`}>
                                <img alt="explore" src={exploreover ? `${Constants.assets_api}/public/icons/icons/ICO-EXPLORE-orange.png` : `${Constants.assets_api}/public/icons/icons/ICO EXPLORE.png`} />
                                <div className="s_name d_content pl-4">Explore</div>
                            </div>
                        </Link>
                        <Link href={'/hotels'}>
                            <div className={tw`flex drop_item items-center`}>
                                <img alt="stays" src={stayover ? `${Constants.assets_api}/public/icons/icons/ICO-STAYS-orange.png` : `${Constants.assets_api}/public/icons/icons/ICO STAYS.png`} />                            
                                <div className="s_name d_content pl-4">Stays</div>
                            </div>
                        </Link>  
                    </div>                    
                </div>
                :
                <div>
                    <div className={tw`container relative`}>
                        {!loading ?
                            <HiOutlineSearch
                                className="s_icon"
                                size={"20px"}
                            />

                            : 
                            // <Spinner className="s_icon s_load" animation="border" role="status">
                                <ImSpinner className="s_icon s_load" />
                                // <span className="visually-hidden">Loading...</span>
                            // </Spinner>
                        }


                        <BsXLg
                            onClick={() => SetshowSearch(false)}
                            className="cr_icon"
                        />
                        <input type="text" className="form-control s_form nv_search" onChange={event => HandleSearch(event.target.value)} placeholder="Search anything..." />
                    </div>
                    <section className={tw`drop_down container`}>
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
                                    url = createCountryListURL({cityname:e?.name,id:e?.id})
                                }
                                else  if(e?.type == 'STATE'){
                                    url = createStateListURL({statename:e?.name,id:e.id})
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
                                    <Link href={`/hotel-${e?.name?.replace(/\s+/g, "-").toLowerCase()}-in-${e?.geotype?.replace(/\s+/g, "-").toLowerCase()}-${e?.id}`}>
                                        <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                            <div className="s_name d_content">{e?.name}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {result?.articles?.map((e, index) => (
                                <div key={index} onClick={() => setSearchkey("")}>
                                    <Link href={`/travel-stories-${e?.heading?.replace(/\s+/g, "-").toLowerCase()}-${e?.geoName?.replace(/\s+/g, "-").toLowerCase()}/${e?.id}`}>
                                        <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                            <div className="s_name d_content">{e?.name}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {result?.tgs?.map((e, index) => {
                                let url;
                                if (e?.geotype == "CITY") {
                                    url = createTGCityURL({city:e?.name,id:e?.id})
                                    // url = "/travel-guide/india/city-" + e?.name?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + ""
                                }
                                else if (e?.geotype == "STATE") {
                                    url = createTGStateURL({city:e?.name,id:e?.id})

                                    // url = "/travel-guide/india/state-" + e?.name?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + ""
                                }
                                else {
                                    url = createTGCountryURL({country:e?.name,id:e?.id})
                                    // url = "/" + e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + ""
                                }
                                // let statebycity = "/holidays/" + e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase() + "-tour-packages";
                                return (
                                    <div key={index} onClick={() => setSearchkey("")}>
                                        {/* {e?.geotype === 'CITY' ? (
                                            <Link href={statebycity}>
                                                <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                                    <div className="s_name d_content">Tours in {e?.name}</div>
                                                </div>
                                            </Link>
                                        ) : null} */}
                                        <Link href={url}>
                                            <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                                <div className="s_name d_content">{e?.name}</div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>

            }


        </nav >
    </>
}

export default Nav
