import { BsDot, BsStarFill, BsStarHalf, BsFillMoonFill } from "react-icons/bs";
import { GiBinoculars } from "react-icons/gi";
import {
  IoLocationSharp,
  IoSunny,
  IoCarSportOutline,
  IoFastFoodOutline,
} from "react-icons/io5";
import { RiHotelLine } from "react-icons/ri";

import { MdCheckCircle, MdOutlineFlight } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import Link from "next/link";
// import LeadForm from './leadform'
import { useState } from "react";
import Image from "next/image";
import { tw } from "twind";
import { Carousel } from "react-responsive-carousel";
import { createDetailUrl, imgNameByUrl, jpgToWebp } from "./fun";
import dynamic from "next/dynamic";

const LeadForm = dynamic(() => import("./leadform"));

const Package = ({ index, item }) => {
  // const [modalid,setModalid] = useState()
  // const [modalpackagename,setModalpackagename] = useState()
  const [sendquery, setSendquery] = useState(false);
  // const [modalcity,setModalcity] = useState()
  const [modalinfo, setModalinfo] = useState({});

  const updateChangeForm = (val) => {
    setSendquery(val);
  };

  const _sendquery = (price, id, name, city) => {
    // console.log("sldkf")
    setModalinfo({
      id,
      name,
      city,
      price,
    });
    setSendquery(true);
  };

  var userRating = [];
  var i = 0;
  for (i; i < Math.floor(parseFloat(item.sratings)); i++) {
    userRating.push(<BsStarFill key={i} className="icon_size inline" />);
  }
  if (item.sratings.length != 1) {
    userRating.push(<BsStarHalf key={i} className="icon_size inline" />);
  }
  let url = createDetailUrl({ name: item.name, id: item.id });
  // let url = "/holidays/" +
  //     item.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase().replace(/-tour-package/g,'').replace(/-tour/g,'').replace(/&/g,'and') +
  //     "-tour-package-" +
  //     // item.id + "/";
  //     item.id;

  return (
    <>
      {/* <Link href={"/holidays/detail"}> */}
      <a className={`flex flex-col`}>
        <div
          className="pack_box rounded-lg hover:shadow-lg transition-shadow"
          key={item.id}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <meta itemProp="position" content={index + 1} />
          <div className="row">
            <div
              className="col-lg-12 col-sm-12"
              itemType="https://schema.org/TouristTrip"
              itemScope
            >
              <meta
                itemProp="partOfTrip"
                content={`${item.nights + 1} Days ${item.nights} Nights`}
              />
              <div>
                {/* holidays/shimla-chandigarh-tour-package-110/ */}
                {/* holidays/eastern-delight-tour-package-191 */}
                {/* <Link href={`/holidays/[name]-tour-package-[id]/`} as={`${url}`} prefetch={true}> */}
                <div className={tw`flex flex-wrap`}>
                  <div className={tw`w-full lg:w-1/3`}>
                    <div className={`_row ov_auto desk_display_none mb-2`}>
                      <div className="flt_left">
                        <div>
                          <h2 className={`pack_title`} itemProp="name">
                            {item.name}
                          </h2>
                          <div className={`flex flex-wrap items-center mt-1`}>
                            <div className="days_night">
                              {/* {item.nights} Nights | {item.nights+1} Days */}
                              <div className={`flex justify-center day_nights`}>
                                <div className="night">
                                  <BsFillMoonFill className={`inline pr`} />
                                  <span className={`pl-1`}>
                                    {item.nights} Nights
                                  </span>
                                </div>
                                <div className="days">
                                  <IoSunny className={`inline`} />
                                  <span className={`pl-1`}>
                                    {item.nights + 1} Days
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className={`ml-4 two_peoples`}>
                              <div className={`flex flex-wrap items-center`}>
                                <span className="frieds">
                                  <img
                                    alt="2 people"
                                    src={"/icons/friends_.svg"}
                                  />
                                </span>
                                <span className="_2_two">2</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {item.sratings != "0" ? (
                        <div className="flt_right inline">
                          <div className="star">{userRating}</div>
                          <div className="rating">
                            <span className="inline">
                              {item.sratings} <BsDot className="inline" />{" "}
                              {item.suers} Rating
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className={``}>
                      <Carousel
                        showStatus={false}
                        showThumbs={false}
                        // showArrows={true}
                        showIndicators={false}
                        // showIndicators={false}
                        infinite={true}
                        autoPlay={true}
                        className="slider_banner__"
                      >
                        {/* {item.images.split("~").map((e, index) => { */}
                        {/* // return <Image className='img' src={e} layout="fill" key={index} /> */}

                        {/* <div className="bk_img" style={{backgroundImage:`url("${item.images.split('~')[0].replace(/w_400/,'w_300')}")`,backgroundPosition:'cover'}}>
                                                        </div> */}
                        <div className="bk_img">
                          <Image
                            layout="fill"
                            alt={imgNameByUrl({
                              url: item.images.split("~")[0],
                            })}
                            className={`rounded-[10px]`}
                            objectFit="fill"
                            src={jpgToWebp({
                              uri: `${item.images
                                .split("~")[0]
                                .replace(/w_400/, "w_300")}`,
                            })}
                          />
                        </div>

                        {/* // return <div className='bk_img'>
                                                        // <Image style={{borderRadius:'10px'}} layout="fill" objectFit="fill" src={`${e.replace(/w_400/,'w_300')}`} />
                                                        // </div>  */}

                        {/* })} */}
                      </Carousel>
                      {/* <div className="bk_img" style={{backgroundImage:`url("${item.images.split("~")[0].replace(/w_400/,'w_200')}")`,backgroundPosition:'cover'}}>

                                                    </div> */}
                      {/* <img src={item.images.split("~")[0]}/> */}
                    </div>
                  </div>
                  {/* <Link href={`/holidays/[name]-tour-package-[id]/`} as={`${url}`} prefetch={true}></Link> */}

                  {/* <div> */}
                  <Link
                    href={`${url}`}
                    as={`${url}`}
                    className={tw`w-full lg:w-2/3 px-0 lg:px-2`}
                  >
                    {/* <a href={`${url}`}> */}
                    <div href={`${url}`}>
                      <div className="contain_blk">
                        <div className="_row ov_auto mb_display_none">
                          <div className="flt_left">
                            <div>
                              <h2
                                className={`pack_title text-xl text-gray-500`}
                              >
                                {item.name}
                              </h2>

                              <div
                                className={`flex flex-wrap items-center mt-1`}
                              >
                                <div className={`days_night_`}>
                                  {/* {item.nights} Nights | {item.nights+1} Days */}
                                  <div className={`flex day_nights`}>
                                    <div className="night">
                                      <BsFillMoonFill className={`inline pr`} />
                                      <span className={`pl-1`}>
                                        {item.nights} Nights
                                      </span>
                                    </div>
                                    <div className="days">
                                      <IoSunny className={`inline`} />
                                      <span className={`pl-1`}>
                                        {item.nights + 1} Days
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className={`ml-4 two_peoples`}>
                                  <div className={`flex flex-wrap`}>
                                    <span className="frieds">
                                      <img
                                        alt="2 peoples"
                                        src={"/icons/friends_.svg"}
                                      />
                                    </span>
                                    <span className="_2_two">2</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {item.sratings != "0" ? (
                            <div className="flt_right">
                              <div className="star">{userRating}</div>
                              <div className="rating">
                                <span className="inline">
                                  {item.sratings} <BsDot className="inline" />{" "}
                                  {item.susers} Rating
                                </span>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="location">
                          <IoLocationSharp className="inline" />
                          {item.source}
                        </div>
                        <div className="_sp_39">
                          <div className="best_session">
                            <span>Best Session : </span>
                            <span>
                              {" "}
                              {item.season.split(",").length === 12 ? (
                                "round-the-year"
                              ) : (
                                // item.season
                                <p className={`inline text-[11px]`}>
                                  {item.season.split(",").map((e) => {
                                    return (
                                      <span key={e}>
                                        {/* <span> */}
                                        {e}
                                        {item.season.split(",")[
                                          item.season.split(",").length - 1
                                        ] != e
                                          ? ", "
                                          : ""}
                                        {/* </span> */}
                                      </span>
                                    );
                                  })}
                                </p>
                              )}
                            </span>
                          </div>

                          <div className="_cities_">
                            <div className="_ap_city">
                              <span>
                                {
                                  item.cities.split(",").map((e, index) => {
                                    return (
                                      <span key={index}>
                                        {item.cities.split(",")[0] != e
                                          ? "→ "
                                          : ""}

                                        {e}

                                        {/* {item.cities.split(",")[item.cities.split(",").length-1] != e?" → ":""} */}
                                      </span>
                                    );
                                  })
                                  // item.cities
                                  //   ? reactStringReplace(
                                  //     item.cities,
                                  //     ",",
                                  //     (match, i) => (
                                  //       <>
                                  //         &nbsp;{" "}
                                  //         <i className="fa  fa-long-arrow-right"></i>{" "}
                                  //       </>
                                  //     )
                                  //   )
                                  //  : ""
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6 col-xs-12 _sp_39 desk_display_none">
                        <div className="img_meal row _sp_">
                          <div className="icons-meal-info">
                            <div className="_div">
                              <div>
                                <div className={`flex text-center`}>
                                  <MdOutlineFlight
                                    className={`h-6 lst_aty text-[#c6c5c5]`}
                                    size={20}
                                  />
                                </div>
                                <p>Flight</p>
                              </div>
                            </div>

                            <div className="_div">
                              <div>
                                <div className={`flex text-center`}>
                                  <IoCarSportOutline
                                    className="h-6 lst_aty"
                                    size={20}
                                  />
                                </div>
                                <p>Trasnfer</p>
                              </div>
                            </div>

                            <div className="_div">
                              <div>
                                <div className={`flex text-center`}>
                                  <IoFastFoodOutline
                                    className="h-6 lst_aty"
                                    size={20}
                                  />
                                </div>
                                <p>Breakfast</p>
                              </div>
                            </div>

                            <div className="_div">
                              <div>
                                <div className={`flex text-center`}>
                                  <RiHotelLine
                                    className="h-6 lst_aty"
                                    size={20}
                                  />
                                </div>
                                <p>Hotel</p>
                              </div>
                            </div>

                            <div className="_div">
                              <div>
                                {/* GiBinoculars */}
                                <div className={`flex text-center`}>
                                  <GiBinoculars
                                    className="h-6 lst_aty"
                                    size={20}
                                  />
                                </div>
                                <p>SightSeeing</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`pricing_info pt-2`}>
                        {/* <div className="flt_left">
                                                            <div className="checks">
                                                                <p>
                                                                    <MdCheckCircle style={{color:'#15be03'}} /> Free Cancellation
                                                                </p>
                                                                <p>
                                                                    <MdCheckCircle style={{color:'#15be03'}} /> Part Payment
                                                                </p>

                                                            </div>
                                                        </div> */}

                        <div className={`flex items-center justify-between`}>
                          <div className="text-left">
                            <div className={`flex checks`}>
                              <p>
                                <MdCheckCircle
                                  className={`inline text-[#15be03]`}
                                />{" "}
                                Free Cancellation
                                {/* <br/><MdCheckCircle className='inline' style={{color:'#15be03'}} /> Part Payment */}
                              </p>
                              <p className={`pl-2`}>
                                <MdCheckCircle
                                  className={`inline text-[#15be03]`}
                                />{" "}
                                Part Payment
                              </p>
                            </div>
                          </div>

                          <div
                            className="text-right"
                            itemProp="offers"
                            itemScope
                            itemType="https://schema.org/AggregateOffer"
                          >
                            <meta itemprop="priceCurrency" content="INR" />
                            <div>
                              {item.percent ? (
                                <>
                                  <span
                                    className="discount"
                                    itemProp="offerCount"
                                    content={item.percent}
                                  >
                                    {item.percent}% off
                                  </span>
                                  <del>
                                    <meta
                                      itemProp="highPrice"
                                      content={item.price}
                                    />
                                    <FaRupeeSign
                                      className={`inline text=[12px] mb-[4px]`}
                                    />
                                    {item.price}/-
                                  </del>
                                </>
                              ) : (
                                ""
                              )}
                            </div>

                            <div>
                              <div className="price_inr">
                                <meta
                                  itemProp="lowPrice"
                                  content={item.finalprice}
                                />
                                <FaRupeeSign
                                  className={`inline text-[#f79421] text-[12px] mb-[4px]`}
                                />
                                {item.finalprice}/-
                              </div>
                              <div>
                                <p className={`text-[8.8px] text-[#999]`}>
                                  Per person on twin sharing
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="flt_right">
                                                            <div className="fl_rw_">
                                                                <div className=''>
                                                                    <span className="discount">
                                                                        {item.percent}% off
                                                                    </span>
                                                                    <del>
                                                                        <FaRupeeSign className='inline' style={{fontSize:'12px',marginBottom:'4px'}} />
                                                                        {item.price}/-
                                                                    </del>
                                                                </div>
                                                                <div className="price_inr">
                                                                    <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                                                                    {item.finalprice}/-
                                                                </div>
                                                                <p style={{fontSize:'8.8px',color:'#999'}}>Per sharing</p>
                                                                
                                                            </div>
                                                            
                                                        </div> */}
                      </div>
                    </div>
                    {/* </a> */}
                  </Link>
                  {/* </div> */}
                </div>

                {/* </Link> */}
                <div className={`buttons desk_display_none mt-2 overflow-auto`}>
                  <div className="flt_left">
                    <Link href={`${url}`} as={`${url}`}>
                      <div href={`${url}`}>
                        <button className="btn_listing">VIEW DETAILS</button>
                      </div>
                    </Link>
                  </div>
                  <div className="flt_right">
                    <button
                      className="btn_listing _btn_clr"
                      onClick={() =>
                        _sendquery(
                          item.finalprice,
                          item.id,
                          item.name,
                          item.city,
                        )
                      }
                    >
                      SUBMIT QUERY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`row mb_display_none mb-[15px]`}>
          <div className="flex justify-between">
            <div className={`w-1/3`}>
              <div className="img_meal row _sp_">
                <div className="icons-meal-info">
                  <div className="_div">
                    <div>
                      <div className={`flex text-center`}>
                        <MdOutlineFlight
                          className={`h-6 lst_aty text=[#c6c5c5]`}
                          size={20}
                        />
                      </div>
                      <p>Flight</p>
                    </div>
                  </div>

                  <div className="_div">
                    <div>
                      <div className={`flex text-center`}>
                        <IoCarSportOutline className="h-6 lst_aty" size={20} />
                      </div>
                      <p>Trasnfer</p>
                    </div>
                  </div>

                  <div className="_div">
                    <div>
                      <div className={`flex text-center`}>
                        <IoFastFoodOutline className="h-6 lst_aty" size={20} />
                      </div>
                      <p>Breakfast</p>
                    </div>
                  </div>

                  <div className="_div">
                    <div>
                      <div className={`flex text-center`}>
                        <RiHotelLine className="h-6 lst_aty" size={20} />
                      </div>
                      <p>Hotel</p>
                    </div>
                  </div>

                  <div className="_div">
                    <div>
                      {/* GiBinoculars */}
                      <div className={`flex text-center`}>
                        <GiBinoculars className="h-6 lst_aty" size={20} />
                      </div>
                      <p>SightSeeing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className={`buttons overflow-auto`}>
                <div className="flt_right">
                  <button
                    className="btn_listing _btn_clr"
                    onClick={() =>
                      _sendquery(item.finalprice, item.id, item.name, item.city)
                    }
                  >
                    SUBMIT QUERY
                  </button>
                </div>
                <div className={`flt_right mr-4`}>
                  <Link href={`${url}`} as={`${url}`}>
                    <div href={`${url}`} as={`${url}`}>
                      <button className="btn_listing">VIEW DETAILS</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
      {/* </Link> */}

      {sendquery ? (
        <LeadForm
          key={item.id}
          isshow={sendquery}
          packageid={modalinfo.id}
          packageName={modalinfo.name}
          changeForm={updateChangeForm}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Package;
