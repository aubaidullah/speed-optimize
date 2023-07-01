import { tw } from "twind";
import client from "../../../components/Graphql/service";
import { getHotelDetail,getMetaQuery } from "../../../components/Graphql/Queries";
import { BsDot, BsStarFill, BsStarHalf } from 'react-icons/bs'
import Image from "next/image";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { useEffect,useState } from "react";
import { imgNameByUrl, jpgToWebp, strToUrl } from "../../../components/fun";
import {BsCheckCircle} from 'react-icons/bs'
import dynamic from "next/dynamic";



const HotelDetail = ({hotel,meta}) =>{
    const BreadCrumbs = dynamic(() => import('@/components/breadcrumbs'))
    const Nav = dynamic(() => import('@/components/Nav'))
    const Meta = dynamic(() => import('@/components/meta'))

    const RightContent = dynamic(() => import('@/components/hotel/Right-content'))
    // const Rooms = dynamic(() => import('@/components/hotel/rooms'))

    var yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset*60*1000))
    let x = yourDate.toISOString().split('T')[0].split("-")
    const minDate = {
        "year":parseInt(x[0]),
        "month":parseInt(x[1]),
        "day":parseInt(x[2])
      }



    const [checkindate,setCheckindate] = useState(minDate)
    const [checkoutdate,setCheckoutdate] = useState(minDate)
    const [selectedRoom,setSelectedRoom] = useState({})
    const [amlimit,setAmlimit] = useState(8)
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
                item: "Hotels",
                href: "/hotels"
            },
            {
                item: `${hotel.hotel.cityname}`,
                href: `/hotels/hotel-in-${strToUrl(hotel.hotel.cityname)}-${hotel.hotel.cid}`
                
            }
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
   
    
    useEffect(()=>{
        if (hotel.rooms.length!=0){
            let nm = hotel.rooms.reduce(function(prev, curr) {
                return prev.price < curr.price ? prev : curr;
            });
            // console.log(nm)
            setSelectedRoom(nm)
            setSelectedHotel({...selectedHotel,id:nm.id,price:nm.price})
        }

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

    // console.log(hotel)


    return <>
        <Meta meta={meta} />
        
        <Nav />
        <BreadCrumbs bread={bread}/>
        <section className={tw`container`}>
            <div className="title_listing_">
                <h1 className={tw`text-2xl font-bold`}>{hotel.hotel.name}</h1>
            </div>
            <div>
                <div className={tw`flex items-center rating mb-4`}>
                        <div className='_inline__'>
                            {userRating}
                        </div>
                        <div className={tw`pl-1 _inline__`}>
                            <span className={tw`text-sm inline`}>4.5 <BsDot className='inline' /> 26 Rating</span>
                        </div>
                        
                </div>
                <div className={``}>
                    <div className={tw`flex flex-wrap`}>
                        <div className={tw`w-full lg:w-2/3`}>
                            <div className="slider_details" id="gallery">
                                <div className="carousel-root slider_banner slider_overlay">
                                    <div className="carousel carousel-slider">
                                        <div className="slider-wrapper axis-horizontal">
                                            <li className="slide">
                                                {
                                                    hotel.hotel.images
                                                    ?<Image className='img ht_img' alt={imgNameByUrl({url:hotel.hotel.images.split(',')[0]})} src={jpgToWebp({uri:hotel.hotel.images.split(',')[0]})} layout="fill" />:
                                                    ""
                                                }
                                                

                                            </li>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={tw`w-full lg:w-1/3`}>
                            <div className={tw`flex-col ml-5 h-full`}id="right-gallery">
                                
                                {
                                    hotel.hotel.images.split(',').map((e,index)=>{
                                        
                                        return hotel.hotel.images.split(',')[index+1]!=undefined && hotel.hotel.images.split(',')[index+1].length>5 

                                        ?<div className={tw`h-[50%] ${index>1?'hidden':'block'} ${index==1?'pt-2':'pb-2'}`}>
                                                <div className="h-full w-full relative">
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

                                                        <Image className={tw`ht_img rounded-[8px]`} src={
                                                            // e
                                                            jpgToWebp({uri:hotel.hotel.images.split(',')[index+1]})
                                                            
                                                        }   
                                                        alt={hotel?.hotel?.name}
                                                            layout="fill"  />
                                                        {index==1
                                                        ?<div className={tw`absolute text-white right-[10px] bottom-6 lg:bottom-2`}>
                                                            <button className="btn_listing bg-white normal-case" >
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
                                            <div className="leading-[25px] text-justify">
                                                {hotel.hotel.description}
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
                                            {/* <Rooms rooms={hotel.rooms} selectedRoom={selectedRoom} selectRoom={selectRoom}/> */}
                                    </div>
                                </div>
                                <div className={tw`w-full lg:w-1/3`}>

                                </div>                        
                            </div>
                            
                            <div className={tw`flex mt-8`}>
                                <div>
                                    <h2 className="_titles_">
                                        Amenities
                                    </h2>
                                    <div className="Shape_42">
                                        <div className={tw`flex flex-wrap`}>
                                            {hotel.hotel.amenities.split(',').map((e,index)=>{
                                                if(amlimit>index){
                                                    return <div className={tw`w-1/2 lg:w-1/4 mb-3`}>
                                                    <div className={tw`flex`}>
                                                        <div>
                                                        <BsCheckCircle color="#44c554" className={tw`inline`}/>

                                                        </div>
                                                        <div className={tw`pl-2`}>
                                                            <span className={tw`text-gray-600 f12`}>{e}</span>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                }

                                            })}
                                            {amlimit==8?
                                            <div className={tw`w-full text-right`}>
                                                <span className={tw`_plus_more`} onClick={()=>setAmlimit(1000)}>load more</span>
                                            </div>
                                                :""
                                            }

                                        </div>
                                    </div>
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

    const meta = await client.query({query:getMetaQuery,variables:{input:{av:"",id:_id,key:'HOTEL',name:"",pt:'WEBSITE',type:"HOTEL"}}})
    let {name:hotelname,price,cityname} = meta.data.meta.output.hotel

    // let {finalprice,images} = meta.data.meta.output.package
    price = `₹${price} `
    
    const metas ={
        title:meta.data.meta.output.tags.title.replace(/<HOTEL>/g,hotelname).replace(/<CITY>/g,cityname).replace(/<PRICE>/g,price),
        longDesc:meta.data.meta.output.tags.longDesc.replace(/<HOTEL>/g,hotelname).replace(/<CITY>/g,cityname),
        keywords:meta.data.meta.output.tags.keywords.replace(/<HOTEL>/g,hotelname).replace(/<CITY>/g,cityname)
    }


    return {props:{hotel,meta:metas}}
}



export default HotelDetail;