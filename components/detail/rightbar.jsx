import {IoLocationSharp,IoSunny} from 'react-icons/io5'
import {MdCheckCircle} from 'react-icons/md'
import {BsChevronDown,BsFillMoonFill} from 'react-icons/bs'
// import {IoSunny} from 'react-icons/io'
import {useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import * as Constants from '../Constants'
// import LeadForm from '../leadform'
import {FaRupeeSign} from 'react-icons/fa'
import {tw} from 'twind'
import dynamic from 'next/dynamic'

const LeadForm = dynamic(() => import('../leadform'))

const RightBar=({data})=>{
    const [sendquery,setSendquery] = useState(false)
    const [showpeopledropdown,setShowpeopledropdown] = useState(false)
    const [people,setPeople] = useState(2)
    const [checkindate,setCheckindate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [packageid,setPackageid] = useState(data?.package.id)
    const [price,setPrice] = useState(data?.package.finalprice)
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


    const peopleChange=(e)=>{
        setPeople(e)
        setShowpeopledropdown(false)
        const resp = axios
        .post(Constants.api + "/api/v1/package/price", {
          adults: e,
          from: checkindate,
          pid: packageid,
        })
        .then((resp) => {
          if (resp.data?.result == "success") {
            setPrice(resp.data?.output.pricing)
            console.log(resp)
            // this.setState({ price: resp.data?.output.pricing });
          }else setPrice(0)
        });        
    }
    
    
    
    
    return <>

            {/* <div className="col-sm-4 col-xs-12"> */}
                <div>
                    <div className="bottom_bar">
                        <div className={tw`h-full`}>
                            <div className={tw`flex h-full shadow-[3px 1px 4px]`}>
                            <div className={tw`w-full border-r-1 border-x-slate-950/20`}>
                                <div className="bottom_bt">
                                <div>
                                    <FaRupeeSign className='inline text-[14px] mb-[4px]' />
                                    {parseFloat(data?.package.price)}
                                    <p className={tw`text-[12px] font-light m-0`}>(Taxes extra) Per Person</p>
                                </div>
                                </div>

                            </div>
                            <div className={tw`w-full`}
                                onClick={() =>
                                    _sendquery(
                                    price,
                                    data?.package.id,
                                    data?.package.name,
                                    data?.package.source
                                )
                                }
                                >
                                <div className="bottom_bt text-[22px]">
                                Send Query
                                </div>

                            </div>
                            </div>
                        </div>
                    </div>                    

                    <div className={tw`_b_right_list mt-0 lg:mt-16`}>
                        <div className='p-[10px]'>
                            <div className='ov_auto'>
                                <div className='d_location flt_left'>
                                    <IoLocationSharp className='inline text-[#999]' size={15}/>
                                    <span className='text-[#06188D]'>{data?.package.source}</span>
                                </div>
                                <div className='d_location days_night flt_right'>
                                    <div className={tw`flex justify-center day_nights`}>
                                        <div className='night'>
                                            <BsFillMoonFill className={tw`inline pr`}/>
                                            <span className={tw`pl-1`}>
                                                {data?.package.nights} Nights
                                            </span>
                                            
                                        </div>
                                        <div className='days'>
                                            <IoSunny className={tw`inline`} />
                                            <span className={tw`pl-1`}>
                                                {data?.package.nights+1} Days
                                            </span>
                                            

                                        </div>
                                    </div>
                                    {/* {data?.package.nights} Nights | {data?.package.nights+1} Days */}
                                </div>
                            </div>

                            <div className="_cities">
                                <div className="d_ap_city">
                                    <span>
                                    {
                                        data?.package.cities.split(",").map((e,index)=>{
                                        return <span key={index}>
                                                
                                            {data?.package.cities.split(",")[0] != e?"→ ":""}
                                            
                                            {e}
                                                                                                
                                            </span>
                                        })
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className='bestson_list _border_right'>
                                <div className="best_session">
                                    <MdCheckCircle className='inline text-[#0d8d06]' size={13}/>
                                    <span>Best Session : </span>
                                    <span> {
                                        data?.package.season.split(",").length === 12? "round-the-year":
                                        // data?.package.season
                                        <p className='f_12px inline'>{
                                        data?.package.season.split(",").map((e,index)=>{
                                            return <span key={index}>
                                            {/* <span> */}
                                                {e}
                                                {data?.package.season.split(",")[data?.package.season.split(",").length-1] != e?", ":""}
                                            {/* </span> */}
                                            </span>
                                        })
                                        }</p>
                                        }</span>                                    
                                </div>                                        
                            </div>




                        </div>

                    </div>

                    <div className='_b_right_list'>
                        <div className='p-[10px]'>
                            <div className='ov_auto best_session'>
                                <div className='flt_left'>
                                    <MdCheckCircle size={13} className='inline text-[#0d8d06]'/>
                                    <span className='_inline__'>Part Payment Available</span>
                                </div>

                                <div className='flt_right'>
                                    <MdCheckCircle size={13} className='inline text-[#0d8d06]'/>
                                    <span className='_inline__'>Free Cancellation</span>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='_b_right_list'>
                        <div className='p-[5px]'>
                            <div className='text-center'>
                                <span className='check_availability'
                                onClick={() =>
                                    _sendquery(
                                    price,
                                    data?.package.id,
                                    data?.package.name,
                                    data?.package.source
                                )
                                }
                                >CHECK AVAILABILITY</span>
                            </div>
                            
                        </div>
                    </div>

                    <div className='_b_right_list __btn_clr price_banner'>
                        <div className='p-[10px]'>


                        <div>
                            <div className="_price_line">
                            <div
                                className="w_inline __img"
                                onClick={()=>setShowpeopledropdown(!showpeopledropdown)}
                                // onClick={() => this.changepeople()}
                            >
                                <img src={"/icons/friends.svg"} className={tw`inline`} alt="peoples" />
                                <span className="_2_two cursor-pointer">
                                {people} People{" "}
                                {/* <i className="fa fa fa-angle-down"></i>{" "} */}
                                <BsChevronDown className={tw`inline`}/>
                                </span>
                                {showpeopledropdown ? (
                                <div className="dropdown-content">
                                    <a
                                    className="cursor-pointer"
                                    onClick={()=>peopleChange(2)}
                                    // onClick={()=>{()=>peopleChange()}
                                    >
                                    2 people
                                    </a>
                                    <a
                                    className="cursor-pointer"
                                    onClick={()=>peopleChange(3)}
                                    // onClick={() => this.peoplechange(3)}
                                    >
                                    3 people
                                    </a>
                                    <a
                                    className="cursor-pointer"
                                    onClick={()=>peopleChange(4)}
                                    // onClick={() => this.peoplechange(4)}
                                    >
                                    4 people
                                    </a>
                                    <a
                                    onClick={()=>peopleChange(5)}
                                    className="cursor-pointer"

                                    // onClick={() => this.peoplechange(5)}
                                    >
                                    5 people
                                    </a>
                                </div>
                                ) : (
                                ""
                                )}
                            </div>
                            <div className="cut_price price-cut">
                                {data?.package.discount > 0 ? (
                                <>
                                    <span className="_list_p">
                                    {data?.package.percent}% Off
                                    </span>
                                    <del className={tw`flex justify-between items-center`}>
                                    {/* <i className="fa fa-inr"></i> */}
                                    <FaRupeeSign className='inline text-[12px]'/>
                                    {parseFloat(data?.package.price) +
                                        parseFloat(data?.package.discount)}
                                    /-
                                    </del>
                                </>
                                ) : (
                                ""
                                )}
                            </div>
                            </div>
                            <div className="_price_line text-right">
                            <div className="price_tag_banner">
                                <span className="__price">
                                <FaRupeeSign className={tw`inline`}/>
                                {parseInt(data?.package.price) > 0 ? (
                                    <>
                                    {/* <i className="fa fa-inr" style={{ backgroundColor: 'initial' }}></i> */}
                                    {/* <FaRupeeSign className='inline' style={{color:"#999",backgroundColor:'initial',fontSize:'12px',marginBottom:'4px'}} /> */}
                                    {price}/-
                                    </>
                                ) : (
                                    "Price on Request"
                                )}
                                </span>
                            </div>
                            <div className="_person_">
                                {parseInt(data?.package.price) > 0 ? "(Taxes extra)" : ""}{" "}
                                Per Person{" "}
                            </div>
                            </div>
                            <div className="button_details_page">
                            <a href="tel:+919650687940" className="button_detail font-bold">
                                CALL NOW
                            </a>
                            <a
                                href="javascript:void(0)"
                                
                                className="_22m button_detail btn_white font-bold"
                                onClick={() =>
                                    _sendquery(
                                    price,
                                    data?.package.id,
                                    data?.package.name,
                                    data?.package.source
                                )
                                }
                            >
                                SEND QUERY
                            </a>
                            </div>
                        </div>




                        </div>
                    </div>
                    
                    
                    <div className={tw`w-full mt-20 mb-10`}>
                    <div className={tw`bets_price pl-0`}>
                        <div className="_best_price_list">
                        <h4>Best Price Guaranteed</h4>
                        <p>
                            We source services directly from the local suppliers. This
                            enables us to keep our rates best in the market.
                        </p>
                        </div>

                        <div className="tour_planner">
                        <h4>Dedicated Tour Planner</h4>
                        <p>
                        As soon as we receive your request, a dedicated tour planner is assigned who helps you from the planning to the completion of your trip and makes it a memorable one
                        </p>
                        </div>


                        <div className="customize">
                        <h4>Customization</h4>
                        <p>
                        A virtuoso prepares your itinerary who has personally traveled there and have thorough knowledge about the destinations.
                        </p>
                        </div>


                        <div className="assistance">
                        <h4>Assistance 24X7</h4>
                        <p>
                        If you are on your trip, there is something bothering you. You can reach out to us at any hour of the day or night
                        </p>
                        </div>


                        <div className="customer">
                        <h4>Customers Delight </h4>
                        <p>
                        Our customers are our top-most priority. You would love to read their experiences with Kiomoi they have shared publicly.
                        </p>
                        </div>


                    </div>
                </div>                    
                    
                    
                    {
                        sendquery?<LeadForm 
                        isshow = {sendquery}
                        packageid={modalinfo.id}
                        packageName={modalinfo.name}
                        changeForm = {updateChangeForm}
                    />:""
                    }
                    

                </div>
            {/* </div> */}
    
    
    </>
}

export default RightBar