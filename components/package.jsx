// import {} from '@fortawesome/fontawesome-free'
import {BsDot,BsStarFill,BsStarHalf,BsFillMoonFill} from 'react-icons/bs'
import {IoLocationSharp,IoSunny} from 'react-icons/io5'
import {MdCheckCircle} from 'react-icons/md'
import {FaRupeeSign} from 'react-icons/fa'
import Link from 'next/link'
import LeadForm from './leadform'
import { useState } from 'react'
import {tw} from 'twind'
import { Carousel } from "react-responsive-carousel";


const Package = ({item}) =>{

    // const [modalid,setModalid] = useState()
    // const [modalpackagename,setModalpackagename] = useState()
    const [sendquery,setSendquery] = useState(false)
    // const [modalcity,setModalcity] = useState()
    const [modalinfo,setModalinfo] = useState({})

    const updateChangeForm=(val)=>{
        setSendquery(val)
      }

    const _sendquery = (price, id, name, city) => {
        console.log("sldkf")
        setModalinfo({
            id,name,city,price
        })
        setSendquery(true)
      };







    var userRating = []
    var i =0
    for(i;i<Math.floor(parseFloat(item.sratings));i++){
        userRating.push(<BsStarFill key={i} className="icon_size inline"/>)
    }
    if (item.sratings.length!=1){
        userRating.push(<BsStarHalf key={i} className="icon_size inline"/>)
    }

    let url = "/holidays/" +
        item.name.trim().replace(/\s+/g, ' ').replace(/\s+/g, "-").toLowerCase().replace(/-tour-package/g,'').replace(/-tour/g,'').replace(/&/g,'and') +
        "-tour-package-" +
        item.id + "/";
    
    return <>
        {/* <Link href={"/holidays/detail"}> */}
            <a className={tw`mb-6`}>
            <div className="pack_box" key={item.id}>
                <div className="row">
                        <div className="col-lg-12 col-sm-12">
                            <div>
                            {/* holidays/shimla-chandigarh-tour-package-110/ */}
                            {/* holidays/eastern-delight-tour-package-191 */}
                                {/* <Link href={`/holidays/[name]-tour-package-[id]/`} as={`${url}`} prefetch={true}> */}
                                    <div className='row'>
                                            <div className='col-sm-4 col-xs-12'>
                                                <div className="_row ov_auto desk_display_none">
                                                    <div className="flt_left">
                                                        <div>
                                                            <h2 className={tw`pack_title`}>{item.name}</h2>
                                                            <div className="days_night">
                                                                {/* {item.nights} Nights | {item.nights+1} Days */}
                                                                <div className={tw`flex justify-center day_nights`}>
                                                                    <div className='night'>
                                                                        <BsFillMoonFill className={tw`inline pr`}/>
                                                                        <span className={tw`pl-1`}>
                                                                            {item.nights} Nights
                                                                        </span>
                                                                        
                                                                    </div>
                                                                    <div className='days'>
                                                                        <IoSunny className={tw`inline`} />
                                                                        <span className={tw`pl-1`}>
                                                                            {item.nights+1} Days
                                                                        </span>
                                                                        

                                                                    </div>
                                                                </div>                                                                
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="flt_right inline">
                                                        <div className="star">
                                                            {userRating}
                                                            {/* { Math.floor(parseFloat(item.sratings))}
                                                            <BsStarFill className="icon_size"/>
                                                            <BsStarFill className="icon_size"/>
                                                            <BsStarFill className="icon_size"/> */}
                                                        </div>
                                                        


                                                        <div className="rating">
                                                            <span className='inline'>4.5 <BsDot className='inline'/> 26 Rating</span>
                                                        </div>
                                                    </div>                        
                                                </div>

                                                <div style={{marginTop:'5px'}}>
                                                <Carousel
                                                    showStatus={false}
                                                    showThumbs={false}
                                                    // showArrows={true}
                                                    // showIndicators={false}
                                                    infinite={true}
                                                    autoPlay={true}
                                                    className="slider_banner__"
                                                >
                                                    {item.images.split("~").map((e, index) => {
                                                        // return <Image className='img' src={e} layout="fill" key={index} />
                                                        return <div className="bk_img" style={{backgroundImage:`url("${e.replace(/w_400/,'w_200')}")`,backgroundPosition:'cover'}}>
                                                        </div>
                                                    })}
                                                </Carousel>
                                                    {/* <div className="bk_img" style={{backgroundImage:`url("${item.images.split("~")[0].replace(/w_400/,'w_200')}")`,backgroundPosition:'cover'}}>

                                                    </div> */}
                                                    {/* <img src={item.images.split("~")[0]}/> */}
                                                </div>

                                            </div>
                                        {/* <Link href={`/holidays/[name]-tour-package-[id]/`} as={`${url}`} prefetch={true}></Link> */}
                                            <Link href={`/holidays/[name]-tour-package-[id]/`} as={`${url}`} prefetch={true}>
                                            <div className='col-sm-8 col-xs-12'>
                                                <div className="contain_blk">
                                                    <div className="_row ov_auto mb_display_none">
                                                        <div className="flt_left">
                                                            <div>
                                                                <h2 className={tw`pack_title text-xl`}>{item.name}</h2>
                                                                <div className={tw`days_night_ mt-1`}>
                                                                    {/* {item.nights} Nights | {item.nights+1} Days */}
                                                                    <div className={tw`flex day_nights`}>
                                                                        <div className='night'>
                                                                            <BsFillMoonFill className={tw`inline pr`}/>
                                                                            <span className={tw`pl-1`}>
                                                                                {item.nights} Nights
                                                                            </span>
                                                                            
                                                                        </div>
                                                                        <div className='days'>
                                                                            <IoSunny className={tw`inline`} />
                                                                            <span className={tw`pl-1`}>
                                                                                {item.nights+1} Days
                                                                            </span>
                                                                            

                                                                        </div>
                                                                    </div> 

                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flt_right">
                                                            <div className="star">
                                                                {userRating}
                                                                {/* { Math.floor(parseFloat(item.sratings))}
                                                                <BsStarFill className="icon_size"/>
                                                                <BsStarFill className="icon_size"/>
                                                                <BsStarFill className="icon_size"/> */}
                                                            </div>
                                                            


                                                            <div className="rating">
                                                                <span className='inline'>4.5 <BsDot className='inline' /> 26 Rating</span>
                                                            </div>
                                                        </div>                        
                                                    </div>

                                                    <div className="location">
                                                        <IoLocationSharp className='inline'/>
                                                        {item.source}
                                                    </div>
                                                    <div className="_sp_39">
                                                        <div className="best_session">
                                                            <span>Best Session : </span>
                                                            <span> {
                                                                item.season.split(",").length === 12? "round-the-year":
                                                                // item.season
                                                                <p style={{display:'inline',fontSize:'11px'}}>{
                                                                item.season.split(",").map((e)=>{
                                                                    return <span key={e}>
                                                                    {/* <span> */}
                                                                        {e}
                                                                        {item.season.split(",")[item.season.split(",").length-1] != e?", ":""}
                                                                    {/* </span> */}
                                                                    </span>
                                                                })
                                                                }</p>
                                                                }</span>                                    
                                                        </div>



                                                        <div className="_cities_">
                                                            <div className="_ap_city">
                                                                <span>
                                                                {
                                                                    item.cities.split(",").map((e,index)=>{
                                                                    return <span key={index}>
                                                                            
                                                                        {item.cities.split(",")[0] != e?"→ ":""}
                                                                        
                                                                        {e}

                                                                        {/* {item.cities.split(",")[item.cities.split(",").length-1] != e?" → ":""} */}
                                                                                                                            
                                                                        </span>
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
                                                                <img
                                                                    src={`/icons/${item.inclusions.toLowerCase().includes("flight")!=false?'ico_Flight_default.png':'ico_Flight_disabled.png'}`}
                                                                    alt=""
                                                                    height="20px"
                                                                    className='h-6'
                                                                />
                                                                <p>Flight</p>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="_div">
                                                                <div>
                                                                <img
                                                                    src={`/icons/${item.inclusions.toLowerCase().includes("transfer")!=false?'ico_Transfer_default.png':'ico_Transfer_disabled.png'}`}
                                                                    alt=""
                                                                    height="20px"
                                                                    className='h-6'
                                                                />
                                                                <p>Trasnfer</p>
                                                                </div>
                                                            </div>

                                                            <div className="_div">
                                                                <div>
                                                                <img
                                                                    src={`/icons/${item.inclusions.toLowerCase().includes("breakfast")!=false?'ico_meals_default.png':'ico_meals_disabled.png'}`}
                                                                    alt=""
                                                                    height="20px"
                                                                    className='h-6'
                                                                />
                                                                <p>Breakfast</p>
                                                                </div>
                                                            </div>

                                                            <div className="_div">
                                                                <div>
                                                                <img
                                                                    src={`/icons/${item.inclusions.toLowerCase().includes("stay")!=false?'ico_homestay_default.png':'ico_homestay_disabled.png'}`}
                                                                    alt=""
                                                                    height="20px"
                                                                    className='h-6'
                                                                />
                                                                <p>Hotel</p>
                                                                </div>
                                                            </div>  

                                                            <div className="_div">
                                                                <div>
                                                                <img
                                                                    src={`/icons/${item.inclusions.toLowerCase().includes("sightseeing")!=false?'ico_sightseeing_default.png':'ico_sightseeing_default.png'}`}
                                                                    alt=""
                                                                    height="20px"
                                                                    className='h-6'
                                                                />
                                                                <p>SightSeeing</p>
                                                                </div>
                                                            </div>                                                                                                            

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={tw`pricing_info pt-2`}>
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
                                                    
                                                    <div className={tw`flex items-center justify-between`}>
                                                        
                                                        <div className='text-left'>
                                                            <div className="checks">
                                                                <p>
                                                                    <MdCheckCircle className='inline' style={{color:'#15be03'}} /> Free Cancellation
                                                                    {/* <br/><MdCheckCircle className='inline' style={{color:'#15be03'}} /> Part Payment */}
                                                                </p>
                                                                <p>
                                                                    <MdCheckCircle className='inline' style={{color:'#15be03'}} /> Part Payment
                                                                </p>

                                                            </div>
                                                        </div>


                                                        <div className='text-right'>
                                                            <div>

                                                            {item.percent?
                                                                <span className="discount">
                                                                    {item.percent}% off
                                                                </span>:""
                                                            }
                                                                <del>
                                                                    <FaRupeeSign className='inline' style={{fontSize:'12px',marginBottom:'4px'}} />
                                                                    {item.price}/-
                                                                </del>
                                                            </div>

                                                            <div>
                                                                <div className="price_inr">
                                                                    <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                                                                    {item.finalprice}/-
                                                                </div>
                                                                <div>
                                                                    <p style={{fontSize:'8.8px',color:'#999'}}>Per person on twin sharing</p>
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
                                            </Link>
                                        
                                    </div>
                                    
                                {/* </Link> */}
                                <div className="buttons desk_display_none mt-2" style={{overflow:'auto'}}>
                                    <div className="flt_left">
                                    <Link href={`/holidays/[name]-tour-package-[id]/`} as={`${url}`} prefetch={true}>
                                        <button className="btn_listing">
                                            VIEW DETAILS
                                        </button>
                                    </Link>
                                    </div>
                                    <div className="flt_right">
                                        <button className="btn_listing _btn_clr" onClick={()=>_sendquery(item.finalprice,item.id,item.name,item.city)}>
                                            SUBMIT QUERY
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                        </div>
                </div>
                
            </div>

            <div className='row mb_display_none'>
                <div>    
                    <div className="flt_left col-sm-4 col-xs-12">
                        <div className="img_meal row _sp_">
                            <div className="icons-meal-info">
                                <div className="_div">
                                    <div>
                                    <img
                                        src={`/icons/${item.inclusions.toLowerCase().includes("flight")!=false?'ico_Flight_default.png':'ico_Flight_disabled.png'}`}
                                        alt=""
                                        height="20px"
                                        className={tw`h-6`}
                                    />
                                    <p>Flight</p>
                                    </div>
                                </div>
                                
                                <div className="_div">
                                    <div>
                                    <img
                                        src={`/icons/${item.inclusions.toLowerCase().includes("transfer")!=false?'ico_Transfer_default.png':'ico_Transfer_disabled.png'}`}
                                        alt=""
                                        height="20px"
                                        className={tw`h-6`}
                                    />
                                    <p>Trasnfer</p>
                                    </div>
                                </div>

                                <div className="_div">
                                    <div>
                                    <img
                                        src={`/icons/${item.inclusions.toLowerCase().includes("breakfast")!=false?'ico_meals_default.png':'ico_meals_disabled.png'}`}
                                        alt=""
                                        height="20px"
                                        className={tw`h-6`}
                                    />
                                    <p>Breakfast</p>
                                    </div>
                                </div>

                                <div className="_div">
                                    <div>
                                    <img
                                        src={`/icons/${item.inclusions.toLowerCase().includes("stay")!=false?'ico_homestay_default.png':'ico_homestay_disabled.png'}`}
                                        alt=""
                                        height="20px"
                                        className={tw`h-6`}
                                    />
                                    <p>Hotel</p>
                                    </div>
                                </div>  

                                <div className="_div">
                                    <div>
                                    <img
                                        src={`/icons/${item.inclusions.toLowerCase().includes("sightseeing")!=false?'ico_sightseeing_default.png':'ico_sightseeing_default.png'}`}
                                        alt=""
                                        height="20px"
                                        className={tw`h-6`}
                                    />
                                    <p>SightSeeing</p>
                                    </div>
                                </div>                                                                                                            

                            </div>
                        </div>
                    </div>
                    <div className='flt_right col-sm-3 col-sx-12'>

                        <div className="buttons" style={{overflow:'auto'}}>
                            <div className="flt_left">
                            <Link href={`/holidays/[name]-tour-package-[id]/`} as={`${url}`} prefetch={true}>
                                <button className="btn_listing">
                                    VIEW DETAILS
                                </button>
                            </Link>
                            </div>
                            <div className="flt_right">
                                <button className="btn_listing _btn_clr" onClick={()=>_sendquery(item.finalprice,item.id,item.name,item.city)}>
                                    SUBMIT QUERY
                                </button>

                            </div>
                        </div>


                    </div>
                </div>






            </div>



            </a>
        {/* </Link> */}
        <LeadForm key={item.id}
            isshow = {sendquery}
            packageid={modalinfo.id}
            packageName={modalinfo.name}
            changeForm = {updateChangeForm}
          />
    </>    
}

export default Package