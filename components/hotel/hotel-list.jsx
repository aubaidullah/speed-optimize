import Link from "next/link";
import { tw } from "twind";
import Slider from 'react-slick'
import {IoLocationSharp,IoSunny} from 'react-icons/io5'
import { BsDot,BsStarHalf } from "react-icons/bs";
import { strToUrl } from "../fun";

const HotelList = ({hotels}) =>{


    const SampleNextArrow = (props)=> {
        const { className, style, onClick } = props;
        // {tw`hidden lg:carousel-button-group lg:block `}
        return <div className={tw`hidden lg:block custom-btn right-custom-btn`} onClick={onClick}/>;
      }
  
    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        
        return <div className={tw`hidden lg:block custom-btn left-custom-btn`} onClick={onClick}/>;
      }


    const _settings = {
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
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ],
      };
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        rows: 3,
        slidesToShow: 3,
        slidesToScroll: 1
      };      
    
    
      const exploreRender = hotels.map((item,i)=>{
        return        <div key={i} className={tw`w-full lg:w-1/4 mb-4`}>
            <Link href={`/hotel-${strToUrl(item.name)}-in-${item.cityname.toLocaleLowerCase()}-${item.id}`}>
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


    return    <div className="Shape_42">
                <div className={tw`flex flex-wrap`}>
                  {exploreRender}
                </div>
                
                  {/* <div className="clearfix"></div> */}
                  {/* <Slider {...settings}>
                      {exploreRender}
                  </Slider> */}
              </div>
}

export default HotelList