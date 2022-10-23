import {IoLocationSharp,IoSunny} from 'react-icons/io5'
import {MdCheckCircle} from 'react-icons/md'
import {BsDot,BsStarFill,BsStarHalf,BsChevronDown,BsFillMoonFill} from 'react-icons/bs'
// import {IoSunny} from 'react-icons/io'
import {useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import * as Constants from '../Constants'
import LeadForm from '../leadform'
import {FaRupeeSign} from 'react-icons/fa'
import {tw} from 'twind'


const RightBar=({data})=>{
    const [sendquery,setSendquery] = useState(false)
    const [showpeopledropdown,setShowpeopledropdown] = useState(false)
    const [people,setPeople] = useState(2)
    const [checkindate,setCheckindate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [packageid,setPackageid] = useState(data.package.id)
    const [price,setPrice] = useState(data.package.finalprice)
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
          if (resp.data.result == "success") {
            setPrice(resp.data.output.pricing)
            console.log(resp)
            // this.setState({ price: resp.data.output.pricing });
          }else setPrice(0)
        });        
    }
    
    
    
    
    return <>

            {/* <div className="col-sm-4 col-xs-12"> */}
                <div>
                    <div className="bottom_bar">
                        <div style={{ height: '100%' }}>
                            <div style={{ display: 'flex', height: '100%', boxShadow: '3px 1px 4px' }}>
                            <div style={{ width: '100%', borderRight: '1px solid rgba(0,0,0,0.2)' }}>
                                <div className="bottom_bt">
                                <div>
                                    <FaRupeeSign className='inline' style={{fontSize:'14px',marginBottom:'4px'}} />
                                    {parseFloat(data.package.price)}
                                    <p style={{ fontSize: '12px', fontWeight: '300', margin: 0 }}>(Taxes extra) Per Person</p>
                                </div>
                                </div>

                            </div>
                            <div style={{ width: '100%' }} 
                                onClick={() =>
                                    _sendquery(
                                    price,
                                    data.package.id,
                                    data.package.name,
                                    data.package.source
                                )
                                }
                                >
                                <div className="bottom_bt" style={{ fontSize: '22px' }}>
                                Send Query
                                </div>

                            </div>
                            </div>
                        </div>
                    </div>                    

                    <div className='_b_right_list'>
                        <div style={{padding:'15px'}}>
                            <div className='ov_auto'>
                                <div className='d_location flt_left'>
                                    <IoLocationSharp className='inline'/>
                                    <span style={{color:'rgb(6, 24, 141)'}}>{data.package.source}</span>
                                </div>
                                <div className='d_location days_night flt_right'>
                                    <div className={tw`flex justify-center day_nights`}>
                                        <div className='night'>
                                            <BsFillMoonFill className={tw`inline pr`}/>
                                            <span className={tw`pl-1`}>
                                                {data.package.nights} Nights
                                            </span>
                                            
                                        </div>
                                        <div className='days'>
                                            <IoSunny className={tw`inline`} />
                                            <span className={tw`pl-1`}>
                                                {data.package.nights+1} Days
                                            </span>
                                            

                                        </div>
                                    </div>
                                    {/* {data.package.nights} Nights | {data.package.nights+1} Days */}
                                </div>
                            </div>

                            <div className="_cities">
                                <div className="d_ap_city">
                                    <span>
                                    {
                                        data.package.cities.split(",").map((e,index)=>{
                                        return <span key={index}>
                                                
                                            {data.package.cities.split(",")[0] != e?"→ ":""}
                                            
                                            {e}
                                                                                                
                                            </span>
                                        })
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className='bestson_list _border_right'>
                                <div className="best_session">
                                    <MdCheckCircle className='inline' style={{color:'#15be03'}}/>
                                    <span>Best Session : </span>
                                    <span> {
                                        data.package.season.split(",").length === 12? "round-the-year":
                                        // data.package.season
                                        <p className='f_12px' style={{display:'inline'}}>{
                                        data.package.season.split(",").map((e,index)=>{
                                            return <span key={index}>
                                            {/* <span> */}
                                                {e}
                                                {data.package.season.split(",")[data.package.season.split(",").length-1] != e?", ":""}
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
                        <div style={{padding:'15px'}}>
                            <div className='ov_auto'>
                                <div className='flt_left f_12px'>
                                    <MdCheckCircle className='inline' style={{color:'#15be03'}}/>
                                    <span className='_inline__'>Part Payment Available</span>
                                </div>

                                <div className='flt_right f_12px'>
                                    <MdCheckCircle className='inline' style={{color:'#15be03'}}/>
                                    <span className='_inline__'>Free Cancellation</span>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='_b_right_list'>
                        <div style={{padding:'10px'}}>
                            <div style={{textAlign:'center'}}>
                                <span className='check_availability'>Check Availability</span>
                            </div>
                            
                        </div>
                    </div>

                    <div className='_b_right_list __btn_clr price_banner'>
                        <div style={{padding:'15px'}}>


                        <div>
                            <div className="_price_line">
                            <div
                                className="w_inline __img"
                                onClick={()=>setShowpeopledropdown(!showpeopledropdown)}
                                // onClick={() => this.changepeople()}
                            >
                                <img src={"/icons/friends.svg"} className={tw`inline`} alt="" />
                                <span className="_2_two" style={{ cursor: "pointer" }}>
                                {people} People{" "}
                                {/* <i className="fa fa fa-angle-down"></i>{" "} */}
                                <BsChevronDown className={tw`inline`}/>
                                </span>
                                {showpeopledropdown ? (
                                <div className="dropdown-content">
                                    <a
                                    style={{ cursor: "pointer" }}
                                    onClick={()=>peopleChange(2)}
                                    // onClick={()=>{()=>peopleChange()}
                                    >
                                    2 people
                                    </a>
                                    <a
                                    style={{ cursor: "pointer" }}
                                    onClick={()=>peopleChange(3)}
                                    // onClick={() => this.peoplechange(3)}
                                    >
                                    3 people
                                    </a>
                                    <a
                                    style={{ cursor: "pointer" }}
                                    onClick={()=>peopleChange(4)}
                                    // onClick={() => this.peoplechange(4)}
                                    >
                                    4 people
                                    </a>
                                    <a
                                    onClick={()=>peopleChange(5)}
                                    style={{ cursor: "pointer" }}

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
                                {data.package.discount > 0 ? (
                                <>
                                    <span className="_list_p">
                                    {data.package.percent}% Off
                                    </span>
                                    <del>
                                    <i className="fa fa-inr"></i>
                                    {parseFloat(data.package.price) +
                                        parseFloat(data.package.discount)}
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
                                {parseInt(data.package.price) > 0 ? (
                                    <>
                                    <i className="fa fa-inr" style={{ backgroundColor: 'initial' }}></i>
                                    {price}/-
                                    </>
                                ) : (
                                    "Price on Request"
                                )}
                                </span>
                            </div>
                            <div className="_person_">
                                {parseInt(data.package.price) > 0 ? "(Taxes extra)" : ""}{" "}
                                Per Person{" "}
                            </div>
                            </div>
                            <div className="button_details_page">
                            <a href="tel:+919650687940" className="button_detail" style={{ fontWeight: 'bold' }}>
                                CALL NOW
                            </a>
                            <a
                                href="javascript:void(0)"
                                style={{ fontWeight: 'bold' }}
                                className="_22m button_detail btn_white"
                                onClick={() =>
                                    _sendquery(
                                    price,
                                    data.package.id,
                                    data.package.name,
                                    data.package.source
                                )
                                }
                            >
                                SEND QUERY
                            </a>
                            </div>
                        </div>




                        </div>
                    </div>
                    <LeadForm 
                        isshow = {sendquery}
                        packageid={modalinfo.id}
                        packageName={modalinfo.name}
                        changeForm = {updateChangeForm}
                    />

                </div>
            {/* </div> */}
    
    
    </>
}

export default RightBar