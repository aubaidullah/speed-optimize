import Nav from "../../../components/Nav"
import { tw } from "twind";
import BreadCrumbs from "../../../components/breadcrumbs";
import client from "../../../components/Graphql/service";
import { getHotelDetail } from "../../../components/Graphql/Queries";
import { BsDot, BsStarFill, BsStarHalf } from 'react-icons/bs'
import {FaRegUser} from 'react-icons/fa'
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import {FaRupeeSign} from 'react-icons/fa'
import Rooms from "../../../components/hotel/rooms";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { useEffect,useState } from "react";

// import PhotoSwipe from 'photoswipe';



const RightContent = ({hotel,selectedHotel,checkindate,setCheckindate,checkoutdate,setCheckoutdate,updateHotel}) =>{
    // console.log(hotel)
    var yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    let x = yourDate.toISOString().split('T')[0].split("-")

    const minDate = {
        "year":parseInt(x[0]),
        "month":parseInt(x[1]),
        "day":parseInt(x[2])
      }

    useEffect(()=>{
        setCheckoutdate(checkindate)
    },[checkindate])
    
    
    return  <>
    <div className={tw`ml-5`}>
        <div className="Shape_42">
            <div className={tw`flex items-center`}>
                {hotel.hotel.price
                ?<>
                    <div className="price_inr">
                    <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                        <span>{selectedHotel?.price}/-</span>
                    </div>
                    {/* <div className={tw`ml-3 f_12 c_gray`}>
                        per night
                    </div> */}
                </>:<div className="price_inr">Price on Request</div>}
            </div>

            <div className={tw`flex mt-3`}>
                <div style={{position:'relative',zIndex:999}}>
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
                        onChange={(date) => {console.log(date),setCheckindate(date)}}
                        required
                        />
                </div>
                <div style={{position:'relative',zIndex:999}}>
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
            <div className={tw`mt-3`}>
                <div style={{position:'relative'}}>
                <FaRegUser
                    className="ht_cal_icon"
                    // onClick={() => setShowLogin(!showLogin)}
                    size={"20px"}
                />
                {/* <img src={`/icons/calender_multi_clr.png`} alt="" className={tw`inline ht_cal_icon`} /> */}
                    <div className="ht_label">
                        Guest
                    </div>                                        
                {/* <input type={'text'} className="form-control-hotel" /> */}
                <select className="form-control-hotel">
                    <option value="" onClick={()=>updateHotel({travellers:2,room:1})}>2 Travellers, 1 Room</option>
                    <option value="" onClick={()=>updateHotel({travellers:3,room:1})}>3 Travellers, 1 Room</option>
                    <option value="" onClick={()=>updateHotel({travellers:4,room:2})}>4 Travellers, 2 Rooms</option>
                    <option value="" onClick={()=>updateHotel({travellers:5,room:2})}>5 Travellers, 2 Rooms</option>
                    <option value="" onClick={()=>updateHotel({travellers:6,room:3})}>6 Travellers, 3 Rooms</option>
                    <option value="" onClick={()=>updateHotel({travellers:7,room:3})}>7 Travellers, 3 Rooms</option>
                    {/* <option value="" onClick={()=>updateHotel({travellers:7,room:4})}>7 Travellers, 4 Rooms</option> */}
                    <option value="" onClick={()=>updateHotel({travellers:8,room:4})}>8 Travellers, 4 Rooms</option>
                    <option value="" onClick={()=>updateHotel({travellers:9,room:4})}>9 Travellers, 4 Rooms</option>
                    {/* <option value="" onClick={()=>updateHotel({travellers:9,room:5})}>9 Travellers, 5 Rooms</option> */}
                    <option value="" onClick={()=>updateHotel({travellers:10,room:5})}>10 Travellers, 5 Rooms</option>                                                                                        

                </select>
                </div>
            </div>


            <div className={tw`mt-3`}>
                <button className="btn_listing _btn_clr" style={{width:'100%'}}>
                    Book
                </button>
            </div>


            
        </div>
    </div>
</>
}





const HotelDetail = ({hotel}) =>{


    var yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    let x = yourDate.toISOString().split('T')[0].split("-")

    // const x = dt.toJSON().split("T")[0].split("-")

    const minDate = {
        "year":parseInt(x[0]),
        "month":parseInt(x[1]),
        "day":parseInt(x[2])
      }



    const [checkindate,setCheckindate] = useState(minDate)
    const [checkoutdate,setCheckoutdate] = useState(minDate)
    const [selectedRoom,setSelectedRoom] = useState({})
    const [selectedHotel,setSelectedHotel] = useState({'travellers':2,'room':1,'price':0,'id':null})






    var userRating = []
    var i = 0
    for (i; i < Math.floor(parseFloat(hotel.hotel.ratings)); i++) {
        userRating.push(<BsStarFill key={i} className={tw`d_icon_size inline`} />)
    }
    if (hotel.hotel.ratings.length != 1) {
        userRating.push(<BsStarHalf key={i} className={tw`d_icon_size inline`} />)
    }
    
    
    const bread = {
        disabled: {
            item: `${hotel.hotel.name}`
        },
        enabled: [
            {
                item: "Kiomoi",
                href: "/"
            },
            {
                item: "Hotel Booking",
                href: "/"
            },            
        ]
    }    
    
    useEffect(()=>{
        const lightbox = new PhotoSwipeLightbox({
            gallery: '#right-gallery',
            children: 'a',
            pswpModule: () => import('photoswipe')
          });
        lightbox.init(); 
    })
   
    
    // console.log(hotel)
    




    // console.log(hotel.hotel.images.split(',').length)
    // console.log(Math.min(...hotel.rooms.map(item => item.price)))
    useEffect(()=>{
        let nm = hotel.rooms.reduce(function(prev, curr) {
            return prev.price < curr.price ? prev : curr;
        });
        // console.log(nm)
        setSelectedRoom(nm)
        setSelectedHotel({...selectedHotel,id:nm.id,price:nm.price})
    },[])

    // console.log(selectedHotel)

    const updateHotel = (info) => {
        console.log(info)
        let price = 0
        if(info.travellers == 2 && info.room==1){
            price = selectedRoom.price
        }
        else{
            price = selectedRoom.price * info.room
            if(info.travellers%2){
                price = price + selectedRoom.singlePrice 
            }
        }
        setSelectedHotel({...selectedHotel,id:selectedRoom.id,price:price,travellers:info.travellers,room:info.room})
    }

    const selectRoom=(room)=>{
        setSelectedRoom(room)
    }
    useEffect(()=>{
        updateHotel({room:selectedHotel.room,travellers:selectedHotel.travellers})
    },[selectedRoom])

    console.log(selectedRoom)


    return <>
        
        <Nav />
        <BreadCrumbs bread={bread}/>
        <section className={tw`container`}>
            <div className="title_listing_">
                <h1 className={tw`text-2xl font-bold`}>{hotel.hotel.name}</h1>
            </div>
            <div>
                {/* <div>{hotel.hotel.locality}</div> */}
                <div className={tw`flex items-center rating mb-4`}>
                        <div className='_inline__'>
                            {userRating}
                        </div>
                        <div className='_inline__'>
                            <span className='inline'>4.5 <BsDot className='inline' /> 26 Rating</span>
                        </div>
                        
                </div>
                <div className={``}>
                    <div className={tw`flex flex-wrap`}>
                        <div className={tw`-full lg:w-2/3`}>
                            <div className="slider_details" id="gallery">
                                <div className="carousel-root slider_banner slider_overlay">
                                    <div className="carousel carousel-slider">
                                        <div className="slider-wrapper axis-horizontal">
                                            <li className="slide">
                                                {
                                                    hotel.hotel.images
                                                    ?<Image className='img ht_img' src={hotel.hotel.images.split(',')[0]} layout="fill" />:
                                                    ""
                                                }
                                                

                                            </li>

                                        </div>

                                    </div>
                                </div>
                                {/* <Carousel
                                    showStatus={false}
                                    showThumbs={false}
                                    showArrows={true}
                                    showIndicators={true}
                                    infinite={true}
                                    autoPlay={true}
                                    className="slider_banner slider_overlay"
                                >
                                    {hotel.hotel.images.split(',').map((e, index) => {
                                        return e.length>5?<Image className='img' href={e} src={e} layout="fill" key={index} />:""
                                    })}
                                </Carousel> */}


                            </div>
                        </div>
                        <div className={tw`w-full lg:w-1/3`}>
                            <div className={tw`flex-col ml-5`} style={{height:'100%'}} id="right-gallery">
                                
                                {
                                    hotel.hotel.images.split(',').map((e,index)=>{
                                        
                                        return hotel.hotel.images.split(',')[index+1]!=undefined && hotel.hotel.images.split(',')[index+1].length>5 

                                        ?<div style={{height:'50%',display:index>1?'none':'block'}} className={tw`${index==1?'pt-2':'pb-2'}`}>
                                                <div style={{height:'100%',width:'100%',position:'relative'}}>
                                                    <a data-pswp-src={
                                                        // e
                                                        hotel.hotel.images.split(',')[index+1]
                                                    }
                                                    data-pswp-width="3000"
                                                    data-pswp-height="2000" 
                                                    target="_blank"
                                                    >
                                                    {
                                                        hotel.hotel.images?
                                                    
                                                    <div>

                                                        <Image className='ht_img' src={
                                                            // e
                                                            hotel.hotel.images.split(',')[index+1]
                                                        
                                                        } 
                                                            
                                                            layout="fill" style={{borderRadius:'8px'}} />
                                                        {index==1
                                                        ?<div style={{position:'absolute',color:'white',bottom:10,right:10}}>
                                                            <button className="btn_listing" style={{background:'white',textTransform:'unset'}}>
                                                                Show all {hotel.hotel.images.split(',').length} Photos
                                                            </button>
                                                                
                                                        </div>:""
                                                        }
                                                        
                                                    </div>:""}
                                                    
                                                    
                                                    </a>
                                                </div>
                                            </div>
                                        :""
                                    })
                                }
                                
                                {/* <div style={{height:'50%'}} className={tw`pb-2`}>
                                    <div style={{height:'100%',width:'100%',position:'relative'}}>
                                        <a data-pswp-src={hotel.hotel.images.split(',')[1]} 
                                        >
                                            <Image className='img' src={hotel.hotel.images.split(',')[1]} layout="fill" style={{borderRadius:'8px'}} />
                                        </a>
                                    </div>
                                </div>
                                <div style={{height:'50%'}} className={tw`pt-2`}>
                                    <div style={{height:'100%',width:'100%',position:'relative'}}>
                                        <a data-pswp-src={hotel.hotel.images.split(',')[2]}
                                        // data-pswp-height="768"
                                        >
                                        <Image className='img' src={hotel.hotel.images.split(',')[2]} layout="fill" style={{borderRadius:'8px'}} />
                                        </a>
                                        
                                    </div>
                                </div> 

                                <div style={{height:'50%',display:'none'}} className={tw`pt-2`}>
                                    <div style={{height:'100%',width:'100%',position:'relative'}}>
                                        <a data-pswp-src={hotel.hotel.images.split(',')[3]}
                                        // data-pswp-height="768"
                                        >
                                        <Image className='img' src={hotel.hotel.images.split(',')[3]} layout="fill" style={{borderRadius:'8px'}} />
                                        </a>
                                        
                                    </div>
                                </div>                                                                 */}

                                {/* <div>
                                    <Image className='img' src={hotel.hotel.images.split(',')[0]} layout="fill" />
                                </div> */}
                            </div>
                        </div>                        
                    </div>
                </div>

                <div className={tw`flex flex-wrap mt-8`}>
                    <div className={tw`w-full lg:w-2/3`}>

                        <div>
                            <div className={tw`flex flex-wrap`}>
                                <div className={tw`w-full`}>
                                    <div>
                                        <h2 className="_titles_">About the place</h2>
                                        <div className="Shape_42">
                                            <div style={{lineHeight:'25px',textAlign:'justify'}}>
                                                {hotel.hotel.description}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className={tw`w-full lg:w-1/3`} style={{display:'none'}}>
                                    <div className={tw`ml-5`}>
                                        <div className="Shape_42">
                                            <div className={tw`flex items-center`}>
                                                {hotel.hotel.price
                                                ?<>
                                                    <div className="price_inr">
                                                    <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                                                        <span>{selectedHotel?.price}/-</span>
                                                    </div>
                                                    {/* <div className={tw`ml-3 f_12 c_gray`}>
                                                        per night
                                                    </div> */}
                                                </>:<div className="price_inr">Price on Request</div>}
                                            </div>

                                            <div className={tw`flex mt-3`}>
                                                <div style={{position:'relative',zIndex:999}}>
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
                                                <div style={{position:'relative',zIndex:999}}>
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
                                            <div className={tw`mt-3`}>
                                                <div style={{position:'relative'}}>
                                                <FaRegUser
                                                    className="ht_cal_icon"
                                                    // onClick={() => setShowLogin(!showLogin)}
                                                    size={"20px"}
                                                />
                                                {/* <img src={`/icons/calender_multi_clr.png`} alt="" className={tw`inline ht_cal_icon`} /> */}
                                                    <div className="ht_label">
                                                        Guest
                                                    </div>                                        
                                                {/* <input type={'text'} className="form-control-hotel" /> */}
                                                <select className="form-control-hotel">
                                                    <option value="" onClick={()=>updateHotel({travellers:2,room:1})}>2 Travellers, 1 Room</option>
                                                    <option value="" onClick={()=>updateHotel({travellers:3,room:1})}>3 Travellers, 1 Room</option>
                                                    <option value="" onClick={()=>updateHotel({travellers:4,room:2})}>4 Travellers, 2 Rooms</option>
                                                    <option value="" onClick={()=>updateHotel({travellers:5,room:2})}>5 Travellers, 2 Rooms</option>
                                                    <option value="" onClick={()=>updateHotel({travellers:6,room:3})}>6 Travellers, 3 Rooms</option>
                                                    <option value="" onClick={()=>updateHotel({travellers:7,room:3})}>7 Travellers, 3 Rooms</option>
                                                    {/* <option value="" onClick={()=>updateHotel({travellers:7,room:4})}>7 Travellers, 4 Rooms</option> */}
                                                    <option value="" onClick={()=>updateHotel({travellers:8,room:4})}>8 Travellers, 4 Rooms</option>
                                                    <option value="" onClick={()=>updateHotel({travellers:9,room:4})}>9 Travellers, 4 Rooms</option>
                                                    {/* <option value="" onClick={()=>updateHotel({travellers:9,room:5})}>9 Travellers, 5 Rooms</option> */}
                                                    <option value="" onClick={()=>updateHotel({travellers:10,room:5})}>10 Travellers, 5 Rooms</option>                                                                                        

                                                </select>
                                                </div>
                                            </div>


                                            <div className={tw`mt-3`}>
                                                <button className="btn_listing _btn_clr" style={{width:'100%'}}>
                                                    Book
                                                </button>
                                            </div>


                                            
                                        </div>
                                    </div>
                                </div>                        
                            </div>
                        </div>


                        <div>
                            <div className={tw`flex flex-wrap mt-8`}>
                                <div className={tw`w-full`}>
                                    <div>
                                        <h2 className="_titles_">Select Rooms</h2>
                                            <Rooms rooms={hotel.rooms} selectedRoom={selectedRoom} selectRoom={selectRoom}/>
                                    </div>
                                </div>
                                <div className={tw`w-full lg:w-1/3`}>

                                </div>                        
                            </div>
                            {hotel.policy?
                            <div className={tw`flex flex-wrap mt-8`}>
                            <div className={tw`w-full`}>
                                <div>
                                    <h2 className="_titles_">Cancellation Policy</h2>
                                    <div className="Shape_42">
                                            <div className={tw`mb-2`}>
                                            <span className={tw`font-bold`}>100% refund of amount paid </span> if cancel at least 7 days before check-in
                                        </div>
                                        <div className={tw`mb-2`}>
                                            <span className={tw`font-bold`}>{100-hotel.policy[0]?.amt1}% refund of amount paid </span> if cancel at least {hotel.policy[0]?.dayTo1} days before check-in
                                        </div>
                                        <div className={tw`mb-2`}>
                                            <span className={tw`font-bold`}>No refund of amount paid </span> if cancel at least {hotel.policy[0]?.dayFrom2} days before check-in
                                        </div>
                                        <div className={tw`mb-2`}>
                                            <span>Free cancellation deadlines are in the property's timezone.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={tw`w-full lg:w-1/3`}>

                            </div>                        
                        </div>:""                    
                            }

                        </div>

                        <div>
                            <div className={tw`flex flex-wrap mt-8`}>
                                <div className={tw`w-full`}>
                                    <div>
                                        <h2 className="_titles_">Term & Conditions</h2>
                                        <div className="Shape_42">
                                            <ul className={tw`list-disc ml-4 hotel_tnc`}>
                                                {hotel.hotel.tnc.split(',').map((e,index)=>{
                                                    return <li key={index}>{e}</li>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                    <div className={tw`w-full lg:w-1/3`} >
                        <div className={tw`w-full h_sticky`}>
                        <RightContent hotel={hotel} selectedHotel={selectedHotel} checkindate={checkindate} setCheckindate={setCheckindate} checkoutdate={checkoutdate} setCheckoutdate={setCheckoutdate} updateHotel={updateHotel}/>
                        <>
                            <div className={tw`ml-5`} style={{display:'none'}}>
                                <div className="Shape_42">
                                    <div className={tw`flex items-center`}>
                                        {hotel.hotel.price
                                        ?<>
                                            <div className="price_inr">
                                            <FaRupeeSign className='inline' style={{color:"#f79421",fontSize:'15px',marginBottom:'4px'}} />
                                                <span>{selectedHotel?.price}/-</span>
                                            </div>
                                            {/* <div className={tw`ml-3 f_12 c_gray`}>
                                                per night
                                            </div> */}
                                        </>:<div className="price_inr">Price on Request</div>}
                                    </div>

                                    <div className={tw`flex mt-3`}>
                                        <div style={{position:'relative',zIndex:999}}>
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
                                        <div style={{position:'relative',zIndex:999}}>
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
                                    <div className={tw`mt-3`}>
                                        <div style={{position:'relative'}}>
                                        <FaRegUser
                                            className="ht_cal_icon"
                                            // onClick={() => setShowLogin(!showLogin)}
                                            size={"20px"}
                                        />
                                        {/* <img src={`/icons/calender_multi_clr.png`} alt="" className={tw`inline ht_cal_icon`} /> */}
                                            <div className="ht_label">
                                                Guest
                                            </div>                                        
                                        {/* <input type={'text'} className="form-control-hotel" /> */}
                                        <select className="form-control-hotel">
                                            <option value="" onClick={()=>updateHotel({travellers:2,room:1})}>2 Travellers, 1 Room</option>
                                            <option value="" onClick={()=>updateHotel({travellers:3,room:1})}>3 Travellers, 1 Room</option>
                                            <option value="" onClick={()=>updateHotel({travellers:4,room:2})}>4 Travellers, 2 Rooms</option>
                                            <option value="" onClick={()=>updateHotel({travellers:5,room:2})}>5 Travellers, 2 Rooms</option>
                                            <option value="" onClick={()=>updateHotel({travellers:6,room:3})}>6 Travellers, 3 Rooms</option>
                                            <option value="" onClick={()=>updateHotel({travellers:7,room:3})}>7 Travellers, 3 Rooms</option>
                                            {/* <option value="" onClick={()=>updateHotel({travellers:7,room:4})}>7 Travellers, 4 Rooms</option> */}
                                            <option value="" onClick={()=>updateHotel({travellers:8,room:4})}>8 Travellers, 4 Rooms</option>
                                            <option value="" onClick={()=>updateHotel({travellers:9,room:4})}>9 Travellers, 4 Rooms</option>
                                            {/* <option value="" onClick={()=>updateHotel({travellers:9,room:5})}>9 Travellers, 5 Rooms</option> */}
                                            <option value="" onClick={()=>updateHotel({travellers:10,room:5})}>10 Travellers, 5 Rooms</option>                                                                                        

                                        </select>
                                        </div>
                                    </div>


                                    <div className={tw`mt-3`}>
                                        <button className="btn_listing _btn_clr" style={{width:'100%'}}>
                                            Book
                                        </button>
                                    </div>


                                    
                                </div>
                            </div>
                        </>
                    </div>   

                    </div>
                </div>


            </div>
        </section>
    </>
}



export async function getServerSideProps(context) {
    let _id = context.query.id
    console.log(_id)
    const res = await client.query({query:getHotelDetail,variables:{input:{id:_id}}})
    console.log(res.data.hotelDetail.output)
    const hotel = res.data.hotelDetail.output

    return {props:{hotel}}
}



export default HotelDetail;