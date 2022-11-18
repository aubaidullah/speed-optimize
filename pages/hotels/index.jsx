import Nav from "../../components/Nav"
import { tw } from "twind"
import { useState,useEffect } from "react";
import client from "../../components/Graphql/service";
import { getHotelList } from "../../components/Graphql/Queries";
// import {BsDot,BsStarFill,BsStarHalf,BsFillMoonFill} from 'react-icons/bs'
import MultiCarousel2 from "react-multi-carousel";
import Image from "next/image";
import Slider from 'react-slick'
import {IoLocationSharp,IoSunny} from 'react-icons/io5'
import { BsDot,BsStarHalf } from "react-icons/bs";


const Hotels = ({data}) =>{

    const [responsive,Setresponsive] = useState({})


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
              items: 1,
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
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />,
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
        return <div key={i}>
            <div className={tw`px-2`}>
                <div className="des_img" style={{margin:0}}>
                    <img src={item.images} />
                </div>
                <div className="py-2">
                    <h2 className={tw`font-bold`}>{item.name}</h2>
                    <div className={tw`flex flex-wrap items-center mb-6`}>
                        <IoLocationSharp/>
                        {item.locality}
                    </div>
                    <div className={tw`flex flex-wrap items-center rating`}>
                        <BsStarHalf className="icon_size"/>
                        <div>{item.ratings}</div>
                        
                        <BsDot className={tw`inline`}/>
                        12 Reviews
                    </div>
                    <div className={tw`border-t-1`}>
                    <div className={tw`flex flex-wrap items-center`}>
                        <div className={tw`font-bold`}>
                            {item.price}/-
                        </div>
                        <div className={tw`pl-2`}>
                            night
                        </div>
                    </div>
                    </div>
                </div>
                
            </div>
            
        </div>
    })

    


    return <>
     <Nav />
     
     <section className="container">
        {/* <h1 className={tw`text-2xl`}>Hotels</h1> */}
        <div className={tw`mt-4`}>
            <h2 className={tw`_titles_ mb-4`}>Browse by Destination</h2>
            <div>
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

        <div className={tw`mt-4`}>
            <h2 className={tw`_titles_ mb-4`}>Explore</h2>
            <div className="clearfix"></div>
            <Slider {...settings}>
                {exploreRender}
            </Slider>

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
    // console.log(res.data.hotels.output)
    return {props:{data:res.data.hotels.output}}
}

export default Hotels