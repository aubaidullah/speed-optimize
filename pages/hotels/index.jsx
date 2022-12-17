import Nav from "../../components/Nav"
import { tw } from "twind"
import { useState,useEffect } from "react";
import client from "../../components/Graphql/service";
import { getHotelList,getCitiesQuery,getMetaQuery } from "../../components/Graphql/Queries";
// import {BsDot,BsStarFill,BsStarHalf,BsFillMoonFill} from 'react-icons/bs'
import MultiCarousel2 from "react-multi-carousel";
import Image from "next/image";
import Slider from 'react-slick'
import {IoLocationSharp,IoSunny} from 'react-icons/io5'
import { BsDot,BsStarHalf } from "react-icons/bs";
import Link from "next/link";
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {FaRegUser} from 'react-icons/fa'
import axios from 'axios'
import * as Constants from '../../components/Constants'
import Meta from "../../components/meta";


const Hotels = ({data,meta}) =>{
    const [result, setResult] = useState({})
    const [loading, setLoading] = useState(false)
    const [responsive,Setresponsive] = useState({})
    const [checkindate,setCheckindate] = useState("")
    const [checkoutdate,setCheckoutdate] = useState("")
    const [searchkey,setSearchkey] = useState("")


    useEffect(()=>{
        const res = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 6,
              // partialVisibilityGutter: 40,
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 6,
              // partialVisibilityGutter: 40,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 2,
              partialVisibilityGutter: 40,
            },
          };  
          Setresponsive(res)      
    },[])    
    
    // console.log(data)
    const ButtonGroup = ({ next, previous, ...rest }) => {
        const {
          carouselState: { currentSlide },
        } = rest;
        return (
          <div className={tw`hidden lg:carousel-button-group lg:block `}>
            <button
              className={`${currentSlide === 0 ? "disable" : ""} left-custom-btn`}
              onClick={() => previous()}
            />
            <button className="right-custom-btn" onClick={() => next()} />
          </div>
        );
      };    

      const SampleNextArrow = (props)=> {
        const { className, style, onClick } = props;
        // {tw`hidden lg:carousel-button-group lg:block `}
        return <div className={tw`hidden lg:block custom-btn right-custom-btn`} onClick={onClick}/>;
      }
  
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return <div className={tw`hidden lg:block custom-btn left-custom-btn`} onClick={onClick}/>;
      }      

    const hotelRender = data.cities.map((item, i)=>{
        return <div>
                    <div className={tw`pr-8`}>
                        <a href="#">
                            <h4 className={tw`text-center pb-2 font-bold`}>{item.cname}</h4>
                            <div className="des_img_hotel">
                                
                                {item.iurl
                                ?<Image src={item.iurl} className={tw``} style={{height:'100%',width:'100px'}} layout="fill" />
                                :<img src={item.iurl} />
                                }
                            </div>
                        </a>
                        
                    </div>
                </div>
    })


    const settings = {
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        // adaptiveHeight: true,
        variableWidth: true,
        speed: 500,
        rows: 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            // partialVisibilityGutter: 40,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            // partialVisibilityGutter: 40,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            // partialVisibilityGutter: 25,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };



    const exploreRender = data.hotels.map((item,i)=>{
        return <div key={i} className={tw`mb-4`}>
            <Link href={`/hotel/hotel-in-${item.cityname.toLocaleLowerCase()}-${item.id}`}>
              <div className={tw`px-2`}>
                  <div className="des_img t_rd" style={{margin:0}}>
                      <img src={item.images} />
                  </div>
                  <div className={tw`p-2 h_bottom_content`}>
                      <h2 className={tw`font-bold`}>{item.name}</h2>
                      <div className={tw`flex flex-wrap items-center mb-6`}>
                          <IoLocationSharp/>
                          {item.cityname}
                      </div>
                      <div className={tw`flex flex-wrap items-center`}>
                          <BsStarHalf className="icon_size_h"/>
                          <div className={tw`pl-1`}>{item.ratings}</div>
                          
                          <BsDot className={tw`inline`}/>
                          12 Reviews
                      </div>
                      <div className={tw`border-t-1`}>
                      <div className={tw`flex flex-wrap items-center`}>
                          {
                            
                            item.price==0?<div className="price_inr">Price on Request</div>
                            :<><div className={tw`font-bold price_inr`}>
                              {item.price}/-
                            </div>
                            <div className={tw`pl-2`}>
                              night
                            </div></>
                          
                          }
                          


                      </div>
                      </div>
                  </div>
                  
              </div>
            </Link>
            
        </div>
    })

    

    var dt = new Date()
    const x = dt.toJSON().split("T")[0].split("-")

    const minDate = {
        "year":x[0],
        "month":x[1],
        "day":x[2]
      }


      const Search = async () => {
        setLoading(true)
        const result = await axios.post(Constants.api + '/api/v1/geo/cities/', { av: '', id: '', pt: '', text: searchkey })
        setResult(result?.data?.output)
        setLoading(false)
    }



      const HandleSearch = (s_key) =>{
        if (s_key.length >= 3) {
          setSearchkey(s_key)
          Search()
        }
        else {
            setSearchkey(s_key)
            setResult({})
      }          
      }

      console.log(result)
    return <>
      <Meta meta={meta} />
     <Nav />
     
     <section className="container">

        <div className={tw`mt-4`}>
          <div>
            <div className={tw`flex_`}>
              <h2 className={tw`_titles_`}>Search Home Stay For Your Date</h2>
              <div className={tw`flex Shape_42 flex-wrap`}>
                <div className={tw`w-full lg:w-1/4 lg:px-2 mb-2`}>
                  <div style={{position:'relative'}}>
                    <input 
                    type={"text"} 
                    value={searchkey}
                    // value={searchkey}
                    className="form-control h50"  
                    placeholder="Search for a destination" 
                    onChange={event => HandleSearch(event.target.value)}

                    />
                  <section className={tw`drop_down container`} style={{ boxShadow: 'inset 0 -1px 0 0 rgba(0,0,0,.1)',left:'0',right:'0',borderColor:'transparent',position:'absolute',zIndex:1,border:'1px solid rgba(0,0,0,0.1)',zIndex:3}}>
                    <div>
                    {result?.cities?.map((e, index) => (
                        
                          index<10?
                          <div key={index}>
                          <div href="#" onClick={()=>{setSearchkey(e.name),setResult({})}}>
                              <div className={tw`hover:bg-[#fde2df] drop_item`}>
                                  <div className="d_content">
                                      <div className="flt_left">
                                          <span className="s_name">{e?.name}</span>
                                      </div>
                                      {/* <div className="flt_right">
                                          <FaRupeeSign className={tw`d_price inline`} />
                                          <span className="d_price">{e?.price / 100}</span><BsDot className={`inline d_price`} /><span className="n_d">{e?.nights}N & {e?.nights + 1}D</span>
                                      </div> */}
                                  </div>
                              </div>
                          </div>
                      </div>:""
                        

                            ))}                      
                    </div>
                  </section>
                  </div>

                </div>

                <div className={tw`w-full lg:w-3/4`}>

                <div className={tw`flex flex-wrap items-center`}>
                  <div className={tw`w-full lg:w-1/3 lg:px-2 mb-2`}>
                    <div className={tw`flex`}>
                        <div style={{position:'relative',zIndex:2}}>
                        {/* calender_multi_clr */}
                            <img src={`/icons/calender_multi_clr.png`} alt="" className={tw`inline ht_cal_icon`} />
                            <div className="ht_label">
                                Check-in
                            </div>
                            <DatePicker
                                inputPlaceholder="Check-in"
                                inputClassName="form-control-hotel rd_left"
                                // format="dd-MM-y"
                                value = {checkindate}
                                minimumDate={minDate}
                                onChange={(date) => setCheckindate(date)}
                                required
                                />
                        </div>
                        <div style={{position:'relative',zIndex:2}}>
                        <img src={`/icons/calender_multi_clr.png`} alt="" className={tw`inline ht_cal_icon`} />
                            <div className="ht_label">
                                Check-out
                            </div>
                            <DatePicker
                                inputPlaceholder="Check-out"
                                inputClassName="form-control-hotel rd_right"
                                // format="dd-MM-y"
                                value = {checkoutdate}
                                minimumDate={checkindate}
                                onChange={(date) => setCheckoutdate(date)}
                                required
                                />                                            
                        </div>                                      
                    </div>
                  </div>
                  <div className={tw`w-full lg:w-1/3 px-0 lg:px-2 mb-2`}>

                    <div className={tw``}>
                      <div style={{position:'relative'}}>
                      <FaRegUser
                          className="ht_cal_icon"
                          // onClick={() => setShowLogin(!showLogin)}
                          size={"20px"}
                      />
                      {/* <img src={`/icons/calender_multi_clr.png`} alt="" className={tw`inline ht_cal_icon`} /> */}
                          {/* <div className="ht_label">
                              Guest
                          </div>                                         */}
                      {/* <input type={'text'} className="form-control-hotel" /> */}
                      <select className="form-control h50 ht_select" >
                          <option value="">2 Travellers, 1 Room</option>
                          <option value="">3 Travellers, 1 Room</option>
                          <option value="">4 Travellers, 2 Rooms</option>
                          <option value="">5 Travellers, 2 Rooms</option>
                          <option value="">6 Travellers, 3 Rooms</option>
                          <option value="">7 Travellers, 3 Rooms</option>
                          {/* <option value="">7 Travellers, 4 Rooms</option> */}
                          <option value="">8 Travellers, 4 Rooms</option>
                          <option value="">9 Travellers, 4 Rooms</option>
                          {/* <option value="">9 Travellers, 5 Rooms</option> */}
                          <option value="">10 Travellers, 5 Rooms</option>                                                                                        

                      </select>
                      </div>
                  </div>




                  </div>
                  <div className={tw`w-full lg:w-1/3 lg:px-2 mb-2`}>
                    <button className="btn_listing _btn_clr h50" style={{width:'100%'}}> 
                          Search
                    </button>
                  </div>                  

                </div>



                </div>
              </div>
            </div>
          </div>

        </div>



        
        
        <div className={tw`mt-4`}>
            <h2 className={tw`_titles_ mb-4`}>Browse by Destination</h2>
            <div className="Shape_42" style={{position:"relative"}}>
            <div className="clearfix"></div>
                <MultiCarousel2
                      partialVisible={true}
                      autoPlay={false}
                      customTransition="transform 300ms ease-in-out"
                      infinite={true}
                      className="toprated_slide state_tour"
                      loop
                      renderButtonGroupOutside={true}
                      customButtonGroup={<ButtonGroup />}
                      arrows={false}
                      margin={10}
                      nav
                      responsive={responsive}
                      >
                      {hotelRender}
                  </MultiCarousel2>                
            </div>
        </div>

        <div className={tw`mt-4`} style={{display:'unset'}}>
            <h2 className={tw`_titles_ mb-4`}>Explore</h2>
            <div className="Shape_42">
              <div className="clearfix"></div>
                <Slider {...settings}>
                    {exploreRender}
                </Slider>
            </div>


        </div>
     </section>
     
    </>
}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control', 's-maxage=10');
    let payloads = {
        "av": "",
        "id": 0,
        "name": "",
        "pt": "",
        "type": ""
      }
    const res = await client.query({query:getHotelList,variables:{input:payloads}})
    const meta = await client.query({query:getMetaQuery,variables:{input:{av: "1.3",id: 0,key: "HOTELS",name: "",pt: "WEBSITE",type: ""}}})
    // console.log(res.data.hotels.output)
    return {props:{data:res.data.hotels.output,meta:meta.data.meta.output.tags}}
}

export default Hotels