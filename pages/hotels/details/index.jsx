import Nav from "../../../components/Nav"
import { tw } from "twind";
import BreadCrumbs from "../../../components/breadcrumbs";
import client from "../../../components/Graphql/service";
import { getHotelDetail } from "../../../components/Graphql/Queries";
import { BsDot, BsStarFill, BsStarHalf, BsStar, BsFillCheckCircleFill, BsPlusLg } from 'react-icons/bs'
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Rooms from "../../../components/hotel/rooms";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { useEffect } from "react";
// import PhotoSwipe from 'photoswipe';



const HotelDetail = ({hotel}) =>{
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
   
    
    console.log(hotel)
    
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
                                                <Image className='img ht_img' src={hotel.hotel.images.split(',')[0]} layout="fill" />

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
                                                        
                                                    </div>
                                                    
                                                    
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

                <div>
                    <div className={tw`flex flex-wrap mt-8`}>
                        <div className={tw`w-full lg:w-2/3`}>
                            <div>
                                <h2 className="_titles_">About the place</h2>
                                <div className="Shape_42">
                                    {hotel.hotel.amenities}
                                </div>
                            </div>
                        </div>
                        <div className={tw`w-full lg:w-1/3`}>

                        </div>                        
                    </div>
                </div>


                <div>
                    <div className={tw`flex flex-wrap mt-8`}>
                        <div className={tw`w-full lg:w-2/3`}>
                            <div>
                                <h2 className="_titles_">Select Rooms</h2>
                                    <Rooms rooms={hotel.rooms}/>
                            </div>
                        </div>
                        <div className={tw`w-full lg:w-1/3`}>

                        </div>                        
                    </div>
                    {hotel.policy?
                    <div className={tw`flex flex-wrap mt-8`}>
                    <div className={tw`w-full lg:w-2/3`}>
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
                            </div>
                        </div>
                    </div>
                    <div className={tw`w-full lg:w-1/3`}>

                    </div>                        
                </div>:""                    
                    }

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