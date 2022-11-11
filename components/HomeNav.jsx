import { useEffect, useState,useCallback } from "react"
import { HiOutlineSearch } from 'react-icons/hi'
import { AiOutlineLogout, AiOutlineSearch } from 'react-icons/ai';
import { FaRegUser, FaSearch } from 'react-icons/fa';
import { BsXLg, BsDot } from 'react-icons/bs'
import { Spinner } from 'react-bootstrap'
import * as Constants from './Constants'
import axios from 'axios'
import { FaRupeeSign } from 'react-icons/fa'
import dynamic from "next/dynamic";
import Link from 'next/link'
import { tw } from 'twind'
import {useRouter} from 'next/router'


const Login = dynamic(() => import('../components/login'));

const Nav = () => {
    const [tripover, setTripover] = useState(false);
    const [exploreover, setExploreover] = useState(false);
    const [stayover, setStayover] = useState(false);
    const [showSearch, SetshowSearch] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchkey, setSearchkey] = useState({})
    const [showLogin, setShowLogin] = useState(false);
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

    const [scrollY, setScrollY] = useState(0);
    

    useEffect(() => {
        setResult({})
    }, [])

    const HandleSearch = (s_key) => {
        if (s_key.length >= 3) {
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
            console.log("shrink ")
            // setAddnavClass('sticky shrink')
            setAddnavClass('navbar-fixed')

        } else {
          if (document.location.pathname === "/") {
            // setAddnavClass('sticky')
            setAddnavClass('')
            // console.log("sticky ")
            // setAddnavClass('sticky shrink')
        }
      };    
    }

    // const onScroll = useCallback(event => {
    //     const { pageYOffset, scrollY } = window;
    //     console.log("yOffset", pageYOffset, "scrollY", scrollY);
    //     // setScrollY(window.pageYOffset);
    // }, []);

    useEffect(()=>{
        
        // document.querySelector("body").addEventListener("scroll", listenScrollEvent);


        // const handleScroll = () => {
        //     setScrollY(window.scrollY);
        //   };
        //   handleScroll();
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
          window.removeEventListener("scroll", listenScrollEvent);
        };

    },[])

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
    // console.log(window.scrollY)
    console.log(addnavClass)
    return <>
    
        <nav data-aos="fade-down" id="navbar" className={tw`${addnavClass} shadow-sm_`} style={{ overflow: 'auto', zIndex: 3 }}>
            {showLogin ? <Login show={showLogin} setShowLogin={setShowLogin} /> : null}
            {!showSearch ?
                <div className={tw`container`}>
                    <div className="item_group flt_left">
                        <div className="logo_item flt_left">
                            <Link href={'/'}>

                                <img className="brand-logo" src={`${router.pathname=='/'?'/icons/download.png':'/icons/kiomoi.png'}`}/>
                            </Link>
                        </div>
                        <div className={tw`item_group flt_right ml-6`}>
                            <div className="item flt_left">
                                <Link href={"/holidays/"}>
                                    <div className="c_it"
                                        onMouseOver={() => setTripover(true)}
                                        onMouseOut={() => setTripover(false)}
                                    >
                                        <img src={tripover ? "/icons/icons/ICO-TRIPS-orange.png" : `${addnavClass?"/icons/icons/ICO TRIPS.png":"/icons/icons/ICO-TRIPS-white.png"}`} />
                                        <span className="nav-text">Trips</span>
                                    </div>
                                </Link>

                            </div>
                            <div className="item flt_left">
                                <Link href={"/travel-guide/"}>
                                    <div className="c_it"
                                        onMouseOver={() => setExploreover(true)}
                                        onMouseOut={() => setExploreover(false)}
                                    >
                                        <img src={exploreover ? "/icons/icons/ICO-EXPLORE-orange.png" : `${addnavClass?"/icons/icons/ICO EXPLORE.png":"/icons/icons/ICO-EXPLORE-white.png"}`} />
                                        <span className="nav-text">Explore</span>
                                    </div>
                                </Link>

                            </div>
                            <div className="item flt_left">
                                <div className="c_it"
                                    onMouseOver={() => setStayover(true)}
                                    onMouseOut={() => setStayover(false)}
                                >
                                    <img src={stayover ? "/icons/icons/ICO-STAYS-orange.png" : `${addnavClass?"/icons/icons/ICO STAYS.png":"/icons/icons/ICO-STAYS-white.png"}`} />
                                    <span className="nav-text">Stays</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="item_group flt_right right_icons">
                        
                        {addnavClass?
                            <div className="item flt_left" onClick={() => SetshowSearch(true)}>
                            <HiOutlineSearch
                                // color={"#a7a7a7"}
                                className="c_it"
                                size={"20px"}
                            />
                        </div>:""                        
                        }
                        
                        <div className="item flt_left">
                            <FaRegUser
                                className="c_it"
                                onClick={() => setShowLogin(!showLogin)}
                                size={"20px"}
                            />
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div className={tw`container`} style={{position:'relative'}}>
                        {!loading ?
                            <HiOutlineSearch
                                className="s_icon"
                                // style={{position:'absolute',top:'10px',color:'grey'}}
                                size={"20px"}
                            />

                            : <Spinner className="s_icon" animation="border" style={{ color: "#f06726", width: "20px", height: "20px" }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        }


                        <BsXLg
                            onClick={() => SetshowSearch(false)}
                            className="cr_icon"
                        />
                        <input style={{padding:'15px 0 15px 40px'}} type="text" className="form-control s_form" onChange={event => HandleSearch(event.target.value)} placeholder="Search anything..." />
                    </div>
                    <section className={tw`drop_down container`} style={{ boxShadow: 'inset 0 -1px 0 0 rgba(0,0,0,.1)',left:'0',right:'0',borderColor:'transparent' }}>
                        <div>
                            {result?.packages?.map((e, index) => (
                                <div key={index} onClick={() => setSearchkey("")}>
                                    <Link href={`/holidays/${e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase().replace(/-tour-package/g, '').replace(/-tour/g, '').replace(/&/g, 'and')}-tour-package-${e?.id}/`}>
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
                            {result?.st?.map((e, index) => (
                                <div key={index} onClick={() => setSearchkey("")}>
                                    <Link href={`/holidays/${e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase()}-tour-packages/${e?.id}/`}>
                                        <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                            <div className="s_name d_content">Tours in {e?.name}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {result?.hotels?.map((e, index) => (
                                <div key={index} onClick={() => setSearchkey("")}>
                                    <Link href={`/hotel-${e?.name?.replace(/\s+/g, "-").toLowerCase()}-in-${e?.geotype?.replace(/\s+/g, "-").toLowerCase()}-${e?.id}/`}>
                                        <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                            <div className="s_name d_content">{e?.name}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {result?.articles?.map((e, index) => (
                                <div key={index} onClick={() => setSearchkey("")}>
                                    <Link href={`/travel-stories-${e?.heading?.replace(/\s+/g, "-").toLowerCase()}-${e?.geoName?.replace(/\s+/g, "-").toLowerCase()}/${e?.id}/`}>
                                        <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                            <div className="s_name d_content">{e?.name}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {result?.tgs?.map((e, index) => {
                                let url;
                                if (e?.geotype == "CITY") {
                                    url = "/travel-guide/india/city-" + e?.name?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + "/"
                                }
                                else if (e?.geotype == "STATE") {
                                    url = "/travel-guide/india/state-" + e?.name?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + "/"
                                }
                                else {
                                    url = "travel-guide/" + e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + "/"
                                }
                                let statebycity = "/holidays/" + e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase() + "-tour-packages/";
                                return (
                                    <div key={index} onClick={() => setSearchkey("")}>
                                        {e?.geotype === 'CITY' ? (
                                            <Link href={statebycity}>
                                                <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                                    <div className="s_name d_content">Tours in {e?.name}</div>
                                                </div>
                                            </Link>
                                        ) : null}
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
