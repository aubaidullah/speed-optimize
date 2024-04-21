import { useEffect, useState, useCallback } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import {
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import { BsXLg, BsDot } from "react-icons/bs";
// import { Spinner } from 'react-bootstrap'
import * as Constants from "./Constants";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  createCityListURL,
  createStateListURL,
  createDetailUrl,
  createTGCityURL,
  createTGStateURL,
  createTGCountryURL,
  createCountryListURL,
  createArticleURL,
} from "./fun";

const Login = dynamic(() => import("../components/login"));

const Nav = () => {
  const [tripover, setTripover] = useState(false);
  const [exploreover, setExploreover] = useState(false);
  const [stayover, setStayover] = useState(false);
  const [showSearch, SetshowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchkey, setSearchkey] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [result, setResult] = useState({});
  const [addnavClass, setAddnavClass] = useState("");
  const [op,setOp] = useState(false)
  const [cls, setCls] = useState("navbar navbar-default normal");

  const router = useRouter();
  const Search = async () => {
    setLoading(true);
    const result = await axios.post(Constants.api + "/api/v1/home/search/", {
      av: "",
      id: "",
      pt: "",
      text: searchkey,
    });
    setResult(result?.data?.output);
    setLoading(false);
  };

  useEffect(() => {
    setResult({});
  }, []);

  const HandleSearch = (s_key) => {
    if (s_key.length >= 2) {
      setSearchkey(s_key);
      Search();
    } else {
      setResult({});
    }
  };

  const listenScrollEvent = (e) => {
    console.log(window.scrollY);
    if (window.scrollY > 200) {
      setAddnavClass("sticky shrink");
    } else {
      if (document.location.pathname === "/") {
        setAddnavClass("");
        setAddnavClass("sticky shrink");
      }
    }
  };

  const onScroll = useCallback((event) => {
    const { pageYOffset, scrollY } = window;
    console.log("yOffset", pageYOffset, "scrollY", scrollY);
    // setScrollY(window.pageYOffset);
  }, []);


  const Logout = () =>{
    Cookies.remove('useremail')
    Cookies.remove('userid')
    Cookies.remove('userphone')
    Cookies.remove('username')
    router.push("/")
  }
  useEffect(()=>{
    setResult([])
    SetshowSearch(false)
  },[router])

  return (
    <>
      <nav
        data-aos="fade-down"
        id="navbar"
        className={`shadow-sm_ navbar-dflt`}
      >
        {showLogin ? (
          <Login show={showLogin} setShowLogin={setShowLogin} />
        ) : null}
        {!showSearch ? (
         
         
         <div className={`container h-full`}>
          <div className={`flex justify-between items-center h-full`}>
                <div className={`flex items-center lg:gap-16`}>
                  <div>
                    <Link href={"/"}>
                      {/* <img className="brand-logo" src={`${router.pathname=='/'? `${Constants.assets_api}/public/icons/download.png`:`${Constants.assets_api}/public/icons/kiomoi.png`}`}/> */}
                      <img
                        className="brand-logo"
                        alt="kiomoi"
                        src="/icons/kiomoi logo.svg"
                      />
                    </Link>                  
                  </div>
                  <div className={`hidden lg:flex items-center gap-2 lg:gap-10`}>
                    <Link href={"/holidays"}>
                      <div
                        className="c_it"
                        onMouseOver={() => setTripover(true)}
                        onMouseOut={() => setTripover(false)}
                      >
                        <img
                          alt="trips"
                          src={
                            tripover
                              ? `${Constants.assets_api}/public/icons/icons/ICO-TRIPS-orange.png`
                              : `${Constants.assets_api}/public/icons/icons/ICO TRIPS.png`
                          }
                        />
                        <span className="nav-text_">Trips</span>
                      </div>
                    </Link>    

                    <Link href={"/travel-guide"}>
                        <div
                          className="c_it"
                          onMouseOver={() => setExploreover(true)}
                          onMouseOut={() => setExploreover(false)}
                        >
                          <img
                            alt="explore"
                            src={
                              exploreover
                                ? `${Constants.assets_api}/public/icons/icons/ICO-EXPLORE-orange.png`
                                : `${Constants.assets_api}/public/icons/icons/ICO EXPLORE.png`
                            }
                          />
                          <span className="nav-text_">Explore</span>
                        </div>
                      </Link>

                      <Link href={"/hotels"}>
                        <div
                          className="c_it"
                          onMouseOver={() => setStayover(true)}
                          onMouseOut={() => setStayover(false)}
                        >
                          <img
                            alt="stays"
                            src={
                              stayover
                                ? `${Constants.assets_api}/public/icons/icons/ICO-STAYS-orange.png`
                                : `${Constants.assets_api}/public/icons/icons/ICO STAYS.png`
                            }
                          />
                          <span className="nav-text_">Stays</span>
                        </div>
                      </Link>                  

                  </div>

                </div>

                <div className={`flex items-center gap-6 lg:gap-10 cursor-pointer`}>
                  <div
                      className="_item _flt_left"
                      onClick={() => SetshowSearch(true)}
                    >
                      <HiOutlineSearch
                        // color={"#a7a7a7"}
                        className="c_it"
                        size={"20px"}
                      />
                    </div>

                    <div className={``}>
                    {
                      Cookies.get('userid')
                      ?
                      
                      
                      // <Link >
                        <div className={`relative c_it`}>
                          <FaRegUser
                            className="c_it m-auto"
                            onClick={() => setOp(!op)}
                            size={"20px"}
                          />  
                          <span className="nav-text">{Cookies.get("username")}</span>
                          {/* <div className={` font-semibold text-slate-600`} onClick={() => setOp(!op)}>{Cookies.get("username")}</div> */}
                          <div className={`absolute bg-white shadow-xl top-7 border-2 ${!op?'hidden':''}`}>
                            <Link href={'/accounts'}>
                              <div className=" border-b-2 px-4 py-2 font-semibold text-slate-700"> Profile </div>
                            </Link>
                            <div className="px-4 py-2 font-semibold text-slate-700" onClick={()=>Logout()}> Logout </div>
                          </div>
                        </div>
                      
                      :<div>
                        <div className={`lg:flex lg:items-center lg:gap-2 lg:border-2 lg:border-gray-300 hover:border-[#f06726] lg:rounded-full lg:px-3 lg:py-2 text-[#a7a7a7] hover:text-[#f06726] cursor-pointer`} onClick={() => setShowLogin(!showLogin)}>
                          <span className="_c_it hidden lg:flex">Login</span>
                          <FaRegUser
                              // className="c_it"
                              size={"20px"}
                          />  
                        </div>

                      </div>
                      

                    }
                    
                  </div>   

                  <div className={`block lg:hidden mr-3`}>
                    {collapse ? (
                      <AiOutlineClose
                        className="c_it"
                        // onClick={()}
                        onClick={() => setCollapse(!collapse)}
                        size={"20px"}
                      />
                    ) : (
                      <AiOutlineMenu
                        className="c_it"
                        // onClick={()}
                        onClick={() => setCollapse(!collapse)}
                        size={"20px"}
                      />
                    )}
                  </div>             
                </div>
                <div
              className={`drop_down ${collapse ? "block" : "hidden"}`}
              style={{ top: "49px" }}
            >
              <Link href={"/holidays"}>
                <div className={`flex drop_item items-center`}>
                  <img
                    alt="trips"
                    src={
                      tripover
                        ? `${Constants.assets_api}/public/icons/icons/ICO-TRIPS-orange.png`
                        : `${Constants.assets_api}/public/icons/icons/ICO TRIPS.png`
                    }
                  />
                  <div className="s_name d_content pl-4">Trips</div>
                </div>
              </Link>
              <Link href={"/travel-guide"}>
                <div className={`flex drop_item items-center`}>
                  <img
                    alt="explore"
                    src={
                      exploreover
                        ? `${Constants.assets_api}/public/icons/icons/ICO-EXPLORE-orange.png`
                        : `${Constants.assets_api}/public/icons/icons/ICO EXPLORE.png`
                    }
                  />
                  <div className="s_name d_content pl-4">Explore</div>
                </div>
              </Link>
              <Link href={"/hotels"}>
                <div className={`flex drop_item items-center`}>
                  <img
                    alt="stays"
                    src={
                      stayover
                        ? `${Constants.assets_api}/public/icons/icons/ICO-STAYS-orange.png`
                        : `${Constants.assets_api}/public/icons/icons/ICO STAYS.png`
                    }
                  />
                  <div className="s_name d_content pl-4">Stays</div>
                </div>
              </Link>
            </div>                
          </div>
        
          </div>



        ) : (
          <div>
            <div className={`container relative`}>
              {
                !loading ? (
                  <HiOutlineSearch className="s_icon" size={"20px"} />
                ) : (
                  // <Spinner className="s_icon s_load" animation="border" role="status">
                  <ImSpinner className="s_icon s_load" />
                )
                // <span className="visually-hidden">Loading...</span>
                // </Spinner>
              }

              <BsXLg onClick={() => SetshowSearch(false)} className="cr_icon" />
              <input
                type="text"
                className="form-control s_form nv_search"
                onChange={(event) => HandleSearch(event.target.value)}
                placeholder="Search anything..."
              />
            </div>
            <section className={`drop_down container`}>
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
                    url = createCountryListURL({
                      cityname: e?.name,
                      id: e?.id,
                    });
                  } else if (e?.type == "STATE") {
                    url = createStateListURL({ statename: e?.name, id: e.id });
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
                {result?.hotels?.map((e, index) => (
                  <div key={index} onClick={() => setSearchkey("")}>
                    <Link
                      href={`/hotel-${e?.name
                        ?.replace(/\s+/g, "-")
                        .toLowerCase()}-in-${e?.geotype
                        ?.replace(/\s+/g, "-")
                        .toLowerCase()}-${e?.id}`}
                    >
                      <div className={`hover:bg-[#fde2df] drop_item`}>
                        <div className="s_name d_content">{e?.name}</div>
                      </div>
                    </Link>
                  </div>
                ))}
                {result?.articles?.map((e, index) => (
                  <div key={index} onClick={() => setSearchkey("")}>
                    <Link
                      href={createArticleURL({ heading: e?.name, id: e?.id })}
                      // href={`/travel-stories-${e?.heading?.replace(/\s+/g, "-").toLowerCase()}-${e?.geoName?.replace(/\s+/g, "-").toLowerCase()}/${e?.id}`}
                    >
                      <div className={`hover:bg-[#fde2df] drop_item`}>
                        <div className="s_name d_content">{e?.name}</div>
                      </div>
                    </Link>
                  </div>
                ))}
                {result?.tgs?.map((e, index) => {
                  let url;
                  if (e?.geotype == "CITY") {
                    url = createTGCityURL({ city: e?.name, id: e?.id });
                    // url = "/travel-guide/india/city-" + e?.name?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + ""
                  } else if (e?.geotype == "STATE") {
                    url = createTGStateURL({ city: e?.name, id: e?.id });

                    // url = "/travel-guide/india/state-" + e?.name?.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + ""
                  } else {
                    url = createTGCountryURL({ country: e?.name, id: e?.id });
                    // url = "/" + e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").replace('--', "-").toLowerCase() + "/" + e?.id + ""
                  }
                  // let statebycity = "/holidays/" + e?.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase() + "-tour-packages";
                  return (
                    <div key={index} onClick={() => setSearchkey("")}>
                      {/* {e?.geotype === 'CITY' ? (
                                            <Link href={statebycity}>
                                                <div className={`hover:bg-[#fde2df] drop_item`}>
                                                    <div className="s_name d_content">Tours in {e?.name}</div>
                                                </div>
                                            </Link>
                                        ) : null} */}
                      <Link href={url}>
                        <div className={`hover:bg-[#fde2df] drop_item`}>
                          <div className="s_name d_content">{e?.name}</div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
