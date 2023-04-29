import Link from "next/link";
import { tw } from "twind";
import Slider from 'react-slick'
import {IoLocationSharp,IoSunny} from 'react-icons/io5'
import { BsDot,BsStarHalf } from "react-icons/bs";
import { strToUrl } from "../fun";
import {FaRupeeSign} from 'react-icons/fa'
import HotelDesign from "./hotel";
import * as Constants from '../Constants'

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
              slidesToShow: 4,
              slidesToScroll: 4,
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
              slidesToShow: 4,
              slidesToScroll: 4,
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
      // console.log(hotels)
      var _hotels = [...hotels]

      _hotels = _hotels.sort((a,b)=>b.images.length - a.images.length)
    
      
      const exploreRender = _hotels.map((item,i)=>{
        // var hurl =
        //   "/hotel-" +
        //   item.name.replace(/\s+/g, "-").toLowerCase() +
        //   "-in-" +
        //   item.cityname.replace(/\s+/g, "-").toLowerCase() +
        //   "-" +
        //   item.id;

          return <div key={i} className={tw`w-full lg:w-1/4 mb-4`}>
            <HotelDesign item={item} />
          </div>
      })



      const exploreRender_ = hotels.map(function (item, i) {
        var tmp = [];
        var hurl =
          "/hotel-" +
          item.name.replace(/\s+/g, "-").toLowerCase() +
          "-in-" +
          item.cityname.replace(/\s+/g, "-").toLowerCase() +
          "-" +
          item.id + '/';
        for (var i = 0; i < item.ratings; i++) {
          tmp.push(i);
        }
        var indents = tmp.map(function (i) {
          return <i className="fa fa-star"></i>;
        });
        var tmp2 = [];
  
        for (var i = 0; i < 5 - item.ratings; i++) {
          tmp2.push(i);
        }
        var star = tmp2.map(function (i) {
          return <i className="fa fa-star-o"></i>;
        });
  
        return (
          <div key={i} className={tw`w-full lg:w-1/3 mb-4`}>
            
            
            <div className={tw`col-sm-12 col-xs-12 _cr_mb px-4`} key={i}>
              <div className="top_rated_box _box_shadow _bottom _hotel_shadow">
                <div className="des_img">
                  <img
                    className="img-responsive"
                    src={item.images.length > 0 ? item.images : `${Constants.assets_api}/public/icons/logo-icon.png`}
                    alt="kiomoi logo"
                  />
                  <div className="content_">
                    <div className="person_">
                      <div className="item_list">
                        {/* <i className="fa fa-user-o"></i> */}
                        <span>1 Person</span>
                      </div>
                      <div className="item_list text-right">
                        <span>{item.name} </span>
                        <span>{item.locality} </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="royal-details">
                  <h4>{item.name}</h4>
                  <p className={tw`text-sm c_gray`}>{item.locality}</p>
                </div>
                <div className="price_List royal_list">
                  <div className="cut_price price-cut text-right">
                    <del></del>
                  </div>
                  <div className={tw`price_tag flex items-cetner justify-bewteen`}>
                    <Link href={hurl}>
                      <a href={hurl} className="btn_anchor">
                        View Details
                      </a>
                    </Link>
                    {item.price > 0 ? (
                      <>
                        <span className="price_inr price_royal">
                          {item.price}
                        </span>
                      </>
                    ) : (
                      <span className="price_inr price_royal royal-text">
                        Price on Request
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });


    //   const exploreRender = hotels.map((item,i)=>{
    //     return        <div key={i} className={tw`w-full lg:w-1/4 mb-4`}>
    //         <Link href={`/hotel-${strToUrl(item.name)}-in-${item.cityname.toLocaleLowerCase()}-${item.id}`}>
    //           <div className={tw`px-2`}>
    //               <div className="des_img t_rd" style={{margin:0}}>
    //                   <img src={item.images} />
    //               </div>
    //               <div className={tw`p-2 h_bottom_content`}>
    //                   <h2 className={tw`font-bold`}>{item.name}</h2>
    //                   <div className={tw`flex flex-wrap items-center mb-6`}>
    //                       <IoLocationSharp/>
    //                       {item.cityname}
    //                   </div>
    //                   <div className={tw`flex flex-wrap items-center`}>
    //                       <BsStarHalf className="icon_size_h"/>
    //                       <div className={tw`pl-1`}>{item.ratings}</div>
                          
    //                       <BsDot className={tw`inline`}/>
    //                       12 Reviews
    //                   </div>
    //                   <div className={tw`border-t-1`}>
    //                   <div className={tw`flex flex-wrap items-center`}>
    //                       {
                            
    //                         item.price==0?<div className="price_inr">Price on Request</div>
    //                         :<><div className={tw`font-bold price_inr`}>
    //                           {item.price}/-
    //                         </div>
    //                         <div className={tw`pl-2`}>
    //                           night
    //                         </div></>
                          
    //                       }
                          


    //                   </div>
    //                   </div>
    //               </div>
                  
    //           </div>
    //         </Link>
            
    //     </div>
    // })





    return    <div className={tw`Shape_42 p-3`}>
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