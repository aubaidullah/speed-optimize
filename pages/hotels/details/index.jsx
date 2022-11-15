import Nav from "../../../components/Nav"
import { tw } from "twind";
import BreadCrumbs from "../../../components/breadcrumbs";
import client from "../../../components/Graphql/service";
import { getHotelDetail } from "../../../components/Graphql/Queries";
import { BsDot, BsStarFill, BsStarHalf, BsStar, BsFillCheckCircleFill, BsPlusLg } from 'react-icons/bs'
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Rooms from "../../../components/hotel/rooms";


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
                            <div className="slider_details">
                                <Carousel
                                    showStatus={false}
                                    showThumbs={false}
                                    showArrows={true}
                                    showIndicators={true}
                                    infinite={true}
                                    autoPlay={true}
                                    className="slider_banner slider_overlay"
                                >
                                    {hotel.hotel.images.split(',').map((e, index) => {
                                        return <Image className='img' src={e} layout="fill" key={index} />
                                    })}
                                </Carousel>
                            </div>
                        </div>
                        <div className={tw`w-full lg:w-1/3`}>
                                    sdf
                        </div>                        
                    </div>
                </div>

                <div>
                    <div className={tw`flex flex-wrap mt-8`}>
                        <div className={tw`w-full lg:w-2/3`}>
                            <div>
                                <h2 className="_titles_">About the place</h2>
                                <div className="Shape_42">
                                    {hotel.hotel.description}
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
                                    <Rooms />
                            </div>
                        </div>
                        <div className={tw`w-full lg:w-1/3`}>

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