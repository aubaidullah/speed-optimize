// import {} from '@fortawesome/fontawesome-free'
import {BsDot,BsStarFill,BsStarHalf} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {MdCheckCircle} from 'react-icons/md'
import {FaRupeeSign} from 'react-icons/fa'

const Package = ({item}) =>{
    var userRating = []
    var i =0
    for(i;i<Math.floor(parseFloat(item.sratings));i++){
        userRating.push(<BsStarFill key={i} className="icon_size"/>)
    }
    if (item.sratings.length!=1){
        userRating.push(<BsStarHalf key={i} className="icon_size"/>)
    }
    
    return <>
    <div className="pack_box" key={item.id}>
        <div className="row">
                <div className="col-lg-8 col-sm-12">
                    <div>
                        <div className="_row ov_auto">
                            <div className="flt_left">
                                <div>
                                    <h2 className="pack_title">{item.name}</h2>
                                    <div className="days_night">
                                        {item.nights} Nights | {item.nights+1} Days
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
                                    <span>4.5 <BsDot /> 26 Rating</span>
                                </div>
                            </div>                        
                        </div>



                        <div style={{marginTop:'5px'}}>
                            <div className="bk_img" style={{backgroundImage:`url("${item.images.split("~")[0].replace(/w_400/,'w_200')}")`,backgroundPosition:'cover'}}>

                            </div>
                            {/* <img src={item.images.split("~")[0]}/> */}
                        </div>


                        <div className="contain_blk">
                            <div className="location">
                                <IoLocationSharp/>
                                {item.source}
                            </div>
                            <div>
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



                                <div className="_cities">
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
                                          //         <i class="fa  fa-long-arrow-right"></i>{" "}
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


                        <div className="col-sm-6 col-xs-12 _sp_39">
                              <div className="img_meal row _sp_">
                                <div className="icons-meal-info">
                                    <div className="_div">
                                        <div>
                                        <img
                                            src={`/icons/${item.inclusions.toLowerCase().includes("flight")!=false?'ico_Flight_default.png':'ico_Flight_disabled.png'}`}
                                            alt=""
                                            height="20px"
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
                                        />
                                        <p>SightSeeing</p>
                                        </div>
                                    </div>                                                                                                            

                                </div>
                              </div>
                        </div>

                        <div className="pricing_info">
                            <div className="flt_left">
                                <div className="checks">
                                    <p>
                                        <MdCheckCircle style={{color:'#15be03'}} /> Free Cancellation
                                    </p>
                                    <p>
                                        <MdCheckCircle style={{color:'#15be03'}} /> Part Payment
                                    </p>

                                </div>
                            </div>
                            
                            <div className="flt_right">
                                <div className="fl_rw_">
                                    <div>
                                        <span className="discount">
                                            {item.percent}% off
                                        </span>
                                        <del>
                                            <FaRupeeSign style={{fontSize:'12px',marginBottom:'4px'}} />
                                            {item.price}/-
                                        </del>
                                    </div>
                                    <div className="price_inr">
                                        <FaRupeeSign style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                                        {item.finalprice}/-
                                    </div>
                                    <p style={{fontSize:'8.8px',color:'#999'}}>Per Person on twin sharing</p>
                                </div>
                            </div>
                        </div>

                        <div className="buttons" style={{overflow:'auto'}}>
                            <div className="flt_left">
                                <button className="btn_listing">
                                    VIEW DETAILS
                                </button>
                            </div>
                            <div className="flt_right">
                                <button className="btn_listing _btn_clr">
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
    </>    
}

export default Package